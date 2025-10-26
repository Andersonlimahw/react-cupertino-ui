import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import Radio from '@/components/ui/Radio';
import "../../../../dist/output.css";

const meta = {
  title: 'Components/Radio',
  component: Radio,
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
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Option 1",
    name: "radio-group",
  },
};

export const Checked: Story = {
  args: {
    label: "This is selected",
    name: "radio-group",
    defaultChecked: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    name: "radio-group",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    label: "Small radio",
    name: "radio-group",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    label: "Large radio",
    name: "radio-group",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled option",
    name: "radio-group",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Disabled and selected",
    name: "radio-group",
    disabled: true,
    defaultChecked: true,
  },
};

export const WithError: Story = {
  args: {
    label: "This option has an error",
    name: "radio-group",
    error: "Please select a valid option",
  },
};

export const RadioGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState('option1');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Radio
          name="demo-group"
          label="Option 1"
          value="option1"
          checked={selected === 'option1'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <Radio
          name="demo-group"
          label="Option 2"
          value="option2"
          checked={selected === 'option2'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <Radio
          name="demo-group"
          label="Option 3"
          value="option3"
          checked={selected === 'option3'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <Radio
          name="demo-group"
          label="Option 4 (disabled)"
          value="option4"
          disabled
          checked={selected === 'option4'}
        />
      </div>
    );
  },
};
