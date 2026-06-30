import Link from "next/link";
import { synthesis } from "@/lib/synthesis";

export default function Findings() {
  const { rows } = synthesis.rankedActions;
  const top5 = rows.slice(0, 5);
  return (
    <section className="section shell" id="takeaways">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Top 5 ranked actions</p>
          <h2>The signal, so far.</h2>
        </div>
        <p className="section-note">
          Sorted by{" "}
          <Link href="/actions" className="section-note-link">Evidence-only score</Link>{" "}
          (Impact × Certainty × Irreversibility).{" "}
          {rows.length} total actions ranked.
        </p>
      </div>

      <div className="takeaways-summary">
        <ol className="top-actions-list">
          {top5.map((r) => (
            <li key={r.rank}>
              <span className="top-actions-rank">{r.rank}</span>
              <span className="top-actions-text">{r.action}</span>
              <span className="top-actions-cond" aria-label={r.conditional ? "conditional" : undefined}>
                {r.conditional ? "cond." : ""}
              </span>
              <Link
                href={r.claimRef ? `/levers/${r.claimRef.slug}#claim-${r.claimRef.slug}-${r.claimRef.claimNum}` : `/levers/${r.slug}#claims`}
                className="top-actions-lever"
                title={`See the evidence behind this score on the ${r.lever} lever`}
              >
                {r.lever}
              </Link>
            </li>
          ))}
        </ol>
      </div>

      <p className="takeaways-caveat">
        General guidance from the evidence, not medical advice.
      </p>

      <Link className="primary-link status-cta" href="/actions">
        See all {rows.length} ranked actions <span>→</span>
      </Link>
    </section>
  );
}
