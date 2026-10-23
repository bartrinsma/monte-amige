import type { Metadata } from "next";
import { AgendaView } from "@/components/site/AgendaView";
import { occupiedRanges } from "@/lib/bookings";
import { pageMetadata } from "@/lib/site";
import { Breadcrumbs } from "@/components/site/StructuredData";

export const metadata: Metadata = pageMetadata("agenda");

// Altijd de actuele bezetting uit de database tonen.
export const dynamic = "force-dynamic";

export default async function AgendaPage() {
  const ranges = await occupiedRanges();
  return (
    <main id="content" className="site-content site-content--wide">
      <Breadcrumbs page="agenda" name="Agenda" />
      <h1 className="page-title">Agenda</h1>
      <div className="entry-content">
        <p>
          Hieronder zie je wanneer Monte Amigo nog beschikbaar is. Klik op je aankomst- en vertrekdatum; dan kun je ons direct mailen met
          die data om te reserveren.
        </p>
        <AgendaView ranges={ranges} />
      </div>
    </main>
  );
}
