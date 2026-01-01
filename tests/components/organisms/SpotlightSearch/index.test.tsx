import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SpotlightSearch } from "@components/organisms/SpotlightSearch";

const mockResults = [
  {
    title: "Apps",
    items: [
      { id: "1", title: "Settings", onSelect: vi.fn() },
      { id: "2", title: "Music", onSelect: vi.fn() },
    ],
  },
];

describe("SpotlightSearch", () => {
  it("renders when open", () => {
    render(
      <SpotlightSearch
        open={true}
        onOpenChange={() => {}}
        value=""
        onValueChange={() => {}}
      />
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <SpotlightSearch
        open={false}
        onOpenChange={() => {}}
        value=""
        onValueChange={() => {}}
      />
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onValueChange when typing", () => {
    const handleValueChange = vi.fn();
    render(
      <SpotlightSearch
        open={true}
        onOpenChange={() => {}}
        value=""
        onValueChange={handleValueChange}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Search"), {
      target: { value: "test" },
    });

    expect(handleValueChange).toHaveBeenCalledWith("test");
  });

  it("displays results when provided", () => {
    render(
      <SpotlightSearch
        open={true}
        onOpenChange={() => {}}
        value="set"
        onValueChange={() => {}}
        results={mockResults}
      />
    );

    expect(screen.getByText("Apps")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Music")).toBeInTheDocument();
  });

  it("displays recent searches when value is empty", () => {
    const recentSearches = ["Photos", "Documents", "Mail"];
    render(
      <SpotlightSearch
        open={true}
        onOpenChange={() => {}}
        value=""
        onValueChange={() => {}}
        recentSearches={recentSearches}
      />
    );

    expect(screen.getByText("Recent Searches")).toBeInTheDocument();
    expect(screen.getByText("Photos")).toBeInTheDocument();
    expect(screen.getByText("Documents")).toBeInTheDocument();
    expect(screen.getByText("Mail")).toBeInTheDocument();
  });

  it("calls onSelectRecent when clicking a recent search", () => {
    const handleSelectRecent = vi.fn();
    render(
      <SpotlightSearch
        open={true}
        onOpenChange={() => {}}
        value=""
        onValueChange={() => {}}
        recentSearches={["Photos"]}
        onSelectRecent={handleSelectRecent}
      />
    );

    fireEvent.click(screen.getByText("Photos"));
    expect(handleSelectRecent).toHaveBeenCalledWith("Photos");
  });

  it("calls onClearRecent when clicking clear", () => {
    const handleClearRecent = vi.fn();
    render(
      <SpotlightSearch
        open={true}
        onOpenChange={() => {}}
        value=""
        onValueChange={() => {}}
        recentSearches={["Photos"]}
        onClearRecent={handleClearRecent}
      />
    );

    fireEvent.click(screen.getByText("Clear"));
    expect(handleClearRecent).toHaveBeenCalled();
  });

  it("displays empty message when no results", () => {
    render(
      <SpotlightSearch
        open={true}
        onOpenChange={() => {}}
        value="xyz"
        onValueChange={() => {}}
        results={[]}
        emptyMessage="Nothing found"
      />
    );

    expect(screen.getByText("Nothing found")).toBeInTheDocument();
  });

  it("displays loading spinner", () => {
    render(
      <SpotlightSearch
        open={true}
        onOpenChange={() => {}}
        value="test"
        onValueChange={() => {}}
        loading={true}
      />
    );

    expect(screen.getByLabelText("Loading")).toBeInTheDocument();
  });

  it("clears input when clicking clear button", () => {
    const handleValueChange = vi.fn();
    render(
      <SpotlightSearch
        open={true}
        onOpenChange={() => {}}
        value="test"
        onValueChange={handleValueChange}
      />
    );

    fireEvent.click(screen.getByLabelText("Clear search"));
    expect(handleValueChange).toHaveBeenCalledWith("");
  });

  it("closes on escape key", () => {
    const handleOpenChange = vi.fn();
    render(
      <SpotlightSearch
        open={true}
        onOpenChange={handleOpenChange}
        value=""
        onValueChange={() => {}}
      />
    );

    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it("shows keyboard hints in footer", () => {
    render(
      <SpotlightSearch
        open={true}
        onOpenChange={() => {}}
        value=""
        onValueChange={() => {}}
      />
    );

    expect(screen.getByText("to navigate")).toBeInTheDocument();
    expect(screen.getByText("to select")).toBeInTheDocument();
    expect(screen.getByText("to close")).toBeInTheDocument();
  });

  it("applies glass class when glass prop is true", () => {
    render(
      <SpotlightSearch
        open={true}
        onOpenChange={() => {}}
        value=""
        onValueChange={() => {}}
        glass={true}
      />
    );

    expect(screen.getByRole("dialog")).toHaveClass("glass");
  });

  it("supports custom placeholder", () => {
    render(
      <SpotlightSearch
        open={true}
        onOpenChange={() => {}}
        value=""
        onValueChange={() => {}}
        placeholder="Search everything..."
      />
    );

    expect(screen.getByPlaceholderText("Search everything...")).toBeInTheDocument();
  });
});
