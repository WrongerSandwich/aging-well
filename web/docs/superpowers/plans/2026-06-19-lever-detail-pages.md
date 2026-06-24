# Lever Detail Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a dedicated, statically-generated detail page per research lever (`/levers/<slug>`) showing the full claims table (tier-grouped, with effect/reversibility/confidence), resolved source citations, and the lever's Scope / Dose / Actions / Caveats / Open-questions prose — all auto-derived from the adjacent `aging-well` repo via the existing sync workflow.

**Architecture:** Extend the existing parser (`lib/sync/parse.ts`) from *counting* claim rows to *extracting* structured `Claim`, `Source`, and `LeverDetail` records. The sync script emits a new committed `lib/detail.json` (full content) alongside the existing `lib/derived.json` (homepage metrics). New static pages live under `app/levers/[slug]/` with `generateStaticParams`; they render server components that consume `detail.json`. Claim text uses a small custom renderer (bold + citation links); the free-form prose sections render via `react-markdown` + `remark-gfm`. Unlike the hand-authored homepage takeaways, detail pages are **fully derived** — `npm run sync` keeps them current with zero manual editing.

**Tech Stack:** Next.js 15 (App Router, static export of the new routes), React 19, TypeScript, `react-markdown` ^9 + `remark-gfm` ^4 for prose, Vitest + @testing-library/react for tests.

## Global Constraints

- **Detail pages are fully auto-derived.** No hand-authored per-lever content — everything comes from parsing `../aging-well`. The only manual step remains `npm run sync` (local), which commits the regenerated JSON; Vercel builds from committed JSON and never reads `aging-well`.
- **Do not modify `lib/derived.json` / `lib/derived.ts` / the homepage components' data wiring.** This feature is additive: a new `lib/detail.json` + `lib/detail.ts`. The only existing components touched are `StatusSection.tsx` and `FindingCard.tsx` (navigation links only).
- **Reuse the existing design tokens and CSS class conventions.** New CSS goes in `app/globals.css` using the existing custom properties (`--forest`, `--rust`, `--sage`, `--lime`, `--paper`, `--ink`, `--muted`, `--line`, `--serif`, `--sans`, `--mono`) and the existing `.shell` width and `.tier`/`.tier-1`/`.tier-2` badge classes.
- **Server components by default.** The only `"use client"` files in the repo remain `Findings.tsx` and `FindingCard.tsx`. New detail-page components are server components.
- **Package manager:** npm. **Path alias:** `@/` → repo root.
- The aging-well claims table is a fixed 8-column markdown table: `| # | Claim | Systems touched | Tier | Effect size (vs. comparator) | Reversibility | Confidence | Source(s) |`. Rows split cleanly on `|` (no escaped pipes). The `sources.md` table is `| ID | Source (citation) | Tier | Notes |` and every source row contains a `[link](url)`.

---

## File Structure

```
lib/
  sync/
    parse.ts              # MODIFY: add Claim/Source/LeverDetail types + parsers
    parse.test.ts         # MODIFY: add tests for the new parsers
  detail.json             # NEW (generated, committed): full lever content + sources
  detail.ts               # NEW: typed wrapper exporting `detail: DetailData`
  renderClaim.tsx         # NEW: inline renderer (bold + [S###]→citation link)
  renderClaim.test.tsx    # NEW
scripts/
  sync.ts                 # MODIFY: also emit lib/detail.json
components/
  lever/
    ProseSection.tsx      # NEW: react-markdown wrapper for a titled prose block
    Citations.tsx         # NEW: renders a claim's [S###] ids as resolved links
    ClaimCard.tsx         # NEW: one claim (tier badge, text, meta, citations)
    LeverDetailView.tsx   # NEW: full page body (header, scope, claims, prose)
  StatusSection.tsx       # MODIFY: link researched rows to /levers/<slug>
  FindingCard.tsx         # MODIFY: link the lever label to /levers/<category>
app/
  levers/
    [slug]/
      page.tsx            # NEW: route, generateStaticParams, generateMetadata
  globals.css             # MODIFY: append detail-page styles
package.json              # MODIFY: add react-markdown + remark-gfm
```

---

### Task 1: Detailed claim / section / source parsers (TDD)

