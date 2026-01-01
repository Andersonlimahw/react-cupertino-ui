import type { Meta, StoryObj } from "@storybook/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/organisms/Card";
import { Button } from "@components/molecules/Button";
import "@globalstyles";

const notifications = [
  {
    title: "New Mention",
    description: "Courtney mentioned you in Design Handoff.",
  },
  {
    title: "Review Due",
    description: "Approve the Liquid Glass spec before 6PM.",
  },
  {
    title: "New Build",
    description: "Storybook 8.2 preview is now live.",
  },
];

const meta = {
  title: "Components/Organisms/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    blur: {
      control: { type: "inline-radio" },
      options: ["sm", "md", "lg"],
    },
  },
  args: {
    glass: true,
    interactive: true,
    blur: "md",
  },
  render: (args) => {
    const { style, ...cardArgs } = args;
    return (
      <Card {...cardArgs} style={{ maxWidth: "420px", ...(style || {}) }}>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Stay in sync with the latest updates across your workspace.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {notifications.map((notification) => (
            <div
              key={notification.title}
              className="grid grid-cols-[25px_1fr] items-start gap-3"
            >
              <span className="flex h-2.5 w-2.5 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button fullWidth>Mark all as read</Button>
        </CardFooter>
      </Card>
    );
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LiquidGlass: Story = {
  args: {
    intensity: 0.78,
  },
};

export const Solid: Story = {
  args: {
    glass: false,
    variant: "solid",
  },
};

export const BackgroundMedia: Story = {
  args: {
    backgroundImage: "url(/images/card-liquid-glass.svg)",
    intensity: 0.65,
    blur: "lg",
  },
};

export const Static: Story = {
  args: {
    interactive: false,
    variant: "secondary",
  },
};
