# Monte Amigo – website + beheer

Nabouw van monte-amigo.nl als Next.js-app, met een eigen beheeromgeving op `/admin`.

```bash
npm install
cp .env.example .env.local   # optioneel
npm run dev                  # http://localhost:3000
```

## Website
| Pad | Inhoud |
| --- | --- |
| `/` | Home: video, welkomsttekst, registratienummers |
| `/over-ons/` | Vakantiehuis: beschrijving + fotogalerij (met vergroting) |
| `/tarieven/` | Tarieventabel + voorwaarden |
| `/agenda/` | Beschikbaarheid (uit de database) |
| `/reserveren/` | Uitleg + knop om te mailen met aantal personen en data |
| `/recensies/` | Recensies (uit de database) |
| `/omgeving/` | Wat te doen in de omgeving (oude URL `/een-homepage-sectie/` stuurt door) |

## SEO
- Titels, meta-descriptions, foto's en sitemap-instellingen per pagina staan in `src/lib/site.ts`.
- Elke pagina heeft een self-referencing canonical, Open Graph/Twitter-tags en `robots: index, follow`.
- Alle URL's eindigen op een slash (`trailingSlash`); zonder slash volgt een 308-redirect.
- `/robots.txt` (sluit `/admin/` uit) verwijst naar `/sitemap.xml`: XML-sitemap met image-extensie,
  in de browser opgemaakt via `public/sitemap.xsl`.
- Schema.org (JSON-LD): `WebSite` + `LodgingBusiness` op elke pagina, `BreadcrumbList` op subpagina's.
- Domein voor canonicals/sitemap: `NEXT_PUBLIC_SITE_URL` (standaard `https://monte-amigo.nl`).
- Google Search Console en Google Analytics 4 koppel je in de admin onder **Instellingen → Google koppelingen**.
  Analytics gebruikt Consent Mode: zonder toestemming via de cookiemelding geen cookies.

## Beheer (`/admin`)
Bij het eerste bezoek aan `/admin` kies je een wachtwoord; dat wordt gehasht in de database opgeslagen.
Wijzigen kan onder Instellingen. Er hoeft geen wachtwoord in Netlify te staan.

- **Dashboard**: komende verblijven, bezetting komende 90 dagen, recensies.
- **Boekingen**: periodes toevoegen
  (bevestigd of geblokkeerd), wijzigen en verwijderen. Alleen *bevestigd* en *geblokkeerd* maken de agenda bezet.
  Overlappende periodes worden geweigerd.
- **Recensies**: toevoegen, wijzigen, verbergen/tonen en verwijderen. De 23 recensies van de oude site
  staan er bij de eerste start al in.
- **Bugs melden** (`/admin/bug`): bug invoeren; die wordt automatisch een ticket op de to-do lijst in
  tickets.onlinemetbart.nl. Mislukt doorsturen, dan blijft de bug bewaard met een knop "Opnieuw doorsturen".
- **Instellingen**: ticketsysteem (adres, API-sleutel, verbinding testen), wachtwoord wijzigen, en het tabblad
  **Google koppelingen** (Search Console-verificatie en Analytics-meet-ID).

## Koppeling met tickets.onlinemetbart.nl
1. In het ticketsysteem (repo `tickets-omb`, PR #4) moet de API live staan en de migratie
   `supabase/migrations/0003_api_keys.sql` in Supabase zijn uitgevoerd.
2. Daar als admin: menu **API-keys** → key aanmaken voor de klant Monte Amigo → key (`omb_…`) kopiëren.
3. Hier: **Instellingen** → key plakken → **Opslaan** → **Verbinding testen**.

Elke bug wordt `POST /api/v1/tickets` met titel "Bug: …", de beschrijving, verwachting, pagina, prioriteit en melder.
De verbindingstest gebruikt `GET /api/v1/me` als die bestaat, en anders een leeg ticket dat het ticketsysteem
weigert (400 = sleutel geldig, 401 = ongeldig); er wordt dan dus geen ticket aangemaakt.
Voor een andere klantsite: dezelfde code met de API-key van die klant.

## Omgevingsvariabelen
Zie `.env.example`. Belangrijk voor productie:
- `DATABASE_URL` (of Netlify DB): blijvende Postgres. Zonder database-URL draait PGlite; dat is lokaal prima,
  maar op serverless hosting **niet blijvend**. De admin waarschuwt hiervoor.

## Netlify
Koppel project `monte-amigo` aan deze repo (branch `main`, base directory leeg); `netlify.toml` regelt de rest.

## Nog te doen
- **Foto's**: `public/img/` bevat uitsneden uit schermafbeeldingen, omdat monte-amigo.nl vanuit de bouwomgeving
  niet bereikbaar was. Vervang ze door de originele bestanden met **dezelfde bestandsnaam**.
- **Video**: zet de homepagevideo neer als `public/video/monte-amigo.mp4`. Zolang die ontbreekt, wordt het
  videoblok verborgen.
- Tarieven staan in `src/lib/rates.ts` (tabel en prijsindicatie gebruiken dezelfde gegevens).
