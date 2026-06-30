# Product

## Register

brand

## Users

Health-literate generalists: curious, intelligent readers who want the *reasoning*
behind an aging-health recommendation, not just the conclusion. They can follow an
effect size and a caveat; they are allergic to being talked down to and allergic to
hype. They arrive skeptical (the longevity space has earned that skepticism) and stay
only if the site visibly earns trust. Secondary reader: the author himself, using it
as a durable personal reference.

The job to be done: "Tell me what actually moves the needle on aging well, how sure we
are, and why, without selling me anything." Success is a reader who trusts a ranking
*because they can see the evidence behind it*, and who leaves able to act on the few
things that matter most.

## Product Purpose

A durable, evidence-tiered public reference for aging healthily. It avoids catastrophic,
irreversible mistakes first and ignores the last 5% of optimization. The goal is explicitly
**not** anti-aging or life-extension hype; it is protecting the hardware that does not come
back (bone, neurons, enamel, cochlea, retina, skin) and surfacing the handful of
high-leverage actions that the evidence actually supports.

The site renders research organized by **lever** (exercise, sleep, substances, nutrition,
etc.), with every claim tagged by evidence tier (T1–T4) and ranked by a transparent rubric
that weights irreversibility and effect size. Success is the reader trusting the ranking
because the reasoning is visible, and the project reaching its own **stopping rule**: once
the ranked actions stabilize, stop researching and start doing.

The home page surfaces the **literal top 5 ranked actions** directly from the scoring
output — the same text and order as the full /actions table, not an editorial paraphrase.
The full scored table (all ranked actions, the do-not-bother list, and the lever × system
matrix) lives on /actions.

## Brand Personality

**Warm, plainspoken, honest.** Calm authority, not clinical coldness. It explains its
reasoning in human language and admits uncertainty out loud rather than papering over it.
Confident about what the evidence says, equally confident about saying "we don't know."
Anti-hype by conviction: it would rather under-claim than oversell. The voice of a
well-read, careful friend who has done the homework, not a brand, a clinic, or a guru.

## Anti-references

This should NOT look or feel like:

- **Supplement / biohacker hype.** No neon, no urgency, no "optimize everything," no
  longevity-influencer grift. The whole project is a reaction against this; the design
  must never accidentally echo it.
- **Clinical / WebMD sterility.** No cold teal-and-white medical-portal palette, no stock
  photos of smiling seniors, no generic health-site blandness. Trust here comes from
  rigor and voice, not from looking like a hospital.
- **Generic SaaS dashboard.** No hero-metric template (big number + label + gradient),
  no identical icon-card grids, no gradient accents, no dark-mode-because-it-looks-cool.
- **Academic / dense PDF.** Rigor is not an excuse for a wall of text. Citations, effect
  sizes, and tiers must be present but legible, never an impenetrable journal dump.

## Design Principles

1. **Show the evidence, don't just assert it.** Every ranking, claim, and number is
   visibly backed by its tier and source. The design's main job is to make *why we believe
   this* as present as *what we believe*. Trust is earned on the page, not asserted.

2. **Irreversibility is the spine.** The hierarchy of the content, and therefore of the
   design, foregrounds protecting what doesn't come back over optimizing what does. Visual
   weight should track real stakes.

3. **Tiers are never blended.** T1 outcomes and T4 speculation must be visually
   distinguishable at a glance and never flattened into one undifferentiated list. Certainty
   has a look; uncertainty has a different one.

4. **Plainspoken over clever.** Say it in human language. Admit uncertainty in the open.
   Restraint and clarity read as honesty; flourish for its own sake reads as selling.

5. **Built to last, not to convert.** This is a reference, not a funnel. No growth-hack
   patterns, no manufactured urgency. Calm, durable, and quietly confident beats loud.

## Accessibility & Inclusion

Target **WCAG 2.1 AA**. The site is long-form reading, so legibility is core, not a
checkbox: comfortable line length (65–75ch), sufficient contrast for body and the muted
mono labels against the warm paper background, and a real visible focus state. Evidence
tiers and ranking strength must never be encoded by **color alone** (use labels/text
alongside the T1–T4 badges and matrix cells). Honor `prefers-reduced-motion` (already
respected for smooth-scroll). Keep tap targets and nav usable down to small screens.
