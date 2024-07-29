import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Input from "@/components/ui/Input";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    // Define default args here
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    // Define primary story args here
  },
};

export const Secondary: Story = {
  args: {
    // Define secondary story args here
  },
};
