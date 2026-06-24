import { derived } from "@/lib/derived";
import { metricsStatic } from "@/lib/content";

export default function Metrics() {
  const { totals } = derived;
  return (
    <section className="metrics" aria-label="Research summary">
      <div className="shell metrics-grid">
        <div>
          <strong>
            {totals.leversComplete}
            <span>/{totals.leversTotal}</span>
          </strong>
          <p>Levers researched</p>
        </div>
        <div>
          <strong>{totals.sourcesTotal}</strong>
          <p>Sources tracked</p>
        </div>
        <div>
          <strong>{totals.claimsTotal}</strong>
          <p>Claims cataloged</p>
        </div>
        {metricsStatic.map((m) => (
          <div key={m.label}>
            <strong>{m.value}</strong>
            <p>{m.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
