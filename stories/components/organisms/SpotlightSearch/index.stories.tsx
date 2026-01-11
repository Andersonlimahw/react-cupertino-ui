import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { FileText, Settings, User, Music, Image, Mail, Calendar } from "lucide-react";

import { SpotlightSearch } from "@components/organisms/SpotlightSearch";
import { Button } from "@components/molecules/Button";

const meta: Meta<typeof SpotlightSearch> = {
  title: "Organisms/SpotlightSearch",
  component: SpotlightSearch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A Spotlight-style search component with overlay, keyboard navigation, recent searches, and grouped results. Inspired by iOS Spotlight search experience.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SpotlightSearch>;

const mockResults = [
  {
    title: "Applications",
    items: [
      {
        id: "1",
        title: "Settings",
        subtitle: "System Preferences",
        icon: <Settings size={18} />,
        category: "App",
        onSelect: () => console.log("Settings selected"),
      },
      {
        id: "2",
        title: "Music",
        subtitle: "Apple Music",
        icon: <Music size={18} />,
        category: "App",
        onSelect: () => console.log("Music selected"),
      },
    ],
  },
  {
    title: "Documents",
    items: [
      {
        id: "3",
        title: "Project Proposal.pdf",
        subtitle: "Documents > Work",
        icon: <FileText size={18} />,
        onSelect: () => console.log("Document selected"),
      },
      {
        id: "4",
        title: "Meeting Notes.docx",
        subtitle: "Documents > Notes",
        icon: <FileText size={18} />,
        onSelect: () => console.log("Notes selected"),
      },
    ],
  },
  {
    title: "Contacts",
    items: [
      {
        id: "5",
        title: "John Appleseed",
        subtitle: "john@example.com",
        icon: <User size={18} />,
        onSelect: () => console.log("Contact selected"),
      },
    ],
  },
];

const SpotlightDemo = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [recentSearches, setRecentSearches] = React.useState([
    "Project files",
    "Settings",
    "Recent photos",
  ]);

  const filteredResults = React.useMemo(() => {
    if (!value) return [];
    const q = value.toLowerCase();
    return mockResults
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.title.toLowerCase().includes(q) ||
            item.subtitle?.toLowerCase().includes(q)
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [value]);

  const handleSelectRecent = (search: string) => {
    setValue(search);
  };

  const handleClearRecent = () => {
    setRecentSearches([]);
  };

  const handleSearch = (query: string) => {
    console.log("Search submitted:", query);
    if (!recentSearches.includes(query)) {
      setRecentSearches((prev) => [query, ...prev].slice(0, 5));
    }
  };

  return (
    <div style={{ minHeight: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Button onClick={() => setOpen(true)}>
        Open Spotlight (⌘ + Space)
      </Button>
      <SpotlightSearch
        open={open}
        onOpenChange={setOpen}
        value={value}
        onValueChange={setValue}
        onSearch={handleSearch}
        results={filteredResults}
        recentSearches={recentSearches}
        onSelectRecent={handleSelectRecent}
        onClearRecent={handleClearRecent}
        placeholder="Search apps, documents, contacts..."
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <SpotlightDemo />,
};

const SpotlightWithLoading = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState<typeof mockResults>([]);

  React.useEffect(() => {
    if (value.length > 0) {
      setLoading(true);
      const timer = setTimeout(() => {
        const q = value.toLowerCase();
        const filtered = mockResults
          .map((group) => ({
            ...group,
            items: group.items.filter((item) =>
              item.title.toLowerCase().includes(q)
            ),
          }))
          .filter((group) => group.items.length > 0);
        setResults(filtered);
        setLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [value]);

  return (
    <div style={{ minHeight: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Button onClick={() => setOpen(true)}>
        Open Spotlight with Loading
      </Button>
      <SpotlightSearch
        open={open}
        onOpenChange={setOpen}
        value={value}
        onValueChange={setValue}
        results={results}
        loading={loading}
        placeholder="Type to search..."
      />
    </div>
  );
};

export const WithLoading: Story = {
  render: () => <SpotlightWithLoading />,
};

const SpotlightNoGlass = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <div style={{ minHeight: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Button onClick={() => setOpen(true)}>
        Open Spotlight (No Glass)
      </Button>
      <SpotlightSearch
        open={open}
        onOpenChange={setOpen}
        value={value}
        onValueChange={setValue}
        results={mockResults}
        glass={false}
        placeholder="Search..."
      />
    </div>
  );
};

export const WithoutGlass: Story = {
  render: () => <SpotlightNoGlass />,
};

const SpotlightEmpty = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <div style={{ minHeight: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Button onClick={() => setOpen(true)}>
        Open Spotlight (Empty State)
      </Button>
      <SpotlightSearch
        open={open}
        onOpenChange={setOpen}
        value={value}
        onValueChange={setValue}
        results={[]}
        emptyMessage="No matches found for your search"
        placeholder="Search..."
      />
    </div>
  );
};

export const EmptyState: Story = {
  render: () => <SpotlightEmpty />,
};

const categorizedResults = [
  {
    title: "Top Hits",
    items: [
      { id: "1", title: "Photos App", icon: <Image size={18} />, category: "App", onSelect: () => {} },
      { id: "2", title: "Mail App", icon: <Mail size={18} />, category: "App", onSelect: () => {} },
    ],
  },
  {
    title: "Events",
    items: [
      { id: "3", title: "Team Meeting", subtitle: "Tomorrow at 10:00 AM", icon: <Calendar size={18} />, onSelect: () => {} },
      { id: "4", title: "Project Review", subtitle: "Friday at 2:00 PM", icon: <Calendar size={18} />, onSelect: () => {} },
    ],
  },
  {
    title: "Messages",
    items: [
      { id: "5", title: "Hey, how's it going?", subtitle: "From: Sarah", icon: <Mail size={18} />, onSelect: () => {} },
    ],
  },
];

const SpotlightWithCategories = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const filteredResults = React.useMemo(() => {
    if (!value) return categorizedResults;
    const q = value.toLowerCase();
    return categorizedResults
      .map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          item.title.toLowerCase().includes(q)
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [value]);

  return (
    <div style={{ minHeight: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Button onClick={() => setOpen(true)}>
        Open Spotlight with Categories
      </Button>
      <SpotlightSearch
        open={open}
        onOpenChange={setOpen}
        value={value}
        onValueChange={setValue}
        results={filteredResults}
        placeholder="Search everything..."
      />
    </div>
  );
};

export const WithCategories: Story = {
  render: () => <SpotlightWithCategories />,
};
