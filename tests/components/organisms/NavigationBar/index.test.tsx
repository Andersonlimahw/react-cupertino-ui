import { render, screen } from "@testing-library/react";
import { NavigationBar } from "@components/organisms/NavigationBar";
import { describe, it, expect } from "vitest";

describe("NavigationBar", () => {
  it("renders the title", () => {
    render(<NavigationBar title="Test Title" />);
    expect(screen.getAllByText("Test Title")[0]).toBeInTheDocument();
  });

  it("renders the subtitle when provided", () => {
    render(<NavigationBar title="Title" subtitle="Subtitle" />);
    expect(screen.getByText("Subtitle")).toBeInTheDocument();
  });

  it("renders large title when prop is true", () => {
    render(<NavigationBar title="Large Title" large />);
    // Large title renders two titles in DOM (one for compact, one for large)
    // The implementation hides one or the other based on CSS/Scroll
    const titles = screen.getAllByText("Large Title");
    expect(titles).toHaveLength(2);
  });

  it("renders back button when withBackButton is true", () => {
    render(<NavigationBar title="Page" withBackButton backLabel="Go Back" />);
    expect(screen.getByText("Go Back")).toBeInTheDocument();
  });
});
