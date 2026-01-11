import type { Meta, StoryObj } from "@storybook/react";
import { DetailTemplate } from "@components/templates/DetailTemplate";
import { Button } from "@components/molecules/Button";

const meta = {
  title: "Templates/DetailTemplate",
  component: DetailTemplate,
  parameters: {
    layout: "centered",
    backgrounds: { default: "light" },
  },
  tags: ["autodocs"],
  args: {
    title: "iOS 26 Liquid Glass",
    subtitle: "Apple Intelligence guidelines",
    hero: <div style={{ height: 220 }} />,
    metadata: (
      <>
        <span>Updated: Today</span>
        <span>Status: In progress</span>
      </>
    ),
    actions: <Button>Share</Button>,
    children: (
      <div>
        <p>
          Liquid Glass brings depth, refraction, and vibrant gradients to every surface. Components
          adapt to the environment and respond with delightful motion.
        </p>
        <p>
          This template showcases how detail views can highlight imagery, metadata, and actions
          while keeping content at the center.
        </p>
      </div>
    ),
    footer: "Powered by React Cupertino UI",
  },
} satisfies Meta<typeof DetailTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutHero: Story = {
  args: {
    hero: undefined,
  },
};
