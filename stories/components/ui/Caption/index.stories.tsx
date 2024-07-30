import type { Meta, StoryObj } from "@storybook/react";

import Caption from "@/components/ui/Caption";
import "../../../../dist/output.css";

const meta = {
  title: "Typography/Caption",
  component: Caption,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Caption",
  },
} satisfies Meta<typeof Caption>;

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
