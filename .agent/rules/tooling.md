---
trigger: always_on
---

# Tooling and Styling Standards

This document defines the usage of Biome, Tailwind CSS 4, and Shadcn UI.

## 1. Biome (Linting & Formatting)
- **Zero Warnings Policy:** Code should ideally be free of warnings and errors before committing.
- **Auto-Fix:** Use `pnpm lint:fix` to automatically resolve formatting and simple linting issues.
- **Imports:** Imports must be organized automatically by Biome (enabled in `biome.json`).

## 2. Tailwind CSS 4
- **Utility-First:** Use Tailwind utility classes for all styling.
- **Modern Features:** Leverage Tailwind 4 features like native CSS variables and container queries.
- **Configuration:** Avoid large `tailwind.config.ts` if possible; prefer using CSS variables in `src/app/globals.css`.

## 3. Shadcn UI
- **Location:** All Shadcn components must be placed in `src/components/ui/`.
- **Customization:** Modify Shadcn components directly when needed, but maintain the `@libs/utils` import for `cn()` helper.
- **Import Alias:** Use the `@components/ui/` alias for all Shadcn component imports.

## 4. Environment Variables
- **Client-Side:** Prefix client-side environment variables with `NEXT_PUBLIC_`.
- **Type Safety:** Maintain a global type definition for `ProcessEnv` if necessary to ensure type safety when accessing variables.
