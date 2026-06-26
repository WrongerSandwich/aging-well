import Link from "next/link";
import { derived } from "@/lib/derived";
import { detail } from "@/lib/detail";
import { statusRows, type StatusRow } from "@/lib/content";

const STATUS_LABEL: Record<string, string> = {
  complete: "Complete",
  "in-progress": "In progress",
  pending: "Pending",
};

function rowClass(row: StatusRow, status?: string): string {
  if (row.active || status === "in-progress") return "lever-row active-row";
  if (status === "complete") return "lever-row complete";
  return "lever-row";
}

export default function StatusSection() {
  const { totals } = derived;
  const pct = Math.round((totals.leversComplete / totals.leversTotal) * 100);
  const allComplete = totals.leversComplete === totals.leversTotal;
  return (
    <section className="section shell" id="status">
      <div className="section-heading status-heading">
        <div>
          <p className="eyebrow">Research status</p>
          <h2>What's done. What isn't.</h2>
        </div>
        <p className="section-note">
          {allComplete
            ? `All ${totals.leversTotal} levers are complete. The actions are ranked by evidence and irreversibility.`
            : "The final ranked list remains intentionally blank until enough levers are complete."}
        </p>
      </div>
      <div
        className="progress-track"
        aria-label={`${totals.leversComplete} of ${totals.leversTotal} research levers complete`}
      >
        <span style={{ width: `${pct}%` }}></span>
      </div>
      <div className="lever-list">
        {statusRows.map((row) => {
          const lever = row.slug ? derived.levers[row.slug] : undefined;
          const note =
            row.note ??
            (lever && lever.claims > 0
              ? `${lever.claims} claims`
              : lever?.status === "in-progress"
                ? "Agent active"
                : "Not yet researched");
          const statusLabel =
            row.statusLabel ?? (lever ? STATUS_LABEL[lever.status] : "Pending");
          return (
            <div key={row.index} className={rowClass(row, lever?.status)}>
              <span>{row.index}</span>
              {row.slug && (detail.levers[row.slug]?.claims.length ?? 0) > 0 ? (
                <strong>
                  <Link href={`/levers/${row.slug}`}>{row.label}</Link>
                </strong>
              ) : (
                <strong>{row.label}</strong>
              )}
              <em>{note}</em>
              <b>{statusLabel}</b>
            </div>
          );
        })}
      </div>
      {allComplete && (
        <Link className="primary-link status-cta" href="/actions">
          See the ranked actions <span>→</span>
        </Link>
      )}
    </section>
  );
}
