"use client";

import { useState } from "react";
import Link from "next/link";
import type { Finding } from "@/lib/content";
import { tierClass as baseTierClass } from "@/lib/tier";

function tierClass(f: Finding): string {
  return [baseTierClass(f.tierLabel), f.tierModifier === "inverse" ? "inverse" : ""]
    .filter(Boolean)
    .join(" ");
}

export default function FindingCard({ finding, hidden }: { finding: Finding; hidden: boolean }) {
  const [open, setOpen] = useState(false);
  const cardClass = [
    "finding",
    finding.cardModifier ?? "",
    open ? "open" : "",
    hidden ? "hidden" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={cardClass} data-category={finding.category}>
      <div className="finding-top">
        <span className={tierClass(finding)}>{finding.tierLabel}</span>
        <Link className="lever" href={`/levers/${finding.category}`}>
          {finding.lever}
        </Link>
      </div>
      <p className="finding-number">{finding.number}</p>
      <h3>
        {finding.titleLines.map((line, i) => (
          <span key={i}>
            {line}
            {i < finding.titleLines.length - 1 ? <br /> : null}
          </span>
        ))}
      </h3>
      <p className="finding-summary">{finding.summary}</p>
      {finding.stat ? (
        <div className="stat-line">
          <strong>{finding.stat.value}</strong>
          <span>
            {finding.stat.labelLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < finding.stat!.labelLines.length - 1 ? <br /> : null}
              </span>
            ))}
          </span>
        </div>
      ) : null}
      {finding.detail ? (
        <>
          <button
            className="detail-toggle"
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Hide evidence " : "View evidence "}
            <span>+</span>
          </button>
          <div className="finding-detail">
            <p>{finding.detail.body}</p>
            <small>{finding.detail.source}</small>
          </div>
        </>
      ) : null}
    </article>
  );
}
