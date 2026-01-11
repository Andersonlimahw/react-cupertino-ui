import type { Meta, StoryObj } from "@storybook/react";

import { Accordion } from "@components/ui/Accordion";

const items = [
  {
    id: "overview",
    title: "Overview",
    description: "Summary of Liquid Glass system",
    content: "Liquid Glass captures the new translucent panels with depth, refraction and soft lighting cues.",
  },
  {
    id: "details",
    title: "Details",
    description: "Component breakdown",
    content: "Every component references shared glass tokens, supporting instant theme swaps.",
  },
  {
    id: "usage",
    title: "Usage",
    description: "Best practices",
    content: "Pair with SpotlightSearch, QuickAction, and templates to deliver iOS-like UX.",
  },
];

const meta: Meta<typeof Accordion> = {
  title: "UI/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  args: {
    items,
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {};

export const Single: Story = {
  args: {
    type: "single",
    defaultValue: ["overview"],
  },
};

export const Minimal: Story = {
  args: {
    variant: "minimal",
  },
};
