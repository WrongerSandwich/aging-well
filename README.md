# Aging Well research brief

A Next.js dashboard presenting the current findings from the adjacent `aging-well`
research project. Editorial content (finding cards, hero copy, open questions) is
hand-authored in `lib/content.ts`. The mechanical metrics — levers complete, sources
tracked, claims cataloged, and per-lever status — are derived from the research repo
by `scripts/sync.ts` and committed as `lib/derived.json`.

## Develop

```sh
npm install
npm run dev      # http://localhost:3000
npm test         # vitest
```

## Update the research snapshot

After research sessions land in `../aging-well`, regenerate the derived data, then
hand-author any new finding cards for newly completed levers:

```sh
npm run sync     # reads ../aging-well, rewrites lib/derived.json
```

Point at a non-default location with `AGING_WELL_DIR=/path/to/aging-well npm run sync`.
The sync script is local-only; Vercel builds from the committed `lib/derived.json`.

## Deploy

Hosted on Vercel. Push to the connected branch; Vercel auto-detects Next.js and
builds. No configuration file required.
