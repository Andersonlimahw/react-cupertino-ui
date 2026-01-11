import type { Meta, StoryObj } from "@storybook/react";
import { SettingsTemplate, type SettingsGroup } from "@components/templates/SettingsTemplate";
import { Bell, Wifi } from "lucide-react";

const groups: SettingsGroup[] = [
  {
    title: "Connectivity",
    items: [
      { type: "toggle", label: "Wi-Fi", value: true, icon: <Wifi size={16} /> },
      { type: "toggle", label: "Bluetooth", value: false },
      { type: "navigation", label: "Cellular", icon: <Bell size={16} />, navigationHint: "Off" },
    ],
  },
  {
    title: "Notifications",
    footer: "Manage how Apple Intelligence alerts you",
    items: [
      { type: "navigation", label: "Summary", navigationHint: "Daily" },
      { type: "select", label: "Default sound", value: "Nimbus" },
    ],
  },
];

const meta = {
  title: "Templates/SettingsTemplate",
  component: SettingsTemplate,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    title: "Settings",
    groups,
  },
} satisfies Meta<typeof SettingsTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
