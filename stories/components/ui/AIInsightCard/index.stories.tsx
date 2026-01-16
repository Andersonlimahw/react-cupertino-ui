import type { Meta, StoryObj } from "@storybook/react";

import { AIInsightCard } from "@components/ui/AIInsightCard";

const meta: Meta<typeof AIInsightCard> = {
  title: "UI/AIInsightCard",
  component: AIInsightCard,
  args: {
    title: "Suggested Insight",
    description: "Apple Intelligence drafted a summary of your last meeting.",
    badge: "AI",
  },
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof AIInsightCard>;

export const Default: Story = {};
