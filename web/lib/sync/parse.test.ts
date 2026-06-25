import { describe, it, expect } from "vitest";
import {
  parseLeverName,
  parseStatus,
  countClaims,
  countSources,
  parseLever,
  buildDerived,
  leverSlug,
  parseMatrix,
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
  it("counts only numbered rows with a non-empty claim cell, ignoring the divider and blank rows", () => {
    expect(countClaims(RESEARCHED)).toBe(3);
    expect(countClaims(IN_PROGRESS)).toBe(1);
  });
  it("does not count a stub's empty placeholder row (blank claim cell)", () => {
    expect(countClaims(STUB)).toBe(0);
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
      claimsTotal: 4,
    });
    expect(out.levers.substances.name).toBe("Substances");
    expect(out.levers["nutrition-metabolic"].status).toBe("in-progress");
  });
});

import {
  parseClaimsDetailed,
  parseSection,
  parseSources,
  parseLeverDetail,
} from "./parse";

const DETAIL_MD = `# Lever: Sleep

> Status: RESEARCHED — session 3 (2026-06-18). Covered.

## Scope
Sleep duration, timing, quality.

- In: duration, insomnia, OSA.
- Out: caffeine → \`nutrition-metabolic\`.

## Claims table
| # | Claim | Systems touched | Tier | Effect size (vs. comparator) | Reversibility | Confidence | Source(s) |
|---|-------|-----------------|------|------------------------------|---------------|------------|-----------|
| 1 | Sleep ~7.5h is the mortality nadir | Cardio, Neuro | T1 (observational) | Short <7h HR **1.14** | SLOW | H | [S048][S049] |
| 2 | CBT-I prevents depression | Neuro | T1 (RCT) | HR **0.51** (NNT 7.3) | n/a | H | [S067] |
| | **— T3/T4 below — informational only — does not rank —** | | | | | | |
| 3 | Glymphatic amyloid clearance is surrogate-only | Neuro | T3 (surrogate) | ~5% PET shift | unknown | L | [S061] |

## Dose / threshold
Aim for **~7–7.5h** with consistent timing.

## Actions (behavioral, checkable)
- [ ] Keep a regular sleep schedule.
- [ ] Use CBT-I for chronic insomnia.

## Caveats / population modifiers
Shift workers differ.

## Open questions
Is short sleep causally harmful at all?
`;

const SOURCES_MD = `# Sources
| ID | Source (citation) | Tier | Notes / what it's good for |
|----|-------------------|------|----------------------------|
| S048 | Smith et al., Lancet 2020. [link](https://example.com/s048) | T1 | Anchor cohort. |
| S067 | Irwin et al., JAMA Psych 2022. [link](https://example.com/s067) | T1 | CBT-I depression RCT. |
`;

describe("parseClaimsDetailed", () => {
  it("extracts structured claim records, skipping the divider and placeholder rows", () => {
    const claims = parseClaimsDetailed(DETAIL_MD);
    expect(claims).toHaveLength(3);
    expect(claims[0]).toEqual({
      number: 1,
      text: "Sleep ~7.5h is the mortality nadir",
      systems: "Cardio, Neuro",
      tier: "T1 (observational)",
      tierGroup: "primary",
      effect: "Short <7h HR **1.14**",
      reversibility: "SLOW",
      confidence: "H",
      sources: ["S048", "S049"],
    });
  });
  it("classifies T3/T4 rows as informational", () => {
    const claims = parseClaimsDetailed(DETAIL_MD);
    expect(claims[1].tierGroup).toBe("primary"); // T1 (RCT)
    expect(claims[2].tierGroup).toBe("informational"); // T3
  });
});

describe("parseSection", () => {
  it("returns the body between a heading and the next ## heading", () => {
    expect(parseSection(DETAIL_MD, "Dose / threshold")).toBe(
      "Aim for **~7–7.5h** with consistent timing.",
    );
  });
  it("returns an empty string for a missing heading", () => {
    expect(parseSection(DETAIL_MD, "Nonexistent")).toBe("");
  });
});

describe("parseSources", () => {
  it("parses id, citation (link stripped), url, and tier", () => {
    const sources = parseSources(SOURCES_MD);
    expect(sources).toHaveLength(2);
    expect(sources[0]).toEqual({
      id: "S048",
      citation: "Smith et al., Lancet 2020.",
      url: "https://example.com/s048",
      tier: "T1",
    });
  });
});

describe("parseLeverDetail", () => {
  it("assembles a full LeverDetail record", () => {
    const d = parseLeverDetail("sleep", DETAIL_MD);
    expect(d.slug).toBe("sleep");
    expect(d.name).toBe("Sleep");
    expect(d.status).toBe("complete");
    expect(d.scope).toContain("Sleep duration, timing, quality.");
    expect(d.claims).toHaveLength(3);
    expect(d.actions).toContain("Keep a regular sleep schedule.");
    expect(d.openQuestions).toBe("Is short sleep causally harmful at all?");
  });
});

const MATRIX = `# Lever × System matrix

Cells = effect strength.

|                      | Cardio | Neuro | Skin |
|----------------------|:------:|:-----:|:----:|
| Substances           |   ●    |   ◐   |  ○   |
| Sun/Skin             |        |       |  ●   |
| Oral/Sensory         |        |   ●   |      |

## Reading the matrix
`;

describe("leverSlug", () => {
  it("normalizes display names to slugs", () => {
    expect(leverSlug("Nutrition/Metabolic")).toBe("nutrition-metabolic");
    expect(leverSlug("Medical")).toBe("medical-screening");
    expect(leverSlug("Sun/Skin")).toBe("sun-skin");
    expect(leverSlug("Oral/Sensory")).toBe("oral-sensory");
    expect(leverSlug("Substances")).toBe("substances");
  });
});

describe("parseMatrix", () => {
  it("parses the systems header and one row per lever", () => {
    const m = parseMatrix(MATRIX);
    expect(m.systems).toEqual(["Cardio", "Neuro", "Skin"]);
    expect(m.rows).toHaveLength(3);
  });
  it("maps glyphs to strengths and assigns slugs", () => {
    const m = parseMatrix(MATRIX);
    expect(m.rows[0]).toEqual({
      lever: "Substances",
      slug: "substances",
      cells: ["strong", "moderate", "minor"],
    });
    expect(m.rows[1].cells).toEqual(["none", "none", "strong"]);
    expect(m.rows[2].slug).toBe("oral-sensory");
  });
});
