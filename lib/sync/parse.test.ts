import { describe, it, expect } from "vitest";
import {
  parseLeverName,
  parseStatus,
  countClaims,
  countSources,
  parseLever,
  buildDerived,
} from "./parse";

const RESEARCHED = `# Lever: Substances

> Status: RESEARCHED — session 1 (2026-06-17) tobacco + alcohol to T1.

## Claims table
| # | Claim | Tier |
|---|-------|------|
| 1 | a | T1 |
| 2 | b | T1 |
| | **— T3/T4 below — informational only — does not rank —** | |
| 3 | c | T3 |
`;

const IN_PROGRESS = `# Lever: Nutrition & Metabolic

> Status: RESEARCH IN PROGRESS — session 4 (2026-06-19). Run 1 launched.

## Claims table
| # | Claim | Tier |
|---|-------|------|
| 1 | a | T2 |
`;

const STUB = `# Lever: Sun & Skin

> Status: STUB — not yet researched. Fill using template.

## Claims table
| # | Claim | Tier |
|---|-------|------|
| 1 |  | T? |
`;

const SOURCES = `# Sources
| ID | Source | Tier |
|----|--------|------|
| S001 | Jha et al. | T1 |
| S002 | Cho et al. | T1 |
| S015 | UCSF critique | secondary |
`;

describe("parseLeverName", () => {
  it("extracts the lever name from the heading", () => {
    expect(parseLeverName(RESEARCHED)).toBe("Substances");
    expect(parseLeverName(IN_PROGRESS)).toBe("Nutrition & Metabolic");
  });
});

describe("parseStatus", () => {
  it("maps RESEARCHED to complete", () => {
    expect(parseStatus(RESEARCHED)).toBe("complete");
  });
  it("maps RESEARCH IN PROGRESS to in-progress", () => {
    expect(parseStatus(IN_PROGRESS)).toBe("in-progress");
  });
  it("maps STUB to pending", () => {
    expect(parseStatus(STUB)).toBe("pending");
  });
});

describe("countClaims", () => {
  it("counts only numbered table rows, ignoring the divider and blank rows", () => {
    expect(countClaims(RESEARCHED)).toBe(3);
    expect(countClaims(IN_PROGRESS)).toBe(1);
  });
  it("counts a stub's empty claim table as having its placeholder row", () => {
    expect(countClaims(STUB)).toBe(1);
  });
});

describe("countSources", () => {
  it("counts one row per S-prefixed source id", () => {
    expect(countSources(SOURCES)).toBe(3);
  });
});

describe("parseLever", () => {
  it("assembles a LeverData record", () => {
    expect(parseLever("substances", RESEARCHED)).toEqual({
      slug: "substances",
      name: "Substances",
      status: "complete",
      claims: 3,
    });
  });
});

describe("buildDerived", () => {
  it("aggregates totals and keys levers by slug", () => {
    const levers = [
      parseLever("substances", RESEARCHED),
      parseLever("nutrition-metabolic", IN_PROGRESS),
      parseLever("sun-skin", STUB),
    ];
    const out = buildDerived(levers, SOURCES, "2026-06-19T00:00:00.000Z");
    expect(out.generatedAt).toBe("2026-06-19T00:00:00.000Z");
    expect(out.totals).toEqual({
      leversComplete: 1,
      leversTotal: 3,
      sourcesTotal: 3,
      claimsTotal: 5,
    });
    expect(out.levers.substances.name).toBe("Substances");
    expect(out.levers["nutrition-metabolic"].status).toBe("in-progress");
  });
});
