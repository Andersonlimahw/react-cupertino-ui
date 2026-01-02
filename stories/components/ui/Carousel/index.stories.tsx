import type { Meta, StoryObj } from "@storybook/react";
import { useMemo } from "react";

import { Carousel } from "@components/ui/Carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@components/organisms/Card";

const slides = Array.from({ length: 4 }).map((_, index) => (
  <Card key={index}>
    <CardHeader>
      <CardTitle>Slide {index + 1}</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Liquid Glass carousel with smooth transforms.</p>
    </CardContent>
  </Card>
));

const meta: Meta<typeof Carousel> = {
  title: "UI/Carousel",
  component: Carousel,
  parameters: {
    layout: "centered",
  },
  args: {
    slides,
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {};

export const AutoPlay: Story = {
  args: {
    autoPlay: true,
    interval: 3000,
  },
};

export const MinimalIndicators: Story = {
  args: {
    slides,
    showControls: false,
  },
};
