"use client";

import Script from "next/script";
import { useState, useSyncExternalStore } from "react";

const KEY = "ma-cookie-consent";
const noSubscribe = () => () => {};

function readConsent(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

/**
 * Google Analytics 4 met Consent Mode: standaard staat opslag uit (geen cookies);
 * pas na "Accepteren" mag Analytics cookies plaatsen. De keuze wordt in de browser onthouden.
 */
export function Analytics({ id }: { id: string }) {
  // Opgeslagen keuze pas in de browser lezen (op de server: undefined = melding nog niet tonen).
  const stored = useSyncExternalStore(noSubscribe, readConsent, () => undefined);
  const [decided, setDecided] = useState<string | null>(null);
  const choice = decided ?? stored;

  function decide(value: "granted" | "denied") {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      // Private modus e.d.: dan alleen voor dit bezoek.
    }
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    w.gtag?.("consent", "update", { analytics_storage: value });
    setDecided(value);
  }

  return (
    <>
      <Script id="ga-consent" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});
try{if(localStorage.getItem(${JSON.stringify(KEY)})==='granted')gtag('consent','update',{analytics_storage:'granted'});}catch(e){}
gtag('js',new Date());gtag('config',${JSON.stringify(id)});`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`} strategy="afterInteractive" />

      {choice === null && (
        <div className="cookie-bar" role="dialog" aria-label="Cookies">
          <p>
            Wij gebruiken analytische cookies van Google om te zien hoe onze website wordt gebruikt. Vind je dat goed?
          </p>
          <div className="cookie-actions">
            <button type="button" className="cookie-btn ghost" onClick={() => decide("denied")}>
              Weigeren
            </button>
            <button type="button" className="cookie-btn" onClick={() => decide("granted")}>
              Accepteren
            </button>
          </div>
        </div>
      )}
    </>
  );
}
