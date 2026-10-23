import type { Metadata } from "next";

/**
 * Centrale gegevens per pagina: titel, meta-description, canonical-pad en foto's.
 * Gebruikt door de metadata van elke pagina én door sitemap.xml, zodat ze altijd overeenkomen.
 */

/** Productiedomein. Canonicals, Open Graph, robots.txt en de sitemap verwijzen hiernaar. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://monte-amigo.nl").replace(/\/+$/, "");
export const SITE_NAME = "Monte Amigo";

export interface Photo {
  src: string;
  alt: string;
  wide?: boolean;
}

export const OVER_ONS_PHOTOS: Photo[] = [
  ["terras-1", "Overdekt terras met loungebank en uitzicht op de bergen"],
  ["terras-2", "Terras met loungebank en buffetkast"],
  ["balkon", "Balkon met ligstoelen en uitzicht over de vallei"],
  ["terras-3", "Terras met loungebank naast de schuifpui"],
  ["woonkamer", "Woon- en eetkamer met doorkijk naar het terras"],
  ["woonkamer-2", "Zithoek met tv en open keuken"],
  ["keuken", "Compleet ingerichte keuken"],
  ["stapelbed-1", "Slaapkamer met stapelbed"],
  ["stapelbed-2", "Slaapkamer met stapelbed en ladekast"],
  ["badkamer", "Badkamer met douche"],
  ["slaapkamer-1", "Slaapkamer met tweepersoonsbed en balkondeur"],
  ["slaapkamer-2", "Slaapkamer met tweepersoonsbed"],
  ["slaapkamer-3", "Slaapkamer met tweepersoonsbed en ladekast"],
  ["zwembad-1", "Zwembad met uitzicht over de bergen"],
  ["cumbre-del-sol-luchtfoto", "Cumbre del Sol van bovenaf met zee en kust"],
  ["zwembad-vallei", "Zwembad met uitzicht over de vallei"],
  ["rotsboog", "Rotsboog aan de kust"],
  ["strand-kinderen", "Spelende kinderen op het strand"],
  ["speeltuin", "Speeltuin in de buurt"],
  ["appartement-buiten", "Buitenkant van het appartement met parkeerplaats voor de deur"],
].map(([n, alt]) => ({ src: `/img/${n}.jpg`, alt, wide: n === "appartement-buiten" }));

export const OMGEVING_PHOTOS: Photo[] = [
  { src: "/img/strand-moraira.jpg", alt: "Strand bij Moraira met zicht op de kaap" },
  { src: "/img/zeilboten.jpg", alt: "Zeilboten voor de kust" },
  { src: "/img/suppen.jpg", alt: "Suppen op zee bij zonsondergang" },
  { src: "/img/wandelpad-kust.jpg", alt: "Wandelpad langs de kust" },
  { src: "/img/rotsboog.jpg", alt: "Rotsboog aan de kust" },
  { src: "/img/strand-kinderen.jpg", alt: "Spelende kinderen op het strand" },
];

export type PageKey = "home" | "overOns" | "tarieven" | "agenda" | "reserveren" | "recensies" | "omgeving";

export interface PageInfo {
  /** Altijd met slash aan het eind. */
  path: string;
  title: string;
  description: string;
  /** Hoofdfoto voor Open Graph (delen op WhatsApp, Facebook, …). */
  image: string;
  /** Alle foto's op de pagina, voor de image-sitemap. */
  images: string[];
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
  /** Laatste inhoudelijke wijziging (JJJJ-MM-DD); pagina's uit de database berekenen dit zelf. */
  updated: string;
}

