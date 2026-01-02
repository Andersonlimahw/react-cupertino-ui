import type { Meta, StoryObj } from "@storybook/react";

import { PhotosGrid } from "@components/ui/PhotosGrid";

const photos = Array.from({ length: 9 }).map((_, index) => ({
  id: `photo-${index}`,
  src: `https://picsum.photos/seed/${index}/300/300`,
  alt: `Photo ${index}`,
  date: index % 3 === 0 ? "Today" : undefined,
  favorite: index % 4 === 0,
}));

const meta: Meta<typeof PhotosGrid> = {
  title: "UI/PhotosGrid",
  component: PhotosGrid,
  args: {
    items: photos,
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof PhotosGrid>;

export const Default: Story = {};

export const Columns4: Story = {
  args: {
    columns: 4,
  },
};
