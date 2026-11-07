---
applyTo: '**'
---

# Melocode repository guidance

## Repository structure

This is an npm-workspaces monorepo:

- `frontend/melocode` is the React 19/Vite client. `src/main.tsx` wires React Router, TanStack Query, and the auth/theme providers; `src/routes.tsx` defines page routing. API calls are made through `src/api/api.ts` and feature hooks in `src/hooks/api/`. Lesson content is authored as MDX under `src/lessons/` and compiled by the Vite MDX plugins.
- `backend` is an Express 5 API with a PostgreSQL database accessed through Prisma. `src/app.ts` mounts the route modules and initializes Socket.IO. HTTP flows are organized as routes/middleware -> controllers -> services -> repositories; pure business rules belong in `domains`. Prisma schema and migrations live under `prisma/`, and the generated client is under `src/generated/prisma/`.
- `shared-types/index.ts` (`@app/types`) contains TypeScript contracts shared across the client and API, including request/response payloads and Socket.IO event data.
- Backend events are emitted through `src/lib/eventEmitter.ts`; listeners in `src/events/` handle asynchronous work such as achievements and notify clients through `src/realtime/socketService.ts`.

## Architecture and conventions

- Keep controllers limited to HTTP concerns: read validated request data, call services, and shape the response. Do not put database access or business rules in controllers.
- Services orchestrate operations and call repositories for persistence. Repositories own Prisma queries and data access; domain functions should remain pure and free of database, network, or environment I/O. Follow the more detailed backend boundaries in `backend/AGENT.md`.
- Put client/API contracts and socket payloads used on both sides in `shared-types`; import types with `import type`. Keep types used by only one side local to that package.
- Backend TypeScript uses NodeNext ESM imports with `.js` extensions in source imports. Follow this convention when adding backend modules.
- Frontend server state is handled with TanStack Query hooks, while app-wide auth and quiz-answer state use providers/contexts. Reuse the shared Axios client for HTTP requests.
- Prisma schema changes belong in `backend/prisma/schema.prisma` and should be accompanied by the corresponding migration. Do not hand-edit generated Prisma client files.
- The Vite client reads `VITE_API_URL`. The backend selects `DEV_DATABASE_URL` or `PROD_DATABASE_URL` based on `NODE_ENV`; keep environment-specific configuration out of source.

## Build, lint, and test
Run package commands from the relevant package directory:

| Package | Build / check | Lint | Test |
| --- | --- | --- | --- |
| Frontend (`frontend/melocode`) | `npm run build` | `npm run lint` | No test script or test runner is configured. |
| Backend (`backend`) | `npx tsc --noEmit` for a reliable type check; `npm run build` is also defined | No backend lint script is configured. | No test script or test runner is configured. |

To lint one frontend file, run `npx eslint src/path/to/file.tsx` from `frontend/melocode`. There is currently no single-test command because no test framework or test files are configured.

The backend `build` script currently ends in `|| true`, which can mask TypeScript errors; use `npx tsc --noEmit` when checking whether the backend type-checks.
