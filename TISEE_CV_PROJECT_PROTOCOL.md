# Tisee CV Project Workflow Protocol

Version: 2026-08-23
Status: Project-specific operating protocol
Repository: `Tisee747/tisee-portfolio-v2`

## 1. Purpose

This file is the project-level source of truth for how ChatGPT, BridgeWorker, Antigravity, GitHub, Vercel, local working state, and Google Drive are used for the Tisee portfolio project.

New ChatGPT chats working on this project should read this file before making changes.

This protocol supplements `BRIDGEWORKER_CHATGPT_PROTOCOL.md`. If there is any conflict on routing, identity, queueing, engine policy, or BridgeWorker safety, the canonical BridgeWorker protocol wins.

## 2. Fixed project identity

For any BridgeWorker task related to this portfolio:

- Project alias: `tisee_cv`
- Client identity: `GPT_CV`
- Canonical local root currently registered by BridgeWorker: `C:\Projects\Tisee_CV`
- Preferred local engine when local/runtime work is genuinely needed: Antigravity `gemini-3.7-flash-high`
- No automatic fallback
- No nested engine, subagent, or harness

Never route this project through the `bridgeworker` project alias.

## 3. Current authoritative resources

### Active redesign staging

- GitHub: `Tisee747/tisee-portfolio-v2`
- Vercel project: `tisee-portfolio-v2`
- Vercel project ID: `prj_CKMQ8eSmprLtcvGWap2aRiKADMAn`
- Staging URL: `https://tisee-portfolio-v2.vercel.app`

This is the only redesign staging line. Continue improving the same V2 repository and same Vercel project. Do not create V3, V4, V5, V6, or another replacement staging project.

### Protected original production

These resources are sacred and must remain untouched until the owner explicitly approves a production migration:

- GitHub: `Tisee747/web-tisee`
- Vercel project: `web-tisee`
- Existing URL: `https://web-tisee.vercel.app`

Do not edit, commit to, redeploy, rename, delete, relink, or change domains on the original production resources.

### Retired V5

The obsolete V5 GitHub repository and Vercel project were deleted on 2026-08-23 after V2 checks. Do not recreate them.

### Domain

`tiseeworks.xyz` must not be moved to V2 until the owner explicitly approves the final V2 design after review.

## 4. Core ownership model

### ChatGPT is the source author

ChatGPT is responsible for:

- product/design decisions;
- typography and visual hierarchy;
- layout and responsive behavior;
- HTML/CSS/JavaScript changes;
- factual copy and content editing;
- accessibility decisions;
- design-system guidance;
- reading and applying external design skills/references;
- direct source edits through the GitHub connector;
- GitHub commits produced by those direct source edits;
- Vercel project/deployment actions through the Vercel connector when available;
- final interpretation of QA results.

For normal portfolio source work, ChatGPT should edit the GitHub repository directly instead of delegating code authoring to Antigravity.

### Antigravity is a local/runtime verifier

Antigravity is not the design author and is not the normal source-code editor for this project.

Use Antigravity only when a task genuinely requires the user's Windows machine or local runtime, such as:

- inspecting the local working tree;
- safely fast-forwarding a clean local checkout to the already-authored GitHub state when needed for QA;
- starting a local static server;
- browser rendering checks;
- desktop/mobile screenshots;
- viewport and overflow checks;
- console/page error inspection;
- anchor/menu interaction tests;
- `prefers-reduced-motion` verification;
- local asset/path verification;
- local Vercel/Git runtime inspection when a direct connector cannot answer the question.

Unless the owner explicitly changes this workflow, Antigravity must not:

- design or redesign the site;
- edit HTML/CSS/JS/source content;
- author copy;
- commit source changes;
- push source changes;
- create repositories;
- create new Vercel projects;
- deploy a different staging version;
- modify the original `web-tisee` production resources;
- make independent design decisions.

If local state is dirty before a QA sync, Antigravity should stop and report the exact dirty state rather than overwriting it.

## 5. Source-edit workflow

For source changes, ChatGPT should use this sequence:

1. Read this protocol.
2. Read the current GitHub `main` state and the exact files being changed.
3. Verify no unexpected remote change has appeared since the last read.
4. Make design/content decisions in ChatGPT.
5. Edit exact intended files directly through the GitHub connector.
6. Use current blob SHAs for updates and perform sequential writes when files depend on each other.
7. Verify the resulting GitHub `main` commit and changed paths.
8. Only then use Antigravity if rendered local/browser QA is useful.
9. If QA finds a design/source issue, return the issue to ChatGPT. ChatGPT performs the next source edit directly in GitHub.
10. Repeat until QA passes.
11. Deploy/update the existing V2 project only.
12. Owner reviews the V2 staging URL before any production-domain move.

Do not use Antigravity as an implementation loop where it independently patches source based on QA findings.

## 6. Local sync rules

The local root exists for runtime verification, not as the primary authoring surface.

When local QA needs the newest GitHub source:

- verify the exact repository and branch first;
- verify the local working tree is clean;
- verify no unrelated files are present;
- fetch the expected remote state;
- allow only a safe fast-forward sync to the already-authored GitHub commit;
- never reset, clean, stash, force checkout, or discard unknown local work automatically.

A failed or timed-out task that might have changed the local tree must be reconciled before another local mutation.

## 7. Design direction

The site should feel like a premium editorial technology portfolio, not a template demo.

Required direction:

- bright warm-neutral / porcelain / paper background;
- graphite typography;
- restrained blue/violet or warm accent;
- strong typography, pacing, whitespace, and hierarchy;
- commercial technology polish;
- inspiration from high-quality big-tech/editorial work without cloning Apple or Google;
- interaction/scroll motion only when it adds meaning;
- support `prefers-reduced-motion`.

