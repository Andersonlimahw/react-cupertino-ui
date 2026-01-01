import type { Meta, StoryObj } from "@storybook/react";
import { PageControl, PageControlProps } from "@components/atoms/PageControl";
import { useState } from "react";

const meta = {
  title: "Atoms/PageControl",
  component: PageControl,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
        control: { type: "select" },
        options: ["dots", "pills"],
    },
  },
} satisfies Meta<typeof PageControl>;

export default meta;
type Story = StoryObj<typeof meta>;

const PageControlWithState = (args: PageControlProps) => {
  const [current, setCurrent] = useState(0);
  
  return (
    <PageControl {...args} current={current} onChange={setCurrent} />
  );
};

export const Default: Story = {
  args: {
    total: 5,
    current: 0,
  },
  render: (args) => <PageControlWithState {...args} />,
};

export const Pills: Story = {
  args: {
    total: 5,
    current: 0,
    variant: "pills",
  },
  render: (args) => <PageControlWithState {...args} />,
};
