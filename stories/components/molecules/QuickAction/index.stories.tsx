import type { Meta, StoryObj } from "@storybook/react";
import { Sparkles, Wand2, Layers } from "lucide-react";

import { QuickAction } from "@components/molecules/QuickAction";
import "@globalstyles";

const meta: Meta<typeof QuickAction> = {
  title: "Molecules/QuickAction",
  component: QuickAction,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof QuickAction>;

export const Default: Story = {
  args: {
    title: "Generate Buttons",
    subtitle: "Liquid Glass presets",
    helperText: "Creates a full Apple-style button pack",
    icon: <Sparkles size={24} />,
    badge: "New",
    metric: "2 min",
  },
};

export const Grid: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem", maxWidth: 720 }}>
      <QuickAction
        title="Generate Buttons"
        subtitle="Liquid Glass"
        icon={<Sparkles size={22} />}
        badge="New"
        helperText="Creates CTA, ghost and tinted variants"
      />
      <QuickAction
        title="Build Template"
        subtitle="List layout"
        icon={<Layers size={22} />}
        helperText="Spins up ListTemplate with mocked data"
        tone="indigo"
        metric="4 blocks"
      />
      <QuickAction
        title="AI Prompt Pack"
        subtitle="Spotlight ready"
        icon={<Wand2 size={22} />}
        helperText="Bundles SiriWaveform + Prompt Input"
        tone="success"
        layout="vertical"
      />
    </div>
  ),
};
