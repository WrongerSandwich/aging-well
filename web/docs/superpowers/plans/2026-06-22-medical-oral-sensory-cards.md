# Medical & Oral-Sensory Homepage Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add six curated homepage highlight cards (three each for the newly-researched `medical-screening` and `oral-sensory` levers), two new filter categories, a status-row split, and a refreshed open-questions block.

**Architecture:** All content lives in `lib/content.ts`, which exports typed arrays (`findings`, `findingsFilters`, `statusRows`, `questions`) consumed by existing client components. No component or CSS changes — accent colors derive from `cardModifier`, and `data-category` already drives both filtering and the `/levers/{category}` link, whose target pages exist from the merged sync. Work is additive edits to four exported arrays plus two TypeScript union widenings.

**Tech Stack:** Next.js 15, React 19, TypeScript, Vitest + Testing Library.

## Global Constraints

- Edit only `lib/content.ts` for content; tests go in `components/*.test.tsx`. No component, CSS, or sync-pipeline changes.
- Card copy is verbatim from `docs/superpowers/specs/2026-06-22-medical-oral-sensory-cards-design.md` — including curly quotes (`’` `“` `”`), em dashes (`—`), the `×` glyph, and `~`. Do not substitute ASCII.
- New cards append after existing card `"13"`, numbered `"14"`–`"19"`; do not renumber existing cards.
- `medical-screening` and `oral-sensory` are the exact category/slug strings (must match `derived.json` / `detail.json` keys).
- Run `npm test` (not a single file) before each commit; all tests must pass.
- Work on branch `feat/medical-oral-sensory-cards` (already checked out, holds the spec commit).

---

### Task 1: Add the two filter categories and the six cards

**Files:**
- Modify: `lib/content.ts` — `Finding.category` union (line ~6), `Filter.value` union (line ~192), `findingsFilters` (line ~195), `findings` array (append before its closing `];` at line ~187)
- Test: `components/Findings.test.tsx`

**Interfaces:**
- Consumes: existing `Finding` interface (`number`, `tierLabel`, `tierModifier?`, `lever`, `category`, `titleLines`, `summary`, `stat?`, `detail?`, `cardModifier?`) and `Filter` interface (`label`, `value`).
- Produces: two new valid `category`/`Filter.value` strings `"medical-screening"` and `"oral-sensory"`; six new `Finding` objects numbered `"14"`–`"19"`.

- [ ] **Step 1: Write the failing test**

Append inside the `describe("Findings", ...)` block in `components/Findings.test.tsx`:

```tsx
  it("renders the new oral-sensory cards and the new filter pills", () => {
    render(<Findings />);
    expect(
      screen.getByRole("button", { name: "Medical & screening" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Oral & sensory" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Treat hearing/)).toBeInTheDocument();
    expect(screen.getByText(/Treat your blood/)).toBeInTheDocument();
  });

  it("filters to oral-sensory and hides medical-screening cards", async () => {
    const user = userEvent.setup();
    const { container } = render(<Findings />);
    await user.click(screen.getByRole("button", { name: "Oral & sensory" }));
    const sensory = container.querySelector(
      '.finding[data-category="oral-sensory"]',
    );
    expect(sensory?.className).not.toContain("hidden");
    const medical = container.querySelector(
      '.finding[data-category="medical-screening"]',
    );
    expect(medical?.className).toContain("hidden");
  });
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — the two new tests error (no button named "Oral & sensory"; `getByText(/Treat hearing/)` finds nothing).

- [ ] **Step 3: Widen the two type unions**

In `lib/content.ts`, change the `Finding.category` field:

```ts
  category: "substances" | "exercise" | "sleep" | "nutrition-metabolic" | "medical-screening" | "oral-sensory";
```

And change the `Filter.value` field:

```ts
export interface Filter {
  label: string;
  value: "all" | "substances" | "exercise" | "sleep" | "nutrition-metabolic" | "medical-screening" | "oral-sensory";
}
```

- [ ] **Step 4: Add the two filter pills**

In `findingsFilters`, append after the `{ label: "Nutrition", value: "nutrition-metabolic" }` entry (before the closing `];`):

```ts
  { label: "Medical & screening", value: "medical-screening" },
  { label: "Oral & sensory", value: "oral-sensory" },
