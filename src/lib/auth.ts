import "server-only";
import { createHmac, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDb } from "./db";
import { getSetting } from "./settings";

/**
 * Admin-toegang met één wachtwoord, opgeslagen als scrypt-hash in de database.
 * Bij het eerste bezoek aan /admin kiest de eigenaar het wachtwoord; daarna kan het
 * worden gewijzigd onder Instellingen. Er hoeft dus geen geheim in Netlify te staan.
 *
 * Na inloggen een HttpOnly-cookie "<verloopdatum>.<HMAC>". Het HMAC-geheim is een willekeurige
 * waarde uit de database plus de wachtwoord-hash: wachtwoord wijzigen = iedereen uitgelogd.
 */

export const ADMIN_COOKIE = "ma_admin";
const SESSION_DAYS = 14;
export const MIN_PASSWORD_LENGTH = 8;

const scryptAsync = promisify(scrypt) as (pw: string, salt: Buffer, len: number) => Promise<Buffer>;

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const hash = await scryptAsync(password, salt, 64);
  return `scrypt$${salt.toString("base64url")}$${hash.toString("base64url")}`;
}

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [kind, salt, hash] = stored.split("$");
  if (kind !== "scrypt" || !salt || !hash) return false;
  const expected = Buffer.from(hash, "base64url");
  const actual = await scryptAsync(password, Buffer.from(salt, "base64url"), expected.length);
  return timingSafeEqual(actual, expected);
}

async function sessionSecret(): Promise<string> {
  const db = await getDb();
  // Eenmalig een willekeurig geheim aanmaken; bij gelijktijdige requests wint de eerste.
  await db.query("INSERT INTO ma_settings (key, value) VALUES ('session_secret', $1) ON CONFLICT (key) DO NOTHING", [
    randomBytes(32).toString("base64url"),
  ]);
  const [secret, hash] = await Promise.all([getSetting("session_secret"), getSetting("admin_password")]);
  return `${secret}:${hash ?? ""}`;
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

/** Is er al een wachtwoord gekozen? Zo niet, dan toont /admin het instelscherm. */
export async function adminConfigured(): Promise<boolean> {
  return !!(await getSetting("admin_password"));
}

export async function checkPassword(input: string): Promise<boolean> {
  const stored = await getSetting("admin_password");
  return !!stored && (await verifyPassword(input, stored));
}

/** Eerste wachtwoord vastleggen. Geeft false als er intussen al een is ingesteld. */
export async function setInitialPassword(password: string): Promise<boolean> {
  const db = await getDb();
  const rows = await db.query(
    "INSERT INTO ma_settings (key, value) VALUES ('admin_password', $1) ON CONFLICT (key) DO NOTHING RETURNING key",
    [await hashPassword(password)],
  );
  return rows.length > 0;
}

export async function changePassword(password: string): Promise<void> {
  const db = await getDb();
  await db.query(
    "INSERT INTO ma_settings (key, value) VALUES ('admin_password', $1) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value",
    [await hashPassword(password)],
  );
}

/** Zet het sessiecookie (na inloggen of het instellen van een wachtwoord). */
export async function startSession(): Promise<void> {
  const maxAge = SESSION_DAYS * 24 * 60 * 60;
  const expires = String(Date.now() + maxAge * 1000);
  const sig = createHmac("sha256", await sessionSecret()).update(expires).digest("base64url");
  (await cookies()).set(ADMIN_COOKIE, `${expires}.${sig}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
}

export async function isAdmin(): Promise<boolean> {
  const value = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!value || !(await adminConfigured())) return false;
  const [expires, sig] = value.split(".");
  if (!expires || !sig || Number(expires) <= Date.now()) return false;
  const expected = createHmac("sha256", await sessionSecret()).update(expires).digest("base64url");
  return safeEqual(sig, expected);
}

/** Gebruik bovenaan elke admin-pagina én in elke admin server action. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login/");
}
