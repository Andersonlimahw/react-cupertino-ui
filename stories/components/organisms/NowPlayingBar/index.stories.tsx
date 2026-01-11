import type { Meta, StoryObj } from "@storybook/react";

import { NowPlayingBar } from "@components/organisms/NowPlayingBar";

const meta: Meta<typeof NowPlayingBar> = {
  title: "Organisms/NowPlayingBar",
  component: NowPlayingBar,
  args: {
    artwork: "https://picsum.photos/seed/now/200",
    title: "Glow",
    artist: "Apple Intelligence",
    album: "Liquid Glass",
    progress: 0.45,
    currentTime: "1:32",
    duration: "3:24",
  },
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof NowPlayingBar>;

export const Default: Story = {};

export const Liked: Story = {
  args: { liked: true },
};
