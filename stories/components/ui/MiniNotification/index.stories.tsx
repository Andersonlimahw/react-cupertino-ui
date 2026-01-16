import type { Meta, StoryObj } from "@storybook/react";

import { MiniNotification } from "@components/ui/MiniNotification";

const meta: Meta<typeof MiniNotification> = {
  title: "UI/MiniNotification",
  component: MiniNotification,
  args: {
    title: "Album downloaded",
    message: "Songs synced across devices",
    tone: "info",
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof MiniNotification>;

export const Default: Story = {};

export const WithAction: Story = {
  args: {
    action: {
      label: "Undo",
      onClick: () => alert("undo"),
    },
  },
};
