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

*Per-lever totals for the earlier 6 levers aren't split out here — the run→lever mapping
is unambiguous only for runs launched in-context; a precise per-lever breakdown can be
recovered by extracting each run's research question from its transcript if wanted.*
