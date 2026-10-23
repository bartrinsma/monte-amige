/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/rates";
import { BUSINESS } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner footer-grid">
        <div className="footer-brand">
          <Link href="/" className="footer-logo" aria-label="Monte Amigo – naar de homepage">
            <img src="/img/logo.png" alt="Monte Amigo – Vakantiehuis Spanje" width={362} height={266} loading="lazy" />
          </Link>
          <p>
            Luxe vakantieappartement voor 4/5 personen, hoog gelegen in Cumbre del Sol met uitzicht over de bergen en vallei.
          </p>
        </div>

        <div>
          <h2 className="footer-title">Contact</h2>
          <ul className="footer-list">
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </li>
            <li>
              <Link href="/reserveren/">Reserveren</Link>
            </li>
            <li>
              <Link href="/agenda/">Beschikbaarheid bekijken</Link>
            </li>
          </ul>
          <a className="social" href={`mailto:${CONTACT_EMAIL}`} aria-label="Stuur ons een e-mail">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path fill="none" stroke="currentColor" strokeWidth="1.8" d="M3.5 6.5h17v11h-17z" />
              <path fill="none" stroke="currentColor" strokeWidth="1.8" d="m3.5 7 8.5 6.5L20.5 7" />
            </svg>
          </a>
        </div>

        <div>
          <h2 className="footer-title">Locatie</h2>
          <address className="footer-address">
            Monte Amigo
            <br />
            {BUSINESS.streetAddress}
            <br />
            {BUSINESS.postalCode} {BUSINESS.locality} ({BUSINESS.region})
            <br />
            Costa Blanca, Spanje
          </address>
          <ul className="footer-list footer-facts">
            <li>Strand op 2,5 km</li>
            <li>Vliegveld Alicante ± 50 min</li>
            <li>Vliegveld Valencia ± 75 min</li>
          </ul>
          <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer">
            Bekijk op Google Maps ↗
          </a>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="site-footer__inner">
          <p>
            &copy; {new Date().getFullYear()} Monte Amigo &middot; Cumbre del Sol &middot; Licentie verhuur {BUSINESS.license}
          </p>
        </div>
      </div>
    </footer>
  );
}
