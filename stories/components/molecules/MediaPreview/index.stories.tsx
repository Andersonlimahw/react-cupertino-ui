import type { Meta, StoryObj } from "@storybook/react";
import { MediaPreview } from "@components/molecules/MediaPreview";

const meta = {
    title: "Molecules/MediaPreview",
    component: MediaPreview,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        type: { control: "radio", options: ["image", "video"] },
        aspectRatio: { control: "number" },
    },
} satisfies Meta<typeof MediaPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Image: Story = {
    args: {
        src: "https://images.unsplash.com/photo-1575936123452-b67c3203c357",
        alt: "Sample image",
        type: "image",
        aspectRatio: 16 / 9,
    },
    render: (args) => (
        <div style={{ width: 300 }}>
            <MediaPreview {...args} />
        </div>
    ),
};

export const Video: Story = {
    args: {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        poster: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
        type: "video",
        aspectRatio: 16 / 9,
    },
    render: (args) => (
        <div style={{ width: 300 }}>
            <MediaPreview {...args} />
        </div>
    ),
};
