---
applyTo: "**/features/**"
---

# Backend Features Architecture

## Directory Structure

- Each feature lives in its own self-contained folder under `features/<feature-name>/`.
- A feature folder co-locates all of its own layers (`*.routes.ts`, `*.controller.ts`, `*.service.ts`, `*.repository.ts`, types, and validators).
- Functionality used across multiple features resides in `shared/` (e.g., `shared/types/feature.ts`), rather than inside a specific feature folder.

## Feature Definition (`features/<feature-name>/index.ts`)

Every feature folder exposes an `index.ts` file that default-exports a `Feature` configuration object:

```ts
import { Feature } from "../../shared/types/feature";
import <featureName>Router from "./<feature-name>.routes";

const <featureName>Feature: Feature = {
  name: "<feature-name>",
  version: "1.0.0",
  enabled: true,
  router: <featureName>Router,
};

export default <featureName>Feature;
```

## Feature Registry (`features/index.ts`)

- `features/index.ts` aggregates all feature definitions from their respective folders and exports them for registration in `app.ts`.

## Behavioral Contract

- Feature boundaries encapsulate internal implementation while keeping existing routes, request/response schemas, status codes, and business behavior unchanged.

## Rules :

Features should NOT import anything from each other.

## When two feature share a functionality

when two features share one functionality , if this functionality is simple , then you can duplicate it with no problems.
if is shared along mutliple features , it is will good to extract it into shared folder , if it is something related to technical functionality like database connection it is better to put in infrastructure/

## type safety

keep the dtos request/response contracts in shared-types folder in index.ts so both frontend/backend can use them.

NEVER, UNDER ANY CIRCUMSTANCE, IMPORT FROM THE LEGACY BACKEND LAYERS:
• src/controllers/
• src/repositories/
• src/domains/
• src/services/
How to build new features:
Every single new feature or iteration must be built as an entirely self-contained, independent vertical slice.
• If you need data or technical capabilities, look only inside the shared/ folder or infrastructure/ directory.
• Do not allow old procedural or tightly-coupled architectures to bleed into new clean slices. Keep them completely unmerged.
