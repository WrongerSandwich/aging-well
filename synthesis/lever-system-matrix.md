# Lever × System matrix

The many-to-many map. Built AFTER all 8 lever sessions. It's the structural defense
against double-counting: a lever researched once shows up here against every system it
protects, instead of being "rediscovered" per organ.

Cells = effect strength **as a lever** (intervention value, not just association):
**●** strong · **◐** moderate · **○** minor · blank = none.
Derived from the per-system coverage files in `systems/`. (Strength reflects net
*actionable* importance — a large but confounded/non-causal association is downgraded.)

|                      | Cardio | Neuro | Metabolic | Musculo | Immune | Sensory | Renal/Hep | Skin |
|----------------------|:------:|:-----:|:---------:|:-------:|:------:|:-------:|:---------:|:----:|
| Substances           |   ●    |   ◐   |           |         |   ●    |    ○    |     ◐     |  ○   |
| Exercise             |   ●    |   ◐   |     ◐     |    ●    |        |         |           |      |
| Sleep                |   ◐    |   ◐   |     ○     |         |   ○    |         |           |      |
| Nutrition/Metabolic  |   ●    |       |     ●     |         |   ◐    |         |     ◐     |      |
| Medical/Screening    |   ●    |   ◐   |     ○     |         |   ●    |         |           |      |
| Sun/Skin             |        |       |           |         |        |         |           |  ●   |
| Stress/Social        |   ○    |   ◐   |     ○     |         |        |         |           |      |
| Oral/Sensory         |        |   ●   |           |         |        |    ●    |           |      |

## Reading the matrix

**Dense rows (highest-leverage levers — should dominate `ranked-actions.md`):**
- **Substances** — the widest reach (Cardio ●, Immune ●, Neuro ◐, Renal/Hep ◐, + minor Sensory/Skin). One action (don't smoke / minimal alcohol) protects the most systems. Confirms it as the top lever.
- **Exercise** — Cardio ●, Musculo ● (the *only* RCT-causal musculoskeletal lever), Neuro ◐, Metabolic ◐. The broadest "do-more" lever.
- **Medical/Screening** — Cardio ● (BP/statins), Immune ● (vaccines/cancer screening), Neuro ◐ (stroke). Where the hard-endpoint RCT evidence concentrates.
- **Nutrition/Metabolic** — Cardio ●, Metabolic ● (dominant), Immune ◐, Renal/Hep ◐ (indirect). Broad but mostly observational; the causal core is DASH-BP + avoid-adiposity/UPF.

**Single-lever (by design, not a gap):**
- **Sensory** ← only Oral/Sensory ● — that lever *is* the system.
- **Skin** ← only Sun/Skin ● (+ Substances ○) — likewise.
- **Musculoskeletal** ← only Exercise ● — but it's RCT-causal (falls/fracture/bone), so the system is well-covered despite one lever.

**Genuine coverage gaps / thin columns:**
- **Renal/Hepatic** — no ● lever; reached only *indirectly* (Substances ◐ via alcohol→liver; Nutrition ◐ via adiposity/BP→NAFLD/CKD). Acceptable: the actual drivers (alcohol, BP, T2D, visceral fat) are each owned as primary endpoints by other levers, so kidney/liver are protected downstream rather than via a dedicated lever. Not worth a new research silo.
- **Neuro / dementia specifically** — many ◐ rows but the causal dementia-prevention evidence is thin across all of them (oral-sensory's hearing/vision correction is the strongest, still modest). The dominant remaining *biological* gap in the project — but it reflects the state of the science, not missing research.

**Low-reach levers (narrow + causally modest → expect low ranks):**
- **Stress/Social** — Neuro ◐ but Cardio/Metabolic only ○, and causally near-empty (no intervention RCT moves hard endpoints). Association-rich, lever-poor.
- **Sun/Skin** — single system (Skin ●), and even there the *mortality* stakes are low (skin-cancer case-fatality modest/falling). Real but narrow.

**Double-counting check:** a dense row is ONE lever protecting many systems, not many findings. Exercise's Cardio ● and Musculo ● are the same intervention (train) scored against two systems — in `ranked-actions.md` it is a single action, not two.
