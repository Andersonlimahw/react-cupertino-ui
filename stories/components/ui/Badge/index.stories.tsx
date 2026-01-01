import type { Meta, StoryObj } from "@storybook/react";

import Badge from "@components/ui/Badge";
import "@globalstyles";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["glass", "solid", "outline", "success", "warning", "error"],
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg", "pill"],
    },
  },
  args: {
    children: "New",
    variant: "glass",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Solid: Story = {
  args: {
    variant: "solid",
    children: "Live",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Beta",
  },
};

export const Statuses: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Badge size="sm">sm</Badge>
      <Badge size="default">default</Badge>
      <Badge size="lg">lg</Badge>
      <Badge size="pill">pill</Badge>
    </div>
  ),
};
