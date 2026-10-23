"use client";

import { useState } from "react";
import { AvailabilityCalendar } from "./AvailabilityCalendar";
import { nightsBetween, niceDate, type Range } from "@/lib/dates";
import { reservationMailto } from "@/lib/rates";

export function AgendaView({ ranges }: { ranges: Range[] }) {
  const [sel, setSel] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });
  const { start, end } = sel;

  return (
    <>
      <AvailabilityCalendar ranges={ranges} months={12} start={start} end={end} onSelect={(s, e) => setSel({ start: s, end: e })} />
      {start && end && (
        <p>
          <a className="btn" href={reservationMailto(niceDate(start), niceDate(end))}>
            Mail ons voor {nightsBetween(start, end)} nachten vanaf{" "}
            {start.toLocaleDateString("nl-NL", { day: "numeric", month: "long" })}
          </a>
        </p>
      )}
    </>
  );
}
