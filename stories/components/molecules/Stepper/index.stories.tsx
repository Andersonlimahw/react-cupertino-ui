import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Stepper from "@/components/molecules/Stepper";
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
