import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Bell, Palette, Workflow } from "lucide-react";

import { SegmentedTabs } from "@components/ui/SegmentedTabs";

const options = [
  {
    id: "overview",
    label: "Overview",
    icon: <Palette size={14} />,
    content: "Liquid Glass overview content",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: <Bell size={14} />,
    content: "Notification settings",
  },
  {
    id: "automation",
    label: "Automation",
    icon: <Workflow size={14} />,
    content: "Automation workflows",
  },
];

const meta: Meta<typeof SegmentedTabs> = {
  title: "UI/SegmentedTabs",
  component: SegmentedTabs,
  args: { options },
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof SegmentedTabs>;

export const Default: Story = {};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState("overview");
    return <SegmentedTabs options={options} value={value} onValueChange={setValue} />;
  },
};
