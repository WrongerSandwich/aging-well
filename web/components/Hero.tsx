import { derived } from "@/lib/derived";
import { synthesis } from "@/lib/synthesis";

export default function Hero() {
  // Scope as substance, derived so it can't go stale — not a project-status line.
  const eyebrow = `${derived.totals.leversTotal} levers · ${synthesis.rankedActions.rows.length} ranked actions`;
  return (
    <section className="hero shell">
      <div className="hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>
          Protect what{" "}<br />
          <em>doesn't come back.</em>
        </h1>
        <p className="hero-intro">
          An evidence-tiered review of the few actions that matter most for aging well.
          Built around hard outcomes, irreversibility, and a bias toward doing, not optimizing.
        </p>
        <a className="jump-link" href="#takeaways">
          See current takeaways <span>↓</span>
        </a>
      </div>
      <aside className="principle-card" aria-label="Core research principle">
        <span className="card-index">01 / PRINCIPLE</span>
        <blockquote>"Avoid catastrophic, irreversible errors first."</blockquote>
        <p>
          Bone, neurons, enamel, hearing, vision, and accumulated damage do not fully recover.
          Protecting them outranks polishing the last five percent.
        </p>
        <div className="principle-rule">
          <span>Evidence</span><span>×</span><span>Impact</span><span>×</span><span>Irreversibility</span>
        </div>
      </aside>
    </section>
  );
}
