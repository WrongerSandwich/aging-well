// Single source of truth for the public repository links surfaced on the site.
// Personalization is repo-only by design (see synthesis/personalize.md): the site
// links back to the repo rather than collecting any profile/Tractability data.
export const REPO_URL = "https://github.com/WrongerSandwich/aging-well";

// Deep link to the personalization method — the high-intent target for the
// /actions "Make it yours" call to action.
export const PERSONALIZE_GUIDE_URL = `${REPO_URL}/blob/main/synthesis/personalize.md`;
