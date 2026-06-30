# Ranked actions

**The output artifact.** This is what the whole project exists to produce. Each row
is a concrete, checkable action scored per `_meta/scoring-rubric.md`.

This file is the **general, evidence-based ranking** — safe to publish. It is sorted by
**Evidence-only** = `Impact × Certainty × Reversibility` (max 75), which deliberately
*excludes* the personal Tractability factor.

> **Personalization is decoupled.** The full `Priority = Evidence-only × Tractability`
> view depends on who you are and what you'll actually sustain — so Tractability is NOT
> scored here. Each reader applies it themselves (see *Personalizing this list* below).
> A personal overlay lives in `personal/` (gitignored, never published).

## Scoring conventions (audit these)
- **Certainty = evidence tier:** T1 (RCT / large cohort / meta, hard endpoint) = 5; T2 = 4; T3 = 2; T4 = 1. Where a *large association lacks causal support* (no RCT, null/again MR), certainty is marked down to reflect the causal evidence, not the association size.
- **Reversibility = how irreversible the worst harm the action prevents is:** prevents death / cancer / stroke / MI / dementia / fracture / sensory loss / melanoma = 3; acts only on a recoverable risk-factor or surrogate (BP via diet, weight, mood, sleep debt) = 2; fast-reversible = 1.
- **Impact = effect on hard endpoints** (mortality / disability / QALYs), 1–5. Conditional actions (treat BP, lung screening) are scored for the population that *has* the condition — flagged with *(conditional)*.

