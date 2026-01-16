import type { Meta, StoryObj } from "@storybook/react";
import { MediaTransport } from "@components/ui/MediaTransport";

const meta: Meta<typeof MediaTransport> = {
  title: "UI/MediaTransport",
  component: MediaTransport,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof MediaTransport>;

export const Default: Story = {
  args: {
    state: "paused",
  },
};

export const Playing: Story = {
  args: {
    state: "playing",
  },
};

export const Loading: Story = {
  args: {
    state: "loading",
    disabled: true,
  },
};
