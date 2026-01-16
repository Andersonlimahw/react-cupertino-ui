# Command: /project-analyze

**Usage:** `/project-analyze "ComponentName"`

**Description:**
Performs a deep architectural analysis of a component, checking for accessibility compliance, bundle size impact (conceptual), and styling consistency.

**Execution Steps:**
1.  **Read Code:** Read `index.tsx` and `index.scss`.
2.  **Check Accessibility:** Verify `aria-*` attributes, keyboard navigation (tabIndex), and semantic HTML.
3.  **Check Styling:** specific verification of `react-cupertino-ui` prefix usage and CSS variables.
4.  **Report:** specific output using `delegate_to_agent` ("codebase_investigator") or generating a markdown report `reports/{Name}-analysis.md`.

**Example:**
> User: /project-analyze "DatePicker"
> Agent: Analyzing accessibility and performance of DatePicker...
