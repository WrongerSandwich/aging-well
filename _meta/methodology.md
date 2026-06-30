# Methodology — how the research is produced

The operator's guide for *driving* the aging-well research: how a new lever gets
researched, scored, and folded into the rankings. This is the **"how."** The
reader-facing **"what and why"** lives in the top-level [README](../README.md), and the
product/voice brief in [PRODUCT.md](../PRODUCT.md).

> A generalized, project-agnostic version of this research approach is being extracted
> into its own repository. This file documents how the method was (and is) run *here*.

## Method: research by lever, audit by system

The dominant interventions (exercise, sleep, not smoking, metabolic health) cut across
every organ system. If you research by organ, you "rediscover" exercise five times and
mistake one finding for five. So research happens in `levers/`, and `systems/` exists only
to verify every system has its levers accounted for — an audit, not a research axis. The
two meet in `synthesis/lever-system-matrix.md`.

## The research workflow

1. Copy `_meta/research-template.md` into a `levers/<name>.md` file (stubs already created
   with tables pre-built).
2. Run one focused research session per lever. Fill the claims table. Force every claim
   through the same filter (tier, effect size, reversibility, dose).
3. Tick the systems each lever touches in `systems/*.md`.
4. After ~5 levers, build/update `synthesis/lever-system-matrix.md` and
   `synthesis/ranked-actions.md` using `_meta/scoring-rubric.md`.
5. Park anything unresolved or speculative in `synthesis/open-questions.md`.

**Suggested session order** (descending expected leverage — front-load so the stopping
rule can fire early): substances → exercise → sleep → nutrition/metabolic →
medical-screening → the rest.

**Stopping rule (operational).** If `synthesis/ranked-actions.md` is stable after ~5 lever
sessions, STOP researching and start doing. The project is itself a known trap — an
elaborate research apparatus standing in for the few obvious actions. Treat the rule as
hard, not a suggestion. (See the README for why this is a first-class principle, not a
footnote.)

## Research discipline (guidance for the agent)

When researching a lever:

- Prefer T1 sources. Name the comparator for every effect size (vs. what?).
- Quantify effect sizes (HR, % risk change, absolute mortality delta) wherever possible;
  fall back to large/moderate/small only when you must.
- Flag the dose-response shape: most levers are steep at the low end and flat at the high
  end. The 80/20 lives at "the minimum effective dose," not the maximum.
- Note population modifiers (age/sex/condition) and who a claim does NOT apply to.
- Do NOT inflate certainty. A T3 mechanistic story is not a T1 outcome.
- Update `_meta/sources.md` so sources are deduplicated across sessions.

See `_meta/scoring-rubric.md` for how tier, impact, certainty, reversibility, and
Tractability combine into the score, and the [README](../README.md) tier legend for the
T1–T4 definitions.

## Feeding the website

The public site in `web/` renders these research files. After a research session lands,
run `npm run sync` in `web/` to regenerate the committed JSON snapshot the site builds
from. The sync reads only `levers/` and `_meta/sources.md` — never `personal/` — so the
personal overlay is never bundled or served. Full develop/sync/deploy details live in
[`web/README.md`](../web/README.md).
