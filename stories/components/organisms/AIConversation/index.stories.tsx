import type { Meta, StoryObj } from "@storybook/react";

import { AIConversation } from "@components/organisms/AIConversation";

const sampleMessages = [
  {
    id: "1",
    content: "I summarized the last design review and drafted three action items.",
    isUser: false,
    timestamp: new Date(),
  },
  {
    id: "2",
    content: "Great! Turn that into an email for the team.",
    isUser: true,
    timestamp: new Date(),
  },
  {
    id: "3",
    content: "Here is a professional email draft, would you like me to send it?",
    isUser: false,
    timestamp: new Date(),
  },
];

const meta = {
  title: "Organisms/AIConversation",
  component: AIConversation,
  parameters: {
    layout: "centered",
    backgrounds: { default: "light" },
  },
  tags: ["autodocs"],
  args: {
    messages: sampleMessages,
    onSend: () => {},
  },
} satisfies Meta<typeof AIConversation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    suggestions: ["Summarize", "Draft reply", "Create tasks"],
  },
};

export const Loading: Story = {
  args: {
    messages: sampleMessages,
    loading: true,
  },
};

export const Typing: Story = {
  args: {
    messages: sampleMessages,
    typing: true,
  },
};
