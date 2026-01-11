import * as React from "react";

import { Button } from "@react-cupertino-ui/button";
import { SpotlightSearch } from "@components/organisms/SpotlightSearch";

import "./index.scss";

// Complete list of all available components
const allComponents = [
  // AI Components
  { name: "AIActionList", category: "AI" },
  { name: "AIConversation", category: "AI" },
  { name: "AIInsightCard", category: "AI" },
  { name: "AILoadingState", category: "AI" },
  { name: "AIPromptInput", category: "AI" },
  { name: "AIRecommenderGrid", category: "AI" },
  { name: "AIResponseBubble", category: "AI" },
  { name: "IntelligenceGlow", category: "AI" },
  { name: "SiriStatusIndicator", category: "AI" },
  { name: "SiriWaveform", category: "AI" },

  // Atoms
  { name: "Avatar", category: "Atoms" },
  { name: "Badge", category: "Atoms" },
  { name: "Caption", category: "Atoms" },
  { name: "Headline", category: "Atoms" },
  { name: "Paragraph", category: "Atoms" },
  { name: "Title", category: "Atoms" },
  { name: "Skeleton", category: "Atoms" },

  // Molecules
  { name: "Accordion", category: "Molecules" },
  { name: "AlbumCover", category: "Molecules" },
  { name: "AudioMessage", category: "Molecules" },
  { name: "Breadcrumb", category: "Molecules" },
  { name: "Button", category: "Molecules" },
  { name: "Checkbox", category: "Molecules" },
  { name: "DatePicker", category: "Molecules" },
  { name: "LinkPreview", category: "Molecules" },
  { name: "MediaPreview", category: "Molecules" },
  { name: "MessageBubble", category: "Molecules" },
  { name: "MessageInput", category: "Molecules" },
  { name: "MiniNotification", category: "Molecules" },
  { name: "NotificationBanner", category: "Molecules" },
  { name: "PageControl", category: "Molecules" },
  { name: "Picker", category: "Molecules" },
  { name: "PlaybackControls", category: "Molecules" },
  { name: "ProgressBar", category: "Molecules" },
  { name: "ProgressSlider", category: "Molecules" },
  { name: "QuickAction", category: "Molecules" },
  { name: "Radio", category: "Molecules" },
  { name: "Rating", category: "Molecules" },
  { name: "ReactionPicker", category: "Molecules" },
  { name: "ReadReceipt", category: "Molecules" },
  { name: "SearchBar", category: "Molecules" },
  { name: "SegmentedControl", category: "Molecules" },
  { name: "SegmentedTabs", category: "Molecules" },
  { name: "Select", category: "Molecules" },
  { name: "SiriShortcutChip", category: "Molecules" },
  { name: "Slider", category: "Molecules" },
  { name: "Stepper", category: "Molecules" },
  { name: "SuggestionBar", category: "Molecules" },
  { name: "SuggestionChip", category: "Molecules" },
  { name: "SwipeActions", category: "Molecules" },
  { name: "Switcher", category: "Molecules" },
  { name: "Tabs", category: "Molecules" },
  { name: "TextField", category: "Molecules" },
  { name: "Timeline", category: "Molecules" },
  { name: "Toast", category: "Molecules" },
  { name: "Tooltip", category: "Molecules" },
  { name: "TypingIndicator", category: "Molecules" },
  { name: "VoiceIndicator", category: "Molecules" },
  { name: "VolumeControl", category: "Molecules" },

  // Organisms
  { name: "ActionSheet", category: "Organisms" },
  { name: "Alert", category: "Organisms" },
  { name: "BottomSheet", category: "Organisms" },
  { name: "CalendarHeatmap", category: "Organisms" },
  { name: "Card", category: "Organisms" },
  { name: "Carousel", category: "Organisms" },
  { name: "ColorTokensViewer", category: "Organisms" },
  { name: "CommandPalette", category: "Organisms" },
  { name: "ContextMenu", category: "Organisms" },
  { name: "ConversationHeader", category: "Organisms" },
  { name: "ConversationList", category: "Organisms" },
  { name: "Dialog", category: "Organisms" },
  { name: "List", category: "Organisms" },
  { name: "LyricsView", category: "Organisms" },
  { name: "MailComposer", category: "Organisms" },
  { name: "MailList", category: "Organisms" },
  { name: "MapsPOICard", category: "Organisms" },
  { name: "MediaSessionCard", category: "Organisms" },
  { name: "MediaTransport", category: "Organisms" },
  { name: "MiniPlayer", category: "Organisms" },
  { name: "NavigationBar", category: "Organisms" },
  { name: "NowPlayingBar", category: "Organisms" },
  { name: "PhotosGrid", category: "Organisms" },
  { name: "PlaybackQueue", category: "Organisms" },
  { name: "Popover", category: "Organisms" },
  { name: "Sidesheet", category: "Organisms" },
  { name: "SpotlightSearch", category: "Organisms" },
  { name: "TabBar", category: "Organisms" },
  { name: "TrackList", category: "Organisms" },
  { name: "VoiceCommandBar", category: "Organisms" },

  // Templates
  { name: "AuthTemplate", category: "Templates" },
  { name: "DetailTemplate", category: "Templates" },
  { name: "EmptyStateTemplate", category: "Templates" },
  { name: "FullPlayerTemplate", category: "Templates" },
  { name: "ListTemplate", category: "Templates" },
  { name: "MailDetailTemplate", category: "Templates" },
  { name: "MasterDetailTemplate", category: "Templates" },
  { name: "OnboardingTemplate", category: "Templates" },
  { name: "ProfileTemplate", category: "Templates" },
  { name: "SettingsTemplate", category: "Templates" },
  { name: "SplitViewTemplate", category: "Templates" },
];

