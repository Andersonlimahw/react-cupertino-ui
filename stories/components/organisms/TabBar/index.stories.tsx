import type { Meta, StoryObj } from "@storybook/react";
import { TabBar, TabBarProps } from "@/components/organisms/TabBar";
import { Home, Search, Library, User } from "lucide-react";
import { useState } from "react";

const meta = {
  title: "Organisms/TabBar",
  component: TabBar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    glass: { control: "boolean" },
  },
} satisfies Meta<typeof TabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { id: "home", icon: <Home />, label: "Home" },
  { id: "search", icon: <Search />, label: "Search" },
  { id: "library", icon: <Library />, label: "Library", badge: 3 },
  { id: "profile", icon: <User />, label: "Profile" },
];

const TabBarWithState = (args: TabBarProps) => {
  const [active, setActive] = useState("home");
  return (
    <div style={{ height: "100vh", position: "relative", background: "url(https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80) center/cover" }}>
      <div style={{ padding: "20px", color: "white", textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
        <h1>Current Tab: {items.find((i) => i.id === active)?.label}</h1>
      </div>
      <TabBar {...args} items={items} activeId={active} onChange={setActive} />
    </div>
  );
};

export const Default: Story = {
  args: {
    items: items,
    activeId: "home",
    onChange: () => {},
  },
  render: (args) => <TabBarWithState {...args} />,
};

export const DarkModePreview: Story = {
  args: {
    items: items,
    activeId: "home",
    onChange: () => {},
  },
  parameters: {
    themes: {
      defaultTheme: "dark",
    },
  },
  render: (args) => (
    <div className="dark" style={{ height: "100vh", background: "#000", position: "relative" }}>
        <TabBarWithState {...args} />
    </div>
  ),
};
