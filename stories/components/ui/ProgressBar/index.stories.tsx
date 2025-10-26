import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';

import ProgressBar from '@/components/ui/ProgressBar';
import Button from '@/components/ui/Button';
import "../../../../dist/output.css";

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
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
  },
};

export const WithLabel: Story = {
  args: {
    label: "Progress",
    value: 75,
  },
};

export const WithValue: Story = {
  args: {
    label: "Download Progress",
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

export const Small: Story = {
  args: {
    size: "sm",
    label: "Small Progress Bar",
    value: 50,
    showValue: true,
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    label: "Large Progress Bar",
    value: 65,
    showValue: true,
  },
};

export const Animated: Story = {
  args: {
    label: "Uploading",
    value: 70,
    showValue: true,
    animated: true,
  },
};

export const Zero: Story = {
  args: {
    label: "Not Started",
    value: 0,
    showValue: true,
  },
};

export const Complete: Story = {
  args: {
    label: "Complete",
    variant: "success",
    value: 100,
    showValue: true,
  },
};

export const AnimatedProgress: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
      if (isRunning && progress < 100) {
        const timer = setTimeout(() => {
          setProgress(progress + 1);
        }, 50);
        return () => clearTimeout(timer);
      } else if (progress >= 100) {
        setIsRunning(false);
      }
    }, [progress, isRunning]);

    const handleStart = () => {
      setProgress(0);
      setIsRunning(true);
    };

    const handleReset = () => {
      setProgress(0);
      setIsRunning(false);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <ProgressBar
          label="Animated Progress"
          value={progress}
          showValue
          animated={isRunning}
          variant={progress === 100 ? "success" : "default"}
        />
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button onClick={handleStart} disabled={isRunning} size="sm">
            Start
          </Button>
          <Button onClick={handleReset} size="sm">
            Reset
          </Button>
        </div>
      </div>
    );
  },
};

export const MultipleProgress: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <ProgressBar
        label="CPU Usage"
        value={45}
        showValue
        variant="default"
      />
      <ProgressBar
        label="Memory Usage"
        value={72}
        showValue
        variant="warning"
      />
      <ProgressBar
        label="Storage Usage"
        value={28}
        showValue
        variant="success"
      />
      <ProgressBar
        label="Network Usage"
        value={91}
        showValue
        variant="error"
      />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <ProgressBar
        size="sm"
        label="Small"
        value={40}
        showValue
      />
      <ProgressBar
        size="default"
        label="Default"
        value={60}
        showValue
      />
      <ProgressBar
        size="lg"
        label="Large"
        value={80}
        showValue
      />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <ProgressBar
        label="Default"
        value={50}
        variant="default"
        showValue
      />
      <ProgressBar
        label="Success"
        value={100}
        variant="success"
        showValue
      />
      <ProgressBar
        label="Warning"
        value={75}
        variant="warning"
        showValue
      />
      <ProgressBar
        label="Error"
        value={25}
        variant="error"
        showValue
      />
    </div>
  ),
};
