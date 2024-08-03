import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Sidesheet from '@/components/ui/Sidesheet';
import "../../../../dist/output.css";

const meta = {
  title: 'Components/Sidesheet',
  component: Sidesheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: "Sample",
  },
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: [
          "default",
          "destructive",
          "outline",
          "secondary",
          "ghost",
          "link",
        ],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["default", "sm", "lg", "icon"],
      },
    },
  },
} satisfies Meta<typeof Sidesheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    // Define primary story args here
  },
};

export const Secondary: Story = {
  args: {
    // Define secondary story args here
  },
};