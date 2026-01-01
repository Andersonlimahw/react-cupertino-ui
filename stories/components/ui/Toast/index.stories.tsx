import type { Meta, StoryObj } from '@storybook/react';
import Toast from '@components/ui/Toast';
import { Mail } from "lucide-react";
import "@globalstyles";

const meta = {
  title: 'UI/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["default", "success", "error", "warning", "info"],
      },
    },
    position: {
      control: {
        type: "select",
        options: ["top-right", "top-left", "bottom-right", "bottom-left", "top-center", "bottom-center"],
      },
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Notification",
    description: "This is a default notification message.",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Success!",
    description: "Your changes have been saved successfully.",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    title: "Error",
    description: "Something went wrong. Please try again.",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Warning",
    description: "Please review your information before continuing.",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    title: "Information",
    description: "Here's some helpful information for you.",
  },
};

export const WithCustomIcon: Story = {
  args: {
    title: "New Message",
    description: "You have a new message from John.",
    icon: <Mail />,
  },
};

export const WithoutDescription: Story = {
  args: {
    variant: "success",
    title: "Action completed",
  },
};

export const WithCloseButton: Story = {
  args: {
    variant: "info",
    title: "Dismissible notification",
    description: "Click the X button to close this notification.",
    onClose: () => alert("Toast closed"),
  },
};

export const AutoDismiss: Story = {
  args: {
    variant: "success",
    title: "Auto dismiss",
    description: "This notification will close automatically in 3 seconds.",
    duration: 3000,
    onClose: () => console.log("Toast auto-closed"),
  },
};

export const Interactive: Story = {
  args: {
    title: "",
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Toast title="Glass Toast" description="This toast uses the liquid glass style." />
      <Toast
        variant="success"
        title="Saved!"
        description="We stored your preferences."
        glass={false}
      />
    </div>
  ),
};
