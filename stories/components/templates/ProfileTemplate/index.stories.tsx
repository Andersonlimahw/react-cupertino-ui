import type { Meta, StoryObj } from "@storybook/react";
import { ProfileTemplate } from "@components/templates/ProfileTemplate";
import { Button } from "@components/molecules/Button";

const meta = {
  title: "Templates/ProfileTemplate",
  component: ProfileTemplate,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80",
    name: "Sarah Lee",
    subtitle: "Lead Designer",
    stats: [
      { label: "Projects", value: "18" },
      { label: "Followers", value: "2.1k" },
    ],
    actions: <Button size="sm">Follow</Button>,
    children: (
      <>
        <p>
          Sarah leads the Liquid Glass design language and collaborates closely with Apple
          Intelligence teams to define the next generation of UI motion and materials.
        </p>
        <p>Recent Highlights</p>
        <ul>
          <li>Liquid Glass motion system</li>
          <li>AI Assist Profiles</li>
          <li>VisionOS dashboard</li>
        </ul>
      </>
    ),
  },
} satisfies Meta<typeof ProfileTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
