import type { Meta, StoryObj } from "@storybook/react";
import { Wand2 } from "lucide-react";

import { SiriShortcutChip } from "@components/ui/SiriShortcutChip";

const meta: Meta<typeof SiriShortcutChip> = {
  title: "UI/SiriShortcutChip",
  component: SiriShortcutChip,
  args: {
    label: "Create Shortcut",
    tone: "pink",
  },
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof SiriShortcutChip>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    icon: <Wand2 size={14} />,
  },
};
