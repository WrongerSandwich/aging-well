# aging-well

A durable, evidence-tiered reference for aging healthily — built the way a sane person
manages money: avoid catastrophic, irreversible errors first; optimize the last 5% never
(or last). The goal is **not** anti-aging. It's avoiding obvious pitfalls and protecting
the hardware that doesn't come back.

The findings are published as a public reading site —
**[aging-well-one.vercel.app](https://aging-well-one.vercel.app)** (a Next.js app in `web/`).
This repository holds the research underneath it: every claim, its evidence tier, and the
transparent rubric that ranks them.

## How the rankings are built (and why you can trust them)

1. **Irreversibility is the spine.** Bone density past peak, neurons, dental enamel,
   cochlear/retinal cells, and skin photodamage do not come back. Protecting them outranks
   an equally-evidenced action against something recoverable — the same way "don't take on
   ruinous debt" outranks "optimize your credit-card points."

2. **Evidence tiers are explicit and never blended.** A 500,000-person cohort and a podcast
   claim do not get equal weight. Every claim is tagged T1–T4 (legend below), and the
   certainty in its score is derived from that tier. T3/T4 inform; they don't rank.

3. **Adherence is a first-class variable.** A maximally-evidenced action you won't sustain
   has zero real-world value. So the score includes Tractability — how realistically *you'll*
   keep an action up — but tags it so it can be stripped out for a pure-evidence view. That
   split is what makes the published ranking universal and a personal one possible (below).

4. **Research by lever, audit by system.** The findings are organized by *lever* (exercise,
   sleep, substances, nutrition, …) because the big interventions cut across every organ
   system; the organ-`systems/` view exists only to check that each system's levers are
   accounted for. The two meet in `synthesis/lever-system-matrix.md`.

5. **A built-in stopping rule.** This kind of project is its own trap — building an elaborate
   research apparatus instead of doing the few obvious things. So once the ranked actions
   stabilize, the rule is to stop researching and start doing. Honesty about diminishing
   returns is part of the method, not an afterthought.

## How to read the evidence tiers

| Tier | Meaning |
|------|---------|
| **T1** | Large prospective cohorts / RCTs / meta-analyses, human, **hard endpoints** (mortality, disability, disease incidence) |
| **T2** | Smaller RCTs, consistent observational data, **surrogate endpoints** |
| **T3** | Mechanistic / animal / small or conflicted human data |
| **T4** | Plausible but speculative; commercial-hype-adjacent (most supplement/longevity-influencer claims) |

T3/T4 are kept physically separate from T1/T2 in every table. They inform; they don't rank.

## What's in this repo

- **`synthesis/`** — the outputs: `ranked-actions.md` (the universal ranking),
  `lever-system-matrix.md`, `open-questions.md`, and `personalize.md` (see below).
- **`levers/`** — the per-lever research: the claims and sources behind every ranking.
- **`systems/`** — the organ-system audit that cross-checks lever coverage.
- **`_meta/`** — the research apparatus: the scoring rubric, source index, templates, and
  [`methodology.md`](_meta/methodology.md) (how the research is produced).
- **`web/`** — the public reading site that renders all of the above.

## Personalizing it for yourself

`synthesis/ranked-actions.md` is the **universal, evidence-only** ranking. To turn it into
*your* do-this-first list, add the one personal factor — **Tractability** (how realistically
you'll sustain each action) — and resolve the conditional rows against your own profile.
`synthesis/personalize.md` documents the method; `_meta/profile.template.md` and
`_meta/ranked-actions.personal.template.md` are copy-and-fill scaffolds. The easiest path is
to clone the repo and walk through them with a coding agent. Your filled-in overlay lives in
a gitignored `personal/` directory — never committed, never published.

## How the research is produced

The methodology for *driving* this research — the lever workflow, session order, evidence
discipline, and how findings feed the site — lives in
[`_meta/methodology.md`](_meta/methodology.md). Develop and deploy details for the website
are in [`web/README.md`](web/README.md).
