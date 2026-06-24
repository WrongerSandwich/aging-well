# aging-well

A durable, evidence-tiered reference system for aging healthily — built the way a
sane person manages money: avoid catastrophic, irreversible errors first; optimize
the last 5% never (or last). The goal is **not** anti-aging. It's avoiding obvious
pitfalls and protecting the hardware that doesn't come back.

## Core design principles

1. **Research by LEVER, audit by SYSTEM.** The dominant interventions (exercise,
   sleep, not smoking, metabolic health) cut across every organ system. If you
   research by organ, you'll "rediscover" exercise five times and mistake one
   finding for five. So: research happens in `levers/`, and `systems/` exists only
   to verify every system has its levers accounted for. See `synthesis/lever-system-matrix.md`.

2. **Irreversibility dominates ranking.** Bone density past peak, neurons, dental
   enamel, cochlear/retinal cells, and skin photodamage do not recover. Protecting
   them outranks an equally-evidenced action against something recoverable — the
   same way "don't take on ruinous debt" outranks "optimize your credit card points."

3. **Evidence tiers are explicit and never blended.** A 500,000-person cohort and a
   podcast claim do not get equal weight. Every claim is tagged T1–T4 (legend below)
   and Certainty in the score is derived from the tier.

4. **Adherence is a first-class variable.** A maximally-evidenced action you won't
   sustain has zero real-world value. Tractability is in the scoring formula — but
   tagged so it can be stripped for a pure-evidence view.

5. **Stopping rule.** This project is itself a known trap: building an elaborate
   research apparatus as a substitute for doing the few obvious things. If
   `synthesis/ranked-actions.md` is stable after ~5 lever sessions, STOP researching
   and start doing. Treat that as a hard rule, not a suggestion.

## How to use

1. Copy `_meta/research-template.md` into a `levers/<name>.md` file (stubs already
   created with tables pre-built).
2. Run one focused research session per lever. Fill the claims table. Force every
   claim through the same filter (tier, effect size, reversibility, dose).
3. Tick the systems each lever touches in `systems/*.md`.
4. After ~5 levers, build/update `synthesis/lever-system-matrix.md` and
   `synthesis/ranked-actions.md` using `_meta/scoring-rubric.md`.
5. Park anything unresolved or speculative in `synthesis/open-questions.md`.

**Suggested session order** (descending expected leverage — front-load so the
stopping rule can fire early): substances → exercise → sleep → nutrition/metabolic
→ medical-screening → the rest.

## Personalizing it for yourself

`synthesis/ranked-actions.md` is the **universal, evidence-only** ranking. To turn it into
*your* do-this-first list, add the one personal factor — **Tractability** (how realistically
you'll sustain each action) — and resolve the conditional rows against your own profile.
`synthesis/personalize.md` documents the method; `_meta/profile.template.md` and
`_meta/ranked-actions.personal.template.md` are copy-and-fill scaffolds. The easiest path is
to clone the repo and walk through them with a coding agent. Your filled-in overlay lives in
a gitignored `personal/` directory — never committed, never published.

## The website (`web/`)

The public dashboard that renders these findings lives in `web/` — a Next.js app
co-located in this repo (history preserved from the former `aging-ui` repo). It reads
the research files directly: `scripts/sync.ts` parses `levers/` and `_meta/sources.md`
into committed `web/lib/derived.json` + `web/lib/detail.json`, and Vercel builds from
those JSON snapshots. The sync **never reads `personal/`**, so the gitignored personal
overlay is never bundled or served. After a research session, run `npm run sync` in
`web/` to refresh the snapshot. See `web/README.md` for develop/deploy details (the
Vercel project's Root Directory must be set to `web`).

## Evidence tier legend

| Tier | Meaning |
|------|---------|
| **T1** | Large prospective cohorts / RCTs / meta-analyses, human, **hard endpoints** (mortality, disability, disease incidence) |
| **T2** | Smaller RCTs, consistent observational data, **surrogate endpoints** |
| **T3** | Mechanistic / animal / small or conflicted human data |
| **T4** | Plausible but speculative; commercial-hype-adjacent (most supplement/longevity-influencer claims) |

Keep T3/T4 physically separate from T1/T2 in every table. They inform; they don't rank.

## A note for the agent (Claude Code)

When researching a lever:
- Prefer T1 sources. Name the comparator for every effect size (vs. what?).
- Quantify effect sizes (HR, % risk change, absolute mortality delta) wherever
  possible; fall back to large/moderate/small only when you must.
- Flag the dose-response shape: most levers are steep at the low end and flat at the
  high end. The 80/20 lives at "the minimum effective dose," not the maximum.
- Note population modifiers (age/sex/condition) and who a claim does NOT apply to.
- Do NOT inflate certainty. A T3 mechanistic story is not a T1 outcome.
- Update `_meta/sources.md` so sources are deduplicated across sessions.
