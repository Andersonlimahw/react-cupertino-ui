import type { Meta, StoryObj } from "@storybook/react";
import { ConversationList } from "@components/organisms/ConversationList";

const items = [
  {
    id: "1",
    avatar: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=80&q=80",
    name: "Sarah Lee",
    preview: "Let's review Liquid Glass",
    timestamp: "Now",
  },
  {
    id: "2",
    avatar: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=80&q=80",
    name: "Design Team",
    preview: "AI Conversation shipped",
    timestamp: "1h",
    unread: true,
  },
];

const meta = {
  title: "Organisms/ConversationList",
  component: ConversationList,
  args: {
    items,
  },
} satisfies Meta<typeof ConversationList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
