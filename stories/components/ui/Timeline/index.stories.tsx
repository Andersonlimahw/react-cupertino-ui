import type { Meta, StoryObj } from "@storybook/react";

import { Timeline, type TimelineItem } from "@components/ui/Timeline";
import "@globalstyles";

const meta: Meta<typeof Timeline> = {
  title: "UI/Timeline",
  component: Timeline,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const baseItems: TimelineItem[] = [
  {
    id: "1",
    title: "Design briefing",
    description: "Gather Cupertino references and Liquid Glass animatics from Figma.",
    timestamp: "09:15",
    meta: "Done",
    status: "complete",
  },
  {
    id: "2",
    title: "Component implementation",
    description: "Build Timeline component with tokens + grooves.",
    timestamp: "11:30",
    meta: "In progress",
    status: "current",
    helper: "Ensure keyboard focus + reduced motion states",
  },
  {
    id: "3",
    title: "Storybook showcase",
    description: "Add multi-variant demos and docs to Storybook.",
    timestamp: "14:00",
    meta: "Next",
    status: "upcoming",
  },
];

export const Default: Story = {
  args: {
    items: baseItems,
  },
};

export const CompactMinimal: Story = {
  args: {
    items: baseItems,
    density: "compact",
    variant: "minimal",
    interactive: true,
  },
};
