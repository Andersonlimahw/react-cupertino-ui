import type { Meta, StoryObj } from "@storybook/react";

import Slider from "@/components/ui/Slider";
import "@globalstyles";

const meta = {
  title: "Components/Slider",
  component: Slider,
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
    min: 0,
    max: 100,
    label: "Intensity",
    showValue: true,
    defaultValue: 60,
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const SolidVariant: Story = {
  args: {
    variant: "solid",
  },
};

export const OutlineVariant: Story = {
  args: {
    variant: "outline",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    helperText: "Disabled state",
  },
};

export const WithError: Story = {
  args: {
    error: "Value required",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "300px" }}>
      <Slider size="sm" label="Small" defaultValue={30} />
      <Slider size="default" label="Default" defaultValue={60} />
      <Slider size="lg" label="Large" defaultValue={80} />
    </div>
  ),
};
