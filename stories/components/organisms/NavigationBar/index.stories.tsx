import type { Meta, StoryObj } from "@storybook/react";
import { NavigationBar } from "@/components/organisms/NavigationBar";
import { Button } from "@/components/molecules/Button";
import { Plus, Search, Share } from "lucide-react";

const meta = {
  title: "Organisms/NavigationBar",
  component: NavigationBar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    subtitle: { control: "text" },
    large: { control: "boolean" },
    transparent: { control: "boolean" },
    scrolled: { control: "boolean" },
    withBackButton: { control: "boolean" },
    backLabel: { control: "text" },
  },
} satisfies Meta<typeof NavigationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Page Title",
    transparent: false,
  },
  render: (args) => (
    <div style={{ height: "400px", background: "var(--background)" }}>
      <NavigationBar {...args} />
      <div style={{ padding: "20px" }}>
        <p>Content goes here...</p>
      </div>
    </div>
  ),
};

export const WithItems: Story = {
  args: {
    title: "Music",
    large: true,
    transparent: true,
    rightItems: (
      <Button variant="ghost" size="icon">
        <Plus size={24} />
      </Button>
    ),
    leftItems: (
      <Button variant="ghost" size="icon">
        <Search size={24} />
      </Button>
    ),
  },
  render: (args) => (
    <div
      style={{
        height: "600px",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        position: "relative",
      }}
    >
      <NavigationBar {...args} />
      <div style={{ padding: "20px" }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i} style={{ marginBottom: "10px" }}>
            Scrollable content line {i + 1}
          </p>
        ))}
      </div>
    </div>
  ),
};

export const LargeTitle: Story = {
  args: {
    title: "Settings",
    large: true,
    transparent: true,
    withBackButton: true,
    backLabel: "Home",
  },
  render: (args) => (
    <div style={{ height: "400px", background: "var(--background)" }}>
      <NavigationBar {...args} />
      <div style={{ padding: "20px" }}>
        <p>Start scrolling to see behavior (if implemented in story context).</p>
      </div>
    </div>
  ),
};

export const ScrolledState: Story = {
  args: {
    title: "Photos",
    large: true,
    scrolled: true,
    transparent: true,
    rightItems: (
      <Button variant="ghost" size="icon">
        <Share size={20} />
      </Button>
    ),
  },
  render: (args) => (
    <div style={{ height: "400px", background: "var(--background)" }}>
      <NavigationBar {...args} />
      <div style={{ padding: "20px" }}>
        <p>This simulates the state after scrolling down.</p>
      </div>
    </div>
  ),
};