```

- [ ] **Step 5: Append the six cards**

In `lib/content.ts`, insert these objects immediately before the `];` that closes the `findings` array (i.e. after the card with `number: "13"`):

```ts
  {
    number: "14",
    tierLabel: "T1",
    lever: "Medical",
    category: "medical-screening",
    titleLines: ["Treat your blood", "pressure."],
    summary:
      "The prevention drug class with the clearest all-cause mortality benefit — though the benefit fades past 85. Statins help too, scaled to your baseline cardiovascular risk.",
    stat: { value: "0.73×", labelLines: ["all-cause mortality", "intensive control (SPRINT)"] },
    detail: {
      body: "Per 5 mmHg systolic drop, cardiovascular events fall about 18%; SPRINT intensive control cut all-cause mortality (NNT 90). Watch for hypotension and kidney effects in older adults.",
      source: "RCT (SPRINT) · hard endpoints · high confidence",
    },
  },
  {
    number: "15",
    tierLabel: "T1",
    lever: "Medical",
    category: "medical-screening",
    cardModifier: "feature",
    titleLines: ["Most cancer screening", "doesn’t extend overall life."],
    summary:
      "Screens cut deaths from one cancer modestly, but a meta-analysis of 18 trials (~2.1M people) found almost none measurably extend total lifespan. Do the few high-yield ones — colorectal, cervical, lung-if-a-smoker — and skip the rest.",
    stat: { value: "110 days", labelLines: ["the only significant", "lifespan gain (sigmoidoscopy)"] },
    detail: {
      body: "Lead-time and length bias inflate survival statistics; overdiagnosis is real — up to 37% of screen-detected DCIS never progresses. Value concentrates in a few RCT-backed screens, not maximal scanning.",
      source: "RCT meta · 18 trials · contested interpretation",
    },
  },
  {
    number: "16",
    tierLabel: "T2",
    lever: "Medical",
    category: "medical-screening",
    cardModifier: "compact muted",
    titleLines: ["Skip the aspirin", "and whole-body scans."],
    summary:
      "Daily aspirin for primary prevention was reversed — bleeding cancels the benefit, with no mortality gain. Whole-body MRI and multi-cancer blood tests have no outcome evidence and cascade into incidentalomas. The real wins are Shingrix and the RSV vaccine (~97% efficacy, durable).",
  },
  {
    number: "17",
    tierLabel: "T1",
    lever: "Sensory",
    category: "oral-sensory",
    cardModifier: "feature",
    titleLines: ["Treat hearing", "loss early."],
    summary:
      "Hearing loss is the largest single modifiable dementia risk factor. The ACHIEVE RCT showed aids slowed cognitive decline — but only in higher-risk older adults, not the worried-well. Cochlear damage is permanent, so protect against noise and correct early.",
    stat: { value: "48%", labelLines: ["slower cognitive decline", "in at-risk elders (ACHIEVE)"] },
    detail: {
      body: "Overall the trial was null; the benefit was a prespecified higher-risk subgroup (top risk-quartile, 58–62% slower decline). The lever is prevention plus early amplification, since hair cells don’t regenerate.",
      source: "RCT · prespecified subgroup · high confidence (subgroup-specific)",
    },
  },
  {
    number: "18",
    tierLabel: "T2",
    lever: "Sensory",
    category: "oral-sensory",
    titleLines: ["Fix cataracts;", "wear your glasses."],
    summary:
      "Cataract surgery is the strongest near-causal sensory lever — restoring vision tracks about 25% lower dementia, and a negative control (glaucoma surgery, which doesn’t restore vision) showed nothing. AMD and glaucoma are irreversible, so there the lever is prevention.",
    stat: { value: "0.71×", labelLines: ["dementia hazard", "after cataract surgery"] },
    detail: {
      body: "An elegant design: vision-restoring surgery lowered dementia while non-restoring eye surgery did not, arguing for restoration over a healthy-user effect. Contested — a 2024 meta was non-significant, and no RCT exists yet.",
      source: "Near-causal observational · negative-control · no RCT",
    },
  },
  {
    number: "19",
    tierLabel: "T2",
    lever: "Sensory",
    category: "oral-sensory",
    cardModifier: "compact muted",
    titleLines: ["Keep your teeth for chewing,", "not your heart."],
    summary:
      "The “gum disease causes heart attacks and dementia” pitch is Mendelian-randomization null — the associations are confounding, not causation. Keep functional teeth, and use dentures if you lose them, for nutrition and quality of life. That’s the real, independent reason.",
  },
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS — all suites green, including the two new Findings tests.

