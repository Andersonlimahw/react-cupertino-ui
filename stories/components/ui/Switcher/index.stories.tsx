import type { Meta, StoryObj } from "@storybook/react";

import Switcher from "@components/ui/Switcher";
import "@globalstyles";

const meta: Meta<typeof Switcher> = {
  title: "UI/Switcher",
  component: Switcher,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    label: "Airplane Mode",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Airplane Mode",
    helperText: "Turn off cellular, Wi-Fi, Bluetooth",
  },
};

export const WithIcons: Story = {
  args: {
    label: "Appearance",
    helperText: "Match system",
    defaultChecked: true,
    size: "lg",
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
      <Switcher size="sm" label="Silent Mode" helperText="Small" />
      <Switcher size="default" label="Focus" helperText="Default" />
      <Switcher size="lg" label="Stage Manager" helperText="Large" />
    </div>
  ),
};
