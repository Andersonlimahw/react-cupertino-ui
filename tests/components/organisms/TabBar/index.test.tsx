import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";

import { TabBar } from "@components/organisms/TabBar";

const items = [
  { id: "tab1", icon: <span data-testid="icon-1">Icon1</span>, label: "Tab 1" },
  { id: "tab2", icon: <span data-testid="icon-2">Icon2</span>, label: "Tab 2", badge: "5" },
  { id: "tab3", icon: <span>Icon3</span>, label: "Tab 3", disabled: true },
];

describe("TabBar", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders all items and highlights the active tab", () => {
    render(<TabBar items={items} activeId="tab1" onChange={() => {}} />);

    const tab1 = screen.getByRole("tab", { name: "Tab 1" });
    const tab2 = screen.getByRole("tab", { name: "Tab 2" });

    expect(tab1).toHaveAttribute("data-active", "true");
    expect(tab2).not.toHaveAttribute("data-active");
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("calls onChange when another tab is clicked", () => {
    const handleChange = vi.fn();
    render(<TabBar items={items} activeId="tab1" onChange={handleChange} />);

    fireEvent.click(screen.getByRole("tab", { name: "Tab 2" }));
    expect(handleChange).toHaveBeenCalledWith("tab2");
  });

  it("supports keyboard navigation", () => {
    const handleChange = vi.fn();
    render(<TabBar items={items} activeId="tab1" onChange={handleChange} />);

    fireEvent.keyDown(screen.getByRole("tablist"), { key: "ArrowRight" });
    expect(handleChange).toHaveBeenCalledWith("tab2");
  });
});
