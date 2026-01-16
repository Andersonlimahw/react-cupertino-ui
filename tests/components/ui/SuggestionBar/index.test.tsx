import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SuggestionBar } from "@components/ui/SuggestionBar";

describe("SuggestionBar", () => {
  it("renders buttons", () => {
    render(<SuggestionBar suggestions={["Play", "Pause"]} />);
    expect(screen.getByText("Play")).toBeInTheDocument();
  });

  it("handles selection", () => {
    const onSelect = vi.fn();
    render(<SuggestionBar suggestions={["Play"]} onSelect={onSelect} />);
    fireEvent.click(screen.getByText("Play"));
    expect(onSelect).toHaveBeenCalledWith("Play");
  });
});
