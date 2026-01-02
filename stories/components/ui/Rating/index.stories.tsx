import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Rating } from "@components/ui/Rating";

const meta: Meta<typeof Rating> = {
  title: "UI/Rating",
  component: Rating,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  args: {
    defaultValue: 3.5,
    helperText: "Drag or tap stars to adjust",
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(2.5);
    return (
      <Rating
        value={value}
        onValueChange={setValue}
        helperText={`Current value: ${value.toFixed(1)}`}
      />
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Rating size="sm" defaultValue={2} helperText="Small" />
      <Rating size="md" defaultValue={3.5} helperText="Medium" />
      <Rating size="lg" defaultValue={4} helperText="Large" />
    </div>
  ),
};

export const ReadOnly: Story = {
  args: {
    value: 4.5,
    readOnly: true,
    helperText: "Average rating",
  },
};
