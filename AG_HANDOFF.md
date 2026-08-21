# AG HANDOFF — INFRA/SETUP ONLY

The UI, copy, CSS, JS, SEO metadata, responsive behavior, and Vercel configuration are already authored. Do not redesign or rewrite the application unless Tisee explicitly asks.

## Hard safety boundary

The existing portfolio is production and must remain untouched:

- GitHub: `Tisee747/web-tisee`
- Vercel project: `web-tisee`
- Existing URL: `https://web-tisee.vercel.app`

Do not commit, branch, merge, change settings, redeploy, rename, delete, or change domains on those existing resources.

## Your scope

Only perform setup/infrastructure work for a brand-new site:

1. Create a NEW public GitHub repository named `Tisee747/tisee-portfolio-v2`.
2. Put the supplied source bundle contents at that repo root.
3. Run `./scripts/vendor-assets.sh` from the new repo. This copies the required screenshots and resume into the NEW repo; it only reads public files from the old repo.
4. Verify `assets/` contains:
   - `resume.pdf`
   - `projects/posyandu_dashboard.png`
   - `projects/nexevent_mobile_login.jpg`
   - `projects/nexevent_mobile_dashboard.jpg`
   - `projects/nexevent_mobile_tiket.jpg`
5. Commit everything to the NEW repo only.
6. Create/import a NEW Vercel project named `tisee-portfolio-v2` from that new GitHub repo.
7. Deploy it to a separate `*.vercel.app` URL.
8. Verify the old production URL is still live and unchanged.

## Suggested GitHub commands

```bash
git init
git add .
git commit -m "Initial portfolio V4"
git branch -M main
gh repo create Tisee747/tisee-portfolio-v2 --public --source=. --remote=origin --push
```

If the repository is created before you receive the source, clone that NEW repository and copy the supplied bundle into it instead.

## Vercel settings

The site is static and zero-dependency:

- Framework preset: Other
- Root directory: repo root
- Install command: none
- Build command: none
- Output directory: `.`
- Environment variables: none

Do not attach this repository to the existing `web-tisee` project.

## Required QA

After deployment, verify all of the following:

1. Home page returns HTTP 200.
2. No browser console errors.
3. No missing images or resume 404s.
4. Desktop navigation anchors work.
5. Mobile menu opens, closes, and its links work.
6. No horizontal overflow at 375px viewport width.
7. Featured project external links open correctly.
8. Email, GitHub, and LinkedIn links work.
9. `prefers-reduced-motion` does not hide content.
10. `https://web-tisee.vercel.app` still works unchanged.

## Return to Tisee / ChatGPT

Report only infrastructure outcomes and blockers:

- new GitHub repo URL
- new Vercel project name/ID if available
- new deployment URL
- QA failures, if any
- explicit confirmation that `web-tisee` was not modified

Do not make subjective UI/design changes yourself; return visual issues to ChatGPT for source changes.
