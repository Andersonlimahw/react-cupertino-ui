import { Button, type ButtonProps } from "@components/molecules/Button";
import type { Meta, StoryFn } from "@storybook/react";
import { fn } from "@storybook/test";
import { Sparkles, LoaderCircle } from "lucide-react";
import "@globalstyles";

const meta = {
  title: "Molecules/Button",
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: [
          "glass",
          "solid",
          "outline",
          "ghost",
          "destructive",
          "secondary",
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
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;

const Template: StoryFn<ButtonProps> = (args) => {
  const { children, ...rest } = args;
  const hasCustomChildren = Object.prototype.hasOwnProperty.call(args, "children");

  return <Button {...rest}>{hasCustomChildren ? children : "Button"}</Button>;
};

export const Glass = Template.bind({});
Glass.args = {
  variant: "glass",
};

export const Solid = Template.bind({});
Solid.args = {
  variant: "solid",
};

export const Outline = Template.bind({});
Outline.args = {
  variant: "outline",
};

export const Ghost = Template.bind({});
Ghost.args = {
  variant: "ghost",
};

export const Destructive = Template.bind({});
Destructive.args = {
  variant: "destructive",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
};

export const Link = Template.bind({});
Link.args = {
  variant: "link",
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: <Sparkles size={18} />,
  children: "Magic",
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
  icon: <LoaderCircle size={18} />,
  children: "Syncing",
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  fullWidth: true,
  children: "Continue",
};

export const IconOnly = Template.bind({});
IconOnly.args = {
  size: "icon",
  icon: <Sparkles size={18} />,
  children: undefined,
  "aria-label": "Compose",
};
