import type { Meta, StoryObj } from "@storybook/react";
import { HelpCircle, Info, Settings } from "lucide-react";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
  TooltipProvider,
  SimpleTooltip,
} from "@components/ui/Tooltip";
import { Button } from "@components/molecules/Button";

const meta: Meta<typeof SimpleTooltip> = {
  title: "UI/Tooltip",
  component: SimpleTooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Liquid Glass tooltip with tones, motion presets, and composable Radix-powered API.",
      },
    },
  },
  argTypes: {
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
    },
    glass: { control: "boolean" },
    arrow: { control: "boolean" },
    tone: {
      control: "select",
      options: ["neutral", "info", "success", "warning", "critical"],
    },
    size: {
      control: "select",
      options: ["sm", "md"],
    },
    motion: {
      control: "select",
      options: ["shift", "scale"],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SimpleTooltip>;

export const Default: Story = {
  args: {
    content: "This is a helpful tooltip",
    children: <Button variant="outline">Hover me</Button>,
    tone: "neutral",
  },
};

export const Positions: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
      <SimpleTooltip content="Tooltip on top" side="top">
        <Button variant="outline">Top</Button>
      </SimpleTooltip>
      <SimpleTooltip content="Tooltip on right" side="right">
        <Button variant="outline">Right</Button>
      </SimpleTooltip>
      <SimpleTooltip content="Tooltip on bottom" side="bottom">
        <Button variant="outline">Bottom</Button>
      </SimpleTooltip>
      <SimpleTooltip content="Tooltip on left" side="left">
        <Button variant="outline">Left</Button>
      </SimpleTooltip>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px" }}>
      <SimpleTooltip content="More information" tone="info">
        <button type="button" style={{ background: "none", border: "none", cursor: "pointer" }}>
          <Info size={20} />
        </button>
      </SimpleTooltip>
      <SimpleTooltip content="Get help" tone="warning">
        <button type="button" style={{ background: "none", border: "none", cursor: "pointer" }}>
          <HelpCircle size={20} />
        </button>
      </SimpleTooltip>
      <SimpleTooltip content="Settings" tone="success">
        <button type="button" style={{ background: "none", border: "none", cursor: "pointer" }}>
          <Settings size={20} />
        </button>
      </SimpleTooltip>
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      {["neutral", "info", "success", "warning", "critical"].map((tone) => (
        <SimpleTooltip key={tone} content={`${tone} tone`} tone={tone as any}>
          <Button variant="outline">{tone}</Button>
        </SimpleTooltip>
      ))}
    </div>
  ),
};

export const MotionPresets: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "24px" }}>
      <SimpleTooltip content="Shift motion" motion="shift">
        <Button variant="outline">Shift</Button>
      </SimpleTooltip>
      <SimpleTooltip content="Scale motion" motion="scale">
        <Button variant="outline">Scale</Button>
      </SimpleTooltip>
    </div>
  ),
};

export const RichContent: Story = {
  render: () => (
    <SimpleTooltip
      content={
        <div style={{ textAlign: "center" }}>
          <strong>Pro Tip</strong>
          <p style={{ margin: "4px 0 0", opacity: 0.8 }}>Press ⌘ + K for quick actions</p>
        </div>
      }
      tone="info"
      motion="scale"
    >
      <Button variant="glass">Show Tip</Button>
    </SimpleTooltip>
  ),
};

export const CustomDelay: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px" }}>
      <SimpleTooltip content="Instant (0ms)" delayDuration={0}>
        <Button variant="outline">Instant</Button>
      </SimpleTooltip>
      <SimpleTooltip content="Normal (200ms)" delayDuration={200}>
        <Button variant="outline">Normal</Button>
      </SimpleTooltip>
      <SimpleTooltip content="Slow (500ms)" delayDuration={500}>
        <Button variant="outline">Slow</Button>
      </SimpleTooltip>
    </div>
  ),
};

export const ComposableAPI: Story = {
  render: () => (
    <TooltipProvider delayDuration={100}>
      <div style={{ display: "flex", gap: "16px" }}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">First</Button>
          </TooltipTrigger>
          <TooltipContent tone="success" arrow={false}>
            First tooltip
            <TooltipArrow tone="success" />
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Second</Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" tone="critical">
            Second tooltip (bottom)
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};
