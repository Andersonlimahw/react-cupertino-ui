import type { Meta, StoryObj } from "@storybook/react";
import { Sparkles } from "lucide-react";

import { AIActionList } from "@components/ui/AIActionList";

const items = [
  { id: "1", label: "Summarize note", description: "Create a quick summary", icon: <Sparkles size={16} /> },
  { id: "2", label: "Draft email", description: "Reply using context" },
];

const meta: Meta<typeof AIActionList> = {
  title: "UI/AIActionList",
  component: AIActionList,
  args: { items },
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof AIActionList>;

export const Default: Story = {};
