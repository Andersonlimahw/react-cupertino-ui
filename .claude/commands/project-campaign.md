# Command: /project-campaign

**Usage:** `/project-campaign "FocusTopic"`

**Description:**
Generates a mini-marketing campaign (social posts) specifically for a new feature or component release.

**Execution Steps:**
1.  **Analyze:** Read the source code of the component/feature to understand its USP (Unique Selling Point).
2.  **Generate Copy:** Create a file `marketing-campaign/social-{topic}.md` containing:
    *   1 Twitter/X Thread (Technical hook).
    *   1 LinkedIn Post (Business value).
    *   1 Instagram/TikTok visual concept description.
3.  **Generate Prompts:** Add 3 image prompts to `marketing-campaign/06-PROMPTS-IMAGENS.md` specific to this feature.

**Example:**
> User: /project-campaign "SiriWaveform"
> Agent: Generating social media copy for SiriWaveform release...
