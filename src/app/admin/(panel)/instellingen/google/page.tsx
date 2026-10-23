import type { Metadata } from "next";
import { saveGoogleSettings } from "@/app/admin/actions";
import { SettingsTabs } from "@/components/admin/SettingsTabs";
import { Flash, PageHead, type SP } from "@/components/admin/ui";
import { googleSettings } from "@/lib/settings";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = { title: "Google koppelingen" };

export default async function GoogleSettingsPage({ searchParams }: { searchParams: SP }) {
  const google = await googleSettings();

  return (
    <>
      <PageHead title="Instellingen" sub="Koppel de website aan Google Search Console en Google Analytics." />
      <SettingsTabs active="google" />
      <Flash searchParams={searchParams} />

      <form action={saveGoogleSettings}>
        <div className="adm-card">
          <div className="adm-card-body">
            <div className="adm-row">
              <h2>Google Search Console</h2>
              <span className={`badge ${google.searchConsole ? "green" : ""}`}>{google.searchConsole ? "Gekoppeld" : "Niet gekoppeld"}</span>
            </div>
            <p className="lead">Zie hoe Monte Amigo in Google gevonden wordt en meld de sitemap aan.</p>
            <ol className="adm-steps">
              <li>
                Ga naar <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer">Search Console</a>,
                kies <strong>Property toevoegen → URL-voorvoegsel</strong> en vul <code className="adm-code">{SITE_URL}/</code> in.
              </li>
              <li>
                Kies bij verificatie <strong>HTML-tag</strong> en kopieer de tag (
                <code className="adm-code">&lt;meta name=&quot;google-site-verification&quot; …&gt;</code>).
              </li>
              <li>Plak hem hieronder, sla op en klik in Search Console op <strong>Verifiëren</strong>.</li>
              <li>
                Meld daarna bij <strong>Sitemaps</strong> aan: <code className="adm-code">{SITE_URL}/sitemap.xml</code>
              </li>
            </ol>
            <div className="adm-field" style={{ marginTop: "1rem" }}>
              <label htmlFor="search_console">Verificatie-tag of code</label>
              <input
                id="search_console"
                name="search_console"
                type="text"
                defaultValue={google.searchConsole}
                placeholder='<meta name="google-site-verification" content="…" />'
                autoComplete="off"
              />
              <p className="hint">Leeg laten en opslaan = koppeling verwijderen.</p>
            </div>
          </div>
        </div>

        <div className="adm-card">
          <div className="adm-card-body">
            <div className="adm-row">
              <h2>Google Analytics 4</h2>
              <span className={`badge ${google.analyticsId ? "green" : ""}`}>{google.analyticsId ? "Gekoppeld" : "Niet gekoppeld"}</span>
            </div>
            <p className="lead">Bezoekersstatistieken. Bezoekers krijgen een cookiemelding; zonder toestemming plaatst Analytics geen cookies.</p>
            <ol className="adm-steps">
              <li>
                Open <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer">Google Analytics</a> →{" "}
                <strong>Beheer → Gegevensstreams → Web</strong> (maak er een aan voor {SITE_URL} als die er nog niet is).
              </li>
              <li>
                Kopieer de <strong>Meet-ID</strong>, die begint met <code className="adm-code">G-</code>.
              </li>
            </ol>
            <div className="adm-field" style={{ marginTop: "1rem" }}>
              <label htmlFor="analytics_id">Meet-ID</label>
              <input id="analytics_id" name="analytics_id" type="text" defaultValue={google.analyticsId} placeholder="G-ABC123XYZ" autoComplete="off" />
              <p className="hint">Leeg laten en opslaan = Analytics uitzetten.</p>
            </div>
          </div>
        </div>

        <button className="adm-btn" type="submit">
          Google-koppelingen opslaan
        </button>
      </form>
    </>
  );
}
