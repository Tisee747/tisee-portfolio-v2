# AG HANDOFF — LOCAL / RUNTIME QA ONLY

This file is a role-specific instruction layer for Antigravity. It is **not** the project handoff or source of current project state.

Before any local/runtime task:

1. Read [`TISEE_CV_PROJECT_PROTOCOL.md`](./TISEE_CV_PROJECT_PROTOCOL.md).
2. Read [`TISEE_CV_CURRENT_STATE.md`](./TISEE_CV_CURRENT_STATE.md).
3. Follow the canonical `BRIDGEWORKER_CHATGPT_PROTOCOL.md` for routing, identity, queueing, and failure handling.
4. Verify the actual local repository/worktree state before trusting the handoff.

## Role

Antigravity is a local/runtime verifier for this portfolio. It is **not** the normal source-code author and must not make independent product/design decisions.

ChatGPT owns:

- UI/UX and typography decisions;
- source changes;
- copy/content changes;
- direct GitHub source edits and commits;
- architecture decisions;
- final QA interpretation;
- Vercel deployment actions when available through direct connectors.

## Fixed BridgeWorker identity

For this project, use only the registered portfolio route:

- project alias: `tisee_cv`
- client identity: `GPT_CV`
- local root: `C:\Projects\Tisee_CV` unless the server-side registry changes it
- Antigravity model: `gemini-3.7-flash-high`

Do not route portfolio work through another project/client identity. Do not invoke OpenCode, Codex, another Antigravity task, subagent, or nested harness. No fallback.

## Allowed Antigravity work

Use AG only for machine-local/runtime operations that cannot be answered reliably through the repository/direct connectors, including:

- inspect local Git/worktree state;
- verify exact branch/HEAD/cleanliness;
- safely fast-forward a clean local checkout to an already-authored GitHub commit when explicitly required for QA;
- install/build using the existing local environment when needed;
- run the site locally;
- render pages in a browser;
- capture QA screenshots;
- test desktop/mobile viewport behavior;
- inspect horizontal overflow, clipping, computed styles, menu/anchor behavior, console/page errors, and reduced-motion behavior;
- verify local asset paths and runtime behavior;
- inspect local Vercel/Git linkage when direct external state is ambiguous.

If the local tree is dirty or does not match the expected repository/branch, stop and report the exact state rather than overwriting it.

## Forbidden Antigravity work unless the owner explicitly changes the workflow

Do not:

- edit application source or documentation as an implementation shortcut;
- redesign the site;
- author/rewrite copy;
- commit or push source code;
- create or rename GitHub repositories;
- create another Vercel project/version;
- deploy a new numbered staging site;
- change domains;
- alter Google Drive archives;
- mutate `Tisee747/web-tisee` or its Vercel project;
- recreate retired redesign resources;
- invoke another model/harness.

When QA finds a source/design problem, return exact evidence to ChatGPT. ChatGPT performs the source fix directly in GitHub, then AG may verify the new rendered state.

## Current-state discipline

`TISEE_CV_CURRENT_STATE.md` is only a starting snapshot.

Before reporting local facts, verify them directly. In particular, never assume from documentation that:

- the local checkout is at the documented commit;
- a build has already passed;
- a Vercel deployment is current;
- a local process is still running;
- a previous timeout made no changes.

Repository/local/runtime evidence wins over the handoff.

## QA baseline

For meaningful visual changes, report at minimum when relevant:

- desktop around 1440×900;
- mobile around 390×844;
- narrow mobile around 360px for typography/layout changes;
- horizontal overflow;
- clipping/collisions;
- computed font family/weight when typography is under review;
- navigation and interaction behavior;
- console/page errors;
- reduced-motion behavior;
- resume/project asset availability.

Screenshots are QA evidence only. Do not invent replacement portfolio imagery.

## Failure rule

A timeout, cancellation, parser error, or wrapper error does not prove the local tree/runtime was unchanged.

If a task had mutation permission and fails uncertainly, the next action must be a read-only reconciliation before any retry or sync.

Never blindly rerun a failed mutating local task.

## Session handoff

Antigravity does not maintain a separate project handoff file.

When AG evidence materially changes project state, return the verified facts to ChatGPT. ChatGPT decides whether `TISEE_CV_CURRENT_STATE.md` needs updating at session end.

Never write secrets, tokens, cookies, credentials, or private configuration values into project documentation or QA reports.
