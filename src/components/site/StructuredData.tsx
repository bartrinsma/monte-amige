import { RATES } from "@/lib/rates";
import { BUSINESS, PAGES, SITE_NAME, SITE_URL, type PageKey } from "@/lib/site";

/** JSON-LD veilig in een <script> zetten (geen "</script>" in de inhoud). */
function JsonLd({ data }: { data: object }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
  );
}

const nightly = RATES.map((r) => r.night);
const amenity = (name: string) => ({ "@type": "LocationFeatureSpecification", name, value: true });

/** Website + accommodatie; staat op elke pagina van de site. */
export function SiteStructuredData() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            url: `${SITE_URL}/`,
            name: SITE_NAME,
            inLanguage: "nl-NL",
            publisher: { "@id": `${SITE_URL}/#lodging` },
          },
          {
            "@type": "LodgingBusiness",
            "@id": `${SITE_URL}/#lodging`,
            name: SITE_NAME,
            description:
              "Luxe vakantieappartement voor 4/5 personen, hoog gelegen in Cumbre del Sol aan de Costa Blanca, met uitzicht over de bergen en vallei.",
            url: `${SITE_URL}/`,
            email: BUSINESS.email,
            logo: `${SITE_URL}/img/logo.png`,
            image: [`${SITE_URL}/img/hero-cliff.jpg`, `${SITE_URL}/img/balkon-uitzicht.jpg`, `${SITE_URL}/img/terras-1.jpg`],
            address: {
              "@type": "PostalAddress",
              streetAddress: BUSINESS.streetAddress,
              addressLocality: BUSINESS.locality,
              postalCode: BUSINESS.postalCode,
              addressRegion: BUSINESS.region,
              addressCountry: BUSINESS.country,
            },
            geo: { "@type": "GeoCoordinates", latitude: BUSINESS.latitude, longitude: BUSINESS.longitude },
            hasMap: BUSINESS.mapsUrl,
            priceRange: `€${Math.min(...nightly)} - €${Math.max(...nightly)} per nacht`,
            currenciesAccepted: "EUR",
            numberOfRooms: 2,
            identifier: { "@type": "PropertyValue", name: "Licentie verhuur", value: BUSINESS.license },
            amenityFeature: [
              "Airconditioning (koud/warm)",
              "Wifi (glasvezel)",
              "Chromecast",
              "Volledig ingerichte keuken",
              "Vaatwasser",
              "Overdekt terras met uitzicht",
              "Gemeenschappelijke zwembaden",
              "Parkeren voor de deur",
              "Kinderbedje en kinderstoel",
            ].map(amenity),
            containsPlace: {
              "@type": "Apartment",
              name: `${SITE_NAME} – vakantieappartement`,
              numberOfRooms: 2,
              numberOfBedrooms: 2,
              numberOfBathroomsTotal: 1,
              occupancy: { "@type": "QuantitativeValue", minValue: 1, maxValue: 5 },
              floorLevel: "Hoogste woonlaag, op straatniveau",
            },
          },
        ],
      }}
    />
  );
}

/** Kruimelpad voor een subpagina (Home › pagina). */
export function Breadcrumbs({ page, name }: { page: PageKey; name: string }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name, item: `${SITE_URL}${PAGES[page].path}` },
        ],
      }}
    />
  );
}
