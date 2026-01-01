import type { Meta, StoryObj } from "@storybook/react";

import Radio from "@components/ui/Radio";
import "@globalstyles";

const meta = {
  title: "Components/Radio",
  component: Radio,
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
    name: "radio-story",
    label: "Option",
    helperText: "Subtitle",
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Default",
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
    label: "Selected",
    helperText: "Currently active",
  },
};

export const Error: Story = {
  args: {
    label: "Option",
    error: "Pick one",
  },
};

export const Disabled: Story = {
  args: {
    label: "Unavailable",
    disabled: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Radio size="sm" name="sizes" label="Small" helperText="sm" />
      <Radio size="default" name="sizes" label="Default" helperText="default" />
      <Radio size="lg" name="sizes" label="Large" helperText="lg" />
    </div>
  ),
};
