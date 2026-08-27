# Tisee CV — Project Continuity Protocol

Version: 2026-08-26
Status: Durable project operating protocol
Repository: `Tisee747/tisee-portfolio-v2`

This document contains **long-lived project knowledge and operating rules**. It is intentionally separate from [`TISEE_CV_CURRENT_STATE.md`](./TISEE_CV_CURRENT_STATE.md), which contains the replaceable current-session handoff.

The goal is to let a completely new ChatGPT/Codex conversation recover the project safely without old chat history.

## 1. Source-of-truth hierarchy

Use three distinct truth layers:

1. **Repository implementation truth** — current GitHub source, Git state, tests, and configuration.
2. **Runtime/external truth** — Vercel, live URLs, Figma, BridgeWorker/local machine, and other external systems.
3. **Documentation/orientation** — this protocol plus `TISEE_CV_CURRENT_STATE.md`.

Never reverse that order.

Documentation explains what to inspect and why. It does not override verified source or runtime state.

If documentation and implementation conflict, inspect the implementation and update stale documentation when the discrepancy matters to future sessions.

If documented deployment/runtime state conflicts with the external system, the external system wins.

## 2. Project identity and safety boundary

Active portfolio redesign:

- GitHub: `Tisee747/tisee-portfolio-v2`
- default branch: `main`
- intended Vercel project: `tisee-portfolio-v2`
- intended staging alias: `https://tisee-portfolio-v2.vercel.app`
- Figma: `https://www.figma.com/design/GFyFS29MpQd2QW8cRpnUZr`

Protected original production — do not touch without explicit owner approval:

- GitHub: `Tisee747/web-tisee`
- Vercel project: `web-tisee`
- URL: `https://web-tisee.vercel.app`

Do not create V3/V4/V5/V6 or another replacement staging line. Continue the same V2 repository/project unless the owner explicitly changes this rule.

`tiseeworks.xyz` must not be moved to V2 without explicit owner approval after final review.

## 3. AI / agent ownership model

### ChatGPT is the source and design owner

ChatGPT is responsible for:

- product/design decisions;
- visual hierarchy and typography;
- UI/UX and responsive behavior;
- factual copy/content decisions;
- source implementation;
- direct GitHub source edits and commits;
- architecture changes when genuinely required;
- final interpretation of QA;
- Vercel actions through direct connectors when available.

For normal portfolio implementation, use the GitHub repository directly. Do not delegate routine source authoring to a local model merely because it exists.

### Antigravity is local/runtime QA only

Antigravity is used only when the task genuinely requires the local Windows environment or runtime verification, such as:

- inspect local Git/worktree state;
- safely sync a clean local checkout to an already-authored GitHub commit;
- install/build using the local environment;
- run the local site;
- browser rendering and screenshots;
- responsive/overflow checks;
- console/runtime inspection;
- reduced-motion verification;
- local Vercel/Git/runtime diagnostics when direct connectors cannot answer the question.

Antigravity must not independently redesign, rewrite copy, author source, commit, push, or create another staging version unless the owner explicitly changes the workflow.

If AG finds a source/design issue, it reports evidence; ChatGPT performs the source change.

## 4. BridgeWorker identity

When local/runtime work is needed, BridgeWorker is the router.

Fixed project identity:

- project alias: `tisee_cv`
- client identity: `GPT_CV`
- registered local root: `C:\Projects\Tisee_CV` unless the server-side registry changes it
- preferred Antigravity model: `gemini-3.7-flash-high`
- no automatic fallback
- no nested agent/model/harness

The canonical `BRIDGEWORKER_CHATGPT_PROTOCOL.md` remains authoritative for routing, queueing, task packets, identity validation, failure handling, and result verification.

Do not route this portfolio through another project/client identity.

## 5. Repository architecture

The repository has evolved from an older static implementation into a Next.js application.

Current architecture must always be re-verified from the repository, but the durable intended architecture is:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Motion for purposeful interaction/scroll animation
- static/content-oriented portfolio with no unnecessary backend/API layer
- GitHub Actions production-build validation
- Vercel deployment

The active application is under `app/`.

Legacy static files may remain at repository root from earlier iterations. Their presence alone does not make them authoritative. Before deleting or changing them, verify whether current build/deployment configuration still references them.

Do not add a CMS, database, API server, global state framework, component library, monorepo layer, or other architecture merely to make the project feel more sophisticated. Add infrastructure only when a concrete requirement justifies it.

## 6. Stable design direction

This is an **engineer-first premium technology portfolio**, not a designer portfolio or SaaS landing page.

Primary positioning:

- Backend Engineering
- Applied AI
- automation/data workflows

Visual principles:

