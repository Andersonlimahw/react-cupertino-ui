import type { Meta, StoryObj } from "@storybook/react";
import { VoiceIndicator } from "@/components/atoms/VoiceIndicator";

const meta = {
  title: "Atoms/VoiceIndicator",
  component: VoiceIndicator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    listening: { control: "boolean" },
    volume: { control: { type: "range", min: 0, max: 1, step: 0.1 } },
  },
} satisfies Meta<typeof VoiceIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    listening: false,
    volume: 0,
  },
};

export const Listening: Story = {
  args: {
    listening: true,
    volume: 0.3,
  },
};

export const HighVolume: Story = {
  args: {
    listening: true,
    volume: 0.8,
  },
};
