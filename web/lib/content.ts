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
// and their display name from the lever registry (StatusSection). `label` is only
// for editorial slug-less rows; slugged rows never hard-code a name, so it can't
// drift from the canonical spelling.
export interface StatusRow {
  index: string;
  slug?: string;
  label?: string;       // only for editorial rows without a slug
  note?: string;        // override note; if absent and slug present, "<claims> claims" is shown
  statusLabel?: string; // override; if absent and slug present, derived status drives it
  active?: boolean;     // highlights the row (lever-row active-row)
}
export const statusRows: StatusRow[] = [
  { index: "01", slug: "substances" },
  { index: "02", slug: "exercise" },
  { index: "03", slug: "sleep" },
  { index: "04", slug: "nutrition-metabolic" },
  { index: "05", slug: "medical-screening" },
  { index: "06", slug: "oral-sensory" },
  { index: "07", slug: "sun-skin" },
  { index: "08", slug: "stress-social" },
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
