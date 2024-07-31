import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import "../../../../dist/output.css";
import { Button } from "@/components/ui/Button";

export function DialogSample() {
  return (
    <Dialog>
      <DialogTrigger asChild>Open</DialogTrigger>
      <DialogContent className="sm:max-w-md w-full h-full">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start flex items-center space-x-2">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const meta = {
  title: "Components/Dialog",
  component: DialogSample,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    // Define default args here
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    // Define primary story args here
  },
};
