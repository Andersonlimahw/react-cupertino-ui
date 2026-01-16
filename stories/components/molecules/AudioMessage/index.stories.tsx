import type { Meta, StoryObj } from "@storybook/react";
import { AudioMessage } from "@components/molecules/AudioMessage";

const meta = {
    title: "Molecules/AudioMessage",
    component: AudioMessage,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        duration: { control: "number" },
    },
} satisfies Meta<typeof AudioMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        duration: 45,
        isPlaying: false,
    },
};

export const Playing: Story = {
    args: {
        duration: 125,
        isPlaying: true,
    },
};

export const LongDuration: Story = {
    args: {
        duration: "12:34",
        isPlaying: false,
    },
};
