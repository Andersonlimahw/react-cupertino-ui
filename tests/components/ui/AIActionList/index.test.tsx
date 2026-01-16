import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AIActionList } from "@components/ui/AIActionList";

describe("AIActionList", () => {
  it("renders actions", () => {
    render(<AIActionList items={[{ id: "1", label: "Action" }]} />);
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("handles click", () => {
    const onSelect = vi.fn();
    render(<AIActionList items={[{ id: "1", label: "Action" }]} onSelect={onSelect} />);
    fireEvent.click(screen.getByText("Action"));
    expect(onSelect).toHaveBeenCalled();
  });
});
