---
name: task_plan_github
description: Managing GitHub issues (creation, sync, metadata) during task planning.
---

# GitHub Issue Planning Skill

This skill is responsible for the strategy and execution of synchronizing local issue documentation with GitHub Issues.

## Issue Creation Strategy
If the plan involves creating GitHub issues, follow this strict protocol:

### 1. Context Gathering (GitHub)
Before generating issue files, you must gather valid metadata from the repository:
*   [ ] **Fetch Assignees**: `gh api repos/:owner/:repo/assignees`
*   [ ] **Fetch Labels**: `gh label list`
*   [ ] **Fetch Projects**: `gh project list`
*   [ ] **Fetch Milestones**: `gh milestone list`

### 2. Determine Assignee (Interactive)
1.  **List Available Users**: Use the list fetched from `gh api .../assignees`.
2.  **Ask the User**: Call `notify_user` to present the list of candidates (including "Unassigned") and ask who should be assigned to the issue(s).
   *   **CRITICAL**: You MUST set `BlockedOnUser: true` for this call. You cannot proceed without the user's explicit selection.
   *   *Example Message*: "Available Assignees: [user1, user2]. Who should lead this task?"

### 3. Documentation First
Create a markdown file for each issue in `docs/issues/` (e.g., `docs/issues/issue-001-description.md`).

### 3. Issue Format
Use the **User Story** format. Include a hidden **Metadata Block** at the top of the file to drive the `gh` command generation.
**Crucial**: The values in the metadata block MUST match the valid values fetched in Step 1.

**Template:**
```markdown
<!--
gh_metadata:
  assignees: [username1, username2]
  labels: [label1, label2]
  projects: [Project Name]
  milestone: [Milestone Name]
-->

As a [Role],
I want [Feature/Fix],
So that [Benefit].

## Context
**Component:** [File Path or Component Name]

[Description of the current state, problem, or architectural details]

## Acceptance Criteria
- [ ] [Criteria 1]
- [ ] [Criteria 2]
```

### 4. Labeling & Command Strategy
When running `gh issue create` or `gh issue edit`:
1.  **Read the Metadata Block** from the file.
2.  **Verify & Create**: 
    *   Compare the metadata block values against the available GitHub data.
    *   **If a label/milestone is missing**: Run `gh label create` or `gh milestone create` immediately.
    *   **If an assignee is missing**: Notify the user or default to a safe fallback.
3.  **Construct the Command**:
    *   `--add-assignee`: Map from `assignees`.
    *   `--add-label`: Map from `labels`.
    *   `--add-project`: Map from `projects`.
    *   `--milestone`: Map from `milestone`.

**Command Example:**
```bash
gh issue create --title "Title" --body-file "docs/issues/issue-001.md" --label "p1,enhancement" --assignee "gabs"
```
