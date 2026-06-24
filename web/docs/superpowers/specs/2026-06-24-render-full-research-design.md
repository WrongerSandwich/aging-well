# Spec: Render the full finished research (GitHub issue #3)

**Date:** 2026-06-24
**Status:** Approved design, ready for implementation planning
**Issue:** #3 — "Update aging-ui to render the full finished research" (depends on #2, blocks #5)

## Problem

The `web/` UI predates the completed research. All 8 levers are now finished
(`derived.json`: 8/8 levers, 198 sources, 172 claims), but the app still presents a
mid-project snapshot:

- The home page's 19 finding cards cover only 6 levers — `sun-skin` and
  `stress-social` have no cards, no filter, and no category.
- The hero eyebrow says **"Research in progress"** (with a pulsing live-dot); the
  status table marks `sun-skin` / `stress-social` as **"Not yet researched / Pending."**
  Both are false now.
- The project's **output artifact** — `synthesis/ranked-actions.md` (its own header:
  *"This is what the whole project exists to produce"*) — is **not rendered anywhere.**
- `synthesis/lever-system-matrix.md` (lever × system grid) is not rendered.
- `_meta/sources.md` (S001–S200) has no global index — only per-lever citations.
- `synthesis/open-questions.md` is not rendered; the home shows 3 hand-authored
  questions instead.

Lever **detail pages** (`/levers/<slug>`) already render all 8 levers correctly and
are out of scope except where noted.

## Goals

1. Render all 8 levers across the home page (cards, filters, status), not just detail pages.
2. Render the three synthesis artifacts: ranked-actions, lever × system matrix, open-questions.
3. Render a global sources index (S001–S200).
4. **No content drift:** structured/tabular content is derived from the markdown
   source of truth via the existing sync pipeline. Only marquee finding-card editorial
   stays hand-authored (matching the established `lib/content.ts` pattern).
5. Preserve the `personal/` boundary: the sync reads only `levers/`, `_meta/sources.md`,
   and `synthesis/*.md` — never `personal/`.

## Non-goals (YAGNI)

