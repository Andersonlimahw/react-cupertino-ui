import type { Meta, StoryObj } from "@storybook/react";

import { PlaybackQueue } from "@components/ui/PlaybackQueue";

const items = Array.from({ length: 4 }).map((_, index) => ({
  id: `track-${index}`,
  title: `Track ${index + 1}`,
  artist: "Artist",
  duration: "3:45",
  artwork: `https://picsum.photos/seed/track${index}/80/80`,
  playing: index === 0,
}));

const meta: Meta<typeof PlaybackQueue> = {
  title: "UI/PlaybackQueue",
  component: PlaybackQueue,
  args: { items },
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof PlaybackQueue>;

export const Default: Story = {};
