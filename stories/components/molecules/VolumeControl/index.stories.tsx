import type { Meta, StoryObj } from "@storybook/react";
import { VolumeControl } from "@components/molecules/VolumeControl";

const meta = {
    title: "Molecules/VolumeControl",
    component: VolumeControl,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        volume: { control: { type: "range", min: 0, max: 1, step: 0.1 } },
        muted: { control: "boolean" },
    },
} satisfies Meta<typeof VolumeControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        volume: 0.5,
    },
    render: (args) => (
        <div style={{ width: 300, padding: 20 }}>
            <VolumeControl {...args} />
        </div>
    ),
};

export const Muted: Story = {
    args: {
        volume: 0.5,
        muted: true,
    },
    render: (args) => (
        <div style={{ width: 300, padding: 20 }}>
            <VolumeControl {...args} />
        </div>
    ),
};

export const MaxVolume: Story = {
    args: {
        volume: 1,
    },
    render: (args) => (
        <div style={{ width: 300, padding: 20 }}>
            <VolumeControl {...args} />
        </div>
    ),
};
