import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Timeline } from "@components/ui/Timeline";

const items = [
  {
    id: "1",
    title: "Kickoff",
    status: "complete" as const,
  },
  {
    id: "2",
    title: "Implementation",
    status: "current" as const,
  },
];

describe("Timeline", () => {
  it("renders items with titles", () => {
    render(<Timeline items={items} />);
    expect(screen.getByText("Kickoff")).toBeInTheDocument();
    expect(screen.getByText("Implementation")).toBeInTheDocument();
  });

  it("calls onItemSelect when interactive", () => {
    const handleSelect = vi.fn();
    render(<Timeline items={items} interactive onItemSelect={handleSelect} />);

    fireEvent.click(screen.getByRole("button", { name: /Kickoff/i }));
    expect(handleSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "1" }));
  });
});
