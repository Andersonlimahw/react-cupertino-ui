import type { Meta, StoryObj } from "@storybook/react";

import { MediaSessionCard } from "@components/organisms/MediaSessionCard";

const tracks = Array.from({ length: 5 }).map((_, index) => ({
  id: `track-${index}`,
  title: `Track ${index + 1}`,
  artist: "Artist",
  duration: "3:45",
  active: index === 0,
}));

const meta: Meta<typeof MediaSessionCard> = {
  title: "Organisms/MediaSessionCard",
  component: MediaSessionCard,
  args: {
    artwork: "https://picsum.photos/seed/media/300",
    title: "Liquid Beats",
    subtitle: "Cupertino Collective",
    tracks,
  },
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof MediaSessionCard>;

export const Default: Story = {};
