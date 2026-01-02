import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Breadcrumb } from "@components/ui/Breadcrumb";

const sampleItems = [
  { id: "home", label: "Home", href: "#" },
  { id: "library", label: "Library", href: "#" },
  { id: "photos", label: "Photos" },
];

describe("Breadcrumb", () => {
  it("renders all items when under maxVisible", () => {
    render(<Breadcrumb items={sampleItems} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Photos")).toHaveAttribute("aria-current", "page");
  });

  it("collapses when exceeding maxVisible", () => {
    const items = [...sampleItems, { id: "album", label: "Album" }, { id: "details", label: "Details" }];
    const handleOverflow = vi.fn();
    render(<Breadcrumb items={items} maxVisible={3} onOverflowClick={handleOverflow} />);

    fireEvent.click(screen.getByRole("button", { name: /show breadcrumb/i }));
    expect(handleOverflow).toHaveBeenCalled();
  });
});
