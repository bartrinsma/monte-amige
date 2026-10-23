import "server-only";
import { getDb } from "./db";
import { ticketSettings } from "./settings";

/**
 * Koppeling met tickets.onlinemetbart.nl.
 * POST {url}/api/v1/tickets met "Authorization: Bearer <klant-API-sleutel>".
 * De sleutel hoort bij één klant; het ticket komt bij die klant op de to-do lijst.
 */

export interface Bug {
  id: number;
  title: string;
  actual: string;
  expected: string | null;
  page_url: string | null;
  priority: string;
  reporter: string | null;
  ticket_id: string | null;
  ticket_error: string | null;
  synced_at: string | null;
  created_at: string;
}

export async function listBugs(): Promise<Bug[]> {
  const db = await getDb();
  return db.query<Bug>("SELECT * FROM ma_bugs ORDER BY created_at DESC, id DESC");
}

function ticketPayload(bug: Bug) {
  const summary = [
    `Bug gemeld via de admin van Monte Amigo (monte-amigo.nl).`,
    `Prioriteit: ${bug.priority}`,
    bug.reporter ? `Gemeld door: ${bug.reporter}` : null,
  ]
    .filter(Boolean)
    .join("\n\n");
  return {
    title: `Bug: ${bug.title}`,
    summary,
    current_situation: bug.actual,
    desired_situation: bug.expected || null,
    target_url: bug.page_url || null,
    reporter: bug.reporter || null,
    external_ref: `monte-amigo-bug-${bug.id}`,
  };
}

/** Stuur een bug door als ticket. Slaat het resultaat (ticket-id of foutmelding) op bij de bug. */
export async function syncBug(id: number): Promise<{ ok: boolean; error?: string }> {
  const db = await getDb();
  const [bug] = await db.query<Bug>("SELECT * FROM ma_bugs WHERE id = $1", [id]);
  if (!bug) return { ok: false, error: "Bug niet gevonden." };
  if (bug.ticket_id) return { ok: true };

  const cfg = await ticketSettings();
  let error: string | undefined;
  let ticketId: string | undefined;

  if (!cfg.key) {
    error = "Geen API-sleutel ingesteld. Vul die in bij Instellingen.";
  } else {
    try {
      const res = await fetch(`${cfg.url}/api/v1/tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${cfg.key}` },
        body: JSON.stringify(ticketPayload(bug)),
        signal: AbortSignal.timeout(15000),
        cache: "no-store",
      });
      const data = (await res.json().catch(() => ({}))) as { id?: string; error?: string };
      if (res.ok && data.id) ticketId = data.id;
      else error = data.error || `Ticketsysteem antwoordde met status ${res.status}.`;
    } catch (e) {
      error = `Ticketsysteem niet bereikbaar (${e instanceof Error ? e.message : "onbekende fout"}).`;
    }
  }

  await db.query("UPDATE ma_bugs SET ticket_id = $2, ticket_error = $3, synced_at = now() WHERE id = $1", [
    id,
    ticketId ?? null,
    error ?? null,
  ]);
  return error ? { ok: false, error } : { ok: true };
}

/** Controleer of URL + sleutel werken, zonder een ticket aan te maken. */
export async function testConnection(): Promise<{ ok: boolean; message: string }> {
  const cfg = await ticketSettings();
  if (!cfg.key) return { ok: false, message: "Vul eerst een API-sleutel in." };
  const headers = { Authorization: `Bearer ${cfg.key}`, "Content-Type": "application/json" };
  try {
    const me = await fetch(`${cfg.url}/api/v1/me`, { headers, signal: AbortSignal.timeout(10000), cache: "no-store" });
    if (me.ok) {
      const data = (await me.json().catch(() => ({}))) as { client?: { name?: string } };
      return { ok: true, message: `Verbonden met klant "${data.client?.name ?? "onbekend"}".` };
    }
    if (me.status === 401) return { ok: false, message: "De API-sleutel is ongeldig of ingetrokken." };

    // Ticketsysteem zonder /me: een leeg ticket wordt geweigerd (400) als de sleutel klopt, 401 als hij niet klopt.
    const probe = await fetch(`${cfg.url}/api/v1/tickets`, {
      method: "POST",
      headers,
      body: "{}",
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });
    if (probe.status === 400 || probe.status === 422) return { ok: true, message: "Verbonden: de API-sleutel is geldig." };
    if (probe.status === 401) return { ok: false, message: "De API-sleutel is ongeldig of ingetrokken." };
    if (probe.status === 404) return { ok: false, message: "Het ticketsysteem heeft (nog) geen API op dit adres." };
    return { ok: false, message: `Onverwacht antwoord van het ticketsysteem (status ${probe.status}).` };
  } catch (e) {
    return { ok: false, message: `Niet bereikbaar: ${e instanceof Error ? e.message : "onbekende fout"}.` };
  }
}
