---
name: Aging Well
description: An evidence-tiered, editorial reference for aging well, built like a naturalist's almanac.
colors:
  rust: "#b84d2e"
  forest: "#173b31"
  lime: "#d7ee75"
  sage: "#a8bd9d"
  paper: "#f3f0e7"
  paper-deep: "#e9e4d8"
  ink: "#1b2521"
  muted: "#5a625b"
  line: "#1b25212e"
typography:
  display:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(60px, 8.2vw, 112px)"
    fontWeight: 500
    lineHeight: 0.82
    letterSpacing: "-0.06em"
  headline:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(44px, 5.8vw, 74px)"
    fontWeight: 500
    lineHeight: 0.95
    letterSpacing: "-0.045em"
  title:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "42px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "DM Mono, monospace"
    fontSize: "10px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.1em"
rounded:
  none: "0"
  pill: "100px"
spacing:
  xs: "8px"
  sm: "14px"
  md: "24px"
  lg: "32px"
  section: "120px"
components:
  principle-card:
    backgroundColor: "{colors.forest}"
    textColor: "#ffffff"
    rounded: "{rounded.none}"
    padding: "34px"
  finding-card:
    backgroundColor: "#ffffff1f"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "30px"
  finding-card-feature:
    backgroundColor: "{colors.sage}"
    textColor: "{colors.ink}"
  finding-card-dark:
    backgroundColor: "{colors.forest}"
    textColor: "#ffffff"
  tier-badge:
    backgroundColor: "{colors.forest}"
    textColor: "#ffffff"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "5px 8px"
  tier-badge-t2:
    backgroundColor: "{colors.rust}"
    textColor: "#ffffff"
  filter-chip:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    padding: "9px 16px"
  filter-chip-active:
    backgroundColor: "{colors.forest}"
    textColor: "#ffffff"
  primary-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "0 0 9px"
---

# Design System: Aging Well

## 1. Overview

**Creative North Star: "The Naturalist's Almanac"**

This is a reference printed to last, not an app and not a campaign. Picture a well-set
almanac on warm uncoated paper: botanical greens, a terracotta accent used sparingly,
serif headlines with editorial confidence, and small monospace marginalia that read like
a careful researcher's annotations. The aesthetic carries the project's strategic line:
trust is earned by showing the evidence and admitting uncertainty, so the design favors
legible structure and quiet authority over flourish. It looks worked-in and durable, the
opposite of a product trying to convert you.

Density is editorial, not dashboard. Generous vertical rhythm (sections breathe at 120px),
large serif display type doing the talking, and a strict hairline grid organizing findings
like entries in a catalogue. Color is restrained: the warm paper and forest green carry the
surface, and the rust accent appears rarely enough that it always means something. The one
piece of theater allowed is a hard, blur-less offset shadow on a feature card, a printerly
block of sage that reads like ink registration, never soft web-glow.

This system explicitly rejects four looks. It is **not** biohacker hype (no neon, no
urgency, no "optimize everything"). It is **not** clinical WebMD sterility (no teal-and-white
medical portal, no stock photography). It is **not** a generic SaaS dashboard (no
hero-metric template, no identical icon-card grid, no gradient accents, no dark-mode-for-cool).
And it is **not** a dense academic PDF (rigor stays legible; tiers and citations are present
but never a wall of text).

