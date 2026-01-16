import type { Meta, StoryObj } from "@storybook/react";
import { LandingPageTemplate } from "@components/templates/LandingPageTemplate";

const meta = {
  title: "Templates/LandingPageTemplate",
  component: LandingPageTemplate,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  args: {
    onContactSubmit: (data) => alert(JSON.stringify(data)),
    onHeroCtaClick: () => alert("CTA Clicked"),
    onHeroSecondaryClick: () => alert("Secondary Clicked"),
  },
} satisfies Meta<typeof LandingPageTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomContent: Story = {
  args: {
    heroTitle: "Build Faster",
    heroSubtitle: "The ultimate UI kit for modern web applications.",
    features: [
      { title: "Speed", description: "Blazing fast performance." },
      { title: "Design", description: "World-class aesthetics." },
      { title: "Support", description: "24/7 dedicated support." },
      { title: "Community", description: "Join thousands of developers." },
    ],
  },
};
