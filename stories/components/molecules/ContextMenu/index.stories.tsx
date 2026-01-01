import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuPreview,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuShortcut,
} from "@components/molecules/ContextMenu";

const meta = {
  title: "Molecules/ContextMenu",
  component: ContextMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent
        className="w-64"
        preview={
          <ContextMenuPreview
            title="Cupertino Skies"
            subtitle="Live Photo · Yesterday"
            meta="4032 × 3024"
            media={
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(135deg, #f97316 0%, #ec4899 50%, #6366f1 100%)",
                }}
              />
            }
          >
            Peek to quick look or open in Photos.
          </ContextMenuPreview>
        }
      >
        <ContextMenuItem inset>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset disabled>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>
              Save Page As...
              <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>Create Shortcut...</ContextMenuItem>
            <ContextMenuItem>Name Window...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Developer Tools</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem inset>
          Show Full URLs
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

const TriggerPreviewContent = ContextMenuContent as React.FC<
  React.ComponentProps<typeof ContextMenuContent> & { previewPlacement?: string; previewOffset?: number }
>;

export const TriggerPreview: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[200px] w-[320px] items-center justify-center rounded-[28px] border border-dashed text-sm">
        Long press or right click
      </ContextMenuTrigger>
      <TriggerPreviewContent
        className="w-60"
        previewPlacement="trigger"
        previewOffset={-10}
        preview={
          <ContextMenuPreview
            title="Liquid Glass"
            subtitle="Live Photo · Today"
            meta="2.4 MB"
            media={
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(135deg, rgba(14,165,233,0.95), rgba(59,130,246,0.85), rgba(139,92,246,0.75))",
                }}
              />
            }
          >
            Preview floats near the trigger while actions stay below.
          </ContextMenuPreview>
        }
      >
        <ContextMenuItem>Share...</ContextMenuItem>
        <ContextMenuItem>Add to Shared Album</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Favorite</ContextMenuItem>
        <ContextMenuItem className="text-red-500">Delete</ContextMenuItem>
      </TriggerPreviewContent>
    </ContextMenu>
  ),
};