const features = [
  {
    icon: "glass",
    title: "Liquid Glass Design",
    description: "Stunning blur, refraction, and depth effects that perfectly mirror iOS 26 aesthetics. Your apps will feel native.",
  },
  {
    icon: "atomic",
    title: "Atomic Architecture",
    description: "Atoms, molecules, organisms, and templates. Build scalable, maintainable UIs with a proven design methodology.",
  },
  {
    icon: "ai",
    title: "AI-Ready Components",
    description: "SiriWaveform, AIPromptInput, IntelligenceGlow, and more. Build the next generation of intelligent interfaces.",
  },
  {
    icon: "a11y",
    title: "Fully Accessible",
    description: "WCAG 2.1 compliant. Full keyboard navigation, screen reader support, and reduced motion preferences built-in.",
  },
  {
    icon: "ts",
    title: "TypeScript First",
    description: "100% typed components with IntelliSense autocomplete. Catch errors at compile time, not runtime.",
  },
  {
    icon: "tree",
    title: "Tree-Shakeable",
    description: "Import only what you need. Zero bloat in production. Your bundle stays lean and fast.",
  },
];

const useSEO = () => {
  React.useEffect(() => {
    const title = "React Cupertino UI | iOS 26 Liquid Glass Components for React";
    const description =
      "Build stunning iOS-inspired interfaces with React Cupertino UI. 100+ Liquid Glass components, AI primitives, and production-ready templates. TypeScript-first, fully accessible, and tree-shakeable.";
    const keywords =
      "react components, ios design system, liquid glass, cupertino ui, react ui library, ios 26, apple design, typescript components, accessible ui, react native, swiftui, ios components, glassmorphism, ai components";
    const siteUrl = "https://your-username.github.io/react-cupertino-ui";

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

    // Basic SEO
    setMeta("description", description);
    setMeta("keywords", keywords);
    setMeta("author", "Anderson Lima");
    setMeta("robots", "index, follow");
    setMeta("viewport", "width=device-width, initial-scale=1.0");

    // Open Graph
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", "website", true);
    setMeta("og:url", siteUrl, true);
    setMeta("og:site_name", "React Cupertino UI", true);
    setMeta("og:locale", "en_US", true);

    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:site", "@reactcupertinoui");

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", siteUrl);
  }, []);
};

type Theme = "light" | "dark";

const useTheme = () => {
  const [theme, setTheme] = React.useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme") as Theme | null;
      if (saved) return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "dark";
  });

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return { theme, toggleTheme };
};

const ThemeToggle = ({ theme, onToggle }: { theme: Theme; onToggle: () => void }) => (
  <button
    className="theme-toggle"
    onClick={onToggle}
    aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
  >
    {theme === "dark" ? (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ) : (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    )}
  </button>
);

const STORYBOOK_URL = "./storybook";
const GITHUB_URL = "https://github.com/AugustinMauworworSossou/react-cupertino-ui";