- [ ] **Step 7: Commit**

```bash
git add lib/content.ts components/Findings.test.tsx
git commit -m "feat: add medical-screening & oral-sensory homepage cards"
```

---

### Task 2: Split the status rows

**Files:**
- Modify: `lib/content.ts` — `statusRows` array (line ~226), replace the final grouped entry
- Test: `components/StatusSection.test.tsx`

**Interfaces:**
- Consumes: existing `StatusRow` interface (`index`, `label`, `slug?`, `note?`, `statusLabel?`, `active?`). Rows with a `slug` pull live status + claim counts from `derived.json` at render; `oral-sensory` is `complete` there post-sync.
- Produces: a slug-bearing `oral-sensory` row and a regrouped `07–08` pending row.

- [ ] **Step 1: Write the failing test**

Append inside the `describe("StatusSection", ...)` block in `components/StatusSection.test.tsx`:

```tsx
  it("lists oral-sensory as a researched lever linking to its page", () => {
    render(<StatusSection />);
    const link = screen.getByRole("link", { name: /oral & sensory/i });
    expect(link).toHaveAttribute("href", "/levers/oral-sensory");
  });
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — no link named "Oral & sensory" (it is currently folded into a non-linked grouped row).

- [ ] **Step 3: Replace the grouped status row**

In `lib/content.ts`, find the final entry of `statusRows`:

```ts
  { index: "05", label: "Medical screening", slug: "medical-screening" },
  {
    index: "06–08",
    label: "Sun, stress, oral & sensory",
    note: "Not yet researched",
    statusLabel: "Pending",
  },
```

Replace those two entries with:

```ts
  { index: "05", label: "Medical & screening", slug: "medical-screening" },
  { index: "06", label: "Oral & sensory", slug: "oral-sensory" },
  {
    index: "07–08",
    label: "Sun & skin, Stress & social",
    note: "Not yet researched",
    statusLabel: "Pending",
  },
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS — the new StatusSection test plus all existing tests green.

- [ ] **Step 5: Commit**

```bash
git add lib/content.ts components/StatusSection.test.tsx
git commit -m "feat: split oral-sensory into its own status row"
```

---

### Task 3: Refresh the open questions

**Files:**
- Modify: `lib/content.ts` — `questions` array (line ~244)
- Test: `components/OpenQuestions.test.tsx` (create)

**Interfaces:**
- Consumes: existing `Question` interface (`number`, `text`); `OpenQuestions` component renders `questions` from `@/lib/content` with no props.
- Produces: three replacement `Question` entries.

- [ ] **Step 1: Write the failing test**

Create `components/OpenQuestions.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import OpenQuestions from "./OpenQuestions";

describe("OpenQuestions", () => {
  it("renders the refreshed statin open question", () => {
    render(<OpenQuestions />);
    expect(
      screen.getByText(/statins stop extending life/i),
    ).toBeInTheDocument();
  });

  it("no longer references the retired cannabis question", () => {
    render(<OpenQuestions />);
    expect(screen.queryByText(/cannabis/i)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — `getByText(/statins stop extending life/i)` finds nothing; the cannabis text still renders.

- [ ] **Step 3: Replace the questions array**

In `lib/content.ts`, replace the entire `questions` array body:

```ts
export const questions: Question[] = [
  { number: "01", text: "Where exactly does baseline cardiovascular risk make primary-prevention statins stop extending life?" },
  { number: "02", text: "Does treating hearing loss reduce dementia incidence, not just slow cognitive-test decline?" },
  { number: "03", text: "Would an RCT replicate cataract surgery’s ~25% dementia signal? (2024 meta-analyses conflict.)" },
];
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS — both new OpenQuestions tests plus all existing tests green.

