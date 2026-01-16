import type { Meta, StoryObj } from "@storybook/react";

import { VoiceCommandBar } from "@components/molecules/VoiceCommandBar";

const meta: Meta<typeof VoiceCommandBar> = {
  title: "Molecules/VoiceCommandBar",
  component: VoiceCommandBar,
  args: {
    suggestions: ["Play Liquid Beats", "Open Photos", "Set reminder"],
  },
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof VoiceCommandBar>;

export const Default: Story = {};
