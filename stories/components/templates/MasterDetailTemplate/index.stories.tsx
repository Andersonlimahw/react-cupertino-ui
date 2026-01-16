import type { Meta, StoryObj } from "@storybook/react";
import { MasterDetailTemplate } from "@components/templates/MasterDetailTemplate";

const master = (
  <ul style={{ listStyle: "none", padding: "1rem", margin: 0 }}>
    <li>Note 1</li>
    <li>Note 2</li>
  </ul>
);

const detail = (
  <div>
    <h2>Note Details</h2>
    <p>Detailed text...</p>
  </div>
);

const meta = {
  title: "Templates/MasterDetailTemplate",
  component: MasterDetailTemplate,
  parameters: { layout: "fullscreen" },
  args: { master, detail },
} satisfies Meta<typeof MasterDetailTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
