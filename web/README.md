# Aging Well research brief

A Next.js dashboard presenting the current findings from the `aging-well`
research project. It is co-located in that repo at `web/`, so the research content
lives one directory up (the repo root). Editorial content (finding cards, hero copy,
open questions) is hand-authored in `lib/content.ts`. The mechanical metrics — levers
complete, sources tracked, claims cataloged, and per-lever status — are derived from
the research files by `scripts/sync.ts` and committed as `lib/derived.json`.

## Develop

```sh
npm install
npm run dev      # http://localhost:3000
npm test         # vitest
```

## Update the research snapshot

After research sessions land in the parent repo, regenerate the derived data, then
hand-author any new finding cards for newly completed levers:

```sh
npm run sync     # reads the parent aging-well repo, rewrites lib/derived.json
```

Point at a non-default location with `AGING_WELL_DIR=/path/to/aging-well npm run sync`.
The sync script is local-only; Vercel builds from the committed `lib/derived.json`.

`npm run sync` also writes `lib/detail.json` — the full per-lever claims, sources,
and prose powering the `/levers/<slug>` detail pages. Both JSON files are committed;
Vercel builds from them and never reads the research files. The sync reads only
`levers/` and `_meta/sources.md` from the parent — never `personal/` — so personal
data is never bundled or served.

## Deploy

Hosted on Vercel. Because the app lives in `web/`, set the project's **Root
Directory** to `web` in the Vercel dashboard (Settings → General → Root Directory).
Push to the connected branch; Vercel auto-detects Next.js and builds. No
configuration file required.