- bright, clean, premium-tech canvas;
- graphite/dark text with a restrained blue/cobalt accent;
- typography, spacing, hierarchy, and interaction create the premium feel;
- real project/personal imagery can add human warmth;
- concise factual language;
- UI chrome should be restrained.

Current design reference comes from the owner-approved Figma direction, but Figma is external state and must be re-opened before major implementation work.

Avoid:

- cyberpunk/neon;
- dark-luxury styling by default;
- random glow;
- decorative blobs/gradients;
- ambient/background animation;
- glassmorphism everywhere;
- card soup;
- emoji;
- fake terminal/data graphics;
- fake product screenshots;
- generic AI/SaaS marketing copy.

A small amount of translucent glass is acceptable when it serves a specific UI element, such as the floating navbar. It is not a general visual system.

## 7. Typography rules

Typography is part of the implementation contract.

- Never declare a font that is not actually loaded.
- Do not assume the Figma font is legally/technically available on the web.
- Use verified available weights.
- Prefer standard weights such as 400/500/600/700 unless the chosen font supports others reliably.
- Avoid extreme negative tracking and compressed line-height.
- Avoid text below 12px for meaningful UI copy.
- Test desktop and narrow mobile typography in the rendered browser.

## 8. Content factuality

Copy must stay concise, factual, and human.

Never invent:

- metrics;
- production scale;
- users/customers;
- architecture;
- telemetry;
- queues;
- RAG systems;
- performance claims;
- job responsibilities;
- certification details;
- social handles;
- project features or links.

Known stable identity facts include:

- Tisee
- Informatics Undergraduate
- Telkom University
- GPA 3.66
- 10+ projects
- direction: Backend Engineering / Applied AI

Known public contact values:

- Email: `tisee656@gmail.com`
- LinkedIn: `https://linkedin.com/in/tisee/`
- GitHub: `https://github.com/Tisee747`

The owner has stated there are 2 certifications, but certification details must be verified before publication.

Do not expose or invent WhatsApp, Telegram, or Discord identifiers without explicit verified values.

## 9. New-chat initialization protocol

A completely new conversation must perform this sequence **before substantial work**:

1. Read this file completely.
2. Read [`TISEE_CV_CURRENT_STATE.md`](./TISEE_CV_CURRENT_STATE.md).
3. Read `README.md` for repository orientation.
4. Query the current GitHub repository and verify:
   - repository identity;
   - default branch;
   - current `main` HEAD;
   - relevant recent commits when useful;
   - exact files relevant to the requested task.
5. Inspect implementation before trusting handoff descriptions.
6. If build health matters, inspect current CI/workflow status.
7. If visual work matters, re-open the current Figma file/frames.
8. If deployment matters, verify Vercel/project/live state directly.
9. If local/runtime work is required, read `BRIDGEWORKER_CHATGPT_PROTOCOL.md`, verify the fixed `tisee_cv` / `GPT_CV` identity, then inspect local state before mutation.
10. Compare verified state with `TISEE_CV_CURRENT_STATE.md` and identify any stale or conflicting statements.
11. Continue from the smallest sensible next step; do not reconstruct or redesign the whole project unnecessarily.

A new chat should be able to start from a short user message such as:

> Read the project continuity protocol and current state, verify the repository/runtime state, then continue the project from the current objective.

Old chat history is optional supplementary context, never required authority.

## 10. End-of-session handoff protocol

When a meaningful session ends, the conversation is becoming too long, or the owner wants to move to a new chat:

1. Re-read the current repository state after the session's changes.
2. Verify important external/runtime state that was actually touched or relied on.
3. Update `TISEE_CV_CURRENT_STATE.md` **in place**.
4. Do not create another dated handoff file unless there is a special archival reason.
5. Keep the handoff compact and current rather than chronological.

The state file should contain only information useful to the next chat:

- current objective;
- verified repo snapshot;
- important implementation state;
- completed work;
- important files/components changed;
- unfinished work;
- blockers and known bugs;
- failed approaches worth avoiding;
- current design/product decisions that have not yet become permanent rules;
- tests/CI/browser/runtime validation actually performed;
- deployment/runtime state actually verified;
- recommended next actions;
- facts that must be re-verified next time.

Do not paste a transcript or exhaustive work log.

Replace stale content instead of endlessly appending history.

## 11. Persistent knowledge vs temporary state

Put information in **this protocol** only when it is expected to remain useful across many future sessions, for example:

- architecture;
- ownership model;
- project safety boundaries;
- design constraints;
- factuality rules;
- verification workflow;
- recurring operational procedures;
- major decisions whose rationale prevents future rework.

Put information in **`TISEE_CV_CURRENT_STATE.md`** when it can change as the project moves, for example:

- current task;
- current HEAD snapshot;
- unfinished implementation;
- active blocker;
- currently rejected/approved design pass;
- current deployment uncertainty;
- next debugging step.

