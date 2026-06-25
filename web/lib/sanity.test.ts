import { describe, it, expect } from "vitest";
import { synthesis } from "./synthesis";
import { sources } from "./sources";
import { derived } from "./derived";

const KNOWN_SLUGS = new Set(Object.keys(derived.levers));

describe("synthesis integrity", () => {
  it("every ranked action maps to a known lever slug", () => {
    for (const row of synthesis.rankedActions.rows) {
      expect(KNOWN_SLUGS.has(row.slug), `${row.lever} → ${row.slug}`).toBe(true);
    }
  });
  it("every matrix row maps to a known lever slug", () => {
    for (const row of synthesis.matrix.rows) {
      expect(KNOWN_SLUGS.has(row.slug), `${row.lever} → ${row.slug}`).toBe(true);
    }
  });
  it("the global sources index matches the homepage metric", () => {
    expect(sources.sources.length).toBe(derived.totals.sourcesTotal);
  });
  it("the ranking is non-empty and the do-not-bother list exists", () => {
    expect(synthesis.rankedActions.rows.length).toBeGreaterThan(20);
    expect(synthesis.rankedActions.doNotBother.length).toBeGreaterThan(0);
  });
});
