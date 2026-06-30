import Link from "next/link";
import { synthesis } from "@/lib/synthesis";
import { PERSONALIZE_GUIDE_URL } from "@/lib/repo";
import RankedTable from "@/components/actions/RankedTable";
import DoNotBother from "@/components/actions/DoNotBother";
import Matrix from "@/components/actions/Matrix";

export const metadata = {
  title: "Ranked actions · Aging Well",
  description: "The evidence-only ranking of actions that matter most for aging well.",
};

export default function ActionsPage() {
  const { rankedActions, matrix } = synthesis;
  return (
    <main className="actions-page shell" id="top" tabIndex={-1}>
      <header className="lever-header">
        <p className="eyebrow">The output artifact</p>
        <h1>Ranked actions</h1>
        <p className="hero-intro">
          Sorted by <strong>Evidence-only</strong> = Impact × Certainty × Irreversibility
          (max 75). The personal Tractability factor is deliberately excluded, so apply it
          yourself.
        </p>
      </header>

      <section className="actions-section">
        <h2>The ranking</h2>
        <dl className="score-legend" aria-label="How the score is built">
          <div>
            <dt>Impact</dt>
            <dd>How much it moves a hard outcome. Scored 1 to 5.</dd>
          </div>
          <div>
            <dt>Certainty</dt>
            <dd>Strength of the evidence behind it. Scored 1 to 5.</dd>
          </div>
          <div>
            <dt>Rev</dt>
            <dd>Irreversibility: how permanent the damage it prevents. Scored 1 to 3.</dd>
          </div>
          <div>
            <dt>Evidence-only</dt>
            <dd>Impact × Certainty × Rev, so the ceiling is 5 × 5 × 3 = 75.</dd>
          </div>
        </dl>
        <p className="claims-note">
          Each lever links through to that lever&rsquo;s &ldquo;act on these&rdquo;
          evidence — the claims behind the score.
        </p>
        <RankedTable rows={rankedActions.rows} />
      </section>

      <section className="actions-section">
        <h2>Do NOT bother / actively avoid</h2>
        <p className="claims-note">Scored low or reversed; listed so they don’t creep back in.</p>
        <DoNotBother items={rankedActions.doNotBother} />
      </section>

      <section className="actions-section">
        <h2>Lever × system matrix</h2>
        <p className="claims-note">
          Intervention value (does acting on this lever help the system?), not just association.
        </p>
        <ul className="matrix-legend" aria-label="Matrix symbol key">
          <li><span className="legend-glyph cell-strong" aria-hidden="true">●</span> Strong</li>
          <li><span className="legend-glyph cell-moderate" aria-hidden="true">◐</span> Moderate</li>
          <li><span className="legend-glyph cell-minor" aria-hidden="true">○</span> Minor</li>
          <li><span className="legend-glyph legend-none" aria-hidden="true">·</span> None</li>
        </ul>
        <Matrix matrix={matrix} />
      </section>

      <section className="actions-section personalize-callout">
        <h2>Make it yours</h2>
        <p>
          This ranking is universal. To turn it into your do-this-first list, add the one
          personal factor — how realistically you’ll sustain each action — and resolve the
          conditional rows against your own profile. The fastest way is to clone the
          repository and walk through it with a coding agent (Claude Code or similar): point
          it at the ranking, the scoring rubric, and the copy-and-fill templates, and have it
          draft your overlay. Everything stays on your machine — your profile and Tractability
          scores are gitignored and never published.
        </p>
        <div className="callout-actions">
          <a
            className="primary-link"
            href={PERSONALIZE_GUIDE_URL}
            target="_blank"
            rel="noreferrer"
          >
            Open the personalization guide <span aria-hidden="true">↗</span>
          </a>
          <Link className="callout-secondary" href="/">← Back to overview</Link>
        </div>
      </section>
    </main>
  );
}
