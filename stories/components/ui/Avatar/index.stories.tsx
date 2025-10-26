import type { Meta, StoryObj } from '@storybook/react';
import { User, Settings, Mail, Heart } from 'lucide-react';

import Avatar from '@/components/ui/Avatar';
import "../../../../dist/output.css";

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["default", "sm", "lg", "xl"],
      },
    },
    shape: {
      control: {
        type: "select",
        options: ["circle", "rounded", "square"],
      },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=1",
    alt: "User avatar",
  },
};

export const WithFallback: Story = {
  args: {
    fallback: "John Doe",
  },
};

export const WithInitials: Story = {
  args: {
    fallback: "JD",
  },
};

export const WithIcon: Story = {
  args: {
    icon: <Settings />,
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    src: "https://i.pravatar.cc/150?img=2",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    src: "https://i.pravatar.cc/150?img=3",
  },
};

export const ExtraLarge: Story = {
  args: {
    size: "xl",
    src: "https://i.pravatar.cc/150?img=4",
  },
};

export const RoundedShape: Story = {
  args: {
    shape: "rounded",
    src: "https://i.pravatar.cc/150?img=5",
  },
};

export const SquareShape: Story = {
  args: {
    shape: "square",
    src: "https://i.pravatar.cc/150?img=6",
  },
};

export const FallbackRounded: Story = {
  args: {
    shape: "rounded",
    fallback: "Alice Smith",
  },
};

export const IconRounded: Story = {
  args: {
    shape: "rounded",
    icon: <Mail />,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar size="sm" src="https://i.pravatar.cc/150?img=7" />
      <Avatar size="default" src="https://i.pravatar.cc/150?img=8" />
      <Avatar size="lg" src="https://i.pravatar.cc/150?img=9" />
      <Avatar size="xl" src="https://i.pravatar.cc/150?img=10" />
    </div>
  ),
};

export const AllShapes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar shape="circle" src="https://i.pravatar.cc/150?img=11" />
      <Avatar shape="rounded" src="https://i.pravatar.cc/150?img=12" />
      <Avatar shape="square" src="https://i.pravatar.cc/150?img=13" />
    </div>
  ),
};

export const FallbackExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar fallback="John Doe" />
      <Avatar fallback="Jane Smith" />
      <Avatar fallback="Bob Johnson" />
      <Avatar fallback="Alice Williams" />
    </div>
  ),
};

export const IconExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar icon={<User />} />
      <Avatar icon={<Settings />} />
      <Avatar icon={<Mail />} />
      <Avatar icon={<Heart />} />
    </div>
  ),
};

export const Mixed: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Avatar size="sm" src="https://i.pravatar.cc/150?img=14" />
        <Avatar size="sm" fallback="AB" />
        <Avatar size="sm" icon={<User />} />
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Avatar src="https://i.pravatar.cc/150?img=15" />
        <Avatar fallback="CD" />
        <Avatar icon={<Settings />} />
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Avatar size="lg" src="https://i.pravatar.cc/150?img=16" />
        <Avatar size="lg" fallback="EF" />
        <Avatar size="lg" icon={<Mail />} />
      </div>
    </div>
  ),
};
