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

export interface Claim {
  number: number;
  text: string;
  systems: string;
  tier: string;
  tierGroup: "primary" | "informational";
  effect: string;
  reversibility: string;
  confidence: string;
  sources: string[];
}

export interface Source {
  id: string;
  citation: string;
  url: string | null;
  tier: string;
}

export interface LeverDetail {
  slug: string;
  name: string;
  status: LeverStatus;
  scope: string;
  claims: Claim[];
  dose: string;
  actions: string;
  caveats: string;
  openQuestions: string;
}

// Parses the 8-column claims table into structured records. Skips the
// "— T3/T4 below —" divider and stub placeholder rows (blank claim cell).
export function parseClaimsDetailed(md: string): Claim[] {
  const claims: Claim[] = [];
  for (const line of md.split("\n")) {
    if (!/^\|\s*\d+\s*\|/.test(line)) continue;
    const cells = line.split("|").map((c) => c.trim());
    // ["", "#", "Claim", "Systems", "Tier", "Effect", "Reversibility", "Confidence", "Source(s)", ""]
    if (cells.length < 9) continue;
    const text = cells[2];
    if (text === "") continue;
    const tier = cells[4];
    claims.push({
      number: Number(cells[1]),
      text,
      systems: cells[3],
      tier,
      tierGroup: /^T[12]/.test(tier) ? "primary" : "informational",
      effect: cells[5],
      reversibility: cells[6],
      confidence: cells[7],
      sources: cells[8].match(/S\d+/g) ?? [],
    });
  }
  return claims;
}

// Returns the text body between "## <heading>" and the next "## " heading.
export function parseSection(md: string, heading: string): string {
  const lines = md.split("\n");
  const start = lines.findIndex((l) => l.trim() === `## ${heading}`);
  if (start === -1) return "";
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (lines[i].startsWith("## ")) {
      end = i;
      break;
    }
  }
  return lines.slice(start + 1, end).join("\n").trim();
}

// Parses the sources table; strips the "[link](url)" markdown into a bare url.
export function parseSources(sourcesMd: string): Source[] {
  const sources: Source[] = [];
  for (const line of sourcesMd.split("\n")) {
    if (!/^\|\s*S\d+\s*\|/.test(line)) continue;
    const cells = line.split("|").map((c) => c.trim());
    if (cells.length < 5) continue;
    const raw = cells[2];
    const linkMatch = raw.match(/\[link\]\((https?:\/\/[^)]+)\)/);
    sources.push({
      id: cells[1],
      citation: raw.replace(/\s*\[link\]\([^)]+\)/, "").trim(),
      url: linkMatch ? linkMatch[1] : null,
      tier: cells[3],
    });
  }
  return sources;
}

export function parseLeverDetail(slug: string, md: string): LeverDetail {
  return {
    slug,
    name: parseLeverName(md),
    status: parseStatus(md),
    scope: parseSection(md, "Scope"),
    claims: parseClaimsDetailed(md),
    dose: parseSection(md, "Dose / threshold"),
    actions: parseSection(md, "Actions (behavioral, checkable)"),
    caveats: parseSection(md, "Caveats / population modifiers"),
    openQuestions: parseSection(md, "Open questions"),
  };
}

const LEVER_SLUG_MAP: Record<string, string> = {
  substances: "substances",
  exercise: "exercise",
  sleep: "sleep",
  nutrition: "nutrition-metabolic",
  "nutrition-metabolic": "nutrition-metabolic",
  medical: "medical-screening",
  "medical-screening": "medical-screening",
  sun: "sun-skin",
  "sun-skin": "sun-skin",
  stress: "stress-social",
  "stress-social": "stress-social",
  oral: "oral-sensory",
  "oral-sensory": "oral-sensory",
};

export function leverSlug(display: string): string {
  const key = display
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[\s/]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return LEVER_SLUG_MAP[key] ?? key;
}

export type MatrixCell = "strong" | "moderate" | "minor" | "none";
export interface MatrixRow {
  lever: string;
  slug: string;
  cells: MatrixCell[];
}
export interface LeverSystemMatrix {
  systems: string[];
  rows: MatrixRow[];
}