const HomePage = () => {
  useSEO();
  const { theme, toggleTheme } = useTheme();
  const [spotlightOpen, setSpotlightOpen] = React.useState(false);
  const [spotlightQuery, setSpotlightQuery] = React.useState("");

  const spotlightResults = React.useMemo(() => {
    if (!spotlightQuery.trim()) return [];
    const q = spotlightQuery.toLowerCase();
    const filtered = allComponents.filter(
      (c) => c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
    );
    if (filtered.length === 0) return [];

    const grouped = filtered.reduce<Record<string, typeof allComponents>>((acc, item) => {
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
        onSelect: () => {
          window.open(`${STORYBOOK_URL}/?path=/docs/${i.category.toLowerCase()}-${i.name.toLowerCase()}--docs`, "_blank");
          setSpotlightOpen(false);
        },
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

  const componentCount = allComponents.length;
  const templateCount = allComponents.filter((c) => c.category === "Templates").length;

  return (
    <main className="landing">
      {/* Header */}
      <header className="landing__header">
        <div className="landing__logo">
          <span className="logo-icon">RC</span>
          <span className="logo-text">React Cupertino UI</span>
        </div>
        <nav className="landing__nav">
          <a href={STORYBOOK_URL} className="nav-link">Documentation</a>
          <a href={GITHUB_URL} className="nav-link" target="_blank" rel="noopener noreferrer">GitHub</a>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </nav>
      </header>

      {/* Hero Section */}
      <section className="landing__hero">
        <div className="landing__hero-content">
          <span className="landing__badge">Open Source</span>
          <h1>
            Craft Stunning iOS Experiences
            <br />
            <span className="gradient-text">with React</span>
          </h1>
          <p className="landing__subtitle">
            The most comprehensive React component library featuring iOS 26 Liquid Glass design.
            {componentCount}+ accessible components. TypeScript-first. Production-ready.
            <strong> Start building beautiful apps today.</strong>
          </p>
          <div className="landing__cta">
            <Button size="lg" onClick={() => window.open(STORYBOOK_URL, "_blank")}>
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
              <code>{`import { Button, Dialog } from 'react-cupertino-ui'

function App() {
  return (
    <Dialog title="Welcome">
      <Button variant="glass">
        Get Started
      </Button>
    </Dialog>
  )
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="landing__stats">
        <div className="stat">
          <span className="stat__number">{componentCount}+</span>
          <span className="stat__label">Components</span>
        </div>
        <div className="stat">
          <span className="stat__number">{templateCount}</span>
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
          <h2>Why Developers Choose React Cupertino UI</h2>
          <p>Everything you need to build premium iOS-inspired interfaces that users love</p>
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
          <h2>Explore the Component Library</h2>
          <p>From atomic elements to complete page templates — everything follows Apple's design principles</p>
        </header>

        <div className="components-categories">
          {["AI", "Atoms", "Molecules", "Organisms", "Templates"].map((category) => {
            const categoryComponents = allComponents.filter((c) => c.category === category);
            return (
              <div key={category} className="category-group">
                <h3 className="category-title">
                  {category}
                  <span className="category-count">{categoryComponents.length}</span>
                </h3>
                <div className="components-preview">
                  {categoryComponents.slice(0, 6).map((component) => (
                    <button
                      key={component.name}
                      className="component-tag"
                      onClick={() => window.open(`${STORYBOOK_URL}/?path=/docs/${category.toLowerCase()}-${component.name.toLowerCase()}--docs`, "_blank")}
                    >
                      <span className="component-tag__name">{component.name}</span>
                    </button>
                  ))}
                  {categoryComponents.length > 6 && (
                    <button
                      className="component-tag component-tag--more"
                      onClick={() => window.open(`${STORYBOOK_URL}/?path=/docs/${category.toLowerCase()}`, "_blank")}
                    >
                      +{categoryComponents.length - 6} more
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="landing__components-cta">
          <Button variant="outline" onClick={() => setSpotlightOpen(true)}>
            Browse All Components
          </Button>
        </div>
      </section>

      {/* Contribute Section */}
      <section className="landing__contribute">
        <header className="section-header">
          <h2>Join the Community</h2>
          <p>React Cupertino UI is open source. Help us build the future of iOS-inspired React components.</p>
        </header>
        <div className="contribute-cards">
          <a href={`${GITHUB_URL}/issues`} className="contribute-card" target="_blank" rel="noopener noreferrer">
            <h3>Report Issues</h3>
            <p>Found a bug? Let us know and help improve the library.</p>
          </a>
          <a href={`${GITHUB_URL}/pulls`} className="contribute-card" target="_blank" rel="noopener noreferrer">
            <h3>Submit PRs</h3>
            <p>Contribute new components, fix bugs, or improve documentation.</p>
          </a>
          <a href={`${GITHUB_URL}/discussions`} className="contribute-card" target="_blank" rel="noopener noreferrer">
            <h3>Discuss Ideas</h3>
            <p>Share your ideas and help shape the roadmap.</p>
          </a>
        </div>
      </section>

      {/* CTA Section */}
      <section className="landing__final-cta">
        <div className="glass-card glass-card--cta">
          <h2>Start Building Today</h2>
          <p>
            Install React Cupertino UI and ship stunning interfaces in minutes.
            Free, open source, and built for developers who care about quality.
          </p>
          <div className="install-command">
            <code>npm install react-cupertino-ui</code>
          </div>
          <div className="landing__cta">
            <Button size="lg" onClick={() => window.open(STORYBOOK_URL, "_blank")}>
              View Documentation
            </Button>
            <Button variant="ghost" size="lg" onClick={() => window.open(GITHUB_URL, "_blank")}>
              GitHub Repository
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing__footer">
        <p>
          Built with care by the React Cupertino UI community.
          <br />
          Inspired by Apple's design language. Not affiliated with Apple Inc.
        </p>
        <div className="footer-links">
          <a href={STORYBOOK_URL}>Documentation</a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={`${GITHUB_URL}/blob/main/LICENSE`} target="_blank" rel="noopener noreferrer">MIT License</a>
        </div>
        <div className="footer-author">
          <p>
            Created by <a href="https://lemon.dev.br/en" target="_blank" rel="noopener noreferrer">Anderson Lima</a>
          </p>
        </div>
      </footer>

      {/* Spotlight Search */}
      <SpotlightSearch
        open={spotlightOpen}
        onOpenChange={setSpotlightOpen}
        value={spotlightQuery}
        onValueChange={setSpotlightQuery}
        results={spotlightResults}
        placeholder="Search components, templates..."
        emptyMessage="No components found. Try a different search term."
      />
    </main>
  );
};

export default HomePage;
