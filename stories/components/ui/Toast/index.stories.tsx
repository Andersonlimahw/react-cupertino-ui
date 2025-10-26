import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Mail } from 'lucide-react';

import Toast from '@/components/ui/Toast';
import Button from '@/components/ui/Button';
import "../../../../dist/output.css";

const meta = {
  title: 'Components/Toast',
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
  render: () => {
    const [toasts, setToasts] = useState<Array<{ id: number; variant: "success" | "error" | "warning" | "info"; title: string; description: string }>>([]);

    const addToast = (variant: "success" | "error" | "warning" | "info") => {
      const id = Date.now();
      const messages = {
        success: { title: "Success!", description: "Operation completed successfully." },
        error: { title: "Error!", description: "Something went wrong." },
        warning: { title: "Warning!", description: "Please be careful." },
        info: { title: "Info", description: "Here's some information." },
      };

      setToasts([...toasts, { id, variant, ...messages[variant] }]);
    };

    const removeToast = (id: number) => {
      setToasts(toasts.filter((t) => t.id !== id));
    };

    return (
      <div>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <Button onClick={() => addToast('success')} size="sm">
            Success
          </Button>
          <Button onClick={() => addToast('error')} size="sm">
            Error
          </Button>
          <Button onClick={() => addToast('warning')} size="sm">
            Warning
          </Button>
          <Button onClick={() => addToast('info')} size="sm">
            Info
          </Button>
        </div>

        <div
          style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            zIndex: 1000,
          }}
        >
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              variant={toast.variant}
              title={toast.title}
              description={toast.description}
              onClose={() => removeToast(toast.id)}
              duration={5000}
            />
          ))}
        </div>
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Toast title="Default notification" description="This is a default notification." />
      <Toast variant="success" title="Success!" description="Operation completed." />
      <Toast variant="error" title="Error" description="Something went wrong." />
      <Toast variant="warning" title="Warning" description="Please review." />
      <Toast variant="info" title="Info" description="Helpful information." />
    </div>
  ),
};
