export const heroEyebrow = "Research complete · 8 levers";

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
  { index: "05", label: "Medical & screening", slug: "medical-screening" },
  { index: "06", label: "Oral & sensory", slug: "oral-sensory" },
  { index: "07", label: "Sun & skin", slug: "sun-skin" },
  { index: "08", label: "Stress & social", slug: "stress-social" },
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
