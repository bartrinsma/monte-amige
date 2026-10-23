/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Gallery } from "@/components/site/Gallery";
import { OVER_ONS_PHOTOS, pageMetadata } from "@/lib/site";
import { Breadcrumbs } from "@/components/site/StructuredData";

export const metadata: Metadata = pageMetadata("overOns");

export default function OverOnsPage() {
  return (
    <main id="content" className="site-content">
      <Breadcrumbs page="overOns" name="Over ons" />
      <figure className="featured-image">
        <img
          src="/img/balkon-uitzicht.jpg"
          alt="Balkon met ligstoelen en zonnig uitzicht over de bergen"
          width={1008}
          height={752}
        />
      </figure>
      <h1 className="page-title">Vakantiehuis</h1>
      <div className="entry-content">
        <p>
          Ons luxe, compleet gerenoveerde, 4/5 persoonsappartement (verhuurlicentie VT470686A) is voorzien van alle comfort en gemak.
          Een compleet ingerichte keuken (koelkast, afwasmachine, magnetron, koffieapparaten, oven, elektrisch fornuis, waterkoker etc.
          etc), modern ingerichte woon-/eetkamer, deels overdekt terras met een heerlijke loungebank en de mogelijkheid buiten te eten,
          twee slaapkamers (1x met 2 persoonsbed en 1x met stapelbed en 1 persoonsbed) en een complete badkamer met douche. Er is
          airconditioning (koud/warm) in de gehele woning, draadloos (glasvezel)internet en een Chromecast zodat je al je favorieten
          kunt streamen. Het appartement is ook ingericht op (kleine) kinderen. Zo is er een kinderbedje, een kinderstoel, serviesgoed
          en bestek voor kinderen. Het appartement ligt op de hoogste woonlaag maar op straatniveau. Dus geen lift nodig of onnodig
          veel trappen lopen! Parkeren kan voor de deur.
        </p>

        <p>
          Het dichtsbijzijnde strand is op 2,5 km en drie prachtige zwembaden om de hoek. Het strand en de zwembaden zijn zeer
          geschikt voor kinderen.
        </p>

        <p>
          Het vliegveld van Valencia ligt op +- 75 minuten en het vliegveld van Alicante op +- 50 minuten rijden van Moraira. We
          adviseren je wel om een auto te huren.
        </p>

        <Gallery photos={OVER_ONS_PHOTOS} />
      </div>
    </main>
  );
}
