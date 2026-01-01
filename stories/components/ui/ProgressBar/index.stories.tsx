import type { Meta, StoryObj } from '@storybook/react';
import ProgressBar from '@components/ui/ProgressBar';
import "@globalstyles";

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
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
    variant: {
      control: {
        type: "select",
        options: ["default", "success", "warning", "error"],
      },
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 60,
    showValue: true,
  },
};

export const WithLabel: Story = {
  args: {
    label: "Progress",
    value: 75,
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Download",
    helperText: "Preparing files",
    value: 45,
    showValue: true,
  },
};

export const Success: Story = {
  args: {
    label: "Completed",
    variant: "success",
    value: 100,
    showValue: true,
  },
};

export const Warning: Story = {
  args: {
    label: "Storage Space",
    variant: "warning",
    value: 85,
    showValue: true,
  },
};

export const Error: Story = {
  args: {
    label: "Failed",
    variant: "error",
    value: 30,
    showValue: true,
  },
};

export const Sizes: Story = {
  args: {
    value: 0,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <ProgressBar size="sm" label="Small" value={40} showValue />
      <ProgressBar size="default" label="Default" value={60} showValue />
      <ProgressBar size="lg" label="Large" value={80} showValue />
    </div>
  ),
};

export const Animated: Story = {
  args: {
    label: "Uploading",
    value: 70,
    showValue: true,
    animated: true,
  },
};
