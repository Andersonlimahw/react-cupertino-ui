import type { Meta, StoryObj } from "@storybook/react";
import { SplitViewTemplate } from "@components/templates/SplitViewTemplate";

const sidebar = (
  <ul style={{ listStyle: "none", padding: "1rem", margin: 0 }}>
    <li>Inbox</li>
    <li>Today</li>
    <li>Upcoming</li>
  </ul>
);

const content = (
  <div>
    <h2>Liquid Glass Notes</h2>
    <p>Detailed note content goes here.</p>
  </div>
);

const meta = {
  title: "Templates/SplitViewTemplate",
  component: SplitViewTemplate,
  parameters: { layout: "fullscreen" },
  args: {
    sidebar,
    content,
  },
} satisfies Meta<typeof SplitViewTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
