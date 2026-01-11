import type { Meta, StoryObj } from "@storybook/react";

import { AlbumCover } from "@components/ui/AlbumCover";

const meta: Meta<typeof AlbumCover> = {
  title: "UI/AlbumCover",
  component: AlbumCover,
  parameters: {
    layout: "centered",
  },
  args: {
    title: "Midnight City",
    artist: "M83",
    artwork: "https://picsum.photos/seed/album/400/400",
    status: "Now Playing",
  },
};

export default meta;
type Story = StoryObj<typeof AlbumCover>;

export const Default: Story = {};

export const WithoutGlow: Story = {
  args: {
    glow: false,
  },
};