- In-browser personalization / Tractability scoring (decided repo-only in issue #4).
- Full-text search.
- Rendering the empty "speculative / hype holding pen" table (it has no rows yet —
  render a "none yet" state).
- Re-architecting lever detail pages.

## Architecture

The site grows from "one landing page + lever detail routes" into a small multi-page
app. The data flow is unchanged in shape: **markdown → `scripts/sync.ts` (local) →
committed JSON → server components.** Vercel builds from committed JSON and never reads
the research files.

### Information architecture / routing

Three new statically-generated (SSG) routes, consistent with `/levers/<slug>`:

- **`/actions`** — *The ranking* (output artifact). Sections, in order:
  1. The Evidence-only ranked table (~30 rows: Rank, Action, Lever, Impact, Certainty,
     Rev, Evidence-only score).
  2. The plain-language top-8 list ("The actual list").
  3. **"Do NOT bother / actively avoid"** list.
  4. Lever × system **matrix** (the structural companion to the ranking).
  5. Scoring conventions (collapsible / secondary).
  6. A short **personalization callout** linking to the repo (`synthesis/personalize.md`);
     in-browser personalization is explicitly out of scope.
- **`/sources`** — the S001–S200 index: a table grouped/filterable by tier
  (T1–T4). Reuses the existing `parseSources`.
- **`/open-questions`** — the full unresolved/contested list grouped by lever;
  RESOLVED items rendered struck-through (mirroring the `~~strikethrough~~` in the
  markdown). The empty speculative table renders a "none yet" state.

`components/SiteHeader.tsx` nav gains real links alongside the existing in-page
anchors: **Takeaways** (`/#takeaways`) · **Ranking** (`/actions`) · **Evidence**
(`/#evidence`) · **Sources** (`/sources`) · **Questions** (`/open-questions`).

Home (`app/page.tsx`) remains the curated landing.

### Derivation layer (no drift)

Extend `web/lib/sync/parse.ts` with pure parser functions + types:

- `parseRankedActions(md): RankedActions`
  → `{ rows: RankedAction[]; doNotBother: DoNotBotherItem[]; plainLanguage: string[]; conventions: string[] }`
  - `RankedAction = { rank: number; action: string; lever: string; impact: number; certainty: number; rev: number; evidenceOnly: number; conditional: boolean }`
    (`conditional` = the action text contains `*(conditional)*`).
  - `DoNotBotherItem = { text: string; refs: string }` (parse the bolded lead + the
    `[lever #n]` reference suffix from each bullet under "Do NOT bother").
  - `plainLanguage` = the ordered items under "The actual list (top items, plain language)".
- `parseMatrix(md): LeverSystemMatrix`
  → `{ systems: string[]; rows: MatrixRow[] }`,
  `MatrixRow = { lever: string; cells: MatrixCell[] }`, `MatrixCell = "strong" | "moderate" | "minor" | "none"`
  (map `●`→strong, `◐`→moderate, `○`→minor, blank→none).
- `parseOpenQuestions(md): OpenQuestions`
  → `{ groups: OpenQuestionGroup[] }`,
  `OpenQuestionGroup = { lever: string; questions: OpenQuestion[] }`,
  `OpenQuestion = { question: string; resolved: boolean; whyUnresolved: string; bestGuess: string; tier: string; revisitWhen: string }`
  (`resolved` = the question cell is wrapped in `~~…~~` / contains "RESOLVED"). Group
  label is derived from the leading token of the question (e.g. "Sleep:", "Sun-skin:"),
  falling back to "General".
- Reuse existing `parseSources(md): Source[]` for the global list.

Extend `web/scripts/sync.ts` to additionally read:
- `synthesis/ranked-actions.md`, `synthesis/lever-system-matrix.md`,
  `synthesis/open-questions.md` (from the parent repo, same `agingWell` root),
- `_meta/sources.md` (already read),

and write two new committed files:
- `web/lib/synthesis.json` — `{ generatedAt, rankedActions, matrix, openQuestions }`
- `web/lib/sources.json` — `{ generatedAt, sources: Source[] }`

Add typed accessors mirroring `lib/derived.ts` / `lib/detail.ts`:
- `web/lib/synthesis.ts` → `export const synthesis = data as SynthesisData;`
- `web/lib/sources.ts` → `export const sources = data as SourcesData;`

The sync console summary line is extended to report the new artifacts
(e.g. `… + 30 ranked actions, 8×8 matrix, 41 open questions`).

### Home refresh

In `web/lib/content.ts`:
- Extend the `Finding.category` union, the `Filter.value` union, and `findingsFilters`
  with `"sun-skin"` and `"stress-social"`.
- Hand-author finding cards in the established voice:
  - **sun-skin** (~3): "Don't sunburn / never use tanning beds" (T1, highest-leverage
    in the lever), "Daily broad-spectrum sunscreen" (T2), "Skip strict sun-avoidance &
    the vitamin-D / omega-3 hype" (muted).
  - **stress-social** (~3): "Cultivate a sense of purpose" (T2/T3), "Keep quality social
    connection" (softer evidence), "Manage chronic stress — for well-being, not a proven
    hard-endpoint win" (muted).
  Card numbering continues from 19; tier labels and stats sourced from the lever
  markdown / ranked-actions.
- `heroEyebrow`: "Research in progress" → "Research complete · 8 levers".
- `statusRows`: remove the editorial "07–08 … Not yet researched / Pending" row; add
  two slug-driven rows (`sun-skin`, `stress-social`) that render live "complete" status
  and claim counts from `derived.json`.

In components:
- `components/Hero.tsx`: retire the pulsing `live-dot` (use a static state indicator)
  now that research is complete.
- `components/OpenQuestions.tsx` (home teaser): derive its 3 items from the new
  open-questions data (first 3 unresolved questions) instead of the hardcoded
  `questions` array, removing drift. The full list lives at `/open-questions`.
- New components: `components/actions/RankedTable.tsx`, `components/actions/DoNotBother.tsx`,
  `components/actions/Matrix.tsx`, `components/actions/PlainLanguageList.tsx`,
  `components/SourcesTable.tsx` (client component for tier filtering),
  `components/OpenQuestionsFull.tsx`. New pages: `app/actions/page.tsx`,
  `app/sources/page.tsx`, `app/open-questions/page.tsx`.

## Testing

Mirror the existing vitest patterns (`lib/sync/parse.test.ts`, component `.test.tsx`,
`lib/sanity.test.ts`):

- **Parser unit tests** in `parse.test.ts` against fixture markdown snippets:
  - `parseRankedActions`: row count + numeric columns, `conditional` flag, do-not-bother
    bullet extraction (text + refs), plain-language list order.
  - `parseMatrix`: glyph → strength mapping, system headers, one row per lever.
  - `parseOpenQuestions`: `resolved` detection for `~~…~~` / "RESOLVED" rows, grouping
    by lever, multi-section concatenation.
- **Component tests**: `RankedTable` renders all rows with scores; `Matrix` renders the
  grid; `SourcesTable` filters by tier; `OpenQuestionsFull` struck-through resolved
  items; home `OpenQuestions` teaser shows 3 derived unresolved questions.
- **Sanity test** (`sanity.test.ts`) extensions: every `RankedAction.lever` maps to a
  known lever name; `sources.json` length equals `derived.totals.sourcesTotal`; the
  matrix has one row per known lever.

## Risks / edge cases

- **Markdown format brittleness.** The synthesis tables are hand-maintained. Parsers
  must tolerate the multi-block structure of `open-questions.md` (questions are split
  across several `|`-tables separated by blank lines, not one contiguous table) and the
  strikethrough/RESOLVED markers. Fixtures lock these shapes in tests.
- **Sources count parity.** `parseSources` (global index) and `countSources` (the metric
  in `derived.json`) must agree; the sanity test enforces it. If they diverge, reconcile
  to a single counting rule.
- **Lever-name normalization.** Ranked-actions uses display names ("Sun-skin", "Oral-sensory",
  "Nutrition") that differ from lever slugs. A small normalization map (display → slug)
  enables linking ranked rows to `/levers/<slug>` and powers the sanity check.

## Acceptance criteria

- [ ] `/actions`, `/sources`, `/open-questions` exist, SSG-built, linked from the header.
- [ ] `/actions` renders the ranked table, do-not-bother list, plain-language top-8, and
      the lever × system matrix — all derived from markdown.
- [ ] `/sources` renders all S001–S200 sources, filterable by tier.
- [ ] `/open-questions` renders the full grouped list with resolved items struck through.
- [ ] Home: 8 levers have cards + filters; hero says "Research complete"; no "Pending"
      status row; open-questions teaser is derived.
- [ ] `npm run sync` regenerates `derived.json`, `detail.json`, `synthesis.json`,
      `sources.json`; no hand-edited counts remain that can drift.
- [ ] `npm test` green (new parser, component, and sanity tests included).
- [ ] `npm run build` emits all routes; sync never reads `personal/`.
