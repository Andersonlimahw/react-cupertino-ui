import type { Meta, StoryObj } from "@storybook/react";

import { SuggestionBar } from "@components/ui/SuggestionBar";

const meta: Meta<typeof SuggestionBar> = {
  title: "UI/SuggestionBar",
  component: SuggestionBar,
  args: {
    suggestions: ["Play Liquid Beats", "Open Photos", "Send a message"],
  },
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof SuggestionBar>;

export const Default: Story = {};
