import type { Meta, StoryObj } from "@storybook/react";

import Switcher from "@components/ui/Switcher";
import "@globalstyles";

const meta = {
  title: "Components/Switcher",
  component: Switcher,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    label: "Airplane Mode",
  },
} satisfies Meta<typeof Switcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Airplane Mode",
    helperText: "Turn off cellular, Wi-Fi, Bluetooth",
  },
};

export const Checked: Story = {
  args: {
    label: "Wi-Fi",
    helperText: "Home Network",
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Personal Hotspot",
    helperText: "Unavailable",
    disabled: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Switcher size="sm" label="Silent Mode" helperText="Size sm" />
      <Switcher size="default" label="Focus" helperText="Size default" />
      <Switcher size="lg" label="Dark Mode" helperText="Size lg" />
    </div>
  ),
};
