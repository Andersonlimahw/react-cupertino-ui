import type { Meta, StoryFn } from "@storybook/react";
import "../../../../dist/output.css";
import { Paragraph, ParagraphProps } from "@/components/ui/Paragraph";

const meta = {
  title: "Typography/Paragraph",
  component: Paragraph,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: [
          "default",
          "destructive",
          "outline",
          "secondary",
          "ghost",
          "link",
        ],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["default", "sm", "lg", "icon"],
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof Paragraph>;

export default meta;

const Template: StoryFn<ParagraphProps> = (args) => (
  <Paragraph {...args}>Paragraph</Paragraph>
);

export const Default = Template.bind({});
Default.args = {
  variant: "default",
  size: "default",
};

export const Destructive = Template.bind({});
Destructive.args = {
  variant: "destructive",
  size: "default",
};

export const Outline = Template.bind({});
Outline.args = {
  variant: "outline",
  size: "default",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
  size: "default",
};

export const Ghost = Template.bind({});
Ghost.args = {
  variant: "ghost",
  size: "default",
};

export const Link = Template.bind({});
Link.args = {
  variant: "link",
  size: "default",
};

export const Small = Template.bind({});
Small.args = {
  variant: "default",
  size: "sm",
};

export const Large = Template.bind({});
Large.args = {
  variant: "default",
  size: "lg",
};

export const Icon = Template.bind({});
Icon.args = {
  variant: "ghost",
  size: "icon",
};
