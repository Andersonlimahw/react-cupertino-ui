import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Label from "@/components/ui/Label";

const meta = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    // Define default args here
  },
} satisfies Meta<typeof Label>;

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
