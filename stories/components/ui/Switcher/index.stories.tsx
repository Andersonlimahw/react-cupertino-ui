import type { Meta, StoryObj } from "@storybook/react";

import Switcher from "@/components/ui/Switcher";
import "../../../../dist/output.css";

const meta = {
  title: "Components/Switcher",
  component: Switcher,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof Switcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
