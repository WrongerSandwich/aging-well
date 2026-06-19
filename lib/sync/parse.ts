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

// Counts real claim rows: numbered table rows whose Claim cell (the cell
// after the number) is non-empty. Excludes the "— T3/T4 below —" divider,
// blank spacer rows, and stub placeholder rows (which have a blank claim cell).
export function countClaims(md: string): number {
  let count = 0;
  for (const line of md.split("\n")) {
    const match = line.match(/^\|\s*\d+\s*\|([^|]*)\|/);
    if (match && match[1].trim() !== "") count += 1;
  }
  return count;
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
