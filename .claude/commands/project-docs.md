# Command: /project-docs

**Usage:** `/project-docs "ComponentName"`

**Description:**
Audits and improves the documentation (Storybook + README) for a specific component.

**Execution Steps:**
1.  **Read Story:** Read `stories/components/ui/{Name}/index.stories.tsx`.
2.  **Audit:** Check for:
    *   Missing `argTypes` controls.
    *   Missing variants in examples (Primary, Secondary, Disabled, etc.).
    *   Lack of JSDoc comments in the component code.
3.  **Generate/Update:**
    *   Add missing stories.
    *   Add JSDoc description to the component in `packages/ui/{Name}/index.tsx`.

**Example:**
> User: /project-docs "Slider"
> Agent: Checking `Slider` documentation... Adding "Range" story variant.
