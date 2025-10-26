import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import Slider from '@/components/ui/Slider';
import "../../../../dist/output.css";

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["default", "sm", "lg"],
      },
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 50,
  },
};

export const WithLabel: Story = {
  args: {
    label: "Volume",
    defaultValue: 75,
  },
};

export const WithValue: Story = {
  args: {
    label: "Brightness",
    showValue: true,
    defaultValue: 60,
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Temperature",
    showValue: true,
    defaultValue: 22,
    min: 15,
    max: 30,
    helperText: "Adjust the room temperature",
  },
};

export const WithError: Story = {
  args: {
    label: "Value",
    showValue: true,
    defaultValue: 90,
    error: "Value is too high",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    label: "Small Slider",
    showValue: true,
    defaultValue: 40,
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    label: "Large Slider",
    showValue: true,
    defaultValue: 60,
  },
};

export const CustomRange: Story = {
  args: {
    label: "Price Range",
    showValue: true,
    min: 0,
    max: 1000,
    defaultValue: 500,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Slider",
    showValue: true,
    defaultValue: 50,
    disabled: true,
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(50);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Slider
          label="Controlled Slider"
          showValue
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
        <p style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>
          Current value: {value}
        </p>
        <button
          onClick={() => setValue(50)}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            border: '1px solid hsl(var(--border))',
            background: 'hsl(var(--background))',
            cursor: 'pointer',
          }}
        >
          Reset to 50
        </button>
      </div>
    );
  },
};

export const MultipleSliders: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Slider label="Red" showValue defaultValue={255} min={0} max={255} />
      <Slider label="Green" showValue defaultValue={128} min={0} max={255} />
      <Slider label="Blue" showValue defaultValue={64} min={0} max={255} />
    </div>
  ),
};
