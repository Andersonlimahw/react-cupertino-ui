import type { Meta, StoryObj } from "@storybook/react";

import Checkbox from "@components/ui/Checkbox";
import "@globalstyles";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "default", "lg"],
    },
    variant: {
      control: { type: "select" },
      options: ["glass", "solid", "outline"],
    },
  },
  args: {
    label: "Receive Updates",
    helperText: "Get the latest Liquid Glass news",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
    helperText: "Enabled",
  },
};

export const Error: Story = {
  args: {
    error: "You must enable this",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    helperText: "Unavailable",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Checkbox size="sm" label="Size small" helperText="sm" />
      <Checkbox size="default" label="Size default" helperText="default" />
      <Checkbox size="lg" label="Size large" helperText="lg" />
    </div>
  ),
};
