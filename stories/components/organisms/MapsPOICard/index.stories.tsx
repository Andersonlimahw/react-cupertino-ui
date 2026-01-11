import type { Meta, StoryObj } from "@storybook/react";

import { MapsPOICard } from "@components/organisms/MapsPOICard";

const meta: Meta<typeof MapsPOICard> = {
  title: "Organisms/MapsPOICard",
  component: MapsPOICard,
  args: {
    title: "Apple Park",
    subtitle: "Visitor Center",
    category: "Landmark",
    distance: "2.4 mi",
    image: "https://picsum.photos/seed/poi/120",
  },
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof MapsPOICard>;

export const Default: Story = {};
