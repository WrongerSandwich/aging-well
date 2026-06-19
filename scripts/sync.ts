import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { resolve, join } from "node:path";
import { buildDerived, parseLever, type LeverData } from "../lib/sync/parse";

const root = resolve(__dirname, "..");
const agingWell = process.env.AGING_WELL_DIR
  ? resolve(process.env.AGING_WELL_DIR)
  : resolve(root, "..", "aging-well");

const leversDir = join(agingWell, "levers");
const sourcesPath = join(agingWell, "_meta", "sources.md");

function loadLevers(): LeverData[] {
  const files = readdirSync(leversDir)
    .filter((f) => f.endsWith(".md"))
    .sort();
  return files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const md = readFileSync(join(leversDir, file), "utf8");
    return parseLever(slug, md);
  });
}

function main(): void {
  const levers = loadLevers();
  const sourcesMd = readFileSync(sourcesPath, "utf8");
  const derived = buildDerived(levers, sourcesMd, new Date().toISOString());
  const outPath = join(root, "lib", "derived.json");
  writeFileSync(outPath, JSON.stringify(derived, null, 2) + "\n", "utf8");
  console.log(
    `Wrote ${outPath}: ${derived.totals.leversComplete}/${derived.totals.leversTotal} levers complete, ` +
      `${derived.totals.sourcesTotal} sources, ${derived.totals.claimsTotal} claims.`,
  );
}

main();
