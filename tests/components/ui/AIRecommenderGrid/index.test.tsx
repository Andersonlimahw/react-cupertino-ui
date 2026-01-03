import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AIRecommenderGrid } from "@components/ui/AIRecommenderGrid";

describe("AIRecommenderGrid", () => {
  it("renders tiles", () => {
    render(<AIRecommenderGrid tiles={[{ id: "1", title: "Test" }]} />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("handles select", () => {
    const onSelect = vi.fn();
    render(<AIRecommenderGrid tiles={[{ id: "1", title: "Test" }]} onSelect={onSelect} />);
    fireEvent.click(screen.getByText("Test"));
    expect(onSelect).toHaveBeenCalled();
  });
});
