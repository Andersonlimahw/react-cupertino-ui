import type { Meta, StoryObj } from "@storybook/react";
import { AIResponseBubble } from "@components/molecules/AIResponseBubble";
import { SuggestionChip } from "@components/atoms/SuggestionChip";

const meta = {
  title: "Molecules/AIResponseBubble",
  component: AIResponseBubble,
  parameters: {
    layout: "centered",
    backgrounds: { default: "dark" },
  },
  tags: ["autodocs"],
  args: {
    content: "Apple Intelligence summarized your last meeting and drafted an email reply.",
  },
} satisfies Meta<typeof AIResponseBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Assistant: Story = {
  args: {
    timestamp: new Date(),
    actions: (
      <SuggestionChip size="sm" onClick={() => {}}>
        Copy response
      </SuggestionChip>
    ),
  },
};

export const User: Story = {
  args: {
    isUser: true,
    content: "Sounds great, could you turn this into a bulleted list?",
    timestamp: new Date(),
  },
};

export const Typing: Story = {
  args: {
    typing: true,
    content: "",
  },
};

export const Error: Story = {
  args: {
    status: "error",
    content: "We couldn't reach Apple Intelligence. Please try again.",
  },
};
