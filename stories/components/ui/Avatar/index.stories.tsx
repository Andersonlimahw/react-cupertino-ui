import type { Meta, StoryObj } from "@storybook/react";

import Avatar from "@/components/ui/Avatar";
import "@globalstyles";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    fallback: "John Doe",
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fallback: "John Doe",
  },
};

export const WithImage: Story = {
  args: {
    src: "https://avatars.githubusercontent.com/u/1?v=4",
    alt: "Mock Avatar",
  },
};

export const WithGlow: Story = {
  args: {
    glow: true,
  },
};

export const Status: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Avatar fallback="Jane" status="online" />
      <Avatar fallback="Alice" status="busy" />
      <Avatar fallback="Bob" status="away" />
      <Avatar fallback="Chris" status="offline" />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Avatar fallback="CI" shape="circle" />
      <Avatar fallback="RI" shape="rounded" />
      <Avatar fallback="SQ" shape="square" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Avatar size="sm" fallback="SM" />
      <Avatar size="default" fallback="DF" />
      <Avatar size="lg" fallback="LG" />
      <Avatar size="xl" fallback="XL" />
    </div>
  ),
};
