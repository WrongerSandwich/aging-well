import Link from "next/link";
import type { LeverDetail, Source } from "@/lib/sync/parse";
import ClaimCard from "./ClaimCard";
import ProseSection from "./ProseSection";

const STATUS_LABEL: Record<string, string> = {
  complete: "Complete",
  "in-progress": "In progress",
  pending: "Not yet researched",
};

export default function LeverDetailView({
  lever,
  sources,
}: {
  lever: LeverDetail;
  sources: Record<string, Source>;
}) {
  const primary = lever.claims.filter((c) => c.tierGroup === "primary");
  const informational = lever.claims.filter((c) => c.tierGroup === "informational");

  return (
    <main className="lever-page shell" id="top">
      <Link className="lever-back" href="/#status">
        ← All levers
      </Link>

      <header className="lever-header">
        <p className="eyebrow">Research lever</p>
        <h1>{lever.name}</h1>
        <span className={`lever-status status-${lever.status}`}>
          {STATUS_LABEL[lever.status] ?? lever.status}
        </span>
      </header>

      <ProseSection title="Scope" body={lever.scope} />

      {lever.claims.length === 0 ? (
        <p className="lever-empty">No claims researched yet for this lever.</p>
      ) : (
        <>
          <section className="claims-section">
            <h2>Claims · act on these</h2>
            <p className="claims-note">
              T1–T2 evidence: large cohorts, RCTs, and meta-analyses with hard outcomes.
            </p>
            <div className="claims-list">
              {primary.map((c) => (
                <ClaimCard key={c.number} claim={c} sources={sources} />
              ))}
            </div>
          </section>

          {informational.length > 0 && (
            <section className="claims-section informational">
              <h2>Informational only</h2>
              <p className="claims-note">
                T3–T4 evidence: mechanistic, small, conflicting, or speculative — does not enter the ranking.
              </p>
              <div className="claims-list">
                {informational.map((c) => (
                  <ClaimCard key={c.number} claim={c} sources={sources} />
                ))}
              </div>
            </section>
          )}
        </>
      )}

      <ProseSection title="Dose & threshold" body={lever.dose} />
      <ProseSection title="Actions" body={lever.actions} />
      <ProseSection title="Caveats & population modifiers" body={lever.caveats} />
      <ProseSection title="Open questions" body={lever.openQuestions} />
    </main>
  );
}
