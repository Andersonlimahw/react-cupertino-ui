import type { Meta, StoryObj } from "@storybook/react";

import Title from "@/components/ui/Title";
import "../../../../dist/output.css";

const meta = {
  title: "Typography/Title",
  component: Title,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    // Define default args here
  },
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: {
    children: "Title",
  },
};

export const Default: Story = {
  args: {
    children: "Title",
  },
};

export const Heading: Story = {
  args: {
    children: "Title",
    variant: "heading",
  },
};

export const Heading1: Story = {
  args: {
    children: "Title",
    variant: "heading1",
  },
};

export const Heading2: Story = {
  args: {
    children: "Title",
    variant: "heading2",
  },
};

export const Heading3: Story = {
  args: {
    children: "Title",
    variant: "heading3",
  },
};
