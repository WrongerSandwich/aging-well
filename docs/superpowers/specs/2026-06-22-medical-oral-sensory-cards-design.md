# Homepage cards for medical-screening & oral-sensory

**Date:** 2026-06-22
**Status:** Design — awaiting review

## Context

The `aging-well` research repo finished two new levers (`medical-screening`,
`oral-sensory`). The mechanical sync (`derived.json` / `detail.json`) is already
merged — lever detail pages, the status section, and the homepage metric counts
update automatically from that JSON.

The **hand-authored** homepage curation in `lib/content.ts` does not. It still
covers only the original four levers. This spec covers bringing it current:
six new highlight cards, two new filter categories, a status-row fix, and a
refresh of the open-questions block.

Scope is one file: `lib/content.ts`. No component or CSS changes are required —
accent colors come from `cardModifier`, and `data-category` only drives
filtering and the `/levers/{category}` link (both new lever pages already exist).

## The six cards

Each new lever gets three cards (matching the ~3/lever density of the existing
grid), mapped to that lever's own internal structure. Copy below is final.

### Medical & Screening — the three-way split (extends-life / oversold / less-is-more)

**Card 1 — genuinely extends life** — `category: "medical-screening"`, `tierLabel: "T1"`
- titleLines: `["Treat your blood", "pressure."]`
- summary: "The prevention drug class with the clearest all-cause mortality benefit — though the benefit fades past 85. Statins help too, scaled to your baseline cardiovascular risk."
- stat: value `"0.73×"`, labelLines `["all-cause mortality", "intensive control (SPRINT)"]`
- detail.body: "Per 5 mmHg systolic drop, cardiovascular events fall about 18%; SPRINT intensive control cut all-cause mortality (NNT 90). Watch for hypotension and kidney effects in older adults."
- detail.source: "RCT (SPRINT) · hard endpoints · high confidence"

**Card 2 — real but oversold (signature contrarian, feature card)** — `category: "medical-screening"`, `tierLabel: "T1"`, `cardModifier: "feature"`
- titleLines: `["Most cancer screening", "doesn’t extend overall life."]`
- summary: "Screens cut deaths from one cancer modestly, but a meta-analysis of 18 trials (~2.1M people) found almost none measurably extend total lifespan. Do the few high-yield ones — colorectal, cervical, lung-if-a-smoker — and skip the rest."
- stat: value `"110 days"`, labelLines `["the only significant", "lifespan gain (sigmoidoscopy)"]`
- detail.body: "Lead-time and length bias inflate survival statistics; overdiagnosis is real — up to 37% of screen-detected DCIS never progresses. Value concentrates in a few RCT-backed screens, not maximal scanning."
- detail.source: "RCT meta · 18 trials · contested interpretation"

