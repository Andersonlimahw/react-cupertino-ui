import type { Meta, StoryObj } from "@storybook/react";
import { ProgressSlider } from "@components/molecules/ProgressSlider";

const meta = {
    title: "Molecules/ProgressSlider",
    component: ProgressSlider,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        currentTime: { control: "number" },
        duration: { control: "number" },
    },
} satisfies Meta<typeof ProgressSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        currentTime: 65,
        duration: 185,
    },
    render: (args) => (
        <div style={{ width: 300, padding: 20 }}>
            <ProgressSlider {...args} />
        </div>
    ),
};

export const Beginning: Story = {
    args: {
        currentTime: 0,
        duration: 240,
    },
    render: (args) => (
        <div style={{ width: 300, padding: 20 }}>
            <ProgressSlider {...args} />
        </div>
    ),
};

export const End: Story = {
    args: {
        currentTime: 178,
        duration: 180,
    },
    render: (args) => (
        <div style={{ width: 300, padding: 20 }}>
            <ProgressSlider {...args} />
        </div>
    ),
};
