# Skill: New Feature Structure

**Description:** Generates a new feature structure following the Feature-Based Architecture (FBA) standards.

## Usage Context
Use this skill when the user asks to "create a new feature", "add a module", or "scaffold a domain".

## Steps

1. **Information Gathering:**
   - Confirm the feature name (kebab-case).
   - Identify the main domain entity (e.g., `Article`, `User`, `Product`).

2. **Execution Commands:**
   ```bash
   # Replace [feature-name] with the actual name
   mkdir -p src/features/[feature-name]/components \
            src/features/[feature-name]/hooks \
            src/features/[feature-name]/api \
            src/features/[feature-name]/services \
            src/features/[feature-name]/types \
            src/features/[feature-name]/utils \
            src/features/[feature-name]/tests
   ```

3. **Template Generation:**

   ### Types (`types/[feature-name].types.ts`)
   Define the core interfaces for the domain.

   ### Service (`services/[feature-name].service.ts`)
   Create a class for business logic and data fetching.

   ### API (`api/[feature-name].api.ts`)
   Thin wrapper exporting service methods.

   ### Index (`index.ts`)
   Export the public API (Components, Hooks, Services, Types).

4. **Validation:**
   - Run `pnpm lint` to ensure correct formatting.
   - Verify path aliases are used correctly.

## Constraints
- Do not implement complex UI logic in this step.
- Ensure the `services/` layer is React-agnostic.
- All exports must be centralized in the feature's `index.ts`.
