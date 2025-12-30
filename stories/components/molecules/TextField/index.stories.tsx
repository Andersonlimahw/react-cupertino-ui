import type { Meta, StoryObj } from "@storybook/react";
import { Eye, Mail, Search, ShieldCheck } from "lucide-react";

import TextField from "@/components/molecules/TextField";
import "@globalstyles";

const meta = {
  title: "Components/Molecules/TextField",
  component: TextField,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["glass", "outline", "filled"],
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

export const Glass: Story = {
  args: {
    variant: "glass",
    label: "Email",
    placeholder: "you@icloud.com",
    type: "email",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    label: "Search",
    placeholder: "Look up apps, docs, etc",
    leftIcon: <Search />,
  },
};

export const Filled: Story = {
  args: {
    variant: "filled",
    label: "Password",
    placeholder: "********",
    type: "password",
    rightIcon: <Eye />,
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Username",
    placeholder: "johndoe",
    helperText: "Use 6 or more characters",
    leftIcon: <ShieldCheck />,
  },
};

export const WithSuccess: Story = {
  args: {
    label: "Verification Code",
    placeholder: "123456",
    success: "Code accepted",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    error: "Please enter a valid email",
    type: "email",
  },
};

export const WithBothIcons: Story = {
  args: {
    label: "Security",
    placeholder: "Face ID",
    leftIcon: <ShieldCheck />,
    rightIcon: <Mail />,
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    label: "Search",
    placeholder: "Small size",
    leftIcon: <Search />,
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    label: "Email",
    placeholder: "Larger surface",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    placeholder: "This is disabled",
    disabled: true,
  },
};
