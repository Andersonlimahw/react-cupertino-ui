import * as React from "react";

import { Button } from "@react-cupertino-ui/button";
import { SpotlightSearch } from "@components/organisms/SpotlightSearch";

import "./index.scss";

const features = [
  {
    title: "Liquid Glass",
    description: "Blur, refraction, and depth effects that mirror iOS 26 aesthetics.",
  },
  {
    title: "Atomic Design",
    description: "Atoms, molecules, organisms, and templates for scalable architecture.",
  },
  {
    title: "AI-Ready",
    description: "SiriWaveform, AIPromptInput, and IntelligenceGlow built-in.",
  },
  {
    title: "Accessible",
    description: "WCAG compliant with full keyboard navigation support.",
  },
  {
    title: "TypeScript",
    description: "Fully typed components with IntelliSense autocomplete.",
  },
  {
    title: "Tree-Shakeable",
    description: "Import only what you need. Zero bloat in production.",
  },
];

const components = [
  { name: "Button", category: "Molecules" },
  { name: "TextField", category: "Molecules" },
  { name: "Dialog", category: "Organisms" },
  { name: "BottomSheet", category: "Organisms" },
  { name: "SpotlightSearch", category: "Organisms" },
  { name: "NavigationBar", category: "Organisms" },
  { name: "TabBar", category: "Organisms" },
  { name: "ActionSheet", category: "Organisms" },
  { name: "ListTemplate", category: "Templates" },
  { name: "SettingsTemplate", category: "Templates" },
  { name: "ProfileTemplate", category: "Templates" },
  { name: "AIConversation", category: "AI" },
];

const useSEO = () => {
  React.useEffect(() => {
    const title = "React Cupertino UI — iOS 26 Liquid Glass Components for React";
    const description =
      "Build beautiful iOS-inspired interfaces with React Cupertino UI. 50+ Liquid Glass components, AI primitives, and SwiftUI-grade templates. TypeScript. Accessible. Production-ready.";
    const keywords =
      "react components, ios design system, liquid glass, cupertino ui, react ui library, ios 26, apple design, typescript components, accessible ui";

    document.title = title;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let tag = document.querySelector(`meta[${attr}="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("keywords", keywords);
    setMeta("author", "React Cupertino UI Team");
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", "website", true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
  }, []);
};

const HomePage = () => {
  useSEO();
  const [spotlightOpen, setSpotlightOpen] = React.useState(false);
  const [spotlightQuery, setSpotlightQuery] = React.useState("");

  const spotlightResults = React.useMemo(() => {
    if (!spotlightQuery.trim()) return [];
    const q = spotlightQuery.toLowerCase();
    const filtered = components.filter(
      (c) => c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
    );
    if (filtered.length === 0) return [];

    const grouped = filtered.reduce<Record<string, typeof components>>((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});

    return Object.entries(grouped).map(([title, items]) => ({
      title,
      items: items.map((i) => ({
        id: i.name,
        title: i.name,
        subtitle: i.category,
        onSelect: () => setSpotlightOpen(false),
      })),
    }));
  }, [spotlightQuery]);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSpotlightOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <main className="landing">
      {/* Hero Section */}
      <section className="landing__hero">
        <div className="landing__hero-content">
          <span className="landing__badge">Open Source</span>
          <h1>
            Build iOS experiences
            <br />
            <span className="gradient-text">with React</span>
          </h1>
          <p className="landing__subtitle">
            A comprehensive React component library featuring iOS 26 Liquid Glass design.
            50+ accessible components. TypeScript-first. Production-ready.
          </p>
          <div className="landing__cta">
            <Button size="lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg" onClick={() => setSpotlightOpen(true)}>
              Search Components
              <kbd>⌘K</kbd>
            </Button>
          </div>
        </div>

        <div className="landing__hero-visual">
          <div className="glass-card glass-card--hero">
            <div className="glass-card__glow" />
            <pre className="code-preview">
              <code>{`import { Button } from 'react-cupertino-ui'

<Button variant="glass">
  Get Started
</Button>`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="landing__stats">
        <div className="stat">
          <span className="stat__number">50+</span>
          <span className="stat__label">Components</span>
        </div>
        <div className="stat">
          <span className="stat__number">12</span>
          <span className="stat__label">Templates</span>
        </div>
        <div className="stat">
          <span className="stat__number">100%</span>
          <span className="stat__label">TypeScript</span>
        </div>
        <div className="stat">
          <span className="stat__number">A11y</span>
          <span className="stat__label">Accessible</span>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing__features">
        <header className="section-header">
          <h2>Why React Cupertino UI?</h2>
          <p>Everything you need to build premium iOS-inspired interfaces</p>
        </header>

        <div className="features-grid">
          {features.map((feature) => (
            <article key={feature.title} className="feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Components Preview */}
      <section className="landing__components">
        <header className="section-header">
          <h2>Explore Components</h2>
          <p>From atomic elements to complete page templates</p>
        </header>

        <div className="components-preview">
          {components.slice(0, 8).map((component) => (
            <div key={component.name} className="component-tag">
              <span className="component-tag__name">{component.name}</span>
              <span className="component-tag__category">{component.category}</span>
            </div>
          ))}
          <div className="component-tag component-tag--more">
            <span>+{components.length - 8} more</span>
          </div>
        </div>

        <div className="landing__components-cta">
          <Button variant="outline" onClick={() => setSpotlightOpen(true)}>
            Browse All Components
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="landing__final-cta">
        <div className="glass-card glass-card--cta">
          <h2>Start Building Today</h2>
          <p>
            Install React Cupertino UI and ship beautiful interfaces in minutes.
            Free and open source.
          </p>
          <div className="install-command">
            <code>npm install react-cupertino-ui</code>
          </div>
          <div className="landing__cta">
            <Button size="lg">View Documentation</Button>
            <Button variant="ghost" size="lg">
              GitHub Repository
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing__footer">
        <p>
          Built with care by the React Cupertino UI team.
          <br />
          Inspired by Apple's design language. Not affiliated with Apple Inc.
        </p>
      </footer>

      {/* Spotlight Search */}
      <SpotlightSearch
        open={spotlightOpen}
        onOpenChange={setSpotlightOpen}
        value={spotlightQuery}
        onValueChange={setSpotlightQuery}
        results={spotlightResults}
        placeholder="Search components, templates..."
        emptyMessage="No components found"
      />
    </main>
  );
};

export default HomePage;
