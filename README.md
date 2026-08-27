# Tisee portfolio — V2

Next.js portfolio for Tisee, focused on Backend Engineering and Applied AI.

## Project continuity

This repository is the canonical source for continuing the project across long ChatGPT/Codex conversations.

Before substantial work, read in this order:

1. [`TISEE_CV_PROJECT_PROTOCOL.md`](./TISEE_CV_PROJECT_PROTOCOL.md) — durable architecture, constraints, workflow, safety boundaries, and cross-chat protocol.
2. [`TISEE_CV_CURRENT_STATE.md`](./TISEE_CV_CURRENT_STATE.md) — replaceable handoff containing the current objective, implementation state, blockers, and next steps.
3. Inspect the actual current GitHub source/commit and any relevant runtime/external system before acting.

Do not treat the handoff as stronger evidence than the repository or runtime.

When moving to a new chat after meaningful work, update `TISEE_CV_CURRENT_STATE.md` in place instead of creating another one-off handoff file.

## Current application

The active implementation is a Next.js App Router application under `app/` using React, TypeScript, Tailwind CSS, and Motion.

Useful commands:

```bash
npm run dev
npm run build
npm run start
```

GitHub Actions validates the production build on pushes and pull requests to `main`.

## Local/runtime agents

[`AG_HANDOFF.md`](./AG_HANDOFF.md) defines the narrow Antigravity role for local/runtime QA. ChatGPT remains the normal source/design author.

## Protected production

The original `Tisee747/web-tisee` repository and its Vercel project are protected. Read the project protocol before any deployment or infrastructure action.
