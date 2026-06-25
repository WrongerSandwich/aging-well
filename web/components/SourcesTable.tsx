"use client";

import { useState } from "react";
import type { Source } from "@/lib/sync/parse";
import { tierClass, tierText } from "@/lib/tier";

const TIERS = ["all", "T1", "T2", "T3", "T4"] as const;

export default function SourcesTable({ sources }: { sources: Source[] }) {
  const [tier, setTier] = useState<string>("all");
  const visible =
    tier === "all" ? sources : sources.filter((s) => s.tier.startsWith(tier));
  return (
    <div>
      <div className="filter-row" role="group" aria-label="Filter sources by tier">
        {TIERS.map((t) => (
          <button
            key={t}
            type="button"
            className={t === tier ? "filter-chip active" : "filter-chip"}
            aria-pressed={t === tier}
            onClick={() => setTier(t)}
          >
            {t === "all" ? "All" : t}
          </button>
        ))}
      </div>
      <div className="table-scroll">
        <table className="sources-table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Source</th>
              <th scope="col">Tier</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer">{s.citation}</a>
                  ) : (
                    s.citation
                  )}
                </td>
                <td><span className={tierClass(s.tier)}>{tierText(s.tier)}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {visible.length === 0 && (
        <p className="empty-note">No sources at this tier yet.</p>
      )}
    </div>
  );
}
