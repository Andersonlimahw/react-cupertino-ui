import type { Meta, StoryObj } from "@storybook/react";
import { LyricsView } from "@components/organisms/LyricsView";

const lines = [
  { text: "Liquid Glass flows through the UI" },
  { text: "Apple Intelligence writes the lines", active: true },
  { text: "Users stay inspired all the time" },
];

const meta = {
  title: "Organisms/LyricsView",
  component: LyricsView,
  args: { lines },
} satisfies Meta<typeof LyricsView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
