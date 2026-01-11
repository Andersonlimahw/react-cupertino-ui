import type { Meta, StoryObj } from "@storybook/react";
import { Home, Folder, Image as ImageIcon, FileText, Star } from "lucide-react";

import { Breadcrumb } from "@components/ui/Breadcrumb";

const items = [
  { id: "home", label: "Home", icon: <Home size={16} />, href: "#" },
  { id: "library", label: "Library", icon: <Folder size={16} />, href: "#" },
  { id: "photos", label: "Photos", icon: <ImageIcon size={16} />, href: "#" },
  { id: "album", label: "Album", icon: <Star size={16} />, href: "#" },
  { id: "details", label: "Details", icon: <FileText size={16} /> },
];

const meta: Meta<typeof Breadcrumb> = {
  title: "UI/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "centered",
  },
  args: {
    items,
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {};

export const MaxVisible: Story = {
  args: {
    maxVisible: 3,
    onOverflowClick: () => alert("Show full breadcrumb"),
  },
};

export const CustomSeparator: Story = {
  args: {
    separator: "→",
  },
};

export const ShortPath: Story = {
  args: {
    items: items.slice(0, 3),
  },
};
