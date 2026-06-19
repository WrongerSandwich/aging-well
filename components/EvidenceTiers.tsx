import { tiers } from "@/lib/content";

export default function EvidenceTiers() {
  return (
    <section className="evidence-section" id="evidence">
      <div className="shell evidence-layout">
        <div className="evidence-intro">
          <p className="eyebrow light">How to read this</p>
          <h2>
            Evidence is not<br />a level playing field.
          </h2>
          <p>
            Every claim is tagged. Mechanism and hype can inform questions, but they do not
            enter the action ranking.
          </p>
        </div>
        <div className="tier-list">
          {tiers.map((t) => (
            <div key={t.id} className={t.dim ? "tier-row dim" : "tier-row"}>
              <strong>{t.id}</strong>
              <span>{t.verdict}</span>
              <p>{t.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
