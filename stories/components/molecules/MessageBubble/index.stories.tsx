import type { Meta, StoryObj } from "@storybook/react";

import { MessageBubble } from "@components/molecules/MessageBubble";

const meta: Meta<typeof MessageBubble> = {
  title: "Molecules/MessageBubble",
  component: MessageBubble,
  args: {
    message: "Hello from Apple Intelligence",
  },
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof MessageBubble>;

export const Assistant: Story = {};

export const User: Story = {
  args: {
    isUser: true,
    message: "Sounds good!",
    status: "sent",
  },
};
