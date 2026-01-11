import type { Meta, StoryObj } from "@storybook/react";
import { Sparkles, Feather } from "lucide-react";

import { SuggestionChip, type SuggestionChipProps } from "@components/atoms/SuggestionChip";

const meta = {
  title: "Atoms/SuggestionChip",
  component: SuggestionChip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["glass", "outline", "ghost", "secondary"],
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm"],
    },
  },
  args: {
    children: "Summarize meeting",
  },
} satisfies Meta<typeof SuggestionChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Glass: Story = {
  args: {
    variant: "glass",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

export const WithIcon: Story = {
  args: {
    icon: <Sparkles size={16} />,
    children: "Brainstorm ideas",
  },
};

export const TrailingIcon: Story = {
  args: {
    trailingIcon: <Feather size={14} />,
    children: "Write email reply",
  },
};

export const Active: Story = {
  args: {
    active: true,
    children: "Translate to Spanish",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "Planning",
  },
};

export const Playground: Story = {
  render: (args: SuggestionChipProps) => (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
      <SuggestionChip {...args}>Summarize doc</SuggestionChip>
      <SuggestionChip {...args} icon={<Sparkles size={16} />}>
        Outline chapter
      </SuggestionChip>
      <SuggestionChip {...args} variant="outline">
        Draft follow-up email
      </SuggestionChip>
    </div>
  ),
};
