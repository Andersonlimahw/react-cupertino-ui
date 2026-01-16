import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { QuickAction } from "@components/molecules/QuickAction";

describe("QuickAction", () => {
  it("renders title and metadata", () => {
    render(<QuickAction title="Compose" subtitle="Start a new note" metric="Instant" />);

    expect(screen.getByText("Compose")).toBeInTheDocument();
    expect(screen.getByText("Start a new note")).toBeInTheDocument();
    expect(screen.getByText("Instant")).toBeInTheDocument();
  });

  it("calls onSelect when pressed", () => {
    const handleSelect = vi.fn();
    render(<QuickAction title="Share" onSelect={handleSelect} />);

    fireEvent.click(screen.getByRole("button"));
    expect(handleSelect).toHaveBeenCalled();
  });
});
