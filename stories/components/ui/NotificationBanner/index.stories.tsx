import type { Meta, StoryObj } from "@storybook/react";
import { NotificationBanner } from "@components/ui/NotificationBanner";

const meta: Meta<typeof NotificationBanner> = {
  title: "UI/NotificationBanner",
  component: NotificationBanner,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof NotificationBanner>;

export const Info: Story = {
  args: {
    title: "Updated to iOS 26",
    message: "Liquid Glass components saved to your library.",
    tone: "info",
    autoHide: false,
  },
};

export const WithAction: Story = {
  args: {
    title: "New templates ready",
    message: "DetailTemplate and SplitViewTemplate downloads complete.",
    tone: "success",
    actions: [
      { label: "View", onClick: () => alert("View detail") },
    ],
  },
};

export const Warning: Story = {
  args: {
    title: "Offline mode",
    message: "Changes will sync when you're back online.",
    tone: "warning",
  },
};
