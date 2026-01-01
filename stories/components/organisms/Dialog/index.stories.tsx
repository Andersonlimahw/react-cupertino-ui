import type React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@components/organisms/Dialog";
import { Button } from "@components/molecules/Button";
import "@globalstyles";

const DialogPreview = (args: React.ComponentProps<typeof AlertDialogContent>) => (
  <AlertDialog defaultOpen>
    <AlertDialogTrigger asChild>
      <Button variant="glass">Show Dialog</Button>
    </AlertDialogTrigger>
    <AlertDialogContent {...args}>
      <AlertDialogHeader>
        <AlertDialogTitle>Enable Liquid Glass mode?</AlertDialogTitle>
        <AlertDialogDescription>
          This refines controls with heavy blur, adaptive glow, and Siri-like
          spring transitions. You can change it anytime from settings.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Not now</AlertDialogCancel>
        <AlertDialogAction buttonVariant="solid">Enable</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

const meta = {
  title: "Organisms/Dialog",
  component: DialogPreview,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: { type: "inline-radio" },
      options: ["sm", "md", "lg"],
    },
    tone: {
      control: { type: "inline-radio" },
      options: ["default", "success", "destructive"],
    },
    blur: {
      control: { type: "inline-radio" },
      options: ["sm", "md", "lg"],
    },
  },
  args: {
    glass: true,
    size: "md",
    tone: "default",
    blur: "lg",
    intensity: 0.72,
  },
  render: (args) => <DialogPreview {...args} />,
} satisfies Meta<typeof DialogPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LiquidGlass: Story = {
  args: {
    tone: "default",
  },
};

export const Success: Story = {
  args: {
    tone: "success",
    blur: "md",
  },
};

export const Destructive: Story = {
  args: {
    tone: "destructive",
    intensity: 0.6,
  },
};

export const SolidPanel: Story = {
  args: {
    glass: false,
    tone: "default",
  },
};
