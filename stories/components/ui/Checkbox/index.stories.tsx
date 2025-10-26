import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from '@/components/ui/Checkbox';
import "../../../../dist/output.css";

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["default", "ios"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["default", "sm", "lg"],
      },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Accept terms and conditions",
  },
};

export const IOSStyle: Story = {
  args: {
    variant: "ios",
    label: "iOS circular checkbox",
  },
};

export const Checked: Story = {
  args: {
    label: "This is checked",
    defaultChecked: true,
  },
};

export const WithoutLabel: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    size: "sm",
    label: "Small checkbox",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    label: "Large checkbox",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled checkbox",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Disabled and checked",
    disabled: true,
    defaultChecked: true,
  },
};

export const WithError: Story = {
  args: {
    label: "You must accept the terms",
    error: "This field is required",
  },
};

export const MultipleOptions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox label="Option 1" />
      <Checkbox label="Option 2" defaultChecked />
      <Checkbox label="Option 3" />
      <Checkbox label="Option 4 (disabled)" disabled />
    </div>
  ),
};
