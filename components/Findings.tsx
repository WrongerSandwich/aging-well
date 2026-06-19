"use client";

import { useState } from "react";
import { findings, findingsFilters, type Filter } from "@/lib/content";
import FindingCard from "./FindingCard";

export default function Findings() {
  const [active, setActive] = useState<Filter["value"]>("all");

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

      <div className="findings-grid">
        {findings.map((finding) => (
          <FindingCard
            key={finding.number}
            finding={finding}
            hidden={active !== "all" && finding.category !== active}
          />
        ))}
      </div>
    </section>
  );
}
