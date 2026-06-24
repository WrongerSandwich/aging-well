# Research cost / methodology transparency

How this corpus was produced, and what it cost in tokens. Captured 2026-06-24 by
aggregating the per-agent usage in the deep-research workflow transcripts.

## Method
Each lever was researched with a **hybrid deep-research workflow** (fan-out web search →
fetch → adversarial multi-vote verification → synthesis). Cheap stages (scope/search/
fetch) ran on Sonnet; verification/synthesis ran on Opus. Several runs were **resumed
after hitting usage limits** (cached agents replay for free, only unfinished agents
re-run).

- **26 distinct workflow runs** across the 8 levers (several resumed; sprawling levers
  used multiple scoped runs — nutrition ~5, stress-social 5, sleep 3, etc.).
- **~3,677 sub-agent calls** total (one transcript each).

## Token totals (all research sub-agents)

| Category | Tokens | Note |
|---|---:|---|
| Output | 9,684,102 | the generated text — most expensive per token |
| Input (uncached) | 50,762,865 | fresh context |
| Cache creation | 146,840,225 | context written to cache (~1.25× input price) |
| Cache read | 657,951,247 | cached context replayed (~0.1× input price) — **76% of the total** |
| **TOTAL processed** | **865,238,439** | ~865M |

**Caveat — the headline is dominated by cheap cache reads.** Three-quarters of the 865M
is cached-context replay (the same lever/prompt context re-read by each of ~3,677 agents),
billed at roughly a tenth of input price. The "expensive" core is ~**9.7M output + ~50.8M
fresh input**. A true dollar figure needs current Sonnet/Opus pricing and the per-stage
model split — not estimated here.

## Per-run scale
- Average run: **~33M tokens processed**, ~140 sub-agents.
- Later **hybrid** runs (~105–115 agents) ran ~22–41M each; the earliest **all-Opus** runs
  (~200–224 agents) ran ~38–51M each — i.e., the hybrid fork roughly halved agent count
  and trimmed per-run spend, as intended.

## This session (stress-social + sun-skin) — precisely mapped
| Run | Tokens | Sub-agents |
|---|---:|---:|
| Social connection (run 1 + resume) | 25,612,622 | 124 |
| Social — causal/intervention re-run (1b) | 22,520,638 | 111 |
| Chronic stress (run + resume) | 38,621,404 | 199 |
| Purpose / meaning / wellbeing | 22,660,291 | 109 |
| Sun-skin — UV harm | 24,477,657 | 112 |
| Sun-skin — sun protection RCTs | 41,442,320 | 105 |
| Sun-skin — vitamin-D / sun-avoidance net | 40,502,885 | 106 |
| **This-session subtotal (2 levers)** | **215,837,817** | |
| Earlier 19 runs (6 levers, prior sessions) | 649,400,622 | |

## Per-lever breakdown (all 8 levers)
Each run mapped to its lever by extracting the verbatim research question from its
transcript (not keyword-guessed). Run counts match the research log exactly.

| Lever | Runs | Sub-agents | Output tok | TOTAL tok |
|---|---:|---:|---:|---:|
| Nutrition/Metabolic | 5 | 758 | 1,959,719 | 177,660,682 |
| Sleep | 3 | 422 | 1,382,729 | 118,120,044 |
| Medical-screening | 3 | 552 | 1,295,732 | 112,604,150 |
| Stress-social | 4 | 543 | 1,158,888 | 109,414,955 |
| Sun-skin | 3 | 323 | 1,023,026 | 106,422,862 |
| Oral-sensory | 3 | 447 | 1,136,534 | 103,356,841 |
| Substances | 3 | 314 | 949,683 | 75,849,558 |
| Exercise | 2 | 318 | 777,791 | 61,809,347 |
| **TOTAL** | **26** | **3,677** | **9,684,102** | **865,238,439** |

Spend tracked run-count, not lever complexity: **Nutrition** (5 runs — patterns, meat/
sugar/sodium, fiber/fish, CR/fasting/protein, adiposity/anchors) was the most expensive;
**Exercise** (2 runs) the cheapest. The early all-Opus runs (Nutrition, Sleep, Medical,
Oral-sensory, ~200+ agents/run) cost more per run than the later hybrid runs (Stress-
social, Sun-skin, ~105–125 agents/run) — visible in the lower agent counts for the same
or more topics.
