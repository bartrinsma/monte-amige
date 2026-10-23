import { getDb } from "@/lib/db";
import { PAGES, SITE_URL, type PageInfo } from "@/lib/site";

/**
 * XML-sitemap (sitemaps.org) met image-extensie, opgemaakt via /sitemap.xsl zodat hij ook in de
 * browser leesbaar is. Bewust een route handler in plaats van app/sitemap.ts: die kan geen
 * stylesheet-verwijzing toevoegen. lastmod van agenda en recensies komt uit de database.
 */

export const dynamic = "force-dynamic";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

async function lastChanges(): Promise<{ agenda?: string; recensies?: string }> {
  try {
    const db = await getDb();
    const [row] = await db.query<{ agenda: string | null; recensies: string | null }>(`
      SELECT
        (SELECT to_char(max(created_at), 'YYYY-MM-DD') FROM ma_bookings) AS agenda,
        (SELECT to_char(max(created_at), 'YYYY-MM-DD') FROM ma_reviews WHERE published) AS recensies
    `);
    return { agenda: row?.agenda ?? undefined, recensies: row?.recensies ?? undefined };
  } catch {
    // Zonder database blijft de sitemap gewoon werken met de vaste datums.
    return {};
  }
}

const later = (a: string, b?: string) => (b && b > a ? b : a);

function urlEntry(p: PageInfo, lastmod: string): string {
  const images = [...new Set(p.images)]
    .map((src) => `\n    <image:image><image:loc>${esc(SITE_URL + src)}</image:loc></image:image>`)
    .join("");
  return `  <url>
    <loc>${esc(SITE_URL + p.path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${p.changeFrequency}</changefreq>
    <priority>${p.priority.toFixed(1)}</priority>${images}
  </url>`;
}

export async function GET() {
  const db = await lastChanges();
  const entries = (Object.keys(PAGES) as (keyof typeof PAGES)[]).map((key) => {
    const p = PAGES[key];
    const lastmod = key === "agenda" ? later(p.updated, db.agenda) : key === "recensies" ? later(p.updated, db.recensies) : p.updated;
    return urlEntry(p, lastmod);
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join("\n")}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
