import { useEffect, useState, type ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MailComposer } from "@components/organisms/MailComposer";

const meta = {
    title: "Organisms/MailComposer",
    component: MailComposer,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        isOpen: { control: "boolean" },
    },
} satisfies Meta<typeof MailComposer>;

export default meta;
type Story = StoryObj<typeof meta>;

type MailComposerProps = ComponentProps<typeof MailComposer>;

const MailComposerStoryContent = (args: MailComposerProps) => {
    const [isOpen, setIsOpen] = useState(args.isOpen ?? false);

    useEffect(() => {
        if (typeof args.isOpen === "boolean") {
            setIsOpen(args.isOpen);
        }
    }, [args.isOpen]);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => {
        setIsOpen(false);
        args.onClose?.();
    };

    const handleSend: MailComposerProps["onSend"] = (data) => {
        args.onSend?.(data);
        setIsOpen(false);
    };

    return (
        <div style={{ width: 800, height: 600, position: "relative" }}>
            <button onClick={handleOpen}>Open Composer</button>
            <MailComposer
                {...args}
                isOpen={isOpen}
                onClose={handleClose}
                onSend={handleSend}
            />
        </div>
    );
};

export const Default: Story = {
    args: {
        isOpen: true,
        onClose: () => console.log('Close composer'),
        onSend: (data) => console.log('Send mail:', data),
    },
    render: (args) => <MailComposerStoryContent {...args} />,
};

export const PreFilled: Story = {
    args: {
        isOpen: true,
        onClose: () => { },
        onSend: () => { },
        initialData: {
            to: "john@example.com",
            subject: "Project Update",
            body: "Hi John,\n\nHere is the update regarding..."
        }
    },
    render: (args) => <MailComposerStoryContent {...args} />,
};