**Files:**
- Modify: `lib/sync/parse.ts`
- Test: `lib/sync/parse.test.ts`

**Interfaces:**
- Consumes: existing `parseLeverName`, `parseStatus`, `LeverStatus` from `lib/sync/parse.ts`.
- Produces:
  - `interface Claim { number: number; text: string; systems: string; tier: string; tierGroup: "primary" | "informational"; effect: string; reversibility: string; confidence: string; sources: string[] }`
  - `interface Source { id: string; citation: string; url: string | null; tier: string }`
  - `interface LeverDetail { slug: string; name: string; status: LeverStatus; scope: string; claims: Claim[]; dose: string; actions: string; caveats: string; openQuestions: string }`
  - `parseClaimsDetailed(md: string): Claim[]`
  - `parseSection(md: string, heading: string): string`
  - `parseSources(sourcesMd: string): Source[]`
  - `parseLeverDetail(slug: string, md: string): LeverDetail`

- [ ] **Step 1: Write the failing tests** — append to `lib/sync/parse.test.ts`

```ts
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
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- lib/sync/parse.test.ts`
Expected: FAIL — `parseClaimsDetailed`, `parseSection`, `parseSources`, `parseLeverDetail` are not exported.

- [ ] **Step 3: Implement the parsers** — append to `lib/sync/parse.ts`

```ts
export interface Claim {
  number: number;
  text: string;
  systems: string;
  tier: string;
  tierGroup: "primary" | "informational";
  effect: string;
  reversibility: string;
  confidence: string;
  sources: string[];
}

export interface Source {
  id: string;
  citation: string;
  url: string | null;
  tier: string;
}

export interface LeverDetail {
  slug: string;
  name: string;
  status: LeverStatus;
  scope: string;
  claims: Claim[];
  dose: string;
  actions: string;
  caveats: string;
  openQuestions: string;
}

// Parses the 8-column claims table into structured records. Skips the
// "— T3/T4 below —" divider and stub placeholder rows (blank claim cell).
export function parseClaimsDetailed(md: string): Claim[] {
  const claims: Claim[] = [];
  for (const line of md.split("\n")) {
    if (!/^\|\s*\d+\s*\|/.test(line)) continue;
    const cells = line.split("|").map((c) => c.trim());
    // ["", "#", "Claim", "Systems", "Tier", "Effect", "Reversibility", "Confidence", "Source(s)", ""]
    if (cells.length < 9) continue;
    const text = cells[2];
    if (text === "") continue;
    const tier = cells[4];
    claims.push({
      number: Number(cells[1]),
      text,
      systems: cells[3],
      tier,
      tierGroup: /^T[12]/.test(tier) ? "primary" : "informational",
      effect: cells[5],
      reversibility: cells[6],
      confidence: cells[7],
      sources: cells[8].match(/S\d+/g) ?? [],
    });
  }
  return claims;
}

// Returns the text body between "## <heading>" and the next "## " heading.
export function parseSection(md: string, heading: string): string {
  const lines = md.split("\n");
  const start = lines.findIndex((l) => l.trim() === `## ${heading}`);
  if (start === -1) return "";
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (lines[i].startsWith("## ")) {
      end = i;
      break;
    }
  }
  return lines.slice(start + 1, end).join("\n").trim();
}

// Parses the sources table; strips the "[link](url)" markdown into a bare url.
export function parseSources(sourcesMd: string): Source[] {
  const sources: Source[] = [];
  for (const line of sourcesMd.split("\n")) {
    if (!/^\|\s*S\d+\s*\|/.test(line)) continue;
    const cells = line.split("|").map((c) => c.trim());
    if (cells.length < 5) continue;
    const raw = cells[2];
    const linkMatch = raw.match(/\[link\]\((https?:\/\/[^)]+)\)/);
    sources.push({
      id: cells[1],
      citation: raw.replace(/\s*\[link\]\([^)]+\)/, "").trim(),
      url: linkMatch ? linkMatch[1] : null,
      tier: cells[3],
    });
  }
  return sources;
}

