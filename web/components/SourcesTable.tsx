"use client";

import { useMemo, useState } from "react";
import type { Source } from "@/lib/sync/parse";
import { tierClass, tierText } from "@/lib/tier";

const TIERS = ["all", "T1", "T2", "T3", "T4"] as const;

// Citations are free text with the year embedded (e.g. "NEJM 2013;368:341").
// Pull the first plausible publication year for year-sorting; ~18% of sources
// carry no parseable year and sort to the end regardless of direction.
function citationYear(citation: string): number | null {
  const m = citation.match(/\b(?:19|20)\d{2}\b/);
  return m ? Number(m[0]) : null;
}

type SortKey = "id" | "source" | "tier" | "year";
type SortDir = "asc" | "desc";
// Sort-as-clicked direction for a freshly activated key. Year defaults to
// newest-first since that's the usual intent for a dateless control.
const DEFAULT_DIR: Record<SortKey, SortDir> = {
  id: "asc",
  source: "asc",
  tier: "asc",
  year: "desc",
};

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "source", label: "Source" },
  { key: "tier", label: "Tier" },
];

export default function SourcesTable({ sources }: { sources: Source[] }) {
  const [tier, setTier] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir }>({
    key: "id",
    dir: "asc",
  });

  function toggleSort(key: SortKey) {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: DEFAULT_DIR[key] },
    );
  }

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = sources.filter((s) => {
      if (tier !== "all" && !s.tier.startsWith(tier)) return false;
      if (q && !`${s.id} ${s.citation}`.toLowerCase().includes(q)) return false;
      return true;
    });
    const factor = sort.dir === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      if (sort.key === "year") {
        const ay = citationYear(a.citation);
        const by = citationYear(b.citation);
        // Missing years always sink to the bottom, both directions.
        if (ay === null && by === null) return a.id.localeCompare(b.id);
        if (ay === null) return 1;
        if (by === null) return -1;
        return (ay - by) * factor || a.id.localeCompare(b.id);
      }
      const av =
        sort.key === "id" ? a.id : sort.key === "tier" ? a.tier : a.citation;
      const bv =
        sort.key === "id" ? b.id : sort.key === "tier" ? b.tier : b.citation;
      return av.localeCompare(bv, undefined, { sensitivity: "base" }) * factor;
    });
  }, [sources, tier, query, sort]);

  const yearActive = sort.key === "year";
  const ariaSort = (key: SortKey): "ascending" | "descending" | "none" =>
    sort.key === key
      ? sort.dir === "asc"
        ? "ascending"
        : "descending"
      : "none";

  return (
    <div>
      <div className="sources-controls">
        <label className="source-search">
          <span className="sr-only">Search sources</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, author, publication, year…"
            autoComplete="off"
            spellCheck={false}
          />
        </label>
        <button
          type="button"
          className={yearActive ? "sort-toggle active" : "sort-toggle"}
          aria-pressed={yearActive}
          onClick={() => toggleSort("year")}
        >
          Year
          <span aria-hidden="true" className="sort-glyph">
            {yearActive ? (sort.dir === "asc" ? "▲" : "▼") : "↕"}
          </span>
        </button>
      </div>

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

      <p className="source-count" aria-live="polite">
        {visible.length} {visible.length === 1 ? "source" : "sources"}
      </p>

      <div className="table-scroll">
        <table className="sources-table">
          <thead>
            <tr>
              {COLUMNS.map((col) => (
                <th key={col.key} scope="col" aria-sort={ariaSort(col.key)}>
                  <button
                    type="button"
                    className="col-sort"
                    onClick={() => toggleSort(col.key)}
                  >
                    {col.label}
                    <span aria-hidden="true" className="sort-glyph">
                      {sort.key === col.key
                        ? sort.dir === "asc"
                          ? "▲"
                          : "▼"
                        : "↕"}
                    </span>
                  </button>
                </th>
              ))}
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
        <p className="empty-note">
          {query.trim()
            ? "No sources match your search."
            : "No sources at this tier yet."}
        </p>
      )}
    </div>
  );
}
