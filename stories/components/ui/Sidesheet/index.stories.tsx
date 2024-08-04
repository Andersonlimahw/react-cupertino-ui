import type { Meta, StoryObj } from "@storybook/react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sidesheet";
import "../../../../dist/output.css";

const SidesheetStory = () => (
  <Sheet>
    <SheetTrigger>Open</SheetTrigger>
    <SheetContent className="w-[400px] h-[100%] sm:w-[540px]" side="bottom">
      <SheetHeader>
        <SheetTitle>Are you absolutely sure?</SheetTitle>
        <SheetDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
);

const meta = {
  title: "Components/Sidesheet",
  component: Sheet,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    open: false, // Example property
    onOpenChange: (open: boolean) => console.log(open), // Example handler
    defaultOpen: false, // Example default state
  },
  argTypes: {
    open: { control: "boolean" },
    onOpenChange: { action: "onOpenChange" },
    defaultOpen: { control: "boolean" },
  },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: SidesheetStory(),
  },
};

export const Secondary: Story = {
  args: {
    // Define secondary story args here
  },
};