**Card 3 — less is more (compact muted, mirrors nutrition #13)** — `category: "medical-screening"`, `tierLabel: "T2"`, `cardModifier: "compact muted"`
- titleLines: `["Skip the aspirin", "and whole-body scans."]`
- summary: "Daily aspirin for primary prevention was reversed — bleeding cancels the benefit, with no mortality gain. Whole-body MRI and multi-cancer blood tests have no outcome evidence and cascade into incidentalomas. The real wins are Shingrix and the RSV vaccine (~97% efficacy, durable)."

### Oral & Sensory — the "irreversible hardware" lever

**Card 4 — dementia-prevention foothold (feature card)** — `category: "oral-sensory"`, `tierLabel: "T1"`, `cardModifier: "feature"`
- titleLines: `["Treat hearing", "loss early."]`
- summary: "Hearing loss is the largest single modifiable dementia risk factor. The ACHIEVE RCT showed aids slowed cognitive decline — but only in higher-risk older adults, not the worried-well. Cochlear damage is permanent, so protect against noise and correct early."
- stat: value `"48%"`, labelLines `["slower cognitive decline", "in at-risk elders (ACHIEVE)"]`
- detail.body: "Overall the trial was null; the benefit was a prespecified higher-risk subgroup (top risk-quartile, 58–62% slower decline). The lever is prevention plus early amplification, since hair cells don’t regenerate."
- detail.source: "RCT · prespecified subgroup · high confidence (subgroup-specific)"

**Card 5 — near-causal vision restoration** — `category: "oral-sensory"`, `tierLabel: "T2"`
- titleLines: `["Fix cataracts;", "wear your glasses."]`
- summary: "Cataract surgery is the strongest near-causal sensory lever — restoring vision tracks about 25% lower dementia, and a negative control (glaucoma surgery, which doesn’t restore vision) showed nothing. AMD and glaucoma are irreversible, so there the lever is prevention."
- stat: value `"0.71×"`, labelLines `["dementia hazard", "after cataract surgery"]`
- detail.body: "An elegant design: vision-restoring surgery lowered dementia while non-restoring eye surgery did not, arguing for restoration over a healthy-user effect. Contested — a 2024 meta was non-significant, and no RCT exists yet."
- detail.source: "Near-causal observational · negative-control · no RCT"

**Card 6 — the MR-null debunk (compact muted)** — `category: "oral-sensory"`, `tierLabel: "T2"`, `cardModifier: "compact muted"`
- titleLines: `["Keep your teeth for chewing,", "not your heart."]`
- summary: "The “gum disease causes heart attacks and dementia” pitch is Mendelian-randomization null — the associations are confounding, not causation. Keep functional teeth, and use dentures if you lose them, for nutrition and quality of life. That’s the real, independent reason."

## Card color rhythm

Existing accent rhythm is driven by `cardModifier` (`feature` → sage, `dark` →
forest, default → cream, plus `compact` / `compact muted` for the quieter
rows). The six new cards append to the end of `findings[]`, so after adding them,
re-check the distribution down the full grid and adjust modifiers if two strong
(`feature`/`dark`) cards land adjacent or the tail goes flat. Cards 2 and 4 are
`feature`; cards 3 and 6 are `compact muted`; 1 and 5 are default. If the tail
needs a darker beat, promote card 1 or card 5 to `dark` (`tierModifier: "inverse"`
to match the existing dark-card pattern) — decide visually during implementation.

## Structural changes

### Category + filter union (two new values)
- `Finding.category`: add `"medical-screening" | "oral-sensory"`.
- `Filter.value`: add the same two values.
- `findingsFilters`: append `{ label: "Medical & screening", value: "medical-screening" }`
  and `{ label: "Oral & sensory", value: "oral-sensory" }`.

These are the only places the union is declared; no component or CSS change.
(Filter pills already wrap on mobile per the recent `fix/filter-overflow-mobile`
work, so two more pills are safe.)

### Status rows
Current row 5 stays (medical-screening already has a slug → auto-complete).
Replace the stale grouped row:

```
{ index: "05", label: "Medical & screening", slug: "medical-screening" },
{ index: "06", label: "Oral & sensory", slug: "oral-sensory" },
{ index: "07–08", label: "Sun & skin, Stress & social",
  note: "Not yet researched", statusLabel: "Pending" },
```

`oral-sensory` gains a slug so it pulls its real status/claim count from
`derived.json`; the remaining pending levers regroup as 07–08.

### Open questions (refresh)
Replace the three stale `questions[]` items (cannabis / resistance training)
with three drawn from the new levers' open-questions sections:

1. "Where exactly does baseline cardiovascular risk make primary-prevention statins stop extending life?"
2. "Does treating hearing loss reduce dementia *incidence*, not just slow cognitive-test decline?"
3. "Would an RCT replicate cataract surgery’s ~25% dementia signal? (2024 meta-analyses conflict.)"

## Testing

- `npm test` — existing suite must stay green (Findings toggle, StatusSection,
  Metrics). No new test files required; this is content, and the parser/derived
  tests already cover the data path.
- Add no snapshot churn beyond the new cards.
- Manual: `npm run dev`, verify the two new filter pills filter correctly, the
  six cards render with stats/detail toggles, each card links to its lever page,
  and the status section shows 6/8 with oral-sensory listed.

## Out of scope

- `sun-skin` and `stress-social` remain STUBs in `aging-well` — they stay
  "Pending" until researched. No cards.
- No changes to the sync pipeline, components, or CSS.
