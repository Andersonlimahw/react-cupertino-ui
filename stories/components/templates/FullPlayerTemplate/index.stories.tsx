import type { Meta, StoryObj } from "@storybook/react";
import { FullPlayerTemplate } from "@components/templates/FullPlayerTemplate";

const meta = {
  title: "Templates/FullPlayerTemplate",
  component: FullPlayerTemplate,
  parameters: { layout: "centered" },
  args: {
    artwork: "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?auto=format&fit=crop&w=800&q=80",
    title: "Universe",
    subtitle: "Apple Intelligence Radio",
    lyrics: <p>Lyrics scrolling...</p>,
  },
} satisfies Meta<typeof FullPlayerTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
