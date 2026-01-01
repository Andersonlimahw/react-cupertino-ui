import type { Meta, StoryObj } from "@storybook/react";
import { SiriWaveform } from "@/components/atoms/SiriWaveform";

const meta = {
  title: "Atoms/SiriWaveform",
  component: SiriWaveform,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    active: { control: "boolean" },
    color: { control: "radio", options: ["default", "multicolor"] },
    size: { control: "radio", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof SiriWaveform>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    active: true,
    color: "multicolor",
    size: "md",
  },
  render: (args) => (
    <div style={{ background: "#000", padding: "20px", borderRadius: "12px" }}>
        <SiriWaveform {...args} />
    </div>
  ),
};

export const Inactive: Story = {
  args: {
    active: false,
    color: "multicolor",
    size: "md",
  },
  render: (args) => (
    <div style={{ background: "#000", padding: "20px", borderRadius: "12px" }}>
        <SiriWaveform {...args} />
    </div>
  ),
};
