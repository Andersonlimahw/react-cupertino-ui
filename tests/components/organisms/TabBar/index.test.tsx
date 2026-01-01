import { render, screen, fireEvent } from "@testing-library/react";
import { TabBar } from "@/components/organisms/TabBar";
import { describe, it, expect, vi } from "vitest";

const items = [
  { id: "tab1", icon: <span data-testid="icon-1">Icon1</span>, label: "Tab 1" },
  { id: "tab2", icon: <span data-testid="icon-2">Icon2</span>, label: "Tab 2", badge: "5" },
];

describe("TabBar", () => {
  it("renders all items", () => {
    render(<TabBar items={items} activeId="tab1" onChange={() => {}} />);
    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
  });

  it("highlights active item", () => {
    render(<TabBar items={items} activeId="tab1" onChange={() => {}} />);
    const tab1 = screen.getByText("Tab 1").closest("button");
    const tab2 = screen.getByText("Tab 2").closest("button");
    
    expect(tab1).toHaveClass("is-active");
    expect(tab2).not.toHaveClass("is-active");
  });

  it("calls onChange when clicked", () => {
    const handleChange = vi.fn();
    render(<TabBar items={items} activeId="tab1" onChange={handleChange} />);
    
    fireEvent.click(screen.getByText("Tab 2"));
    expect(handleChange).toHaveBeenCalledWith("tab2");
  });

  it("renders badge correctly", () => {
    render(<TabBar items={items} activeId="tab1" onChange={() => {}} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
