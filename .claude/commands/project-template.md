# Command: /project-template

**Usage:** `/project-template "TemplateName"`

**Description:**
Scaffolds a new Template package in `packages/templates/`. Since there is no automatic script for this yet, the agent must perform the creation manually by copying the structure of `AuthTemplate`.

**Execution Steps:**
1.  **Create Directory:** Create `packages/templates/{TemplateName}Template`.
2.  **Scaffold Files:** Create the following files based on `AuthTemplate` structure:
    *   `package.json` (Update name to `@react-cupertino-ui/{kebab-case}-template`)
    *   `tsconfig.build.json`
    *   `index.tsx` (Basic export structure)
    *   `index.scss` (Empty or basic imports)
3.  **Create Story:** Create `stories/components/templates/{TemplateName}Template/index.stories.tsx`.
4.  **Sync Paths:** Run `npm run sync:paths`.

**Example:**
> User: /project-template "Dashboard"
> Agent: Creating `packages/templates/DashboardTemplate` structure...
