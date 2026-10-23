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
| `/reserveren/` | Reserveringsformulier; aanvragen komen in de admin terecht |
| `/recensies/` | Recensies (uit de database) |
| `/omgeving/` | Wat te doen in de omgeving (oude URL `/een-homepage-sectie/` stuurt door) |

## Beheer (`/admin`)
Bij het eerste bezoek aan `/admin` kies je een wachtwoord; dat wordt gehasht in de database opgeslagen.
Wijzigen kan onder Instellingen. Er hoeft geen wachtwoord in Netlify te staan.

- **Dashboard**: open aanvragen, komende verblijven, bezetting komende 90 dagen, recensies.
- **Boekingen**: aanvragen van de website bevestigen of afwijzen, zelf periodes toevoegen
  (bevestigd of geblokkeerd), wijzigen en verwijderen. Alleen *bevestigd* en *geblokkeerd* maken de agenda bezet.
  Overlappende periodes worden geweigerd.
- **Recensies**: toevoegen, wijzigen, verbergen/tonen en verwijderen. De 23 recensies van de oude site
  staan er bij de eerste start al in.
- **Bugs melden** (`/admin/bug`): bug invoeren; die wordt automatisch een ticket op de to-do lijst in
  tickets.onlinemetbart.nl. Mislukt doorsturen, dan blijft de bug bewaard met een knop "Opnieuw doorsturen".
- **Instellingen**: adres + API-sleutel van het ticketsysteem, automatisch doorsturen aan/uit, verbinding testen.

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
- `RESEND_API_KEY` + `NOTIFY_EMAIL`: e-mail bij een nieuwe reserveringsaanvraag (optioneel).

## Netlify
Koppel project `monte-amigo` aan deze repo (branch `main`, base directory leeg); `netlify.toml` regelt de rest.

## Nog te doen
- **Foto's**: `public/img/` bevat uitsneden uit schermafbeeldingen, omdat monte-amigo.nl vanuit de bouwomgeving
  niet bereikbaar was. Vervang ze door de originele bestanden met **dezelfde bestandsnaam**.
- **Video**: zet de homepagevideo neer als `public/video/monte-amigo.mp4`. Zolang die ontbreekt, wordt het
  videoblok verborgen.
- Tarieven staan in `src/lib/rates.ts` (tabel en prijsindicatie gebruiken dezelfde gegevens).
