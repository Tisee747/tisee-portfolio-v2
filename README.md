# Tisee Portfolio V4

Production-ready static portfolio source designed from scratch for Tisee.

## Design direction

- Big-tech product-site feel: Apple-style restraint + Google-style clarity
- Dark neutral palette with off-white experience section
- One restrained lime accent (`#c7ff5e`)
- Product-first project storytelling
- No glassmorphism, neon gradients, animated blobs, 3D grids, or theme switchers
- Responsive and accessible
- Zero dependencies and zero build step

## Local preview

Any static server works:

```bash
python3 -m http.server 3000
```

Then open `http://localhost:3000`.

## Deploy

This folder can be deployed directly to Vercel as a static site. No framework preset, env vars, or build command are required.

## Asset strategy

The initial V4 references project screenshots and the resume from the existing production portfolio at:

`https://web-tisee.vercel.app`

This is intentional so the old repo/site remains untouched while the new site is developed separately.

Once the new repo is live, assets can optionally be copied into this repo's `/public` or root asset folder and the URLs updated. That is an asset migration only; the UI/source code does not need to change.

## Contact links

- Email: `tisee656@gmail.com`
- GitHub: `https://github.com/Tisee747`
- LinkedIn: `https://linkedin.com/in/tisee/`
