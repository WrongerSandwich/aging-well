# Research cost / methodology transparency

How this corpus was produced, what it cost in tokens, and the API-list-price dollar
equivalent. Figures from aggregating per-agent usage in the deep-research workflow
transcripts (deduplicated by message ID — see note). Captured 2026-06-24.

## Method
Each lever was researched with a **hybrid deep-research workflow** (fan-out web search →
fetch → adversarial multi-vote verification → synthesis). Cheap stages (scope/search/
fetch) ran on **Sonnet 4.6**; verification/synthesis ran on **Opus 4.8**. Several runs were
**resumed after hitting usage limits** (cached agents replay for free; only unfinished
agents re-run).

- **26 distinct workflow runs** across the 8 levers (sprawling levers used multiple scoped
  runs — nutrition 5, stress-social 4, sleep 3, medical 3, oral-sensory 3, substances 3,
  sun-skin 3, exercise 2).
- **~3,677 sub-agent calls** total.

> **Counting note.** Each agent message is logged as multiple streaming snapshots (plus a
> duplicated `iterations` block). A naive sum triple-counts. All figures below are
> **deduplicated by message ID** (final snapshot per message). An earlier draft of this
> file reported ~865M tokens by summing snapshots; the real deduplicated total is **~352M**.

## Token totals (all research sub-agents, deduplicated, by model)

| Model | Output | Input (uncached) | Cache write | Cache read |
|---|---:|---:|---:|---:|
| Opus 4.8 (verify/synthesize) | 3,952,019 | 18,792,249 | 44,102,181 | 204,202,436 |
| Sonnet 4.6 (scope/search/fetch) | 883,540 | 13,578 | 10,237,244 | 69,384,627 |
| **Total** | **4,835,559** | **18,805,827** | **54,339,425** | **273,587,063** |

**Grand total: ~351.6M tokens processed.** Cache reads (273.6M, ~78%) dominate — the same
lever/prompt context replayed by each of ~3,677 agents, billed at ~0.1× input price. The
expensive core is ~4.8M output + ~18.8M fresh input.

## Cost estimate (API list prices)
Not what it actually cost (this ran on a Claude subscription) — the equivalent if billed at
public API rates. Prices per million tokens: **Opus 4.8** $5 in / $25 out; **Sonnet 4.6**
$3 in / $15 out. Cache **write** = 1.25× input (5-minute TTL, which the workflow uses);
cache **read** = 0.1× input.

| Model | Output | Input | Cache write | Cache read | **Subtotal** |
|---|---:|---:|---:|---:|---:|
| Opus 4.8 | $98.80 | $93.96 | $275.64 | $102.10 | **$570.50** |
| Sonnet 4.6 | $13.25 | $0.04 | $38.39 | $20.82 | **$72.50** |
| **Total** | | | | | **≈ $643** |

Where the money went: **cache writes are the single biggest line ($314)** — every agent
writes the lever context to cache once — followed by Opus output+input ($193). The hybrid
fork paid off: Sonnet did ~85% of the *agent-count* work for ~11% of the cost ($72 of $643),
because the expensive Opus verify/synthesis stage is where the output tokens (priced 5×
input) concentrate. An all-Opus run would have cost materially more.

**Caveats:** (1) counts research sub-agents only — excludes the main orchestration loop
(this assistant's own session tokens), which would add to the total. (2) Assumes 5-minute
cache TTL throughout. (3) List prices; Batch API (−50%) or 1-hour cache TTL would shift it.

## Per-lever breakdown (deduplicated)
Each run mapped to its lever by extracting the verbatim research question from its
transcript (not keyword-guessed). Run counts match the research log exactly.

| Lever | Runs | Output tok | Total tok | **API $ (list)** |
|---|---:|---:|---:|---:|
| Nutrition/Metabolic | 5 | 979,005 | 72,144,478 | $125.32 |
| Stress-social | 4 | 581,178 | 47,002,079 | $88.68 |
| Medical-screening | 3 | 649,069 | 45,036,065 | $86.80 |
| Sleep | 3 | 688,807 | 45,717,664 | $81.93 |
| Oral-sensory | 3 | 566,435 | 42,364,742 | $78.91 |
| Sun-skin | 3 | 512,405 | 44,948,941 | $67.55 |
| Substances | 3 | 470,903 | 29,596,533 | $63.43 |
| Exercise | 2 | 387,757 | 24,757,372 | $50.39 |
| **Total** | **26** | **4,835,559** | **351,567,874** | **≈ $643** |

Spend tracked **run count**, not lever importance: **Nutrition** (5 runs) was the most
expensive at ~$125; **Exercise** (2 runs) the cheapest at ~$50 — yet exercise produced some
of the strongest causal findings in the project. This-session levers (stress-social +
sun-skin) ≈ $156 of the $643; the earlier 6 levers ≈ $487.
