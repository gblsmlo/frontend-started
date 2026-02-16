---
name: task_plan
description: Advanced task planning and decomposition optimization for Gemini 3 Pro (High).
---

# Task Planning Skill

This skill is designed to leverage the high-reasoning capabilities of Gemini 3 Pro (High) for planning complex tasks.

## When to use this skill
- When the user asks for a "plan", "roadmap", "strategy", or "implementation guide".
- When a task is complex, ambiguous, or involves multiple files/dependencies.
- When you need to break down a large feature into manageable steps.
- When the user explicitly requests "high reasoning" or "deep thought" planning.

## Gemini 3 Pro (High) Best Practices
Gemini 3 Pro (High) excels at deep reasoning and "Chain of Thought" processing. To maximize its potential:
1.  **Thinking First**: Devote significant token space to the `<thought>` block. Analyze the problem from multiple angles before committing to a plan.
2.  **Context Loading**: Ensure all relevant local context (files, docs, env vars) is read *before* finalizing the plan.
3.  **Self-Correction**: Actively look for flaws in your own plan during the generation phase. Ask "What could go wrong?" for each step.

## Planning Instructions

### 1. Context Gathering & Analysis
Before creating the plan, ensure you have:
*   [ ] Read relevant documentation (e.g., `SKILL.md` files, existing workflows).
*   [ ] Analyzed the current project structure (`ls -R`, `view_file_outline`).
*   [ ] Checked for existing conventions (`user_rules`, `package.json`, `.eslintrc`, etc.).

### 2. The Planning Template
Generate your plan using the following structure. This structure is optimized for agentic execution.

#### Phase 1: Discovery & Validation
*   **Objective**: Confirm assumptions and environment state.
*   **Steps**:
    *   Read specific files to understand current implementation.
    *   Run diagnostic commands (if needed).
    *   Verify dependencies.

#### Phase 2: Implementation Strategy
*   **Objective**: Execute the core changes.
*   **Steps**:
    *   Break down coding tasks into atomic units (one file/component per step if possible).
    *   **Crucial**: Order steps by dependency (e.g., "Create UI Component" must come *after* "Install library").
    *   Include specific file paths and function names.

#### Phase 3: Verification & Polish
*   **Objective**: Ensure quality and aesthetics.
*   **Steps**:
    *   Run type checks (`tsc`).
    *   Linting (`eslint`).
    *   Manual verification instructions (e.g., "Open browser and check X").
    *   **Aesthetics Check**: Verify the design aligns with the "Premium Design" rules.

### 3. Execution Rules
*   **Atomic Steps**: Each step in the plan should be ideally executable in a single agent turn or a small sequence of tools.
*   **Command Safety**: Mark `safeToAutoRun` only for non-destructive read commands or verified safe build commands.
*   **User Confirmation**: For high-risk changes (deleting files, large refactors), explicitly add a "Wait for user confirmation" step.

## Example Plan Output

```markdown
### Implementation Plan: [Feature Name]

**Objective**: [Clear goal statement]

#### Phase 1: Setup
1.  [ ] Install `zod` dependency.
    *   *Command*: `npm install zod`
2.  [ ] Create `schemas` directory.
    *   *Action*: `mkdir src/schemas`

#### Phase 2: Core Logic
3.  [ ] Create validation schema in `src/schemas/user.ts`.
4.  [ ] Update `LoginForm` component to use schema.

#### Phase 3: Verification
5.  [ ] Run `npm run lint` to check for errors.
6.  [ ] Navigate to `/login` and test form submission with invalid data.
```
