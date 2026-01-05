import type { Meta, StoryObj } from "@storybook/react";
import { ReadReceipt } from "@components/atoms/ReadReceipt";

const meta = {
    title: "Atoms/ReadReceipt",
    component: ReadReceipt,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        status: { control: "radio", options: ["sending", "sent", "delivered", "read", "failed"] },
        showTimestamp: { control: "boolean" },
    },
} satisfies Meta<typeof ReadReceipt>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sent: Story = {
    args: {
        status: "sent",
    },
};

export const Delivered: Story = {
    args: {
        status: "delivered",
    },
};

export const Read: Story = {
    args: {
        status: "read",
        timestamp: new Date("2024-01-01T12:00:00"),
        showTimestamp: true,
    },
};

export const Failed: Story = {
    args: {
        status: "failed",
    },
};
