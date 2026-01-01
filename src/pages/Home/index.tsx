import * as React from "react";

import { Button } from "@react-cupertino-ui/button";
import { QuickAction } from "@components/molecules/QuickAction";
import { SpotlightSearch } from "@components/organisms/SpotlightSearch";
import { ListTemplate } from "@components/templates/ListTemplate";
import { AIPromptInput } from "@components/molecules/AIPromptInput";
import { SiriWaveform } from "@components/atoms/SiriWaveform";

import "./index.scss";

const quickActions = [
  {
    title: "Spin up Liquid Glass",
    subtitle: "Buttons, cards & badges",
    helperText: "Creates CTA, tinted and ghost variants in seconds.",
    metric: "2 min",
    badge: "New",
  },
  {
    title: "Build Spotlight",
    subtitle: "Search experience",
    helperText: "Drops SpotlightSearch with keyboard navigation.",
    tone: "indigo" as const,
    metric: "1 config",
  },
  {
    title: "Compose AI Shell",
    subtitle: "Prompt + Waveform",
    helperText: "Pairs AIPromptInput with SiriWaveform and glow states.",
    tone: "success" as const,
  },
];

const templateGroups = [
  {
    title: "UIKit atoms",
    items: [
      { title: "Buttons", meta: "Glass, solid, outline" },
      { title: "Indicators", meta: "SiriWaveform, VoiceIndicator" },
    ],
  },
  {
    title: "Organisms",
    items: [
      { title: "Spotlight", meta: "Command palette ready" },
      { title: "Navigation", meta: "Top bars, tab bars" },
      { title: "Sheets", meta: "ActionSheet & BottomSheet" },
    ],
  },
];

const listRenderItem = (item: { title: string; meta: string }) => (
  <div className="home-template-item">
    <div>
      <p>{item.title}</p>
      <span>{item.meta}</span>
    </div>
    <span aria-hidden="true">›</span>
  </div>
);

const useSEO = () => {
  React.useEffect(() => {
    const title = "React Cupertino UI — Liquid Glass components for React";
    const description =
      "Ship iOS 26 inspired experiences with Spotlight search, Liquid Glass buttons, AI prompts and SwiftUI-grade templates for React.";

    document.title = title;
    const ensureMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    ensureMeta("description", description);
    ensureMeta("og:title", title);
    ensureMeta("og:description", description);
    ensureMeta("twitter:card", "summary_large_image");
  }, []);
};

const HomePage = () => {
  useSEO();
  const [spotlightOpen, setSpotlightOpen] = React.useState(false);
  const [spotlightQuery, setSpotlightQuery] = React.useState("");
  const [recentSearches, setRecentSearches] = React.useState<string[]>([
    "Liquid Glass buttons",
    "Alert dialog",
    "List template",
  ]);
  const [promptValue, setPromptValue] = React.useState("");

  const spotlightResults = React.useMemo(() => {
    if (!spotlightQuery.trim()) {
      return [];
    }

    return [
      {
        title: "Components",
        items: [
          {
            id: "btn",
            title: "Button",
            subtitle: "Glass, solid, outline, ghost",
            onSelect: () => setSpotlightOpen(false),
          },
          {
            id: "spotlight",
            title: "SpotlightSearch",
            subtitle: "Overlay with keyboard hints",
            onSelect: () => setSpotlightOpen(false),
          },
        ],
      },
      {
        title: "Templates",
        items: [
          {
            id: "list",
            title: "ListTemplate",
            subtitle: "Navigation ready list layout",
            onSelect: () => setSpotlightOpen(false),
          },
        ],
      },
    ];
  }, [spotlightQuery]);

  React.useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSpotlightOpen(true);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleRecentSelect = (query: string) => {
    setSpotlightQuery(query);
  };

  const handleOpenSpotlight = () => setSpotlightOpen(true);

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero__content">
          <p className="eyebrow">Liquid Glass Design System</p>
          <h1>Apple-grade React components in minutes.</h1>
          <p>
            React Cupertino UI ships carefully crafted atoms, molecules, organisms and templates following the
            iOS 26 Liquid Glass language. Drop Spotlight search, AI prompts, tab bars and templates directly into
            your Vite + React apps.
          </p>
          <div className="home-hero__actions">
            <Button size="lg">Explore Storybook</Button>
            <Button variant="ghost" size="lg" onClick={handleOpenSpotlight}>
              Open Spotlight (⌘K)
            </Button>
          </div>
          <div className="home-hero__metrics">
            <div>
              <strong>45+</strong>
              <span>components</span>
            </div>
            <div>
              <strong>12</strong>
              <span>templates</span>
            </div>
            <div>
              <strong>5</strong>
              <span>AI primitives</span>
            </div>
          </div>
        </div>
      </section>

      <section className="home-actions">
        {quickActions.map((action) => (
          <QuickAction key={action.title} {...action} icon={<span>✨</span>} />
        ))}
      </section>

      <section className="home-showcase">
        <div className="home-showcase__spotlight">
          <div className="home-card">
            <div className="home-card__header">
              <h2>Spotlight built-in</h2>
              <p>Use SpotlightSearch to get cmd+K overlays with grouped results, recents and keyboard navigation.</p>
            </div>
            <Button variant="ghost" onClick={handleOpenSpotlight}>
              Launch Spotlight
            </Button>
          </div>
          <SpotlightSearch
            open={spotlightOpen}
            onOpenChange={setSpotlightOpen}
            value={spotlightQuery}
            onValueChange={setSpotlightQuery}
            results={spotlightResults}
            recentSearches={recentSearches}
            onSelectRecent={handleRecentSelect}
            onClearRecent={() => setRecentSearches([])}
            placeholder="Search components"
          />
        </div>

        <div className="home-showcase__template">
          <div className="home-card">
            <div className="home-card__header">
              <h2>Templates ready</h2>
              <p>Kickstart navigation flows with ListTemplate, DetailTemplate, ProfileTemplate and more.</p>
            </div>
          </div>
          <ListTemplate
            title="Component browser"
            description="Every atom to organism with helper metadata"
            groups={templateGroups}
            renderItem={(item) => listRenderItem(item as { title: string; meta: string })}
            searchable
            onItemPress={() => undefined}
          />
        </div>
      </section>

      <section className="home-ai">
        <div className="home-ai__prompt">
          <h3>Apple Intelligence ready</h3>
          <p>AIPromptInput, SiriWaveform, IntelligenceGlow and VoiceIndicator are prewired for spatial UIs.</p>
          <AIPromptInput
            value={promptValue}
            onChange={setPromptValue}
            onSubmit={() => setPromptValue("")}
            placeholder="Ask Cupertino Intelligence..."
            suggestions={["Create a glass tab bar", "Summarize latest design", "Mock navigation" ]}
            attachments
          />
        </div>
        <div className="home-ai__wave">
          <SiriWaveform active size="lg" />
        </div>
      </section>
    </main>
  );
};

export default HomePage;
