import type { Meta, StoryObj } from "@storybook/react";
import { Sparkles } from "lucide-react";

import { AIRecommenderGrid } from "@components/ui/AIRecommenderGrid";

const tiles = [
  { id: "1", title: "Summarize notes", description: "Apple Intelligence summary", icon: <Sparkles size={16} /> },
  { id: "2", title: "Generate brief", description: "Draft a synopsis" },
];

const meta: Meta<typeof AIRecommenderGrid> = {
  title: "UI/AIRecommenderGrid",
  component: AIRecommenderGrid,
  args: { tiles },
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof AIRecommenderGrid>;

export const Default: Story = {};
