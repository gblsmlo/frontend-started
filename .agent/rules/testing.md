---
trigger: always_on
---

# Testing Invariants

This document outlines the testing strategy and requirements for the project.

## 1. Test Location and Naming
- All tests must reside in the `tests/` directory within their respective feature folder or alongside the file they test for global utilities.
- Test files must use the `.test.tsx` or `.test.ts` extension.

## 2. Testing Frameworks
- **Vitest:** Primary test runner.
- **React Testing Library:** For component and hook testing.
- **Happy DOM:** Default testing environment for DOM-related tests.

## 3. Testing Layers

### Business Logic (Services)
- **Requirement:** 100% coverage for complex business logic in the `services/` layer.
- **Environment:** Pure Node/TS environment (Happy DOM not strictly required but often used).
- **Focus:** Edge cases, data transformations, and error handling.

### Components
- **Focus:** User interactions and conditional rendering.
- **Method:** Use `screen` and `user-event` for interaction testing.
- **Mocking:** Mock the `services/` layer or `api/` calls to isolate component behavior.

### Hooks
- **Method:** Use `renderHook` from `@testing-library/react`.
- **Focus:** State transitions and side-effect triggers.

## 4. Mocking Standards
- Use `vi.mock()` for external modules and heavy dependencies.
- For feature services, prefer injecting a mock instance or using `vi.spyOn()` on the singleton instance if necessary.

## 5. Continuous Integration
- All tests must pass before any commit (enforced by Husky pre-commit hook).
- Use `pnpm test:run` for one-time execution in CI environments.
