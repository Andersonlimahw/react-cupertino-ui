import type { Meta, StoryObj } from "@storybook/react";

import Skeleton from "@/components/ui/Skeleton";
import "../../../../dist/output.css";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    className: "w-[100px] h-[20px] rounded-full",
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Skeleton",
    className: "w-[100px] h-[20px] rounded-full",
  },
};
