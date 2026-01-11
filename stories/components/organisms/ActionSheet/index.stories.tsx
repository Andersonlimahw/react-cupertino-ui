import type { Meta, StoryObj } from "@storybook/react";
import { 
    ActionSheet, 
    ActionSheetTrigger, 
    ActionSheetContent, 
    ActionSheetAction, 
    ActionSheetCancel,
    ActionSheetHeader,
    ActionSheetTitle,
    ActionSheetDescription
} from "@components/organisms/ActionSheet";
import { Button } from "@components/molecules/Button";
import { Trash2, Share, Copy } from "lucide-react";

const meta = {
  title: "Organisms/ActionSheet",
  component: ActionSheet,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ActionSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ActionSheet>
      <ActionSheetTrigger asChild>
        <Button>Open Action Sheet</Button>
      </ActionSheetTrigger>
      <ActionSheetContent>
        <ActionSheetHeader>
            <ActionSheetTitle>Are you sure?</ActionSheetTitle>
            <ActionSheetDescription>This action cannot be undone.</ActionSheetDescription>
        </ActionSheetHeader>
        <ActionSheetAction destructive onSelect={() => console.log("Deleted")}>
            Delete Draft
        </ActionSheetAction>
        <ActionSheetAction onSelect={() => console.log("Saved")}>
            Save Draft
        </ActionSheetAction>
        <ActionSheetCancel>Cancel</ActionSheetCancel>
      </ActionSheetContent>
    </ActionSheet>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <ActionSheet>
      <ActionSheetTrigger asChild>
        <Button variant="outline">Options</Button>
      </ActionSheetTrigger>
      <ActionSheetContent>
        <ActionSheetAction icon={<Share size={20}/>}>Share</ActionSheetAction>
        <ActionSheetAction icon={<Copy size={20}/>}>Copy Link</ActionSheetAction>
        <ActionSheetAction destructive icon={<Trash2 size={20}/>}>Delete</ActionSheetAction>
        <ActionSheetCancel>Cancel</ActionSheetCancel>
      </ActionSheetContent>
    </ActionSheet>
  ),
};
