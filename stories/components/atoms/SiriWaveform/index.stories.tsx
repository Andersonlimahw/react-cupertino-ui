import type { Meta, StoryObj } from "@storybook/react";
import { SiriWaveform } from "@components/atoms/SiriWaveform";

const meta = {
  title: "Atoms/SiriWaveform",
  component: SiriWaveform,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    active: { control: "boolean" },
    palette: { control: "radio", options: ["multicolor", "mono", "ocean", "sunset"] },
    size: { control: "radio", options: ["sm", "md", "lg"] },
    motion: { control: "radio", options: ["calm", "pulse"] },
    amplitude: { control: { type: "range", min: 0.5, max: 1.5, step: 0.1 } },
  },
} satisfies Meta<typeof SiriWaveform>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    active: true,
    palette: "multicolor",
    motion: "pulse",
    amplitude: 1,
    size: "md",
  },
  render: (args) => (
    <div style={{ background: "#000", padding: "20px", borderRadius: "12px" }}>
        <SiriWaveform {...args} />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", background: "#010101", padding: "20px", borderRadius: "12px" }}>
      <SiriWaveform active palette="multicolor" />
      <SiriWaveform active palette="ocean" motion="calm" />
      <SiriWaveform active palette="sunset" amplitude={1.2} />
      <SiriWaveform active palette="mono" amplitude={0.7} />
    </div>
  ),
};