**Key Characteristics:**
- Warm paper ground (#f3f0e7), never pure white, never dark mode.
- Serif display (Newsreader) for voice; monospace (DM Mono) for evidence marginalia.
- Restrained palette: forest + paper carry the surface, rust accent appears on under ~10%.
- Sharp and printerly: 0px radius, hairline rules, square tier badges.
- Flat by default, with one signature hard offset shadow as the only allowed elevation.

## 2. Colors

A warm, earthy, botanical palette: paper and forest do the structural work, rust is the rare
accent, lime is reserved for highlights on dark ground.

### Primary
- **Rust** (#b84d2e): The single accent voice. Eyebrows, emphasized words inside serif
  headlines (`h1 em`), the lead statistic on a finding, citation links, and the T2 tier badge.
  Its scarcity is the point; when rust appears, it means "look here."

### Secondary
- **Forest** (#173b31): The structural dark. Carries feature/principle cards, the evidence-tier
  section, the active filter chip, completed-status badges, and the default (T1) tier badge.
  This is the color of weight and certainty.

### Tertiary
- **Lime** (#d7ee75): Highlight reserved for use **on forest** only, where contrast is high:
  card indices, mono labels on dark, the inverse tier badge, the active-row lever highlight,
  and the lead stat inside dark cards. Never used on paper (fails contrast).
- **Sage** (#a8bd9d): The feature-card ground and the color of the signature hard offset
  shadow. A muted, dusty green that recedes.

### Neutral
- **Paper** (#f3f0e7): The page. Warm uncoated-stock cream. The default background everywhere.
- **Paper Deep** (#e9e4d8): One step down for tonal layering: the metrics band, muted findings,
  inline code backgrounds, default status badges.
- **Ink** (#1b2521): Primary text. A near-black tinted toward forest, never pure #000.
- **Muted** (#5a625b): Secondary text, mono labels, section notes, nav links at rest. Tuned
  to clear WCAG AA (4.5:1) against both paper and the paper-deep tonal step.
- **Line** (rgba(27,37,33,0.18)): The hairline. Every divider, grid line, and border.

### Named Rules
**The Rare Rust Rule.** Rust is the only accent and it appears on roughly ≤10% of any screen.
Use it for one emphasized word, one lead stat, or one badge, never as a fill across a region.
If two rust elements compete for attention in the same view, one of them is wrong.

**The No-White, No-Dark-Mode Rule.** The ground is always warm paper (#f3f0e7). Never `#fff`,
never `#000`, and never a dark theme. Depth comes from paper to paper-deep to forest, in that
order.

## 3. Typography

**Display Font:** Newsreader (with Georgia, serif fallback)
**Body Font:** Manrope (with Arial, sans-serif fallback)
**Label/Mono Font:** DM Mono (with monospace fallback)

**Character:** Newsreader brings literary, almanac-like authority to headlines and pull
quotes (it is also used italic for emphasis). Manrope keeps body copy clean, warm, and
unfussy. DM Mono is the researcher's voice: every eyebrow, tier label, stat caption, and
citation is set in uppercase mono, like annotations in a field notebook.

### Hierarchy
- **Display** (Newsreader 500, clamp(60px, 8.2vw, 112px), line-height 0.82, -0.06em): The
  page H1 only. Tight, dramatic, set close. Emphasized words inside it turn rust.
- **Headline** (Newsreader 500, clamp(44px, 5.8vw, 74px), line-height 0.95, -0.045em):
  Section H2s. The structural beats of a page.
- **Title** (Newsreader 500, 42px, line-height 1, -0.03em): Finding-card headlines and other
  serif object titles. Pull quotes use the same family larger (36px) and italic.
- **Body** (Manrope 400, 15px base / 18px in lead intros, line-height 1.7): Reading copy.
  Cap measure at 65–75ch (prose body is capped at 760px). Body color is ink for primary copy,
  muted or #4f5b55 for supporting copy.
- **Label** (DM Mono 500, 10–11px, letter-spacing 0.06–0.13em, UPPERCASE): Eyebrows, tier
  badges, lever tags, stat captions, citations, nav. The connective tissue of the whole system.

### Named Rules
**The Mono Marginalia Rule.** Anything that is metadata, not prose, is set in DM Mono,
uppercase, letter-spaced: tiers, sources, indices, captions, status. Prose is never mono;
mono is never a paragraph. The split between serif/sans voice and mono annotation is what
makes it read like a researched document.

**The Serif-Speaks Rule.** Headlines, titles, claims, and pull quotes are always serif
(Newsreader). Sans (Manrope) is for reading body and UI only. Never set a headline in sans.

## 4. Elevation

The system is **flat by default**. There are no soft, blurred, ambient web-shadows anywhere;
depth is conveyed through tonal layering (paper to paper-deep to forest) and the hairline grid.
The single, deliberate exception is one signature shadow.

### Shadow Vocabulary
- **Signature offset block** (`box-shadow: 16px 16px 0 var(--sage)`): A hard, blur-less,
  sage-colored offset under the forest principle/feature card. It reads as print registration
  or a letterpress drop, not as elevation. On small screens it tightens to `8px 8px 0`. This is
  the only shadow in the system.

### Named Rules
**The One Shadow Rule.** The hard sage offset block is the only shadow permitted, and only on
hero/feature cards. No `box-shadow` with a blur radius greater than 0 may appear anywhere.
If you reach for a soft drop-shadow to separate two surfaces, use a hairline border or a
tonal step instead.

## 5. Components

### Buttons
- **Shape:** Square. 0px radius (`--rounded-none`). Buttons are rare; the primary call to
  action is usually a link, not a filled button.
- **Primary link** (`.primary-link`): An underlined inline link, ink-colored, mono uppercase,
  with a 1px bottom border and a trailing arrow glyph (e.g. "See all 30 ranked actions →"). Not a
  filled pill.
- **Hover / Focus:** Color shifts toward ink; underline persists. Keep a visible focus-visible
  outline for keyboard users.

### Chips (filters)
- **Style:** Pill-shaped (100px radius) — the one place rounding is allowed — with a hairline
  border, transparent background, muted mono-ish text, 9px/16px padding.
- **State:** On hover/active the chip fills **forest** with white text. Selection is shown by
  fill, not by a colored left-stripe.

### Cards / Containers
- **Corner Style:** Square. 0px radius everywhere.
- **Background:** Findings sit on a faint white wash (`rgba(255,255,255,0.12)`) inside the
  hairline grid. Variants: `feature` is sage, `dark` is forest/white, `muted` is paper-deep.
- **Shadow Strategy:** Flat. Only the principle/feature card carries the signature offset block
  (see Elevation). All other cards are separated by the hairline grid alone.
- **Border:** The findings grid is built from shared 1px hairlines (`--line`), so cards read as
  a catalogue of cells, not as floating objects.
- **Internal Padding:** 30–34px on cards; 24px on small screens.

### Tier Badges (signature component)
- **Style:** Small, square (0 radius), mono uppercase, 5px/8px padding. This is how evidence
  certainty is shown at a glance and it must never be flattened away.
- **Encoding:** T1 = forest, T2 = rust, informational/T3–T4 = paper-deep with muted text,
  inverse (on dark) = lime on forest. **Tier is never encoded by color alone** — the badge
  always carries its literal label text (e.g. "T1") beside the color.

### Navigation
- **Style:** A 76px hairline-bottomed header. Serif/sans brand mark with a small forest-rust
  ring as the logo. Nav links are 13px muted, shifting to ink on hover. A mono "snapshot"
  caption sits to the right behind a hairline divider.
- **Mobile:** Below 850px the nav links collapse and the snapshot caption moves to the right edge.

### Lever row (signature component)
- A 4-column hairline-separated row (index / name / detail / score) in mono. Completed rows
  gain ink color; the active row highlights with a **lime** background. This is the catalogue
  index of the research.

## 6. Do's and Don'ts

### Do:
- **Do** keep the ground warm paper (#f3f0e7). Layer depth as paper to paper-deep (#e9e4d8) to
  forest (#173b31).
- **Do** reserve rust (#b84d2e) for a single emphasis per view: one word, one stat, or one badge.
- **Do** set all metadata (tiers, sources, captions, eyebrows, indices) in DM Mono, uppercase,
  letter-spaced.
- **Do** set every headline, title, and pull quote in Newsreader serif.
- **Do** separate cards with the 1px hairline grid (`--line`) and keep corners square (0 radius).
- **Do** keep the one signature shadow (`16px 16px 0` sage, no blur) for feature cards only.
- **Do** label evidence tiers with text (T1–T4) alongside color, and cap reading measure at 65–75ch.

### Don't:
- **Don't** evoke **supplement / biohacker hype**: no neon, no gradients, no urgency, no
  "optimize everything" energy.
- **Don't** drift toward **clinical / WebMD sterility**: no teal-and-white medical palette, no
  pure-white backgrounds, no stock photography.
- **Don't** build a **generic SaaS dashboard**: no hero-metric template (big number + label +
  gradient), no identical icon-card grid, no gradient accents, no dark mode.
- **Don't** produce a **dense academic PDF**: rigor must stay legible; never a wall of text with
  no hierarchy.
- **Don't** use any `box-shadow` with a blur radius (the only shadow is the hard sage offset).
- **Don't** use a colored `border-left`/`border-right` stripe to mark a card, alert, or selection;
  use a full hairline, a tonal fill, or a forest fill instead.
- **Don't** encode evidence tier or ranking strength by color alone; always include the label.
- **Don't** set lime text on paper (it fails contrast); lime is for use on forest only.
