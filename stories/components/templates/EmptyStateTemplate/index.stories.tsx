import type { Meta, StoryObj } from "@storybook/react";
import { EmptyStateTemplate } from "@components/templates/EmptyStateTemplate";
import { Sparkles } from "lucide-react";

const meta = {
  title: "Templates/EmptyStateTemplate",
  component: EmptyStateTemplate,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    icon: <Sparkles size={48} />,
    title: "No drafts yet",
    description: "Apple Intelligence will place your drafts here for quick access.",
    action: {
      label: "Create draft",
      onPress: () => alert("Create"),
    },
  },
} satisfies Meta<typeof EmptyStateTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