export function parseLeverDetail(slug: string, md: string): LeverDetail {
  return {
    slug,
    name: parseLeverName(md),
    status: parseStatus(md),
    scope: parseSection(md, "Scope"),
    claims: parseClaimsDetailed(md),
    dose: parseSection(md, "Dose / threshold"),
    actions: parseSection(md, "Actions (behavioral, checkable)"),
    caveats: parseSection(md, "Caveats / population modifiers"),
    openQuestions: parseSection(md, "Open questions"),
  };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- lib/sync/parse.test.ts`
Expected: PASS (existing tests plus the 6 new ones).

- [ ] **Step 5: Commit**

```bash
git add lib/sync/parse.ts lib/sync/parse.test.ts
git commit -m "feat: add detailed claim/section/source parsers"
```

---

### Task 2: Emit `detail.json` from sync; typed wrapper

**Files:**
- Modify: `scripts/sync.ts`
- Create: `lib/detail.ts`
- Generate: `lib/detail.json` (committed)

**Interfaces:**
- Consumes: `parseLever`, `parseLeverDetail`, `parseSources`, `buildDerived`, types `LeverDetail`/`Source` from `lib/sync/parse.ts`.
- Produces: `lib/detail.json` and `lib/detail.ts` exporting `detail: DetailData` where `interface DetailData { generatedAt: string; levers: Record<string, LeverDetail>; sources: Record<string, Source> }`.

- [ ] **Step 1: Update `scripts/sync.ts`** to also build and write `lib/detail.json`. Replace the file contents with:

```ts
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { resolve, join } from "node:path";
import {
  buildDerived,
  parseLever,
  parseLeverDetail,
  parseSources,
  type LeverData,
  type LeverDetail,
} from "../lib/sync/parse";

const root = resolve(__dirname, "..");
const agingWell = process.env.AGING_WELL_DIR
  ? resolve(process.env.AGING_WELL_DIR)
  : resolve(root, "..", "aging-well");

const leversDir = join(agingWell, "levers");
const sourcesPath = join(agingWell, "_meta", "sources.md");

function leverFiles(): { slug: string; md: string }[] {
  return readdirSync(leversDir)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((file) => ({
      slug: file.replace(/\.md$/, ""),
      md: readFileSync(join(leversDir, file), "utf8"),
    }));
}

function main(): void {
  const files = leverFiles();
  const sourcesMd = readFileSync(sourcesPath, "utf8");
  const generatedAt = new Date().toISOString();

  // Homepage metrics (unchanged output shape).
  const levers: LeverData[] = files.map((f) => parseLever(f.slug, f.md));
  const derived = buildDerived(levers, sourcesMd, generatedAt);
  const derivedPath = join(root, "lib", "derived.json");
  writeFileSync(derivedPath, JSON.stringify(derived, null, 2) + "\n", "utf8");

  // Full detail content for the lever pages.
  const details: LeverDetail[] = files.map((f) => parseLeverDetail(f.slug, f.md));
  const sources = parseSources(sourcesMd);
  const detail = {
    generatedAt,
    levers: Object.fromEntries(details.map((d) => [d.slug, d])),
    sources: Object.fromEntries(sources.map((s) => [s.id, s])),
  };
  const detailPath = join(root, "lib", "detail.json");
  writeFileSync(detailPath, JSON.stringify(detail, null, 2) + "\n", "utf8");

  const claimTotal = details.reduce((n, d) => n + d.claims.length, 0);
  console.log(
    `Wrote ${derivedPath} and ${detailPath}: ` +
      `${derived.totals.leversComplete}/${derived.totals.leversTotal} levers complete, ` +
      `${sources.length} sources, ${claimTotal} detailed claims.`,
  );
}

main();
```

- [ ] **Step 2: Run the sync against the real repo**

Run: `npm run sync`
Expected: console reports both files written, e.g. `3/8 levers complete, 69 sources, 63 detailed claims.`, and `lib/detail.json` is created.

- [ ] **Step 3: Sanity-check `lib/detail.json`**

Run: `node -e "const d=require('./lib/detail.json'); console.log('sleep claims:', d.levers.sleep.claims.length); console.log('S048:', JSON.stringify(d.sources.S048)); console.log('sleep claim1 sources:', d.levers.sleep.claims[0].sources)"`
Expected: `sleep claims: 18`; an `S048` source object with a `url`; the first sleep claim's `sources` is a non-empty array of `S###` ids. Confirm `lib/derived.json` is unchanged (still has `totals.claimsTotal === 63`).

- [ ] **Step 4: Create `lib/detail.ts`**

```ts
import data from "./detail.json";
import type { LeverDetail, Source } from "./sync/parse";

export interface DetailData {
  generatedAt: string;
  levers: Record<string, LeverDetail>;
  sources: Record<string, Source>;
}

export const detail = data as DetailData;
```

- [ ] **Step 5: Commit**

```bash
git add scripts/sync.ts lib/detail.ts lib/detail.json
git commit -m "feat: emit detail.json with full lever content and sources"
```

---

### Task 3: Add markdown deps; claim text renderer (TDD)

**Files:**
- Modify: `package.json`
- Create: `lib/renderClaim.tsx`
- Test: `lib/renderClaim.test.tsx`

**Interfaces:**
- Consumes: `Source` type from `lib/sync/parse.ts`.
- Produces: `renderClaim(text: string, sources: Record<string, Source>): ReactNode[]` — converts `**bold**` to `<strong>` and `[S###]` to a citation `<a>` (or `<span>` if the source/url is unknown). Used for claim and effect text.

- [ ] **Step 1: Install the markdown dependencies** (used by Task 4's prose components)

Run:
```bash
npm install react-markdown@^9 remark-gfm@^4
```

- [ ] **Step 2: Write the failing test** — `lib/renderClaim.test.tsx`

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { renderClaim } from "./renderClaim";
import type { Source } from "./sync/parse";

const sources: Record<string, Source> = {
  S048: { id: "S048", citation: "Smith 2020", url: "https://example.com/s048", tier: "T1" },
  S099: { id: "S099", citation: "No link source", url: null, tier: "T2" },
};

describe("renderClaim", () => {
  it("renders bold segments as <strong>", () => {
    render(<p>{renderClaim("Short sleep HR **1.14** overall", sources)}</p>);
    const strong = screen.getByText("1.14");
    expect(strong.tagName).toBe("STRONG");
  });

  it("renders a known citation as a link to its url", () => {
    render(<p>{renderClaim("Big effect [S048]", sources)}</p>);
    const link = screen.getByRole("link", { name: "[S048]" });
    expect(link).toHaveAttribute("href", "https://example.com/s048");
    expect(link).toHaveAttribute("title", "Smith 2020");
  });

  it("renders a citation with no url as plain text, not a link", () => {
    render(<p>{renderClaim("Weak [S099]", sources)}</p>);
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByText("[S099]")).toBeInTheDocument();
  });

  it("leaves an unknown citation id as plain text", () => {
    render(<p>{renderClaim("Mystery [S404]", sources)}</p>);
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByText("[S404]")).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm test -- lib/renderClaim.test.tsx`
Expected: FAIL — `./renderClaim` does not exist.

- [ ] **Step 4: Implement `lib/renderClaim.tsx`**

```tsx
import type { ReactNode } from "react";
import type { Source } from "./sync/parse";

// Renders claim/effect text: **bold** → <strong>, [S###] → citation link
// (or plain text when the source or its url is unknown).
export function renderClaim(
  text: string,
  sources: Record<string, Source>,
): ReactNode[] {
  const nodes: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[(S\d+)\]/g;
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      nodes.push(<strong key={key++}>{m[1]}</strong>);
    } else {
      const id = m[2];
      const src = sources[id];
      if (src?.url) {
        nodes.push(
          <a
            key={key++}
            className="citation"
            href={src.url}
            title={src.citation}
            target="_blank"
            rel="noopener noreferrer"
          >
            [{id}]
          </a>,
        );
      } else {
        nodes.push(
          <span key={key++} className="citation">
            [{id}]
          </span>,
        );
      }
    }
    last = re.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- lib/renderClaim.test.tsx`
Expected: PASS (4 tests).

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json lib/renderClaim.tsx lib/renderClaim.test.tsx
git commit -m "feat: add markdown deps and claim text renderer"
```

---

### Task 4: Detail page components, route, and styles

**Files:**
- Create: `components/lever/ProseSection.tsx`, `components/lever/Citations.tsx`, `components/lever/ClaimCard.tsx`, `components/lever/LeverDetailView.tsx`
- Create: `app/levers/[slug]/page.tsx`
- Modify: `app/globals.css` (append)
- Test: `components/lever/ClaimCard.test.tsx`

**Interfaces:**
- Consumes: `detail` from `lib/detail.ts`; `renderClaim` from `lib/renderClaim.tsx`; types `Claim`/`Source`/`LeverDetail` from `lib/sync/parse.ts`.
- Produces: static routes at `/levers/<slug>` for every lever in `detail.levers`.

- [ ] **Step 1: Create `components/lever/ProseSection.tsx`**

```tsx
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ProseSection({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  if (!body.trim()) return null;
  return (
    <section className="lever-prose">
      <h2>{title}</h2>
      <div className="prose-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/lever/Citations.tsx`**

```tsx
import type { Source } from "@/lib/sync/parse";

export default function Citations({
  ids,
  sources,
}: {
  ids: string[];
  sources: Record<string, Source>;
}) {
  if (ids.length === 0) return null;
  return (
    <p className="claim-citations">
      {ids.map((id) => {
        const src = sources[id];
        return src?.url ? (
          <a
            key={id}
            className="citation"
            href={src.url}
            title={src.citation}
            target="_blank"
            rel="noopener noreferrer"
          >
            [{id}]
          </a>
        ) : (
          <span key={id} className="citation" title={src?.citation}>
            [{id}]
          </span>
        );
      })}
    </p>
  );
}
```

- [ ] **Step 3: Create `components/lever/ClaimCard.tsx`**

```tsx
import type { Claim, Source } from "@/lib/sync/parse";
import { renderClaim } from "@/lib/renderClaim";
import Citations from "./Citations";

function tierClass(tier: string): string {
  return /^T2/.test(tier) ? "tier tier-2" : "tier tier-1";
}

export default function ClaimCard({
  claim,
  sources,
}: {
  claim: Claim;
  sources: Record<string, Source>;
}) {
  return (
    <article className="claim">
      <div className="claim-head">
        <span className="claim-number">{String(claim.number).padStart(2, "0")}</span>
        <span className={tierClass(claim.tier)}>{claim.tier}</span>
      </div>
      <p className="claim-text">{renderClaim(claim.text, sources)}</p>
      <dl className="claim-meta">
        <div><dt>Systems</dt><dd>{claim.systems || "—"}</dd></div>
        <div><dt>Effect</dt><dd>{renderClaim(claim.effect, sources)}</dd></div>
        <div><dt>Reversibility</dt><dd>{claim.reversibility || "—"}</dd></div>
        <div><dt>Confidence</dt><dd>{claim.confidence || "—"}</dd></div>
      </dl>
      <Citations ids={claim.sources} sources={sources} />
    </article>
  );
}
```

- [ ] **Step 4: Create `components/lever/LeverDetailView.tsx`**

```tsx
import Link from "next/link";
import type { LeverDetail, Source } from "@/lib/sync/parse";
import ClaimCard from "./ClaimCard";
import ProseSection from "./ProseSection";

const STATUS_LABEL: Record<string, string> = {
  complete: "Complete",
  "in-progress": "In progress",
  pending: "Not yet researched",
};

export default function LeverDetailView({
  lever,
  sources,
}: {
  lever: LeverDetail;
  sources: Record<string, Source>;
}) {
  const primary = lever.claims.filter((c) => c.tierGroup === "primary");
  const informational = lever.claims.filter((c) => c.tierGroup === "informational");

  return (
    <main className="lever-page shell" id="top">
      <Link className="lever-back" href="/#status">
        ← All levers
      </Link>

      <header className="lever-header">
        <p className="eyebrow">Research lever</p>
        <h1>{lever.name}</h1>
        <span className={`lever-status status-${lever.status}`}>
          {STATUS_LABEL[lever.status] ?? lever.status}
        </span>
      </header>

      <ProseSection title="Scope" body={lever.scope} />

      {lever.claims.length === 0 ? (
        <p className="lever-empty">No claims researched yet for this lever.</p>
      ) : (
        <>
          <section className="claims-section">
            <h2>Claims · act on these</h2>
            <p className="claims-note">
              T1–T2 evidence: large cohorts, RCTs, and meta-analyses with hard outcomes.
            </p>
            <div className="claims-list">
              {primary.map((c) => (
                <ClaimCard key={c.number} claim={c} sources={sources} />
              ))}
            </div>
          </section>

          {informational.length > 0 && (
            <section className="claims-section informational">
              <h2>Informational only</h2>
              <p className="claims-note">
                T3–T4 evidence: mechanistic, small, conflicting, or speculative — does not enter the ranking.
              </p>
              <div className="claims-list">
                {informational.map((c) => (
                  <ClaimCard key={c.number} claim={c} sources={sources} />
                ))}
              </div>
            </section>
          )}
        </>
      )}

      <ProseSection title="Dose & threshold" body={lever.dose} />
      <ProseSection title="Actions" body={lever.actions} />
      <ProseSection title="Caveats & population modifiers" body={lever.caveats} />
      <ProseSection title="Open questions" body={lever.openQuestions} />
    </main>
  );
}
```

- [ ] **Step 5: Create `app/levers/[slug]/page.tsx`**

```tsx
import { notFound } from "next/navigation";
import { detail } from "@/lib/detail";
import LeverDetailView from "@/components/lever/LeverDetailView";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(detail.levers).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lever = detail.levers[slug];
  return {
    title: lever ? `${lever.name} — Aging Well` : "Aging Well",
    description: lever?.scope?.slice(0, 150),
  };
}

export default async function LeverPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lever = detail.levers[slug];
  if (!lever) notFound();
  return <LeverDetailView lever={lever} sources={detail.sources} />;
}
```

- [ ] **Step 6: Append detail-page styles to `app/globals.css`**

```css
/* ---- Lever detail pages ---- */
.lever-page { padding-block: 56px 110px; }
.lever-back { display: inline-block; margin-bottom: 40px; font: 11px var(--mono); text-transform: uppercase; letter-spacing: .08em; color: var(--rust); text-decoration: none; }
.lever-back:hover { color: var(--ink); }
.lever-header { border-bottom: 1px solid var(--line); padding-bottom: 30px; margin-bottom: 8px; }
.lever-header h1 { margin: 6px 0 18px; font-size: clamp(48px, 7vw, 92px); line-height: .9; font-weight: 500; letter-spacing: -.04em; }
.lever-status { font: 10px var(--mono); text-transform: uppercase; letter-spacing: .08em; padding: 6px 10px; background: var(--paper-deep); color: var(--muted); }
.lever-status.status-complete { background: var(--forest); color: white; }
.lever-status.status-in-progress { background: var(--lime); color: var(--forest); }

.lever-prose { padding-block: 36px; border-bottom: 1px solid var(--line); }
.lever-prose h2 { font-size: 26px; margin: 0 0 14px; font-weight: 600; letter-spacing: -.02em; }
.prose-body { max-width: 760px; color: #4f5b55; font-size: 15px; line-height: 1.7; }
.prose-body p { margin: 0 0 14px; }
.prose-body ul { margin: 0 0 14px; padding-left: 20px; }
.prose-body li { margin-bottom: 8px; }
.prose-body strong { color: var(--ink); }
.prose-body code { font: 13px var(--mono); background: var(--paper-deep); padding: 1px 5px; }
.prose-body a { color: var(--rust); }
.prose-body input[type="checkbox"] { margin-right: 8px; accent-color: var(--forest); }

.claims-section { padding-block: 44px 8px; }
.claims-section h2 { font-size: 30px; margin: 0 0 6px; font-weight: 600; letter-spacing: -.03em; }
.claims-note { margin: 0 0 26px; color: var(--muted); font-size: 13px; line-height: 1.5; max-width: 560px; }
.claims-section.informational { opacity: .82; }
.claims-list { display: grid; gap: 0; border-top: 1px solid var(--line); }

.claim { padding: 26px 0; border-bottom: 1px solid var(--line); }
.claim-head { display: flex; align-items: center; gap: 14px; margin-bottom: 12px; }
.claim-number { font: 10px var(--mono); color: var(--muted); }
.claim-text { margin: 0 0 16px; font-family: var(--serif); font-size: 21px; line-height: 1.3; letter-spacing: -.01em; }
.claim-text strong { color: var(--rust); font-weight: 600; }
.claim-meta { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px 40px; margin: 0 0 14px; }
.claim-meta dt { font: 9px var(--mono); text-transform: uppercase; letter-spacing: .08em; color: var(--muted); margin-bottom: 3px; }
.claim-meta dd { margin: 0; font-size: 13px; line-height: 1.5; color: #46514b; }
.claim-meta dd strong { color: var(--ink); }
.claim-citations { margin: 0; display: flex; flex-wrap: wrap; gap: 8px; }
.citation { font: 10px var(--mono); color: var(--rust); text-decoration: none; }
a.citation:hover { text-decoration: underline; }

.lever-empty { padding: 50px 0; color: var(--muted); font-size: 15px; border-top: 1px solid var(--line); }

@media (max-width: 640px) {
  .claim-meta { grid-template-columns: 1fr; gap: 10px; }
  .claim-text { font-size: 19px; }
}
```

- [ ] **Step 7: Write `components/lever/ClaimCard.test.tsx`**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ClaimCard from "./ClaimCard";
import type { Claim, Source } from "@/lib/sync/parse";

const sources: Record<string, Source> = {
  S048: { id: "S048", citation: "Smith 2020", url: "https://example.com/s048", tier: "T1" },
};
const claim: Claim = {
  number: 1,
  text: "Sleep ~7.5h is the nadir",
  systems: "Cardio, Neuro",
  tier: "T1 (observational)",
  tierGroup: "primary",
  effect: "Short <7h HR **1.14**",
  reversibility: "SLOW",
  confidence: "H",
  sources: ["S048"],
};

describe("ClaimCard", () => {
  it("renders the claim text, tier badge, meta, and a resolved citation link", () => {
    render(<ClaimCard claim={claim} sources={sources} />);
    expect(screen.getByText("Sleep ~7.5h is the nadir")).toBeInTheDocument();
    expect(screen.getByText("T1 (observational)")).toBeInTheDocument();
    expect(screen.getByText("Cardio, Neuro")).toBeInTheDocument();
    expect(screen.getByText("1.14").tagName).toBe("STRONG");
    expect(screen.getByRole("link", { name: "[S048]" })).toHaveAttribute(
      "href",
      "https://example.com/s048",
    );
  });
});
```

- [ ] **Step 8: Run the component test**

Run: `npm test -- components/lever/ClaimCard.test.tsx`
Expected: PASS.

- [ ] **Step 9: Build to confirm the static routes generate**

Run: `npm run build`
Expected: build succeeds; output lists `/levers/[slug]` prerendered for each lever (e.g. `/levers/substances`, `/levers/exercise`, `/levers/sleep`, and the stubs). No RSC/import errors from `react-markdown`.

- [ ] **Step 10: Commit**

```bash
git add components/lever app/levers app/globals.css
git commit -m "feat: lever detail pages with claims, citations, and prose"
```

---

### Task 5: Wire navigation into the detail pages

**Files:**
- Modify: `components/StatusSection.tsx`
- Modify: `components/FindingCard.tsx`
- Test: `components/StatusSection.test.tsx` (add a case)

**Interfaces:**
- Consumes: existing `detail` from `lib/detail.ts` (to know which levers have pages with content); existing `statusRows`/`derived` already imported in StatusSection.
- Produces: links from the homepage status rows and takeaway cards to `/levers/<slug>`.

- [ ] **Step 1: Add a linking case to `components/StatusSection.test.tsx`**

Append this test inside the existing `describe("StatusSection", ...)` block:

```tsx
  it("links researched lever rows to their detail page", () => {
    render(<StatusSection />);
    const link = screen.getByRole("link", { name: /substances/i });
    expect(link).toHaveAttribute("href", "/levers/substances");
  });
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test -- components/StatusSection.test.tsx`
Expected: FAIL — no link is rendered yet (the row label is plain text).

- [ ] **Step 3: Update `components/StatusSection.tsx`** to link rows whose lever has a detail page with claims. Add the import and wrap the label.

Add at the top with the other imports:

```tsx
import Link from "next/link";
import { detail } from "@/lib/detail";
```

Replace the `<strong>{row.label}</strong>` line in the row render with:

```tsx
            {row.slug && (detail.levers[row.slug]?.claims.length ?? 0) > 0 ? (
              <strong>
                <Link href={`/levers/${row.slug}`}>{row.label}</Link>
              </strong>
            ) : (
              <strong>{row.label}</strong>
            )}
```

- [ ] **Step 4: Run the StatusSection tests**

Run: `npm test -- components/StatusSection.test.tsx`
Expected: PASS (including the new link case and the pre-existing cases).

- [ ] **Step 5: Update `components/FindingCard.tsx`** to link the lever label to its detail page. Find this block:

```tsx
        <span className="lever">{finding.lever}</span>
```

Replace it with (the finding's `category` is the lever slug):

```tsx
        <Link className="lever" href={`/levers/${finding.category}`}>
          {finding.lever}
        </Link>
```

Add the import at the top of the file, after the `"use client"` directive and the existing imports:

```tsx
import Link from "next/link";
```

- [ ] **Step 6: Run the findings tests to confirm no regression**

Run: `npm test -- components/Findings.test.tsx`
Expected: PASS (the filter/toggle behavior is unaffected by wrapping the lever label in a link).

- [ ] **Step 7: Full suite + build**

Run: `npm test && npm run build`
Expected: all tests pass; build succeeds with the detail routes prerendered.

- [ ] **Step 8: Commit**

```bash
git add components/StatusSection.tsx components/StatusSection.test.tsx components/FindingCard.tsx
git commit -m "feat: link status rows and takeaway cards to lever detail pages"
```

---

### Task 6: README note and final verification

**Files:**
- Modify: `README.md`

**Interfaces:** none (documentation + verification).

- [ ] **Step 1: Document the detail data in `README.md`.** In the "Update the research snapshot" section, after the sentence describing `lib/derived.json`, add:

```markdown
`npm run sync` also writes `lib/detail.json` — the full per-lever claims, sources,
and prose powering the `/levers/<slug>` detail pages. Both JSON files are committed;
Vercel builds from them and never reads `../aging-well`.
```

- [ ] **Step 2: Final full build + test**

Run:
```bash
npm run build && npm test
```
Expected: build succeeds with `/levers/<slug>` routes prerendered for all levers; all tests pass.

- [ ] **Step 3: Manual smoke (controller will also screenshot)**

Run `npm run dev`, then visit `/levers/sleep` and `/levers/substances`. Confirm: claims render tier-grouped (T1/T2 first, then an "Informational only" group), effect numbers are bold, `[S###]` citations are clickable links opening the source, the Scope/Dose/Actions/Caveats/Open-questions prose renders, and the "← All levers" back link returns home. Visit `/levers/sun-skin` (a stub) and confirm the "No claims researched yet" empty state. Stop the server.

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: note detail.json in the sync workflow"
```

---

## Self-Review Notes

- **Spec coverage (Option B = claims + citations + prose):** claims table parsed and rendered tier-grouped (Tasks 1, 4); citations resolved to clickable source links (Tasks 1–4, `parseSources` + `renderClaim` + `Citations`); Scope/Dose/Actions/Caveats/Open-questions prose rendered via react-markdown (Tasks 1, 4); static routing with `generateStaticParams` (Task 4); navigation in (Task 5); stub empty state (Task 4). ✓
- **Additive constraint:** `derived.json`/`derived.ts` and homepage data wiring untouched; new `detail.json`/`detail.ts`; only `StatusSection`/`FindingCard` edited, for links only. ✓
- **Type consistency:** `Claim`/`Source`/`LeverDetail`/`DetailData` defined in Tasks 1–2 and consumed unchanged in Tasks 3–5; `renderClaim(text, sources)` signature consistent across `ClaimCard` and tests; `detail.levers[slug].claims` shape used identically in the page, view, and StatusSection link guard. ✓
- **Deferred (out of scope for Option B, would be the "full explorer"):** in-page `#N` cross-reference links between claims; filter/sort claims by tier or body system; collapsible T3/T4; pulling `synthesis/open-questions.md` into the pages. Noted, not built.
- **Known minor risk:** `react-markdown` v9 is ESM; Next 15 bundles it fine for the server components, and Vitest transforms it — Task 3 installs it before any component imports it, and Task 4 Step 9's build is the gate that would catch an integration problem.
