import { detail } from "@/lib/detail";
import { statusRows } from "@/lib/content";
import type { LeverDetail } from "@/lib/sync/parse";
import LeverIndex from "@/components/LeverIndex";

export const metadata = {
  title: "Levers · Aging Well",
  description:
    "The research is organized by lever, not by organ system. Browse all eight levers and the claims behind them.",
};

export default function LeversPage() {
  // statusRows holds the canonical descending-leverage order (and is the same
  // order the home status list uses); resolve each to its full detail record.
  const levers = statusRows
    .map((row) => (row.slug ? detail.levers[row.slug] : undefined))
    .filter((lever): lever is LeverDetail => Boolean(lever));

  return (
    <main className="levers-page shell" id="top" tabIndex={-1}>
      <header className="lever-header">
        <p className="eyebrow">Research, by lever</p>
        <h1>Levers</h1>
        <p className="hero-intro">
          The research is organized by lever, not by organ system. The
          highest-leverage actions cut across every system, so studying them by
          lever avoids rediscovering the same finding under five different organs.
          Each lever is one focused research session; the ranking is assembled
          from all of them.
        </p>
      </header>
      <LeverIndex levers={levers} />
    </main>
  );
}
