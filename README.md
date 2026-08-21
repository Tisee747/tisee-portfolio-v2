# Tisee Portfolio V4

A standalone, zero-dependency portfolio redesign authored for Tisee.

## Stack

- Semantic HTML
- Modern CSS
- Small vanilla JavaScript enhancement layer
- Vercel static hosting
- No runtime dependencies
- No environment variables
- No build step

## Local preview

First vendor assets (internet access required once):

```bash
./scripts/vendor-assets.sh
```

Then serve the directory:

```bash
python3 -m http.server 3000
```

Open `http://localhost:3000`.

## Design system

The visual direction takes big-tech product-site principles rather than copying a specific brand:

- restrained dark/off-white palette
- large product-led typography
- generous whitespace
- one lime accent
- full-size product storytelling rather than card grids
- subtle motion only

## Deployment

See `AG_HANDOFF.md`. The old `Tisee747/web-tisee` repository and its Vercel deployment are intentionally out of scope and must not be modified.
