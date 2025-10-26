import type { Meta, StoryObj } from '@storybook/react';
import { Settings, User, Bell, Lock, HelpCircle, Mail, Phone, MapPin } from 'lucide-react';

import { List, ListItem } from '@/components/ui/List';
import Badge from '@/components/ui/Badge';
import "../../../../dist/output.css";

const meta = {
  title: 'Components/List',
  component: List,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <List>
      <ListItem title="Profile" icon={<User />} chevron />
      <ListItem title="Settings" icon={<Settings />} chevron />
      <ListItem title="Notifications" icon={<Bell />} chevron />
      <ListItem title="Privacy" icon={<Lock />} chevron />
      <ListItem title="Help" icon={<HelpCircle />} chevron />
    </List>
  ),
};

export const WithSubtitles: Story = {
  render: () => (
    <List>
      <ListItem
        title="Email"
        subtitle="john.doe@example.com"
        icon={<Mail />}
        chevron
      />
      <ListItem
        title="Phone"
        subtitle="+1 (555) 123-4567"
        icon={<Phone />}
        chevron
      />
      <ListItem
        title="Address"
        subtitle="123 Main St, San Francisco, CA"
        icon={<MapPin />}
        chevron
      />
    </List>
  ),
};

export const WithRightContent: Story = {
  render: () => (
    <List>
      <ListItem
        title="Notifications"
        icon={<Bell />}
        rightContent={<Badge>12</Badge>}
        chevron
      />
      <ListItem
        title="Messages"
        icon={<Mail />}
        rightContent={<Badge>5</Badge>}
        chevron
      />
      <ListItem
        title="Settings"
        icon={<Settings />}
        rightContent="Beta"
        chevron
      />
    </List>
  ),
};

export const InsetVariant: Story = {
  render: () => (
    <List variant="inset">
      <ListItem title="Profile" icon={<User />} chevron />
      <ListItem title="Settings" icon={<Settings />} chevron />
      <ListItem title="Notifications" icon={<Bell />} chevron />
      <ListItem title="Privacy" icon={<Lock />} chevron />
    </List>
  ),
};

export const WithoutIcons: Story = {
  render: () => (
    <List>
      <ListItem title="General" chevron />
      <ListItem title="Accessibility" chevron />
      <ListItem title="Privacy & Security" chevron />
      <ListItem title="Notifications" chevron />
    </List>
  ),
};

export const WithoutChevrons: Story = {
  render: () => (
    <List>
      <ListItem title="App Version" rightContent="1.0.0" />
      <ListItem title="Build Number" rightContent="2024.01" />
      <ListItem title="Last Updated" rightContent="Today" />
    </List>
  ),
};

export const Clickable: Story = {
  render: () => (
    <List>
      <ListItem
        title="Profile"
        icon={<User />}
        chevron
        onClick={() => alert('Profile clicked')}
      />
      <ListItem
        title="Settings"
        icon={<Settings />}
        chevron
        onClick={() => alert('Settings clicked')}
      />
      <ListItem
        title="Help"
        icon={<HelpCircle />}
        chevron
        onClick={() => alert('Help clicked')}
      />
    </List>
  ),
};

export const WithDisabledItems: Story = {
  render: () => (
    <List>
      <ListItem title="Available Option" icon={<User />} chevron />
      <ListItem title="Disabled Option" icon={<Lock />} disabled chevron />
      <ListItem title="Another Available" icon={<Settings />} chevron />
    </List>
  ),
};

export const Mixed: Story = {
  render: () => (
    <List>
      <ListItem
        title="John Doe"
        subtitle="CEO"
        icon={<User />}
        rightContent="Online"
        chevron
        onClick={() => alert('John clicked')}
      />
      <ListItem
        title="Jane Smith"
        subtitle="CTO"
        icon={<User />}
        rightContent={<Badge>3</Badge>}
        chevron
        onClick={() => alert('Jane clicked')}
      />
      <ListItem
        title="Bob Johnson"
        subtitle="Developer"
        icon={<User />}
        rightContent="Away"
        chevron
        disabled
      />
    </List>
  ),
};
