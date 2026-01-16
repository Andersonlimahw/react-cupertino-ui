import type { Meta, StoryObj } from "@storybook/react";
import { MiniPlayer } from "@components/organisms/MiniPlayer";

const meta = {
  title: "Organisms/MiniPlayer",
  component: MiniPlayer,
  args: {
    artwork: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=200&q=80",
    title: "Liquid Glass Theme",
    artist: "Apple Intelligence",
    progress: 40,
    duration: 120,
  },
} satisfies Meta<typeof MiniPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
