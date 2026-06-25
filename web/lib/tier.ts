// Single source of truth for evidence-tier badge classes, so every surface
// (findings, claims, sources, open questions) encodes tier the same way.
// T1 → forest, T2 → rust, T3/T4 → paper-deep "informational" chip.
// Accepts decorated labels like "T1 (model)" or "T3–T4".
export function tierClass(tier: string): string {
  if (/^T2/.test(tier)) return "tier tier-2";
  if (/^T[34]/.test(tier)) return "tier tier-info";
  return "tier tier-1";
}

// Tier labels are categorical, but the source data decorates some with markdown
// (e.g. "T1 (as *predictor*)", "T1 (obs) + **[RCT]**"). Strip it for badge display
// so asterisks never leak into the rendered chip.
export function tierText(tier: string): string {
  return tier.replace(/\*+/g, "");
}
