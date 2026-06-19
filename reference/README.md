# Aging Well research brief

A dependency-free static dashboard presenting the current findings in the adjacent
`aging-well` research project. This repository contains a read-only snapshot; it
does not read from or write to the research directory at runtime.

## Run locally

```sh
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Host

Serve the repository root with any static web server. There is no build step. For
example, an nginx location can point directly at this directory with `index.html`
as its index file.

The only external requests are for the three Google Fonts used by the design. The
page remains functional with local fallback fonts if those requests are blocked.

## Updating the snapshot

The displayed content reflects the research state on June 18, 2026. Update the
copy and metrics in `index.html` after additional lever sessions are completed.
