import type { Meta, StoryObj } from "@storybook/react";

import { CalendarHeatmap } from "@components/ui/CalendarHeatmap";

const data = Array.from({ length: 30 }).map((_, index) => ({
  date: new Date(Date.now() - index * 86400000).toISOString(),
  value: Math.random() * 5,
}));

const meta: Meta<typeof CalendarHeatmap> = {
  title: "UI/CalendarHeatmap",
  component: CalendarHeatmap,
  args: {
    data,
  },
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof CalendarHeatmap>;

export const Default: Story = {};
