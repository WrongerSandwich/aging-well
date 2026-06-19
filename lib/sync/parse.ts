export type LeverStatus = "complete" | "in-progress" | "pending";

export interface LeverData {
  slug: string;
  name: string;
  status: LeverStatus;
  claims: number;
}

export interface DerivedTotals {
  leversComplete: number;
  leversTotal: number;
  sourcesTotal: number;
  claimsTotal: number;
}

export interface DerivedData {
  generatedAt: string;
  levers: Record<string, LeverData>;
  totals: DerivedTotals;
}

export function parseLeverName(md: string): string {
  const match = md.match(/^#\s+Lever:\s*(.+?)\s*$/m);
  if (!match) throw new Error("No '# Lever:' heading found");
  return match[1];
}

export function parseStatus(md: string): LeverStatus {
  const line = md.match(/^>\s*Status:\s*(.+)$/m)?.[1] ?? "";
  if (/^RESEARCHED\b/.test(line)) return "complete";
  if (/RESEARCH IN PROGRESS/.test(line)) return "in-progress";
  return "pending";
}

// Counts numbered claim rows: table rows whose first cell is an integer.
// Excludes the "— T3/T4 below —" divider and blank spacer rows.
export function countClaims(md: string): number {
  const matches = md.match(/^\|\s*\d+\s*\|/gm);
  return matches ? matches.length : 0;
}

// Counts source rows: table rows whose first cell is an S-prefixed id (S001, ...).
export function countSources(sourcesMd: string): number {
  const matches = sourcesMd.match(/^\|\s*S\d+\s*\|/gm);
  return matches ? matches.length : 0;
}

export function parseLever(slug: string, md: string): LeverData {
  return {
    slug,
    name: parseLeverName(md),
    status: parseStatus(md),
    claims: countClaims(md),
  };
}

export function buildDerived(
  levers: LeverData[],
  sourcesMd: string,
  generatedAt: string,
): DerivedData {
  const bySlug: Record<string, LeverData> = {};
  for (const lever of levers) bySlug[lever.slug] = lever;
  return {
    generatedAt,
    levers: bySlug,
    totals: {
      leversComplete: levers.filter((l) => l.status === "complete").length,
      leversTotal: levers.length,
      sourcesTotal: countSources(sourcesMd),
      claimsTotal: levers.reduce((sum, l) => sum + l.claims, 0),
    },
  };
}
