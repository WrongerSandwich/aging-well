export interface Finding {
  number: string;
  tierLabel: string;
  tierModifier?: "inverse";
  lever: string;
  category: "substances" | "exercise" | "sleep" | "nutrition-metabolic";
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
    lever: "Sleep",
    category: "sleep",
    titleLines: ["Sleep ~7½ hours,", "regularly."],
    summary:
      "The risk nadir for mortality, CVD, and stroke sits near 7–7.5h — but consistent sleep–wake timing is the better-measured signal, and the long-sleep “danger zone” is mostly reverse causation.",
    stat: { value: "1.88×", labelLines: ["higher CVD mortality", "with irregular timing"] },
    detail: {
      body: "Don’t fear-cap your sleep: the two largest meta-analyses don’t even agree that short sleep (under 7h) raises mortality. Treat 7–7.5h and a steady schedule as a sensible target, not a knife-edge.",
      source: "UK Biobank accelerometry · large cohorts · observational",
    },
  },
  {
    number: "06",
    tierLabel: "T1",
    lever: "Sleep",
    category: "sleep",
    titleLines: ["Fix insomnia with", "CBT-I, not pills."],
    summary:
      "First-line and durable to about a year. The real prize: in older adults it roughly halved incident depression — sleep’s one hard-endpoint causal win.",
    stat: { value: "~49%", labelLines: ["lower incident", "depression · NNT 7"] },
    detail: {
      body: "Use in-person or a validated digital CBT-I program ahead of hypnotics. The hard-endpoint evidence is for depression prevention; effects on cardiovascular events remain unproven.",
      source: "RCT · clinician-diagnosed endpoint · high confidence",
    },
  },
  {
    number: "07",
    tierLabel: "T1",
    lever: "Nutrition",
    category: "nutrition-metabolic",
    titleLines: ["Cut ultra-processed food", "and sugary drinks."],
    summary:
      "Nutrition’s 80/20 is subtractive: the robust, replicated signals are the harms, not the superfoods. Ultra-processed food is the one diet factor with a causal weight-gain RCT.",
    stat: { value: "+15%", labelLines: ["all-cause mortality", "per 10% of calories from UPF"] },
    detail: {
      body: "Sugar-sweetened beverages are the clearest single-food harm — about 27% higher type-2 diabetes risk per daily serving. Keep processed meat low too; unprocessed red meat is a weaker, low-certainty signal.",
      source: "Large cohorts + an intake/weight RCT · observational for mortality",
    },
  },
  {
    number: "08",
    tierLabel: "T1",
    lever: "Nutrition",
    category: "nutrition-metabolic",
    titleLines: ["Keep BMI ~20–25,", "mind your waist."],
    summary:
      "Adiposity is the causally-cleanest signal in all of nutrition once reverse causation is stripped out. The “obesity paradox” is an artifact, not protection.",
    stat: { value: "1.44×", labelLines: ["higher mortality", "at BMI 30–35"] },
    detail: {
      body: "Frame this as “don’t gain,” not “weight-loss is a guaranteed fix”: in a large RCT, intentional weight loss did not cut hard cardiovascular events. Waist size adds risk even within a normal BMI.",
      source: "Pooled cohorts · hard endpoints; intentional-loss RCT null",
    },
  },
  {
    number: "09",
    tierLabel: "T1",
    lever: "Nutrition",
    category: "nutrition-metabolic",
    titleLines: ["Eat plant-forward,", "high-fiber."],
    summary:
      "A Mediterranean, high-fiber, plant-forward pattern captures most of the benefit — you don’t need to be vegetarian, and plant-based done badly (refined grains, sugar) is worse, not better.",
    stat: { value: "15–30%", labelLines: ["lower mortality", "high vs. low fiber"] },
    detail: {
      body: "These are observational associations that shrink at realistic intake increments, so treat the pattern as sensible rather than precise. DASH is the one pattern with a clean causal win — about −7/−4 mmHg blood pressure.",
      source: "Large cohorts · observational; DASH from RCTs",
    },
  },
  {
    number: "10",
    tierLabel: "T1",
    lever: "Substances",
    category: "substances",
    cardModifier: "compact",
    titleLines: ["Alcohol has no health-justified floor."],
    summary:
      "Zero minimizes total harm. If drinking, ≤1/day is a harm-reduction ceiling—not a target.",
  },
  {
    number: "11",
    tierLabel: "T2",
    lever: "Substances",
    category: "substances",
    cardModifier: "compact muted",
    titleLines: ["Vaping is harm reduction, not harmless."],
    summary:
      "Do not start as a non-smoker. For smokers, a complete switch is defensible; dual use buys no measured benefit.",
  },
  {
    number: "12",
    tierLabel: "T1",
    lever: "Sleep",
    category: "sleep",
    cardModifier: "compact muted",
    titleLines: ["Treat sleep apnea for symptoms, not your heart."],
    summary:
      "Moderate–severe OSA tracks with cardiovascular risk, but CPAP did not cut hard cardiac events in RCTs. Treat it for sleepiness, blood pressure, and quality of life.",
  },
  {
    number: "13",
    tierLabel: "T2",
    lever: "Nutrition",
    category: "nutrition-metabolic",
    cardModifier: "compact muted",
    titleLines: ["Skip the supplement and fasting hype."],
    summary:
      "Fish-oil pills don’t replace fish (and raise atrial-fibrillation risk); fasting, caloric restriction, and time-restricted eating add nothing beyond the calories they cut. Coffee (≤3–4 cups) is fine.",
  },
];

export const heroEyebrow = "Research in progress";

export interface Filter {
  label: string;
  value: "all" | "substances" | "exercise" | "sleep" | "nutrition-metabolic";
}
export const findingsFilters: Filter[] = [
  { label: "All findings", value: "all" },
  { label: "Substances", value: "substances" },
  { label: "Exercise", value: "exercise" },
  { label: "Sleep", value: "sleep" },
  { label: "Nutrition", value: "nutrition-metabolic" },
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
  { index: "04", label: "Nutrition & metabolic", slug: "nutrition-metabolic" },
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
