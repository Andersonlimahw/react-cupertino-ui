import type { Meta, StoryObj } from "@storybook/react";
import { AuthTemplate } from "@components/templates/AuthTemplate";

const meta = {
  title: "Templates/AuthTemplate",
  component: AuthTemplate,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    onSubmit: () => {},
  },
} satisfies Meta<typeof AuthTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Login: Story = {
  args: {
    variant: "login",
    onSocialLogin: () => {},
  },
};

export const Register: Story = {
  args: {
    variant: "register",
  },
};

export const Forgot: Story = {
  args: {
    variant: "forgot",
  },
};
