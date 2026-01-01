import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Stepper from "@components/molecules/Stepper";
import "@globalstyles";

const meta = {
  title: "Components/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    label: "Quantity",
    defaultValue: 2,
    min: 0,
    max: 10,
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState(1);
    return <Stepper label="Controlled" value={value} onChange={setValue} min={0} max={5} />;
  },
};

export const LongPressAcceleration: Story = {
  args: {
    label: "Hold to adjust",
    defaultValue: 5,
    min: 0,
    max: 50,
    step: 1,
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", alignItems: "center" }}>
      <p style={{ fontSize: "0.9rem", color: "#667" }}>Press and hold the buttons to accelerate.</p>
      <Stepper {...args} />
    </div>
  ),
};
