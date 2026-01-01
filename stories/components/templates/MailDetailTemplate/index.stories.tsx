import type { Meta, StoryObj } from "@storybook/react";
import { MailDetailTemplate } from "@components/templates/MailDetailTemplate";

const meta = {
  title: "Templates/MailDetailTemplate",
  component: MailDetailTemplate,
  parameters: { layout: "centered" },
  args: {
    subject: "Liquid Glass weekly update",
    from: "Sarah Lee",
    to: "team@apple.com",
    timestamp: "Today, 9:41 AM",
    children: (
      <p>
        Here's the latest progress on Apple Intelligence UI components. We delivered the AI
        Conversation organism and onboarding templates, and next week we'll ship the Messages Kit.
      </p>
    ),
  },
} satisfies Meta<typeof MailDetailTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
