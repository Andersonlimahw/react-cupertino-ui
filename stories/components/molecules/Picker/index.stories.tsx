import type { Meta, StoryObj } from "@storybook/react";
import { Picker } from "@/components/molecules/Picker";
import { useState } from "react";

const meta = {
  title: "Molecules/Picker",
  component: Picker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Picker>;

export default meta;
type Story = StoryObj<typeof meta>;

const PickerWithState = () => {
  const [value, setValue] = useState<string | number>("apple");
  
  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
    { value: "date", label: "Date" },
    { value: "elderberry", label: "Elderberry" },
    { value: "fig", label: "Fig" },
    { value: "grape", label: "Grape" },
    { value: "honeydew", label: "Honeydew" },
  ];

  return (
    <div style={{ width: "300px", padding: "20px", background: "var(--background)", borderRadius: "12px", border: "1px solid var(--border)" }}>
      <Picker options={options} value={value} onChange={setValue} />
      <div style={{ textAlign: "center", marginTop: "20px" }}>Selected: {value}</div>
    </div>
  );
};

export const Default: Story = {
  args: {
    options: [
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
    ],
    value: "apple",
    onChange: () => {},
  },
  render: () => <PickerWithState />,
};
