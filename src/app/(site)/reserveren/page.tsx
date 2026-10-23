/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, reservationMailto } from "@/lib/rates";
import { pageMetadata } from "@/lib/site";
import { Breadcrumbs } from "@/components/site/StructuredData";

export const metadata: Metadata = pageMetadata("reserveren");

export default function ReserverenPage() {
  return (
    <main id="content" className="site-content">
      <Breadcrumbs page="reserveren" name="Reserveren" />
      <h1 className="page-title">Reserveren</h1>
      <div className="entry-content">
        <p>
          Wil jij zeker zijn van jouw heerlijke vakantie bij ons in Monte Amigo? Stuur dan een e-mail naar{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> en geef aan <strong>met hoeveel personen</strong> je komt en{" "}
          <strong>welke data</strong> (aankomst en vertrek) je wilt verblijven. Wij bevestigen jouw reservering zo snel mogelijk. Wij
          hopen je snel te verwelkomen!
        </p>

        <p>
          <a className="btn" href={reservationMailto()}>
            Mail naar {CONTACT_EMAIL}
          </a>
        </p>

        <p>
          Bekijk eerst de <Link href="/agenda/">agenda</Link> om te zien wanneer Monte Amigo beschikbaar is, en de{" "}
          <Link href="/tarieven/">tarieven</Link>.
        </p>

        <p>
          Ps. Wij zijn verplicht uw gegevens te registreren bij de Spaanse overheid. Daarvoor vragen wij van elke gast de naam,
          geboortedatum, nationaliteit, huisadres en paspoort/id-nummer.
        </p>

        <figure className="after-form">
          <img
            src="/img/zee-baai.jpg"
            alt="Heldere blauwe baai met zeilboten aan de Costa Blanca"
            width={871}
            height={652}
            loading="lazy"
          />
        </figure>
      </div>
    </main>
  );
}
