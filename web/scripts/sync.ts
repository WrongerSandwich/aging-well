import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { resolve, join } from "node:path";
import {
  buildDerived,
  parseLever,
  parseLeverDetail,
  parseSources,
  type LeverData,
  type LeverDetail,
} from "../lib/sync/parse";

const root = resolve(__dirname, "..");
// Co-located inside the aging-well repo: web/ sits at the repo root, so the
// research content is the parent directory. Override with AGING_WELL_DIR.
const agingWell = process.env.AGING_WELL_DIR
  ? resolve(process.env.AGING_WELL_DIR)
  : resolve(root, "..");

const leversDir = join(agingWell, "levers");
const sourcesPath = join(agingWell, "_meta", "sources.md");

function leverFiles(): { slug: string; md: string }[] {
  return readdirSync(leversDir)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((file) => ({
      slug: file.replace(/\.md$/, ""),
      md: readFileSync(join(leversDir, file), "utf8"),
    }));
}

function main(): void {
  const files = leverFiles();
  const sourcesMd = readFileSync(sourcesPath, "utf8");
  const generatedAt = new Date().toISOString();

  // Homepage metrics (unchanged output shape).
  const levers: LeverData[] = files.map((f) => parseLever(f.slug, f.md));
  const derived = buildDerived(levers, sourcesMd, generatedAt);
  const derivedPath = join(root, "lib", "derived.json");
  writeFileSync(derivedPath, JSON.stringify(derived, null, 2) + "\n", "utf8");

  // Full detail content for the lever pages.
  const details: LeverDetail[] = files.map((f) => parseLeverDetail(f.slug, f.md));
  const sources = parseSources(sourcesMd);
  const detail = {
    generatedAt,
    levers: Object.fromEntries(details.map((d) => [d.slug, d])),
    sources: Object.fromEntries(sources.map((s) => [s.id, s])),
  };
  const detailPath = join(root, "lib", "detail.json");
  writeFileSync(detailPath, JSON.stringify(detail, null, 2) + "\n", "utf8");

  const claimTotal = details.reduce((n, d) => n + d.claims.length, 0);
  console.log(
    `Wrote ${derivedPath} and ${detailPath}: ` +
      `${derived.totals.leversComplete}/${derived.totals.leversTotal} levers complete, ` +
      `${sources.length} sources, ${claimTotal} detailed claims.`,
  );
}

main();
