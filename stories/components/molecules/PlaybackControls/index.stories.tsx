import type { Meta, StoryObj } from "@storybook/react";

import { PlaybackControls } from "@components/molecules/PlaybackControls";

const meta: Meta<typeof PlaybackControls> = {
  title: "Molecules/PlaybackControls",
  component: PlaybackControls,
  args: {
    state: "paused",
  },
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof PlaybackControls>;

export const Default: Story = {};

export const Playing: Story = {
  args: {
    state: "playing",
  },
};

export const Loading: Story = {
  args: {
    state: "loading",
  },
};
