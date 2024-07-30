import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Card, {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import "../../../../dist/output.css";
import { Button } from "@/components/ui/Button";

const CardDemo = () => (
  <Card>
    <CardHeader>
      <CardTitle>Notifications</CardTitle>
      <CardDescription>You have 3 unread messages.</CardDescription>
    </CardHeader>
    <CardContent className="grid gap-4">
      <div>
        {[
          {
            title: "New message",
            description: "You have",
          },
          {
            title: "New message",
            description: "You have",
          },
          {
            title: "New message",
            description: "You have",
          },
        ].map((notification, index) => (
          <div
            key={index}
            className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
          >
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
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
      </div>
    </CardContent>
    <CardFooter>
      <Button className="w-full">Mark all as read</Button>
    </CardFooter>
  </Card>
);

const meta = {
  title: "Components/Card",
  component: CardDemo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Card",
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    // Define primary story args here
  },
};

export const Secondary: Story = {
  args: {
    // Define secondary story args here
    variant: "secondary",
  },
};
