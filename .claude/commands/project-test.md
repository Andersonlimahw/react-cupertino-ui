# Command: /project-test

**Usage:** `/project-test "ComponentName"` or `/project-test --all`

**Description:**
Executes the test suite for a specific component or the entire project.

**Execution Steps:**
1.  **Identify Target:**
    *   If specific name provided: Locate `packages/ui/{Name}` or `packages/templates/{Name}Template`.
    *   If `--all`: Target root.
2.  **Run Vitest:**
    *   Specific: `npx vitest packages/ui/{Name}`
    *   All: `npm run test`
3.  **Report:** Summarize pass/fail status and any coverage issues.

**Example:**
> User: /project-test "Button"
> Agent: Running `npx vitest packages/ui/Button`...