export const PAGES: Record<PageKey, PageInfo> = {
  home: {
    path: "/",
    title: "Monte Amigo | Vakantieappartement in Cumbre del Sol, Spanje",
    description:
      "Vakantiehuis in Cumbre del Sol huren? Luxe appartement voor 4/5 personen aan de Costa Blanca met uitzicht over de bergen, 3 zwembaden en het strand op 2,5 km.",
    image: "/img/hero-cliff.jpg",
    images: ["/img/hero-cliff.jpg", "/img/logo.png", "/img/cumbre-del-sol.jpg"],
    changeFrequency: "monthly",
    priority: 1,
    updated: "2026-10-23",
  },
  overOns: {
    path: "/over-ons/",
    title: "Het appartement: foto's en indeling | Monte Amigo",
    description:
      "Bekijk foto's van ons gerenoveerde vakantieappartement in Cumbre del Sol: 2 slaapkamers, complete keuken, terras met uitzicht, airco, wifi en zwembaden.",
    image: "/img/balkon-uitzicht.jpg",
    images: ["/img/balkon-uitzicht.jpg", ...OVER_ONS_PHOTOS.map((p) => p.src)],
    changeFrequency: "monthly",
    priority: 0.9,
    updated: "2026-10-23",
  },
  tarieven: {
    path: "/tarieven/",
    title: "Tarieven per week en per nacht | Monte Amigo",
    description:
      "Wat kost een vakantieappartement in Cumbre del Sol? Monte Amigo vanaf €95 per nacht of €665 per week, minimaal 2 nachten. Bekijk alle prijzen per maand.",
    image: "/img/banner-palmen.jpg",
    images: ["/img/banner-palmen.jpg"],
    changeFrequency: "monthly",
    priority: 0.8,
    updated: "2026-10-23",
  },
  agenda: {
    path: "/agenda/",
    title: "Agenda & beschikbaarheid | Monte Amigo, Cumbre del Sol",
    description:
      "Beschikbaarheid van ons vakantieappartement in Spanje: bekijk in de agenda wanneer Monte Amigo in Cumbre del Sol vrij is en mail direct je gewenste data.",
    image: "/img/hero-cliff.jpg",
    images: [],
    changeFrequency: "daily",
    priority: 0.8,
    updated: "2026-10-23",
  },
  reserveren: {
    path: "/reserveren/",
    title: "Reserveren | Monte Amigo, Cumbre del Sol",
    description:
      "Vakantieappartement in Cumbre del Sol boeken? Mail rentalmonteamigo@gmail.com met het aantal personen en je data; wij bevestigen je reservering snel.",
    image: "/img/zee-baai.jpg",
    images: ["/img/zee-baai.jpg"],
    changeFrequency: "yearly",
    priority: 0.7,
    updated: "2026-10-23",
  },
  recensies: {
    path: "/recensies/",
    title: "Recensies en ervaringen van gasten | Monte Amigo",
    description:
      "Ervaringen van gasten met vakantieappartement Monte Amigo in Cumbre del Sol: lovende recensies over het uitzicht, het complete appartement en de gastvrijheid.",
    image: "/img/terras-1.jpg",
    images: [],
    changeFrequency: "weekly",
    priority: 0.7,
    updated: "2026-10-23",
  },
  omgeving: {
    path: "/omgeving/",
    title: "Wat te doen rond Cumbre del Sol en Moraira | Monte Amigo",
    description:
      "Wat te doen bij Cumbre del Sol aan de Costa Blanca? Tips voor de stranden van Moraira, kustwandelingen, suppen, golf, fietsen en uitjes met kinderen.",
    image: "/img/strand-moraira.jpg",
    images: ["/img/moraira.jpg", ...OMGEVING_PHOTOS.map((p) => p.src)],
    changeFrequency: "monthly",
    priority: 0.6,
    updated: "2026-10-23",
  },
};

/** Volledige metadata voor een pagina: titel, description, self-referencing canonical en Open Graph. */
export function pageMetadata(key: PageKey): Metadata {
  const p = PAGES[key];
  return {
    title: { absolute: p.title },
    description: p.description,
    alternates: { canonical: `${SITE_URL}${p.path}` },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
    twitter: { card: "summary_large_image", title: p.title, description: p.description, images: [`${SITE_URL}${p.image}`] },
    openGraph: {
      type: "website",
      locale: "nl_NL",
      siteName: SITE_NAME,
      url: `${SITE_URL}${p.path}`,
      title: p.title,
      description: p.description,
      images: [{ url: `${SITE_URL}${p.image}` }],
    },
  };
}

/** Vaste gegevens voor Schema.org en de footer. */
export const BUSINESS = {
  email: "rentalmonteamigo@gmail.com",
  license: "VT470686A",
  streetAddress: "Urbanisatie Cumbre del Sol",
  locality: "Benitachell",
  postalCode: "03726",
  region: "Alicante",
  country: "ES",
  // Globale ligging van Cumbre del Sol; vervang door de exacte coördinaten van het appartement indien gewenst.
  latitude: 38.7167,
  longitude: 0.15,
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Cumbre+del+Sol%2C+Benitachell%2C+Spanje",
};
