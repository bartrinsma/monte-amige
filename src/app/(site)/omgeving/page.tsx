/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Gallery } from "@/components/site/Gallery";
import { OMGEVING_PHOTOS, pageMetadata } from "@/lib/site";
import { Breadcrumbs } from "@/components/site/StructuredData";

export const metadata: Metadata = pageMetadata("omgeving");

export default function OmgevingPage() {
  return (
    <main id="content" className="site-content">
      <Breadcrumbs page="omgeving" name="Omgeving" />
      <h1 className="page-title">Wat te doen in de omgeving?</h1>
      <div className="entry-content">
        <p>
          Cumbre del Sol, een mooie urbanisatie, aan de oostkust van Spanje is gelegen in de groenrijke, bergachtige regio Marina
          Alta, tussen Denia en Altea.
        </p>
        <p>
          In de omgeving van ons appartement Monte Amigo zijn er voor jong en oud tal van leuke activiteiten te doen, gezellige dorpen
          en steden te bezoeken en te genieten van de prachtige natuur. Je kan bijvoorbeeld naar Alicante of Valencia. Mooie stranden
          bezoeken rondom Cumbre del Sol of Moraira, gezellige bergdorpjes bekijken, toeristische attracties bezoeken of
          natuurwandelingen maken in de omgeving.
        </p>
        <p>
          Met kinderen zijn er ook genoeg leuke dingen te doen, variërend van een bezoek aan een dierentuin of een attractiepark tot
          aan avonturenpark Palmeral Aventuras of themapark Terra Mítica. En natuurlijk niet te vergeten lekker spelen op het strand,
          bij het zwembad of in 1 van de speeltuintjes in de omgeving.
        </p>

        <h3>Moraira</h3>
        <figure className="inline-photo">
          <img src="/img/moraira.jpg" alt="Letters MORAIRA aan de kust" width={768} height={576} loading="lazy" />
        </figure>
        <p>
          Op korte rijafstand ligt het charmante stadje Moraira, bekend om zijn traditionele Spaanse architectuur, ongerepte stranden
          en verrassende restaurants. Of je nu wilt genieten van de zon op het strand, een duik wilt nemen in de azuurblauwe zee,
          gezellig wilt shoppen of wilt genieten van de lokale keuken, dit is een uitgelezen kans om dit prachtige stadje te
          ontdekken.
        </p>
        <p>
          Voor de sportievere vakantieganger is er ook genoeg te doen! Wat te denken van het bezoeken van prachtige golfbanen in de
          buurt, een waterscooter huren, met de racefiets een prachtige tocht maken door de bergen of de vele wandelpaden in de
          omgeving verkennen?
        </p>

        <Gallery photos={OMGEVING_PHOTOS} />
      </div>
    </main>
  );
}
