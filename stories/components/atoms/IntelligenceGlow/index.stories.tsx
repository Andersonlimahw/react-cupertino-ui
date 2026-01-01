import type { Meta, StoryObj } from "@storybook/react";
import { IntelligenceGlow } from "@components/atoms/IntelligenceGlow";
import { Card } from "@components/organisms/Card";

const meta = {
  title: "Atoms/IntelligenceGlow",
  component: IntelligenceGlow,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    active: { control: "boolean" },
    intensity: { control: { type: "range", min: 0, max: 1, step: 0.1 } },
  },
} satisfies Meta<typeof IntelligenceGlow>;

export default meta;
type Story = StoryObj<typeof meta>;

const cardContent = (
  <Card
    style={{
      width: "300px",
      height: "150px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    Apple Intelligence Content
  </Card>
);

export const Default: Story = {
  args: {
    active: true,
    intensity: 0.8,
    children: cardContent,
  },
};
