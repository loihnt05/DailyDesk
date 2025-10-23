Repository: DailyDesk

Purpose
-------
This document is written specifically for large language models and copilots that will be used to assist with development in the DailyDesk repository. It summarizes the project, highlights conventions, and gives concrete, LLM-friendly prompts, constraints and examples so the model can produce accurate, safe, and helpful code and documentation changes.

High-level summary
------------------
- Framework: Next.js (App Router)
- Language: TypeScript
- ORM: Drizzle ORM (drizzle-kit) configured with the `pglite` driver by default
- DB schema location: `lib/db/schema.ts`
- HTTP client: `lib/http.ts` (axios instance)
- Scripts: `pnpm run dev`, `pnpm run build`, `pnpm run start`, `pnpm run db:push`, `pnpm run lint`

Important files and their roles
------------------------------
- `app/` — application routes and server components following Next.js App Router conventions.
- `lib/http.ts` — single axios instance used across the codebase; respects `NEXT_PUBLIC_API_BASE_URL`.
- `drizzle.config.ts` — drizzle-kit configuration (output folder `./drizzle`, schema path and pglite driver).
- `lib/db/schema.ts` — canonical Drizzle schema definitions (example: `users` table).
- `package.json` — scripts and dependencies.

Conventions and constraints (for LLMs)
------------------------------------
1. Imports and paths

   - Use absolute imports with aliases when existing code does (e.g. `@/lib/http` or `@/components/...`). If unsure, prefer relative imports.

2. HTTP client usage

   - Use the axios instance from `lib/http.ts` rather than creating new axios instances. This ensures `baseURL` and shared interceptors/config are preserved.

3. Database changes

   - All schema definitions belong in `lib/db/schema.ts`. When asked to add tables/columns, edit that file and (if requested) mention running `pnpm run db:push`.
   - Don't assume migrations exist beyond `drizzle-kit` usage. Suggest using `drizzle-kit push` (script `db:push`) to apply the current schema.

4. Environment variables

   - `NEXT_PUBLIC_API_BASE_URL` is used by `lib/http.ts` for client API calls.
   - `DATABASE_URL` must be set for Drizzle connections. When suggesting example `.env` values, use placeholder values and avoid real secrets.

5. TypeScript & typing

   - Keep strict TypeScript types. If adding functions or components, include explicit types for props and return values.
   - Prefer small, well-typed module exports rather than large default exports unless pattern already exists in the repo.

6. Tests and changes

   - This repository does not currently include a test harness. If you suggest adding tests, propose a minimal framework (e.g. vitest or jest) and include the necessary devDependencies and a sample test file.

Common tasks and example LLM prompts
-----------------------------------
Below are common tasks you will be asked to perform and recommended prompt templates to produce good results.

1) Add a new API route

Prompt: "Add a new GET API route at `/app/api/health/route.ts` that returns {status: 'ok'} and use the project's response conventions. Include TypeScript types and a short test file using vitest."

What to do (LLM steps):

- Create the route file under `app/api/health/route.ts` using Next.js App Router `GET` handler.
- Use `NextResponse.json({ status: 'ok' })`.
- Add types where relevant.
- If adding tests, add `devDependencies` and a simple test under `tests/`.

2) Update schema and push

Prompt: "Add a `posts` table to `lib/backend/db/schema.ts` with id, title, content, authorId (FK to users). Explain how to apply the change to the DB."

What to do:

- Edit `lib/backend/db/schema.ts` to add `posts` table using `pgTable` + appropriate column types.
- Mention running `pnpm run db:push` and ensuring `DATABASE_URL` is set.

3) Fix a bug in an existing component

Prompt: "Fix the bug in `components/ui/button.tsx` where clicking doesn't call the passed onClick handler. Keep the API of the component unchanged and add a unit test."

What to do:

- Open the file to inspect existing code.
- Make the smallest change to fix the behavior.
- Keep changes minimal and add an explanatory commit message.

Safety, privacy and secrets
--------------------------
- Never write real secrets or credentials into files. Use placeholders in examples (e.g. `DATABASE_URL=postgresql://user:password@localhost:5432/dbname`).
- Avoid adding external network calls to unknown endpoints. If integrating third-party services, ask for API keys and usage policies.

Commit, PR and message guidelines
-------------------------------
- Keep commits focused and small. One logical change per commit.
- Use clear commit messages: "feat(db): add posts table" or "fix(ui): call onClick in Button".
- When creating PR descriptions, include the reasoning, files changed, and any migration steps required.

When you are uncertain
---------------------
- If a change could be breaking (changing public API, database schema or key runtime behavior), explain the impact and ask for confirmation.
- If a file or behavior is ambiguous, search the repository for usage before making edits. Prefer conservative changes.

Example prompts tailored for LLMs
--------------------------------
- "Search for all usages of `lib/http.ts` and update any calls that pass full absolute URLs to instead use path-relative URLs (e.g. '/users')." — useful for centralizing baseURL usage.
- "Add a README section explaining how to run Drizzle with pglite locally. Provide a `.env.example` and the exact `pnpm` commands." — produce a step-by-step, copy-pasteable set of commands.

Verification checklist for PRs (LLM should include these in final message)
---------------------------------------------------------------------
1. Files changed summary (list)
2. Short explanation of the change and why
3. Any new scripts or env vars required
4. Commands to run locally to verify (dev build, db push, sample API call)
5. Tests added (if any) and how to run them

Notes for LLM prompt authors
---------------------------
- Provide file paths and exact desired edits when possible.
- If you want iterative changes, instruct the LLM to open a PR with WIP and wait for review before merging.
- Ask for small diffs; large sweeping changes should be broken into smaller prompts.

End of document
