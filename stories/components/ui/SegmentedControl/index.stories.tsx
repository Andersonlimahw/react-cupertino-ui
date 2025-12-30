import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Grid, List, LayoutGrid } from 'lucide-react';

import SegmentedControl from '@/components/ui/SegmentedControl';
import "@globalstyles";

const basicOptions = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

const viewOptions = [
  { value: "grid", label: "Grid", icon: <Grid /> },
  { value: "list", label: "List", icon: <List /> },
  { value: "gallery", label: "Gallery", icon: <LayoutGrid /> },
];

const meta = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["default", "sm", "lg"],
      },
    },
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: basicOptions,
    defaultValue: "day",
  },
};

export const WithIcons: Story = {
  args: {
    options: viewOptions,
    defaultValue: "grid",
  },
};

export const IconOnly: Story = {
  args: {
    options: [
      { value: "grid", label: "", icon: <Grid /> },
      { value: "list", label: "", icon: <List /> },
      { value: "gallery", label: "", icon: <LayoutGrid /> },
    ],
    defaultValue: "grid",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    options: basicOptions,
    defaultValue: "week",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    options: basicOptions,
    defaultValue: "month",
  },
};

export const FullWidth: Story = {
  args: {
    options: basicOptions,
    defaultValue: "day",
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    options: basicOptions,
    defaultValue: "day",
    disabled: true,
  },
};

export const WithDisabledOption: Story = {
  args: {
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2 (disabled)", disabled: true },
      { value: "option3", label: "Option 3" },
    ],
    defaultValue: "option1",
  },
};

export const TwoOptions: Story = {
  args: {
    options: [
      { value: "on", label: "On" },
      { value: "off", label: "Off" },
    ],
    defaultValue: "on",
  },
};

export const FourOptions: Story = {
  args: {
    options: [
      { value: "spring", label: "Spring" },
      { value: "summer", label: "Summer" },
      { value: "autumn", label: "Autumn" },
      { value: "winter", label: "Winter" },
    ],
    defaultValue: "spring",
  },
};

export const Controlled: Story = {
  args: {
    options: basicOptions,
  },
  render: () => {
    const [value, setValue] = useState("day");

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <SegmentedControl
          options={basicOptions}
          value={value}
          onChange={setValue}
        />
        <p style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>
          Selected: <strong>{value}</strong>
        </p>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setValue("day")}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid hsl(var(--border))',
              background: value === 'day' ? 'var(--blue)' : 'hsl(var(--background))',
              color: value === 'day' ? 'white' : 'inherit',
              cursor: 'pointer',
            }}
          >
            Day
          </button>
          <button
            onClick={() => setValue("week")}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid hsl(var(--border))',
              background: value === 'week' ? 'var(--blue)' : 'hsl(var(--background))',
              color: value === 'week' ? 'white' : 'inherit',
              cursor: 'pointer',
            }}
          >
            Week
          </button>
          <button
            onClick={() => setValue("month")}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid hsl(var(--border))',
              background: value === 'month' ? 'var(--blue)' : 'hsl(var(--background))',
              color: value === 'month' ? 'white' : 'inherit',
              cursor: 'pointer',
            }}
          >
            Month
          </button>
        </div>
      </div>
    );
  },
};
