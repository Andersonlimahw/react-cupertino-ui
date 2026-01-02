import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { CommandPalette } from "@components/ui/CommandPalette";

const actions = [
  { id: "new", label: "Create component", shortcut: "N", description: "Generate Liquid Glass boilerplate" },
  { id: "palette", label: "Open Palette", shortcut: "⌘K", description: "Toggle command palette" },
  { id: "story", label: "Open Storybook", shortcut: "⌘⇧S" },
  { id: "toggle-dark", label: "Toggle Dark Mode", shortcut: "⌘⇧D" },
];

const meta: Meta<typeof CommandPalette> = {
  title: "UI/CommandPalette",
  component: CommandPalette,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    actions,
  },
};

export default meta;
type Story = StoryObj<typeof CommandPalette>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    const [query, setQuery] = useState("");
    return (
      <CommandPalette
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        query={query}
        onQueryChange={setQuery}
      />
    );
  },
};

export const WithQuery: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    const [query, setQuery] = useState("Open");
    return (
      <CommandPalette
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        query={query}
        onQueryChange={setQuery}
        highlightMatches
      />
    );
  },
};
