import type { Meta, StoryObj } from "@storybook/react";
import { LinkPreview } from "@components/molecules/LinkPreview";

const meta = {
    title: "Molecules/LinkPreview",
    component: LinkPreview,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        url: { control: "text" },
        title: { control: "text" },
        description: { control: "text" },
    },
} satisfies Meta<typeof LinkPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        url: "https://apple.com",
        title: "Apple",
        description: "Discover the innovative world of Apple and shop everything iPhone, iPad, Apple Watch, Mac, and Apple TV.",
        image: "https://www.apple.com/ac/structured-data/images/open_graph_logo.png?202110180743",
        domain: "apple.com",
    },
    render: (args) => (
        <div style={{ width: 320 }}>
            <LinkPreview {...args} />
        </div>
    ),
};

export const NoImage: Story = {
    args: {
        url: "https://example.com",
        title: "Example Domain",
        description: "This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.",
    },
    render: (args) => (
        <div style={{ width: 320 }}>
            <LinkPreview {...args} />
        </div>
    ),
};
