import type { Meta, StoryObj } from "@storybook/react";

import { ColorTokensViewer } from "@components/ui/ColorTokensViewer";

const tokens = [
  { name: "--color-blue", value: "#0a84ff", description: "Primary blue" },
  { name: "--color-green", value: "#30d158" },
];

const meta: Meta<typeof ColorTokensViewer> = {
  title: "UI/ColorTokensViewer",
  component: ColorTokensViewer,
  args: { tokens },
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof ColorTokensViewer>;

export const Default: Story = {};
