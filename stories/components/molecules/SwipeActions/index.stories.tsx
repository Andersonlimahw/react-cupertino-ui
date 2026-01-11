import type { Meta, StoryObj } from "@storybook/react";
import { SwipeActions } from "@components/molecules/SwipeActions";
import { Archive, Trash, Flag } from "lucide-react";

const meta = {
    title: "Molecules/SwipeActions",
    component: SwipeActions,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
    },
} satisfies Meta<typeof SwipeActions>;

export default meta;
type Story = StoryObj<typeof meta>;

const SampleContent = () => (
    <div style={{ padding: "16px 20px", background: "white", width: "100%", borderBottom: "1px solid #eee" }}>
        <h4 style={{ margin: 0, fontSize: 16 }}>Swipe me!</h4>
        <p style={{ margin: "4px 0 0", color: "#8e8e93", fontSize: 13 }}>Swipe left or right to reveal actions.</p>
    </div>
);

export const Default: Story = {
    args: {
        children: <SampleContent />,
        startActions: [
            { label: "Unread", icon: <Flag />, onClick: () => alert("Marked unread"), color: "primary" }
        ],
        endActions: [
            { label: "More", icon: <Archive />, onClick: () => alert("Archived"), color: "gray" },
            { label: "Delete", icon: <Trash />, onClick: () => alert("Deleted"), color: "danger" }
        ]
    },
    render: (args) => (
        <div style={{ width: 375, overflow: "hidden", borderRadius: 12, border: "1px solid #eee" }}>
            <SwipeActions {...args} />
        </div>
    ),
};

export const OnlyEndActions: Story = {
    args: {
        children: <SampleContent />,
        endActions: [
            { label: "Delete", icon: <Trash />, onClick: () => alert("Deleted"), color: "danger" }
        ]
    },
    render: (args) => (
        <div style={{ width: 375, overflow: "hidden", borderRadius: 12, border: "1px solid #eee" }}>
            <SwipeActions {...args} />
        </div>
    ),
};
