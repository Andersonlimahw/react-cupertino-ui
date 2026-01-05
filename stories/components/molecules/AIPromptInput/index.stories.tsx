import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useState, type ComponentProps } from "react";

import { AIPromptInput } from "@components/molecules/AIPromptInput";

const meta: Meta<typeof AIPromptInput> = {
  title: "Molecules/AIPromptInput",
  component: AIPromptInput,
  parameters: {
    layout: "centered",
    backgrounds: { default: "light" },
  },
  tags: ["autodocs"],
  args: {
    value: "",
    onChange: () => {},
    onSubmit: fn(),
  },
} satisfies Meta<typeof AIPromptInput>;

export default meta;
type Story = StoryObj<typeof meta>;

type AIPromptInputProps = ComponentProps<typeof AIPromptInput>;
type AIPromptInputStoryProps = Partial<AIPromptInputProps>;

const Stateful = (args: AIPromptInputStoryProps) => {
  const [value, setValue] = useState(args.value ?? "Summarize the last conversation");

  return (
    <AIPromptInput
      {...args}
      value={value}
      onChange={setValue}
      onSubmit={(prompt) => {
        args.onSubmit?.(prompt);
      }}
    />
  );
};

export const Default: Story = {
  args: {
    value: "Summarize the last conversation",
  },
  render: (args) => (
    <Stateful
      {...args}
      suggestions={["Summarize", "Draft reply", "Translate to Portuguese"]}
      helperText="Shift+Enter para quebrar linha"
      attachments
    />
  ),
};

export const Loading: Story = {
  args: {
    value: "Generating...",
  },
  render: (args) => <Stateful {...args} loading />, 
};

export const Disabled: Story = {
  args: {
    value: "",
  },
  render: (args) => (
    <Stateful {...args} disabled placeholder="Prompt input desabilitado" />
  ),
};
