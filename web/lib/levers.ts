// Canonical lever registry — the single source of truth for lever slugs,
// display names, and order. Every surface that shows a lever name resolves it
// here by slug (leverName), so the four historical spellings that used to drift
// across the ranking, matrix, status list, and open-questions ("Nutrition" vs
// "Nutrition & Metabolic" vs "Nutrition/Metabolic" vs "Nutrition & metabolic")
// can't come back. The display names match the lever files' H1 headings, which
// are what derived.json / detail.json already use.
export const LEVERS = [
  { slug: "substances", name: "Substances" },
  { slug: "exercise", name: "Exercise" },
  { slug: "sleep", name: "Sleep" },
  { slug: "nutrition-metabolic", name: "Nutrition & Metabolic" },
  { slug: "medical-screening", name: "Medical & Screening" },
  { slug: "oral-sensory", name: "Oral & Sensory" },
  { slug: "sun-skin", name: "Sun & Skin" },
  { slug: "stress-social", name: "Stress & Social" },
] as const;

export type LeverSlug = (typeof LEVERS)[number]["slug"];

// Canonical descending-leverage order (same order the home status list uses).
export const LEVER_ORDER: LeverSlug[] = LEVERS.map((l) => l.slug);

const NAME_BY_SLUG: Record<string, string> = Object.fromEntries(
  LEVERS.map((l) => [l.slug, l.name]),
);

// Canonical display name for a lever. Falls back to the slug for unknown values
// so a typo surfaces visibly rather than throwing.
export function leverName(slug: string): string {
  return NAME_BY_SLUG[slug] ?? slug;
}

// Any historical spelling (short, slash, ampersand, mixed case) → canonical slug.
const LEVER_SLUG_MAP: Record<string, string> = {
  substances: "substances",
  exercise: "exercise",
  sleep: "sleep",
  nutrition: "nutrition-metabolic",
  "nutrition-metabolic": "nutrition-metabolic",
  medical: "medical-screening",
  "medical-screening": "medical-screening",
  oral: "oral-sensory",
  "oral-sensory": "oral-sensory",
  sun: "sun-skin",
  "sun-skin": "sun-skin",
  stress: "stress-social",
  "stress-social": "stress-social",
};

export function leverSlug(display: string): string {
  const key = display
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[\s/]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return LEVER_SLUG_MAP[key] ?? key;
}
