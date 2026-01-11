import type { Meta, StoryObj } from "@storybook/react";
import { OnboardingTemplate } from "@components/templates/OnboardingTemplate";

const steps = [
  {
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    title: "Welcome to Liquid Glass",
    description: "Explore Apple Intelligence components ready for iOS 26.",
  },
  {
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=800&q=80",
    title: "Design Faster",
    description: "Use templates for settings, profiles, and onboarding flows.",
  },
];

const meta = {
  title: "Templates/OnboardingTemplate",
  component: OnboardingTemplate,
  parameters: {
    layout: "centered",
  },
  args: {
    steps,
    onComplete: () => alert("Done"),
  },
} satisfies Meta<typeof OnboardingTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
