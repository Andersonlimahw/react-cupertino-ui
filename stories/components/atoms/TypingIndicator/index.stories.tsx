import type { Meta, StoryObj } from "@storybook/react";
import { TypingIndicator } from "@components/atoms/TypingIndicator";

const meta = {
    title: "Atoms/TypingIndicator",
    component: TypingIndicator,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        size: { control: "radio", options: ["sm", "md"] },
        color: { control: "radio", options: ["gray"] },
    },
} satisfies Meta<typeof TypingIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        size: "md",
        color: "gray",
    },
};

export const Small: Story = {
    args: {
        size: "sm",
        color: "gray",
    },
};
