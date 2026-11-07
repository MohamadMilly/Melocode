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
