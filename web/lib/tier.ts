// Single source of truth for evidence-tier badge classes, so every surface
// (findings, claims, sources, open questions) encodes tier the same way.
// T1 → forest, T2 → rust, T3/T4 → paper-deep "informational" chip.
// Accepts decorated labels like "T1 (model)" or "T3–T4".
export function tierClass(tier: string): string {
  if (/^T2/.test(tier)) return "tier tier-2";
  if (/^T[34]/.test(tier)) return "tier tier-info";
  return "tier tier-1";
}
