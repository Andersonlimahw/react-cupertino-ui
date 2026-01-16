import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverTrigger, PopoverContent } from "@components/organisms/Popover";
import { Button } from "@components/molecules/Button";
import { Settings } from "lucide-react";

interface PopoverStoryProps {
  showArrow?: boolean;
  glass?: boolean;
}

const PopoverStory = ({ showArrow = true, glass = true }: PopoverStoryProps) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline" icon={<Settings size={16} />}>Open Popover</Button>
    </PopoverTrigger>
    <PopoverContent className="w-80" showArrow={showArrow} glass={glass}>
      <DemoContent />
    </PopoverContent>
  </Popover>
);

const meta = {
  title: "Organisms/Popover",
  component: PopoverStory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    showArrow: {
      control: "boolean",
      description: "Toggle the Liquid Glass arrow",
    },
    glass: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof PopoverStory>;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoContent = () => (
  <div className="grid gap-4">
    <div className="space-y-2">
      <h4 className="font-medium leading-none">Dimensions</h4>
      <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
    </div>
    <div className="grid grid-cols-2 gap-2">
      <Button variant="ghost" size="sm">
        Reset
      </Button>
      <Button size="sm">Apply</Button>
    </div>
  </div>
);

export const Default: Story = {
  args: {
    showArrow: true,
    glass: true,
  },
  render: (args) => <PopoverStory {...args} />,
};

export const WithoutArrow: Story = {
  args: {
    showArrow: false,
    glass: true,
  },
  render: (args) => <PopoverStory {...args} />,
};

export const Positioned: Story = {
  render: () => (
    <div className="flex gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button>Top</Button>
        </PopoverTrigger>
        <PopoverContent side="top" glass showArrow className="w-48">
          <DemoContent />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button>Left</Button>
        </PopoverTrigger>
        <PopoverContent side="left" glass showArrow className="w-48">
          <DemoContent />
        </PopoverContent>
      </Popover>
    </div>
  ),
};
