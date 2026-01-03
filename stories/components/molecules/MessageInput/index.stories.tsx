import type { Meta, StoryObj } from "@storybook/react";

import { MessageInput } from "@components/molecules/MessageInput";

const meta: Meta<typeof MessageInput> = {
  title: "Molecules/MessageInput",
  component: MessageInput,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof MessageInput>;

export const Default: Story = {};
