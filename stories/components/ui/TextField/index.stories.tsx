import type { Meta, StoryObj } from '@storybook/react';
import { Mail, Search, Eye } from 'lucide-react';

import TextField from '@/components/ui/TextField';
import "../../../../dist/output.css";

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["default", "outline", "filled"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["default", "sm", "lg"],
      },
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter your text...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Username",
    placeholder: "johndoe",
    helperText: "Choose a unique username",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    error: "Please enter a valid email address",
    type: "email",
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: "Search",
    placeholder: "Search...",
    leftIcon: <Search />,
  },
};

export const WithRightIcon: Story = {
  args: {
    label: "Email",
    placeholder: "your@email.com",
    type: "email",
    rightIcon: <Mail />,
  },
};

export const WithBothIcons: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    type: "password",
    leftIcon: <Eye />,
    rightIcon: <Mail />,
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    placeholder: "Small input",
    label: "Small Size",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    placeholder: "Large input",
    label: "Large Size",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    placeholder: "Outline variant",
    label: "Outline Style",
  },
};

export const Filled: Story = {
  args: {
    variant: "filled",
    placeholder: "Filled variant",
    label: "Filled Style",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Field",
    placeholder: "This is disabled",
    disabled: true,
  },
};
