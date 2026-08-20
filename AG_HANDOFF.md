# AG HANDOFF — SETUP ONLY

The application source and design are already complete. Do not redesign or rewrite the UI unless explicitly requested by Tisee.

## Goal

Create a completely new GitHub repository and completely new Vercel project for this codebase.

The existing project must remain untouched:

- Existing GitHub repo: `Tisee747/web-tisee`
- Existing Vercel project: `web-tisee`
- Existing public URL: `web-tisee.vercel.app`

Do NOT:
- push commits to `Tisee747/web-tisee`
- change its `main` branch
- modify its Vercel project settings
- change its production aliases/domains
- delete or redeploy its existing production deployment

## Preferred new names

GitHub repository:
`Tisee747/tisee-portfolio-v2`

Vercel project:
`tisee-portfolio-v2`

If either exact name is unavailable, use:
`tisee-portfolio-next`

## GitHub setup

From this folder:

```bash
git init
git add .
git commit -m "Initial big-tech portfolio redesign"
git branch -M main
gh repo create Tisee747/tisee-portfolio-v2 --public --source=. --remote=origin --push
```

If `gh` is unavailable, create the repo in GitHub UI and push this folder to that NEW repo only.

## Vercel setup

Import the NEW GitHub repo into Vercel.

Settings:
- Framework Preset: Other
- Build Command: none / leave blank
- Output Directory: `.`
- Install Command: none / leave blank
- Root Directory: repository root

Do not connect the new repo to the old Vercel project.

Expected result:
- old site remains at `web-tisee.vercel.app`
- new site receives a separate `*.vercel.app` URL

## Verification

Check:
1. `/` returns HTTP 200
2. navigation anchors work
3. mobile menu opens/closes
4. three featured product visuals load
5. external project links work
6. resume link opens the OLD production resume
7. email/GitHub/LinkedIn links work
8. browser console has no errors
9. mobile viewport has no horizontal overflow
10. old `web-tisee.vercel.app` still works unchanged

## Report back

Return:
- new GitHub repo URL
- new Vercel project URL
- new deployment URL
- confirmation that old site remains unchanged
- any asset-loading or DNS issues