const GLYPH: Record<string, MatrixCell> = {
  "●": "strong",
  "◐": "moderate",
  "○": "minor",
  "": "none",
};

export function parseMatrix(md: string): LeverSystemMatrix {
  const lines = md.split("\n");
  const tableRows = lines.filter((l) => l.trim().startsWith("|"));
  // First table row is the header; second is the |:--:| separator; rest are data.
  const header = tableRows[0]
    .split("|")
    .slice(2, -1) // drop leading label col + outer empties
    .map((c) => c.trim());
  const rows: MatrixRow[] = [];
  for (const line of tableRows.slice(2)) {
    const cells = line.split("|").map((c) => c.trim());
    const lever = cells[1];
    if (!lever) continue;
    const cellValues = cells.slice(2, 2 + header.length).map((c) => GLYPH[c] ?? "none");
    rows.push({ lever, slug: leverSlug(lever), cells: cellValues });
  }
  return { systems: header, rows };
}

export interface RankedAction {
  rank: number;
  action: string;
  lever: string;
  slug: string;
  impact: number;
  certainty: number;
  rev: number;
  evidenceOnly: number;
  conditional: boolean;
}
export interface DoNotBotherItem {
  text: string;
  refs: string;
}
export interface RankedActions {
  rows: RankedAction[];
  doNotBother: DoNotBotherItem[];
  plainLanguage: string[];
}

function stripMarkdown(s: string): string {
  return s.replace(/\*\*/g, "").replace(/`/g, "").trim();
}

export function parseRankedActions(md: string): RankedActions {
  const lines = md.split("\n");

  // Ranked table rows: first cell is a number.
  const rows: RankedAction[] = [];
  for (const line of lines) {
    if (!/^\|\s*\d+\s*\|/.test(line)) continue;
    const cells = line.split("|").map((c) => c.trim());
    if (cells.length < 9) continue;
    const actionRaw = cells[2];
    const conditional = /\(conditional/i.test(actionRaw);
    const action = stripMarkdown(actionRaw)
      .replace(/\*\(conditional\)\*/gi, "")
      .replace(/\(conditional[^)]*\)/gi, "")
      .replace(/\s{2,}/g, " ")
      .trim();
    const lever = cells[3];
    rows.push({
      rank: Number(cells[1]),
      action,
      lever,
      slug: leverSlug(lever),
      impact: Number(cells[4]),
      certainty: Number(cells[5]),
      rev: Number(cells[6]),
      evidenceOnly: Number(stripMarkdown(cells[7])),
      conditional,
    });
  }

  // Do-not-bother bullets live under the "### Do NOT bother" heading.
  const doNotBother: DoNotBotherItem[] = [];
  const dnbStart = lines.findIndex((l) => /^###\s+Do NOT bother/i.test(l));
  if (dnbStart !== -1) {
    for (let i = dnbStart + 1; i < lines.length; i++) {
      const l = lines[i];
      if (l.startsWith("## ") || l.startsWith("### ")) break;
      if (!l.trim().startsWith("- ")) continue;
      const body = l.trim().replace(/^- /, "");
      const refMatch = body.match(/\[([^\]]+)\]\s*$/);
      const refs = refMatch ? refMatch[1] : "";
      const text = stripMarkdown(body.replace(/\s*\[[^\]]+\]\s*$/, ""));
      doNotBother.push({ text, refs });
    }
  }

  // Plain-language numbered list under "## The actual list".
  const plainLanguage: string[] = [];
  const plStart = lines.findIndex((l) => /^##\s+The actual list/i.test(l));
  if (plStart !== -1) {
    for (let i = plStart + 1; i < lines.length; i++) {
      const l = lines[i];
      if (l.startsWith("## ")) break;
      const m = l.match(/^\d+\.\s+(.*)$/);
      if (m) plainLanguage.push(stripMarkdown(m[1]));
    }
  }

  return { rows, doNotBother, plainLanguage };
}
