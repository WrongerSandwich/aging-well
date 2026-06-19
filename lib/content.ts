export interface Finding {
  number: string;
  tierLabel: string;
  tierModifier?: "tier-2" | "inverse";
  lever: string;
  category: "substances" | "exercise";
  titleLines: string[];
  summary: string;
  stat?: { value: string; labelLines: string[] };
  detail?: { body: string; source: string };
  cardModifier?: "feature" | "dark" | "compact" | "compact muted";
}

export const findings: Finding[] = [
  {
    number: "01",
    tierLabel: "T1",
    lever: "Substances",
    category: "substances",
    cardModifier: "feature",
    titleLines: ["Don’t smoke.", "If you do, quit."],
    summary:
      "The highest-leverage action identified in the project so far.",
    stat: { value: "~3×", labelLines: ["all-cause mortality", "for lifelong smokers"] },
    detail: {
      body: "Lifelong smoking costs roughly 10–13 years. Quitting before 40 averts about 90% of excess mortality, with benefit detectable around three years after cessation.",
      source: "Large prospective cohorts · hard endpoints · high confidence",
    },
  },
  {
    number: "02",
    tierLabel: "T1",
    lever: "Exercise",
    category: "exercise",
    titleLines: ["Get off zero."],
    summary:
      "Reach about 150 minutes of moderate activity each week. Most benefit is bought by moving from sedentary to active.",
    stat: { value: "19–21%", labelLines: ["lower all-cause mortality", "vs. sedentary"] },
    detail: {
      body: "Returns continue toward 300 minutes per week, but diminish. Weekend-warrior scheduling performs similarly when total weekly volume is met.",
      source: "Prospective cohorts · hard endpoints · high confidence",
    },
  },
  {
    number: "03",
    tierLabel: "T1",
    tierModifier: "inverse",
    lever: "Exercise",
    category: "exercise",
    cardModifier: "dark",
    titleLines: ["Train strength", "about 2× / week."],
    summary:
      "A small dose independently lowers mortality. Include high-intensity loading if building bone is the goal.",
    stat: { value: "~13%", labelLines: ["lower all-cause mortality", "at 90–119 min/week"] },
    detail: {
      body: "Benefits appear to plateau beyond roughly 120 minutes per week. Moderate loads may maintain bone; high-intensity resistance and impact training is needed to build it.",
      source: "Cohorts for mortality · RCT surrogate evidence for bone",
    },
  },
  {
    number: "04",
    tierLabel: "T1",
    lever: "Exercise",
    category: "exercise",
    titleLines: ["Train balance", "on purpose."],
    summary:
      "Walking, stretching, or lifting alone do not reproduce the fall-prevention benefit of dedicated balance work.",
    stat: { value: "24%", labelLines: ["lower rate of falls", "with balance training"] },
    detail: {
      body: "Balance and functional training reduces falls causally in RCT meta-analysis. Exercise overall reduces fractures by about 25–33%.",
      source: "Cochrane RCT meta-analysis · high-grade evidence",
    },
  },
  {
    number: "05",
    tierLabel: "T1",
    lever: "Substances",
    category: "substances",
    cardModifier: "compact",
    titleLines: ["Alcohol has no health-justified floor."],
    summary:
      "Zero minimizes total harm. If drinking, ≤1/day is a harm-reduction ceiling—not a target.",
  },
  {
    number: "06",
    tierLabel: "T2",
    tierModifier: "tier-2",
    lever: "Substances",
    category: "substances",
    cardModifier: "compact muted",
    titleLines: ["Vaping is harm reduction, not harmless."],
    summary:
      "Do not start as a non-smoker. For smokers, a complete switch is defensible; dual use buys no measured benefit.",
  },
];

export const heroEyebrow = "Research in progress";

export interface Filter {
  label: string;
  value: "all" | "substances" | "exercise";
}
export const findingsFilters: Filter[] = [
  { label: "All findings", value: "all" },
  { label: "Substances", value: "substances" },
  { label: "Exercise", value: "exercise" },
];

export interface Tier {
  id: string;
  verdict: string;
  description: string;
  dim?: boolean;
}
export const tiers: Tier[] = [
  { id: "T1", verdict: "Act on it", description: "Large cohorts, RCTs, and meta-analyses with hard human outcomes." },
  { id: "T2", verdict: "Credible", description: "Smaller trials, consistent observational data, or surrogate outcomes." },
  { id: "T3", verdict: "Inform only", description: "Mechanistic, animal, small, or conflicting human evidence.", dim: true },
  { id: "T4", verdict: "Do not rank", description: "Plausible but speculative; often adjacent to commercial longevity hype.", dim: true },
];

// Status rows. Rows with `slug` pull live status + claim counts from derived.json
// at render time (StatusSection). Rows without a slug are editorial/grouped.
export interface StatusRow {
  index: string;
  label: string;
  slug?: string;
  note?: string;        // override note; if absent and slug present, "<claims> claims" is shown
  statusLabel?: string; // override; if absent and slug present, derived status drives it
  active?: boolean;     // highlights the row (lever-row active-row)
}
export const statusRows: StatusRow[] = [
  { index: "01", label: "Substances", slug: "substances" },
  { index: "02", label: "Exercise", slug: "exercise" },
  { index: "03", label: "Sleep", slug: "sleep" },
  { index: "04", label: "Nutrition & metabolic", slug: "nutrition-metabolic", active: true },
  { index: "05", label: "Medical screening", slug: "medical-screening" },
  {
    index: "06–08",
    label: "Sun, stress, oral & sensory",
    note: "Not yet researched",
    statusLabel: "Pending",
  },
];

export interface Question {
  number: string;
  text: string;
}
export const questions: Question[] = [
  { number: "01", text: "Does cannabis cardiovascular risk survive proper adjustment for tobacco co-use?" },
  { number: "02", text: "What are the verified intervention effects of resistance training on muscle mass and function?" },
  { number: "03", text: "Where exactly does resistance-training benefit plateau?" },
];

// The two right-hand metric cards are static; the two count cards are derived.
export interface MetricCard {
  value: string;
  unit?: string;
  label: string;
}
export const metricsStatic: MetricCard[] = [
  { value: "T1–T4", label: "Explicit evidence tiers" },
];