- [ ] **Step 5: Commit**

```bash
git add lib/content.ts components/OpenQuestions.test.tsx
git commit -m "feat: refresh open questions for new levers"
```

---

### Task 4: Verify color rhythm and build

**Files:**
- Possibly modify: `lib/content.ts` — `cardModifier` / `tierModifier` on cards `"14"`–`"19"` only (visual adjustment)

**Interfaces:**
- Consumes: the six cards from Task 1. Accent backgrounds: `feature` → sage, `dark` → forest (+ pair with `tierModifier: "inverse"`), default → cream, `compact muted` → quiet. As written, cards 15 and 17 are `feature`; 16 and 19 are `compact muted`; 14 and 18 are default.
- Produces: no interface change; at most adjusted modifiers for visual balance.

- [ ] **Step 1: Build to confirm no type or compile errors**

Run: `npm run build`
Expected: build succeeds (the widened unions and new cards compile; `/levers/medical-screening` and `/levers/oral-sensory` already prerender from the merged sync).

- [ ] **Step 2: Start the dev server and inspect the grid**

Run: `npm run dev`
Open `http://localhost:3000`. Scroll the findings grid to the new cards (14–19) and check:
- The two new filter pills appear and wrap correctly on a narrow window; clicking each shows only its cards.
- Each card's stat and "view evidence" toggle work; cards 16 and 19 are the quiet compact-muted style; 15 and 17 are sage feature cards.
- Each card's lever link navigates to `/levers/medical-screening` or `/levers/oral-sensory`.
- The status section shows **6/8** with a linked "Oral & sensory" row and a "07–08 · Sun & skin, Stress & social — Pending" row.

- [ ] **Step 3: Adjust modifiers only if the rhythm reads poorly**

Looking down the *full* grid (existing cards through 19): if two `feature`/`dark` cards land adjacent or the tail goes flat, rebalance using only the new cards. To add a darker beat, promote card `"14"` or `"18"` by adding `cardModifier: "dark"` and `tierModifier: "inverse"` (matching the existing dark-card pattern). If the rhythm already reads well, make no change and note that in the commit.

- [ ] **Step 4: Re-run the full suite**

Run: `npm test`
Expected: PASS — all suites green.

- [ ] **Step 5: Commit (only if Step 3 changed anything)**

```bash
git add lib/content.ts
git commit -m "polish: balance accent rhythm for new lever cards"
```

If Step 3 made no change, skip this commit.

---

## Self-Review

**Spec coverage:**
- Six cards (3 medical + 3 oral-sensory), verbatim copy → Task 1, Step 5. ✓
- Two new filter categories + union widening → Task 1, Steps 3–4. ✓
- Status-row split (oral-sensory own row, 07–08 regroup) → Task 2. ✓
- Open-questions refresh (3 new) → Task 3. ✓
- Card color rhythm check → Task 4. ✓
- No component/CSS change; scope = `lib/content.ts` → Global Constraints + per-task files. ✓
- Out of scope (`sun-skin`, `stress-social` stay pending) → preserved as the 07–08 row. ✓

**Placeholder scan:** No TBD/TODO; all card copy, types, filters, rows, questions, and test code are literal. ✓

**Type consistency:** `category`/`Filter.value` unions widened with the identical pair `"medical-screening" | "oral-sensory"` used in every card and filter; `cardModifier` values (`feature`, `compact muted`, `dark`) and `tierModifier: "inverse"` match the existing `Finding` interface; card numbers `"14"`–`"19"` are unique and non-overlapping with existing `"01"`–`"13"`. ✓
