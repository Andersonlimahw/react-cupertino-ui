import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker, DatePickerProps } from "@/components/molecules/DatePicker";
import { useState } from "react";

const meta = {
  title: "Molecules/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    mode: {
        control: { type: "select" },
        options: ["date", "time", "datetime"],
    },
    glass: { control: "boolean" },
    layout: {
        control: { type: "select" },
        options: ["wheel", "calendar", "compact"],
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const DatePickerWithState = (args: DatePickerProps) => {
  const [date, setDate] = useState(new Date());
  
  return (
    <div style={{ padding: "20px", background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", minHeight: "400px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <DatePicker {...args} value={date} onChange={setDate} />
      <div style={{ marginTop: "20px", fontFamily: "monospace" }}>
        Selected: {date.toLocaleString()}
      </div>
    </div>
  );
};

export const DateMode: Story = {
  args: {
    mode: "date",
    value: new Date(),
    onChange: () => {},
    layout: "wheel",
  },
  render: (args) => <DatePickerWithState {...args} />,
};

export const TimeMode: Story = {
  args: {
    mode: "time",
    value: new Date(),
    onChange: () => {},
    layout: "wheel",
  },
  render: (args) => <DatePickerWithState {...args} />,
};

export const DateTimeMode: Story = {
  args: {
    mode: "datetime",
    value: new Date(),
    onChange: () => {},
    layout: "wheel",
  },
  render: (args) => <DatePickerWithState {...args} />,
};

export const CalendarStyle: Story = {
  args: {
    mode: "date",
    layout: "calendar",
    value: new Date(),
    onChange: () => {},
  },
  render: (args) => <DatePickerWithState {...args} />,
};

export const CompactStyle: Story = {
  args: {
    mode: "datetime",
    layout: "compact",
    value: new Date(),
    onChange: () => {},
  },
  render: (args) => <DatePickerWithState {...args} />,
};
