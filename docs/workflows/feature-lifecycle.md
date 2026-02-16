---
description: Feature Development Lifecycle
---

# Workflow: Feature Development Lifecycle

This workflow guides the development of a new feature from conception to production-ready code.

## Phase 1: Planning & Scaffolding
1. **Analyze Requirements:** Understand the domain logic and UI needs.
2. **Execute Skill:** Load and run the `feature-scaffold` skill.
3. **Define Types:** Write the TypeScript interfaces first to establish the data contract.

## Phase 2: Core Logic (Business Layer)
1. **Implement Service:** Write the logic in `services/[feature-name].service.ts`.
2. **Write Unit Tests:** Create tests in `tests/[feature-name].test.tsx` (or `.ts`) to verify service methods.
3. **Verify:** Run `pnpm test:run` to ensure logic is correct before building UI.

## Phase 3: Integration (Hook & API)
1. **Create API Wrapper:** Export service methods through the `api/` layer.
2. **Implement Hook:** Create a React hook (e.g., `use[Feature]`) to manage state and loading/error conditions.

## Phase 4: User Interface
1. **Build Components:** Create feature-specific components using Shadcn UI atoms.
2. **Connect Hook:** Consume the hook in the main feature component.
3. **Export Public API:** Ensure everything needed externally is exported in `index.ts`.

## Phase 5: Finalization
1. **Biome Check:** Run `pnpm lint:fix` to ensure code quality.
2. **Build Test:** Run `pnpm build` to verify Next.js compatibility and type safety.
3. **Documentation:** Update any relevant project docs.

## Error Handling
- If linting fails: Fix immediately using Biome suggestions.
- If tests fail: Re-evaluate the `services/` logic or mock data.
- If build fails: Check path aliases and TypeScript types.