| Rank | Action | Lever | Impact | Certainty | Rev | **Evidence-only** |
|:----:|--------|-------|:------:|:---------:|:---:|:-----------------:|
| 1 | **Don't smoke** (quit ASAP if you do) [substances #1] | Substances | 5 | 5 | 3 | **75** |
| 2 | **Build cardiorespiratory fitness** (≥150 min/wk zone-2 + some vigorous) [exercise #1] | Exercise | 5 | 5 | 3 | **75** |
| 3 | **Treat high blood pressure to target** *(conditional)* [medical-screening #8] | Medical | 5 | 5 | 3 | **75** |
| 4 | **Keep alcohol minimal** (toward zero) [substances #9] | Substances | 4 | 5 | 3 | **60** |
| 5 | **Resistance-train ≥2×/wk** [exercise #5] | Exercise | 4 | 5 | 3 | **60** |
| 6 | **Balance training** (esp. from midlife — falls/fracture prevention) [exercise #9] | Exercise | 4 | 5 | 3 | **60** |
| 7 | **Statins if elevated CVD risk** *(conditional)* [medical-screening #6] | Medical | 4 | 5 | 3 | **60** |
| 8 | **Colorectal cancer screening** (from ~45–50) [medical-screening #1] | Medical | 4 | 5 | 3 | **60** |
| 9 | **Don't sunburn / never use tanning beds** [sun-skin #1] | Sun-skin | 3 | 5 | 3 | **45** |
| 10 | **Get recommended adult vaccines** (Shingrix, RSV, flu, COVID, pneumococcal) [medical-screening #9] | Medical | 3 | 5 | 3 | **45** |
| 11 | **Cervical cancer screening** *(if applicable)* [medical-screening #3] | Medical | 3 | 5 | 3 | **45** |
| 12 | **Lift heavy for bone (HiRIT) if low BMD** *(conditional)* [exercise #13] | Exercise | 3 | 4 | 3 | **36** |
| 13 | **Lung-cancer screening (LDCT)** *(conditional — smoking history)* [medical-screening #2] | Medical | 3 | 4 | 3 | **36** |
| 14 | **Protect hearing + treat hearing loss early with aids** [oral-sensory #3] | Oral-sensory | 3 | 4 | 3 | **36** |
| 15 | **Correct vision / cataract surgery when it impairs you** [oral-sensory #8] | Oral-sensory | 3 | 4 | 3 | **36** |
| 16 | **Avoid ultra-processed food & sugary drinks** [nutrition-metabolic #4] | Nutrition | 4 | 4 | 2 | **32** |
| 17 | **Avoid excess adiposity** (don't become obese) [nutrition-metabolic #11] | Nutrition | 4 | 4 | 2 | **32** |
| 18 | **CBT-I if you have insomnia** (prevents depression) [sleep #12] | Sleep | 3 | 5 | 2 | **30** |
| 19 | **DASH-style diet / lower sodium** (for BP) [nutrition-metabolic #7] | Nutrition | 3 | 5 | 2 | **30** |
| 20 | **Sleep ~7–7.5 h on a consistent schedule** [sleep #1] | Sleep | 3 | 4 | 2 | **24** |
| 21 | **Daily broad-spectrum sunscreen** [sun-skin #11] | Sun-skin | 2 | 4 | 3 | **24** |
| 22 | **Adequate protein** (preserve muscle, esp. older) [nutrition-metabolic #14] | Nutrition | 3 | 3 | 2 | **18** |
| 23 | **Cultivate a sense of purpose** [stress-social #25] | Stress-social | 3 | 3 | 2 | **18** |
| 24 | **Keep functional teeth** (hygiene + regular dental care) [oral-sensory #14] | Oral-sensory | 2 | 3 | 3 | **18** |
| 25 | **Limit processed / red meat** [nutrition-metabolic #5] | Nutrition | 2 | 4 | 2 | **16** |
| 26 | **Treat OSA if symptomatic** (symptoms, not MACE) [sleep #7] | Sleep | 2 | 4 | 2 | **16** |
| 27 | **Don't start vaping** (if never-smoker) [substances #11] | Substances | 2 | 4 | 2 | **16** |
| 28 | **Maintain quality social connections** [stress-social #1] | Stress-social | 3 | 2 | 2 | **12** |
| 29 | **Manage chronic stress** (for well-being) [stress-social #17] | Stress-social | 2 | 2 | 2 | **8** |
| 30 | **Avoid heavy / adolescent-onset cannabis** [substances #19] | Substances | 2 | 2 | 2 | **8** |

### Do NOT bother / actively avoid (negative or unproven — keep OFF the list)
These scored low or reversed in the research; listed so they don't creep back in:
- **Daily aspirin for primary prevention** — reversed (bleeding ≥ benefit) [medical-screening #12]
- **Whole-body MRI / multi-cancer-early-detection (Galleri) in average-risk** — overdiagnosis, no outcome data [medical-screening]
- **Vitamin D / omega-3 / NAD+ / most longevity supplements** — RCT-null on hard endpoints [sun-skin #21–22, nutrition #9]
- **Fasting / time-restricted eating / CR for longevity** — human evidence surrogate-only [nutrition #16]
- **Periodontal treatment to prevent heart disease/dementia** — MR-null (keep teeth for *function*) [oral-sensory #12]
- **Strict sun avoidance** — no proven upside once the vitamin-D channel is closed; possible downside [sun-skin #19–25]

## Personalizing this list (the Tractability overlay)
The evidence ranking above is universal. To turn it into *your* do-this-first list:

1. **Score Tractability (1–3) per action** — how realistically *you* will sustain it (3 = already do it / near-zero friction; 1 = you won't keep it up).
2. **Compute Priority = Evidence-only × Tractability.** Re-sort by Priority.
3. **Resolve conditional rows** with your own status (BP, lipids, smoking history, latitude, skin type) — some rows may not apply to you, or may jump in Impact.

A large gap between an action's Evidence-only rank and its Priority rank is a signal: strong evidence + low Tractability → invest in habit design rather than dropping it (see `_meta/scoring-rubric.md`).

**Full method + templates:** `synthesis/personalize.md` walks through all of this and points
to two copy-and-fill scaffolds — `_meta/profile.template.md` and
`_meta/ranked-actions.personal.template.md`. The fastest path is to clone the repo and work
through them with a coding agent; your filled-in overlay lives in a gitignored `personal/`
directory, so nothing about you is ever committed or published.

## Stopping rule check
- [x] ≥5 lever sessions complete *(all 8 done)*
- [ ] This table's top ~10 has been stable across the last 2 sessions *(this is the FIRST ranking — a second pass should confirm stability before declaring research "done")*
- If both checked: **stop researching, start doing.** Further research is now the over-research trap, not value creation.

## The actual list (top items, plain language)
The evidence says the highest-value moves, in plain terms:

1. **Don't smoke, and keep alcohol low.** The biggest single mortality lever, with reversible benefit.
2. **Be fit and strong** — regular cardio for the heart, lifting for muscle, balance work so you don't fall and break something later.
3. **Get blood pressure treated if it's high, and statins if your heart risk is up** — the clearest causal life-extenders in medicine.
4. **Do the screenings/vaccines that actually pay off** — colorectal (and cervical) cancer screening; shingles/RSV/flu/COVID/pneumococcal vaccines.
5. **Don't get sunburned, skip tanning beds** (and wear sunscreen) — cheap, prevents the one lethal skin cancer.
6. **Eat to avoid the clearly-bad** — minimize ultra-processed food and sugary drinks, don't become obese, DASH-style for blood pressure. Don't chase superfoods, supplements, or fasting.
7. **Protect the irreplaceable hardware** — hearing (treat loss early), vision (cataract surgery), functional teeth.
8. **Sleep ~7–7.5 h consistently; fix insomnia with CBT-I.** Keep social connection and a sense of purpose — good for you, though the *longevity* evidence there is softer.
