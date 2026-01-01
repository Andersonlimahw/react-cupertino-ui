import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Compass, Home, Library, Mic2, Search } from "lucide-react";

import { TabBar, type TabBarProps } from "@components/organisms/TabBar";

const meta = {
  title: "Organisms/TabBar",
  component: TabBar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    glass: { control: "boolean" },
    floating: { control: "boolean" },
    tone: {
      control: "select",
      options: ["auto", "light", "dark"],
    },
  },
} satisfies Meta<typeof TabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseItems = [
  { id: "home", icon: <Home />, label: "Home" },
  { id: "search", icon: <Search />, label: "Search" },
  { id: "listen", icon: <Mic2 />, label: "Listen", badgeShape: "dot", badgeTone: "critical" },
  { id: "library", icon: <Library />, label: "Library", badge: 3, badgeTone: "success" },
  { id: "explore", icon: <Compass />, label: "Explore" },
];

const TabBarWithState = (args: TabBarProps) => {
  const [active, setActive] = useState(args.activeId ?? "home");
  return (
    <div
      style={{
        height: "100vh",
        position: "relative",
        background:
          "radial-gradient(circle at 10% 20%, rgba(10, 132, 255, 0.15), transparent 40%), #05060a",
        color: "white",
      }}
    >
      <div style={{ padding: "2rem", fontFamily: "-apple-system, BlinkMacSystemFont" }}>
        <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "0.25rem" }}>Now viewing</p>
        <h1 style={{ fontSize: "2.5rem", margin: 0 }}>
          {baseItems.find((item) => item.id === active)?.label ?? "Home"}
        </h1>
      </div>
      <TabBar {...args} items={args.items ?? baseItems} activeId={active} onChange={setActive} />
    </div>
  );
};

export const Default: Story = {
  args: {
    items: baseItems,
    activeId: "home",
    glass: true,
    floating: false,
    hapticFeedback: false,
  },
  render: (args) => <TabBarWithState {...args} />,
};

export const FloatingGlass: Story = {
  args: {
    items: baseItems,
    activeId: "search",
    floating: true,
    glass: true,
    hapticFeedback: true,
    tone: "light",
  },
  render: (args) => (
    <div
      style={{
        height: "100vh",
        background:
          "linear-gradient(180deg, rgba(15,23,42,1) 0%, rgba(15,23,42,0.65) 35%, rgba(15,23,42,0.3) 100%)",
        position: "relative",
      }}
    >
      <TabBarWithState {...args} />
    </div>
  ),
};
