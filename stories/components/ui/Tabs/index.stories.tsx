import type { Meta, StoryObj } from "@storybook/react";
import { Music, Sparkles, Star, TabletSmartphone } from "lucide-react";
import { useState } from "react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@components/ui/Tabs";
import "@globalstyles";

const meta: Meta<typeof Tabs> = {
  title: "UI/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const SampleTabs = () => {
  const [value, setValue] = useState("overview");
  return (
    <Tabs value={value} onValueChange={setValue}>
      <TabsList>
        <TabsTrigger value="overview" icon={<Sparkles size={16} />}>Overview</TabsTrigger>
        <TabsTrigger value="components" icon={<Star size={16} />}>Components</TabsTrigger>
        <TabsTrigger value="templates" icon={<TabletSmartphone size={16} />}>Templates</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        Liquid Glass primitives, AI controls and Apple-grade motion presets ready for React + Vite.
      </TabsContent>
      <TabsContent value="components">
        45+ atoms, molecules and organisms inspired by iOS 26 including SpotlightSearch, QuickAction, and more.
      </TabsContent>
      <TabsContent value="templates">
        List, Detail, Profile, Onboarding and Auth templates with built-in NavigationBar + TabBar wiring.
      </TabsContent>
    </Tabs>
  );
};

export const Default: Story = {
  render: () => <SampleTabs />,
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", width: "min(600px, 90vw)" }}>
      <Tabs defaultValue="music">
        <TabsList variant="glass">
          <TabsTrigger value="music" icon={<Music size={16} />}>Music</TabsTrigger>
          <TabsTrigger value="radio">Radio</TabsTrigger>
          <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
        </TabsList>
        <TabsContent value="music">Liquid Glass pill indicator with glow shadows.</TabsContent>
        <TabsContent value="radio">Curated radio experiences.</TabsContent>
        <TabsContent value="podcasts">Multi device playback controls.</TabsContent>
      </Tabs>

      <Tabs defaultValue="stats">
        <TabsList variant="soft" align="full">
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="stats">Soft background with muted tones.</TabsContent>
        <TabsContent value="reports">Understated layout for analytics.</TabsContent>
        <TabsContent value="history">Session history preview.</TabsContent>
      </Tabs>

      <Tabs defaultValue="live">
        <TabsList variant="underline" align="center">
          <TabsTrigger value="live">Live</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="archive">Archive</TabsTrigger>
        </TabsList>
        <TabsContent value="live">Underline variant with gradient indicator.</TabsContent>
        <TabsContent value="upcoming">Scheduled shows display here.</TabsContent>
        <TabsContent value="archive">Recordings and transcripts.</TabsContent>
      </Tabs>
    </div>
  ),
};
