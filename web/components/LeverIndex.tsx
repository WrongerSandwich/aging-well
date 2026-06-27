import Link from "next/link";
import type { LeverDetail } from "@/lib/sync/parse";

// The scope text is written to lead with its sub-topics, so its first sentence
// doubles as a one-line "what's in this lever" descriptor for the index.
function topicLine(scope: string): string {
  const stripped = scope.replace(/\*\*/g, "").trim();
  const match = stripped.match(/^(.*?\.)(\s|$)/);
  return (match ? match[1] : stripped).trim();
}

const STATUS_LABEL: Record<string, string> = {
  complete: "Complete",
  "in-progress": "In progress",
  pending: "Not yet researched",
};

// Unordered on purpose: the levers are shown in descending-leverage research
// order (matching the home status list), but this is not a ranking — numbering
// it would re-create the competing-list problem the takeaways teaser just fixed.
export default function LeverIndex({ levers }: { levers: LeverDetail[] }) {
  return (
    <ul className="lever-index">
      {levers.map((lever) => {
        const primary = lever.claims.filter((c) => c.tierGroup === "primary").length;
        const informational = lever.claims.filter(
          (c) => c.tierGroup === "informational",
        ).length;
        return (
          <li key={lever.slug} className="lever-index-item">
            <div className="lever-index-main">
              <h2>
                <Link href={`/levers/${lever.slug}`}>{lever.name}</Link>
              </h2>
              <p className="lever-scope">{topicLine(lever.scope)}</p>
              <p className="lever-counts">
                <span>
                  <b>{primary}</b> to act on
                </span>
                <span>
                  <b>{informational}</b> informational
                </span>
              </p>
            </div>
            <aside className="lever-index-aside">
              {lever.status !== "complete" && (
                <span className={`lever-status status-${lever.status}`}>
                  {STATUS_LABEL[lever.status] ?? lever.status}
                </span>
              )}
              <Link className="lever-index-link" href={`/levers/${lever.slug}`}>
                View research →
              </Link>
            </aside>
          </li>
        );
      })}
    </ul>
  );
}
