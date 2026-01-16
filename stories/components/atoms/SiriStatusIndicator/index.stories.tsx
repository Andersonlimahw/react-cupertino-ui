import type { Meta, StoryObj } from "@storybook/react";

import { SiriStatusIndicator } from "@components/atoms/SiriStatusIndicator";

const meta: Meta<typeof SiriStatusIndicator> = {
  title: "Atoms/SiriStatusIndicator",
  component: SiriStatusIndicator,
  args: {
    status: "thinking",
    size: "md",
  },
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof SiriStatusIndicator>;

export const Default: Story = {};

export const Listening: Story = {
  args: { status: "listening" },
};
