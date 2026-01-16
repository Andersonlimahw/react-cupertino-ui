# Command: /project-component

**Usage:** `/project-component "ComponentName"`

**Description:**
Scaffolds a new UI component in the `packages/ui/` directory, including styles, tests, and Storybook stories.

**Execution Steps:**
1.  **Generate Files:** Run `npm run new:component "{ComponentName}"`.
2.  **Sync Paths:** Run `npm run sync:paths` to update TypeScript aliases.
3.  **Verify:** Check that the following files exist:
    *   `packages/ui/{ComponentName}/index.tsx`
    *   `packages/ui/{ComponentName}/index.scss`
    *   `packages/ui/{ComponentName}/package.json`
    *   `stories/components/ui/{ComponentName}/index.stories.tsx`
    *   `tests/components/ui/{ComponentName}/index.test.tsx`

**Example:**
> User: /project-component "GlassCard"
> Agent: Executing `npm run new:component "GlassCard"`...
