# Scoring rubric

Score each **action** (not each claim — actions are what you rank and do). Rank by
the **product** of four factors, descending.

```
Priority = Impact × Certainty × Reversibility-weight × Tractability
```

| Factor | Range | How to assign |
|--------|-------|---------------|
| **Impact** | 1–5 | Effect on hard endpoints (mortality, disability, quality-adjusted years). 5 = among the largest known modifiable factors; 1 = marginal. |
| **Certainty** | 1–5 | Derived from evidence tier: **T1=5, T2=4, T3=2, T4=1.** Do not hand-wave this upward. |
| **Reversibility-weight** | 1–3 | IRREVERSIBLE=3, SLOW=2, FAST=1. Protecting the unrecoverable is worth more. |
| **Tractability** | 1–3 | How realistically *you* will sustain it. Personal, not from the literature. 3 = fits your life with near-zero friction; 1 = you know you won't keep it up. |

Max score = 5 × 5 × 3 × 3 = **225**.

## Why multiplicative, not additive

A high-impact action built on T4 evidence gets crushed by Certainty=1 — exactly the
behavior you want. It keeps the supplement/longevity-hype penumbra from outranking
sleep. An additive model would let hype items creep up the list by accumulating
mediocre scores across factors. Multiplication makes any single near-zero factor
veto the action, which matches reality: garbage evidence, or an action you won't do,
should sink the priority regardless of how good the other factors look.

## The Tractability caveat (read this)

Tractability is the one subjective, personal factor, and it's contestable. The
"objective" ranking would omit it. It's included because adherence is the actual
bottleneck — a plan you won't follow is worth nothing, same as in personal finance.

**But tag it.** In `ranked-actions.md`, record the raw (Impact × Certainty ×
Reversibility) sub-score in a separate column so you can re-sort on **pure evidence**
any time, ignoring your own willpower estimate. Two views, same data:

- **Do-this-first view:** full Priority (includes Tractability).
- **Pure-evidence view:** Impact × Certainty × Reversibility only.

If the two views disagree sharply for some action, that's a signal: either the
evidence is strong and you should invest in raising its Tractability (habit design,
social structure, fixed schedule), or it's not worth forcing.

For the step-by-step personalization method (build a profile, score Tractability,
compute Priority, resolve conditional rows) and the reusable templates, see
`synthesis/personalize.md`.

## Worked example (illustrative — confirm with real research)

| Action | Impact | Certainty | Rev. | Tract. | Priority | Evidence-only |
|--------|:------:|:---------:|:----:|:------:|:--------:|:-------------:|
| Don't smoke | 5 | 5 (T1) | 3 | 3 | **225** | 75 |
| Resistance train 2×/wk | 4 | 5 (T1) | 3 | 2 | **120** | 60 |
| Treat hearing loss early | 3 | 4 (T2) | 3 | 3 | **108** | 36 |
| Take NAD+ precursor | 4? | 1 (T4) | 2 | 3 | **24** | 8 |

Note how NAD+ — high *claimed* impact — sinks to the bottom on Certainty, while a
modest-impact but well-evidenced, irreversible-protecting action (hearing) ranks high.
That asymmetry is the whole point.