Do not duplicate the same detailed state in both files.

## 12. Decision-history policy

Do not maintain a giant decision diary.

Record a decision in this protocol only when forgetting its rationale could cause a future chat to undo settled work or repeat a failed direction.

Current durable decisions include:

### Stay on V2

Decision: continue `Tisee747/tisee-portfolio-v2` and the corresponding V2 staging line rather than creating V3/V4/V5/V6.

Reason: repeated version proliferation caused context fragmentation and unnecessary infrastructure churn.

### ChatGPT owns source; AG verifies runtime

Decision: ChatGPT authors source/design directly; Antigravity is local/runtime QA.

Reason: earlier agent-driven implementation loops drifted from the owner's design intent and blurred source authority.

### Repository beats handoff

Decision: every new chat verifies current source rather than blindly trusting the previous handoff.

Reason: chat summaries and runtime documentation naturally become stale during long-running projects.

### Keep the architecture proportional

Decision: retain the existing Next.js portfolio architecture unless a concrete requirement justifies change.

Reason: framework churn and unnecessary abstractions do not improve a content-focused portfolio and increase context/recovery cost.

## 13. Repository verification rules

Before editing source:

- inspect current `main`;
- fetch the exact files being changed;
- use current file/blob SHAs for writes;
- verify no unexpected remote change invalidated the plan;
- keep changes scoped.

After meaningful source work:

- verify resulting commit(s);
- inspect changed paths;
- inspect CI/build status when applicable;
- perform rendered QA for meaningful visual/responsive changes.

Do not rely on a previously recorded commit hash as current state.

## 14. Runtime/external verification rules

Runtime state must be verified when relevant.

Examples:

- Vercel project/deployment/alias state;
- HTTP response of staging/production URLs;
- Figma frame/design state;
- local worktree state;
- browser console/render state;
- BridgeWorker queue/task state.

A URL or project ID written in documentation is not proof that it still exists or points to the current commit.

If direct connector visibility is ambiguous, use a more authoritative available route rather than guessing.

## 15. QA expectations

Meaningful visual/source work is not complete from source inspection alone.

Minimum rendered targets when relevant:

- desktop around 1440×900;
- mobile around 390×844;
- narrow mobile around 360px for typography/layout-sensitive changes.

Check:

- no horizontal overflow;
- no clipping/collisions;
- navigation/interactions work;
- touch targets are reasonable;
- assets/resume do not 404;
- console/page errors;
- font family/weight when typography changed;
- reduced-motion mode keeps content usable;
- protected original production remains untouched.

Use AG only when local/browser tooling is actually needed.

## 16. Deployment rules

- deploy/update the existing V2 staging line only;
- verify the actual Vercel project before mutation;
- never route V2 source into protected `web-tisee`;
- verify staging after deploy;
- do not move the production domain without explicit owner approval.

A deploy is not successful merely because a command/task was submitted. Verify terminal/external state.

## 17. Failure discipline

Do not hide or overwrite uncertain failures.

If a local mutating task times out or errors after it may have started:

1. inspect state first;
2. determine what actually changed;
3. preserve correct partial work;
4. retry only the remaining delta if necessary.

Never blindly rerun a mutating task.

If a GitHub write fails, re-read the current blob/branch state before retrying.

## 18. Documentation maintenance

Update this protocol only when something materially changes future behavior, such as:

- architecture changes;
- ownership/workflow changes;
- an important decision is settled;
- a new recurring operational rule is introduced;
- safety/deployment boundaries change.

Update `TISEE_CV_CURRENT_STATE.md` when:

- meaningful work completes;
- the current objective changes;
- a blocker appears/resolves;
- the recommended next step changes;
- runtime/deployment assumptions materially change;
- the session is handed to a new chat.

Do not update documentation for every trivial CSS tweak or small commit.

## 19. Avoiding context rot

- one durable protocol;
- one current-state handoff;
- one AG-specific local/runtime instruction file;
- README only as orientation/entry point;
- no serial `HANDOFF_FINAL_V2_NEW_NEW.md` files;
- no giant transcript dumps;
- no duplicated TODO lists;
- no stale commit treated as current truth;
- no secret values in documentation;
- periodically replace stale current-state content instead of appending forever.

If another document becomes redundant, consolidate its unique useful information into the appropriate canonical file rather than creating another parallel source of truth.

## 20. Secrets and sensitive data

Never place the following in repository handoffs/protocols:

- passwords;
- API tokens;
- private keys;
- cookies;
- OAuth/session tokens;
- private credential files;
- secret environment-variable values;
- personal data that is not intentionally public portfolio content.

Record only the existence/name of required configuration when future context needs it, never secret values.
