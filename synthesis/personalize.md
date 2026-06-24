# Personalizing the ranking (the Tractability overlay)

`synthesis/ranked-actions.md` is the **general, evidence-based ranking** — sorted by
**Evidence-only** = `Impact × Certainty × Reversibility` (max 75). It is universal and
publishable: it deliberately leaves out the one factor that depends on *you*.

This guide turns that universal list into **your** do-this-first list. It's the method
behind the personal overlay; the overlay itself (one person's numbers) is never
published — it lives in a gitignored `personal/` directory.

## Why Tractability is separate

**Adherence is the real bottleneck.** A maximally-evidenced action you won't sustain has
zero real-world value — same as in personal finance, where the budget you actually keep
beats the optimal one you abandon. So the scoring model includes **Tractability** (how
realistically *you'll* sustain an action), but tags it so it can be stripped back out.

That gives **two views of the same data** (see `_meta/scoring-rubric.md` § *The
Tractability caveat*):

- **Evidence-only view** — `Impact × Certainty × Reversibility`. Universal, publishable,
  what `ranked-actions.md` is sorted by.
- **Do-this-first view** — `Priority = Evidence-only × Tractability`. Personal, private.

A large gap between an action's two ranks is itself a signal: strong evidence + low
Tractability → **invest in habit design** (fixed schedule, social structure, removing
friction) rather than dropping the action.

## The method (4 steps)

1. **Build a profile.** Copy `_meta/profile.template.md` to `personal/profile.md` and fill
   in the facts that resolve conditional rows and inform Tractability — age/sex, smoking
   and alcohol history, current exercise, BP/lipids if known, skin type and latitude,
   screenings already done, relevant conditions and meds. This is the most personal file;
   it stays gitignored.

2. **Score Tractability (1–3) per action.** For each row in `ranked-actions.md`:
   - **3** = you already do it, or it fits your life with near-zero friction.
   - **2** = doable, but takes real effort or a new habit.
   - **1** = you know you won't keep it up.

3. **Compute `Priority = Evidence-only × Tractability` and re-sort.** Copy
   `_meta/ranked-actions.personal.template.md` to `personal/ranked-actions.personal.md`
   (it already lists every action with its Evidence-only score) and fill in your T and
   Priority columns, then sort descending by Priority.

4. **Resolve the conditional rows** against your profile. Rows tagged *(conditional)* /
   *(if applicable)* — treat high BP, statins, lung-cancer screening, cervical screening,
   HiRIT-for-bone — either **drop out** (don't apply to you) or **jump in Impact** (they
   do). Mark each as N/A or score it for your situation.

The useful output isn't really the sorted number — it's the **split** that falls out of it:

- **MAINTAIN** — high-evidence things you already do. They top the Priority list (high
  evidence × already-doing), but need *no new effort*. Don't mistake them for your to-do list.
- **START** — high-evidence things you're *not* doing. This is the actual to-do list, and
  the high-evidence/low-Tractability items here are exactly where to spend habit-design effort.
- **IMPROVE** — things you do partially and could tighten up.

## Doing it with an agent (recommended)

The fastest way through steps 1–4 is to **clone this repo and walk through it with a
coding agent** (Claude Code or your tool of choice): point it at `ranked-actions.md`,
`_meta/scoring-rubric.md`, and the two templates, share your profile facts, and have it
draft your `personal/` overlay. Everything stays local — nothing about you is committed
or sent anywhere, because `personal/` is gitignored.

## Keep it private

`personal/` is gitignored (see `.gitignore`) precisely so the evidence ranking stays
publishable while your willpower estimates and health profile never are. Don't move
personalized content into a tracked file. Two files live there:

- `personal/profile.md` — your status, numbers, and conditional-row resolutions.
- `personal/ranked-actions.personal.md` — the re-sorted Priority list with the
  START/IMPROVE/MAINTAIN split.

## Website note

The public site is intentionally **evidence-only and impersonal** — the universal ranking
plus this method, with a link back to the repo. Personalization is **repo-only by design**:
no profile or Tractability data is ever collected or published. (A future in-browser
personalizer that computes Priority client-side and persists locally is possible, but is
explicitly out of scope for now.)
