# Architecture Rules: Feature-Based Architecture (FBA)

This document defines the architectural invariants for the project. All development must adhere to these standards to ensure scalability and maintainability.

## 1. Directory Structure

The project follows a strict Feature-Based Architecture. Core logic is isolated within features, while shared logic resides in specialized top-level directories.

### Top-Level Directories
- `src/features/`: Contains domain-specific logic (e.g., `news-feed`, `auth`, `user-profile`).
- `src/components/ui/`: Shared, low-level UI components (e.g., Shadcn buttons, cards).
- `src/libs/`: Shared utility functions and third-party configurations (e.g., `utils.ts`, `api-client.ts`).
- `src/hooks/`: Global, cross-feature React hooks.
- `src/types/`: Global TypeScript definitions and interfaces.
- `src/utils/`: Generic, non-React helper functions.

## 2. Feature Internal Structure

Every feature folder must follow this sub-structure:
```
src/features/[feature-name]/
├── api/          # Thin wrappers for service calls (used by UI/Hooks)
├── components/   # Feature-specific components
├── hooks/        # Feature-specific React hooks
├── services/     # Core business logic (Pure TS classes/functions)
├── types/        # Feature-specific TypeScript types
├── utils/        # Feature-specific utility functions
├── tests/        # Unit and integration tests
└── index.ts      # Public API for the feature
```

## 3. Path Aliases

Always use the following path aliases. Relative imports (e.g., `../../`) are prohibited across feature boundaries.

- `@features/*` -> `src/features/*`
- `@components/*` -> `src/components/*`
- `@types/*` -> `src/types/*`
- `@libs/*` -> `src/libs/*`
- `@utils/*` -> `src/utils/*`

## 4. Cross-Feature Communication

- **Rule of Isolation:** Features must not import directly from the internal folders of another feature.
- **Public API:** All communication between features must happen through the feature's `index.ts`.
- **Circular Dependencies:** Avoid circular dependencies between features. If two features depend heavily on each other, consider if they should be merged or if the shared logic belongs in `src/libs/` or `src/hooks/`.

## 5. Service Layer (Business Logic)

- **Pure Logic:** Services must not import React or any UI-related libraries.
- **Testability:** Services should be designed as classes or functions that are easy to unit test without a DOM environment.
- **API Separation:** The `api/` layer should be a thin wrapper. Complex data transformations and orchestration belong in `services/`.
