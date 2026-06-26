"use client";

import { useState } from "react";
import { findings, findingsFilters, type Filter } from "@/lib/content";
import FindingCard from "./FindingCard";

export default function Findings() {
  const [active, setActive] = useState<Filter["value"]>("all");

  const total = findings.length;
  const leverCount = new Set(findings.map((f) => f.category)).size;
  const shown =
    active === "all"
      ? total
      : findings.filter((f) => f.category === active).length;
  const countLabel =
    active === "all"
      ? `${total} takeaways across ${leverCount} levers`
      : `${shown} ${shown === 1 ? "takeaway" : "takeaways"} in this lever`;

  return (
    <section className="section shell" id="takeaways">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Current takeaways</p>
          <h2>The signal, so far.</h2>
        </div>
        <p className="section-note">
          Only actions supported by completed research sessions appear here.
        </p>
      </div>

      <div className="filter-row" role="group" aria-label="Filter takeaways">
        {findingsFilters.map((f) => (
          <button
            key={f.value}
            className={f.value === active ? "filter active" : "filter"}
            type="button"
            data-filter={f.value}
            onClick={() => setActive(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p className="findings-count" aria-live="polite">{countLabel}</p>

      <div className="findings-grid">
        {findings.map((finding) => (
          <FindingCard
            // Keying on the active filter remounts cards on a filter change, so
            // an open "View evidence" disclosure resets instead of leaving a
            // half-empty card stretched in a filtered row.
            key={`${active}:${finding.number}`}
            finding={finding}
            hidden={active !== "all" && finding.category !== active}
          />
        ))}
      </div>
      {active !== "all" && !findings.some((f) => f.category === active) && (
        <p className="empty-note">No completed findings for this lever yet.</p>
      )}
    </section>
  );
}
