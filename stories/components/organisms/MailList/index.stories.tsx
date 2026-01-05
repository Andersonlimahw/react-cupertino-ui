import type { Meta, StoryObj } from "@storybook/react";
import { MailList } from "@components/organisms/MailList";

const meta = {
    title: "Organisms/MailList",
    component: MailList,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
    },
} satisfies Meta<typeof MailList>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleEmails = [
    {
        id: "1",
        sender: "Apple",
        subject: "Your receipt from Apple.",
        preview: "Receipt for your recent purchase. ID: 123456789. Total: $0.99",
        date: "9:41 AM",
        unread: true,
    },
    {
        id: "2",
        sender: "Jane Doe",
        subject: "Meeting Reminder",
        preview: "Hey, just reminding you about our meeting tomorrow at 10 AM. See you there!",
        date: "Yesterday",
        unread: false,
        flagged: true,
    },
    {
        id: "3",
        sender: "Newsletter",
        subject: "Weekly Digest: React 19 is coming!",
        preview: "Check out the latest updates in the React ecosystem. New hooks, compiler, and more.",
        date: "Friday",
        unread: true,
    }
];

export const Default: Story = {
    args: {
        emails: sampleEmails,
    },
    render: (args) => (
        <div style={{ width: 375, height: 600, background: "white", borderRadius: 20, border: "1px solid #eee", overflow: "hidden" }}>
            <MailList {...args} />
        </div>
    ),
};
