import type { Meta, StoryObj } from "@storybook/react";
import { AILoadingState } from "@components/atoms/AILoadingState";

const meta = {
  title: "Atoms/AILoadingState",
  component: AILoadingState,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AILoadingState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Thinking: Story = {
  args: {
    variant: "thinking",
    message: "Analyzing your request",
  },
};

export const Generating: Story = {
  args: {
    variant: "generating",
    message: "Writing the answer",
  },
};

export const Searching: Story = {
  args: {
    variant: "searching",
    message: "Looking for related information",
  },
};