Avoid:

- cyberpunk/neon styling;
- glow-heavy effects;
- glassmorphism everywhere;
- random gradients/blobs/particles;
- ambient canvas/background animation;
- fake terminals;
- decorative data visualizations;
- generic AI-marketing copy;
- "AI slop" visual patterns;
- fake screenshots or fabricated product mockups.

## 8. Typography rules

Typography must be treated as a tested system, not decoration.

- Never declare a web font that is not actually loaded.
- Prefer a robust native/system font stack unless a real font asset/import is intentionally added.
- Use stable common font weights such as 400/500/600/700 unless the active font is verified to support other weights.
- Avoid extreme negative letter spacing that breaks across platforms.
- Avoid line heights so compressed that glyphs clip or headings become unstable.
- Do not use tiny microcopy below 12px.
- Mobile heading scale must remain readable without dominating the viewport or causing collisions.
- Email/contact text must wrap deliberately and cleanly.

## 9. Factuality and content rules

Copy should be concise, factual, and human.

Never invent:

- metrics;
- architecture;
- production scale;
- telemetry;
- queues;
- RAG systems;
- performance claims;
- users/customers;
- responsibilities that are not supported by known project or experience data.

Use authentic project screenshots/assets only.

Known portfolio identity includes:

- Tisee
- Informatics Undergraduate
- Telkom University
- GPA 3.66
- 10+ projects
- 3 internships
- primary direction: Backend Engineering / Applied AI

Contact information currently intended for the site:

- Email: `tisee656@gmail.com`
- LinkedIn: `https://linkedin.com/in/tisee/`
- GitHub: `https://github.com/Tisee747`

Do not expose WhatsApp unless the owner explicitly requests it.

## 10. Required QA

A meaningful design/source change is not complete until the rendered site has been checked.

Minimum QA targets:

- desktop around 1440x900;
- mobile around 390x844;
- narrow mobile around 360px when typography/layout changes are involved.

Check at minimum:

- no horizontal overflow;
- no clipped headings or email text;
- computed font family/weight match the intended system;
- navigation and anchors work;
- mobile menu opens/closes and resets correctly;
- touch targets remain at least approximately 44px where appropriate;
- project screenshots render correctly;
- resume and key assets do not 404;
- no console/page errors;
- reduced-motion mode keeps content visible and usable;
- old production remains untouched.

Screenshots used for QA are evidence, not new portfolio artwork.

## 11. Deployment rules

- Keep using the existing Vercel project `tisee-portfolio-v2`.
- Do not create a new numbered project.
- Prefer direct ChatGPT/Vercel connector deployment and verification when available.
- Verify the V2 staging alias after deployment.
- Do not attach or point `tiseeworks.xyz` until explicit owner approval.
- Never deploy portfolio source into the protected `web-tisee` Vercel project.

## 12. BridgeWorker rules for this project

When local work requires BridgeWorker, follow the canonical BridgeWorker protocol exactly.

Important project-specific routing rules:

- use project alias `tisee_cv`;
- use client identity `GPT_CV`;
- for Antigravity use `gemini-3.7-flash-high`;
- use a fresh unique task ID for new work;
- one direct peer only;
- no nested harness;
- no automatic engine/model fallback;
- preserve timeout/failure evidence;
- after any uncertain mutating failure, inspect state before retry;
- same-root local mutation must respect BridgeWorker FIFO/serialization.

For normal browser QA, prefer read-only inspection where possible. If a local fast-forward sync is required, scope the mutation only to that verified sync and local runtime setup.

## 13. Google Drive role

Google Drive is used for persistent archives, source bundles, result evidence, and backup organization. It is not the primary live source-authoring surface.

Current organization includes `Web Portofolio` with current/archive groupings. Do not scatter new portfolio ZIPs/manifests in My Drive root.

BridgeWorker result history under its canonical Drive result paths should remain intact unless the owner explicitly asks for cleanup.

## 14. Failure discipline

Never claim success from an `eyes` reaction, a submitted task, or an assumed deploy.

For every important operation verify the terminal or connector state.

If a local mutating task fails, times out, or is canceled after it may have started:

1. inspect the local Git/filesystem state;
2. determine whether anything changed;
3. preserve correct partial work;
4. do not blindly rerun;
5. retry only the remaining delta if a retry is actually needed.

If a direct GitHub write fails, re-read the latest file SHA/branch state before retrying.

## 15. New-chat startup checklist

Before a new ChatGPT chat changes this project:

1. Read `TISEE_CV_PROJECT_PROTOCOL.md`.
2. Read the current repository `README.md`.
3. Verify the current GitHub `main` commit instead of trusting old conversation memory.
4. Inspect the exact source files relevant to the requested change.
5. If local work is needed, read the canonical `BRIDGEWORKER_CHATGPT_PROTOCOL.md` and verify the `tisee_cv` / `GPT_CV` route.
6. Treat ChatGPT as the source author and Antigravity as local/runtime QA only.
7. Verify the same V2 repository/project is being used.
8. Confirm protected `web-tisee` resources will not be touched.
9. Confirm the owner has not yet approved a production-domain switch unless there is explicit current evidence otherwise.

## 16. Current status at this protocol version

As of 2026-08-23:

- V2 is the active redesign staging line.
- V5 GitHub and Vercel staging resources have been removed.
- Original `web-tisee` production resources remain protected.
- The owner has rejected the current V2 typography/visual polish as not yet good enough.
- Therefore V2 must not be described as design-final until another design pass is completed and the owner approves it.
- A prior Antigravity typography-repair task was redirected because source authoring belongs to ChatGPT; any uncertain local state from failed local tasks must be reconciled before further local mutation.

This status section may become stale. Always verify current GitHub/Vercel/local state before acting.
