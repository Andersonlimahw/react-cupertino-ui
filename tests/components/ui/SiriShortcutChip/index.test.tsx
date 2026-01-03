import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SiriShortcutChip } from "@components/ui/SiriShortcutChip";

describe("SiriShortcutChip", () => {
  it("renders label", () => {
    render(<SiriShortcutChip label="Shortcut" />);
    expect(screen.getByText("Shortcut")).toBeInTheDocument();
  });

  it("handles click", () => {
    const handleClick = vi.fn();
    render(<SiriShortcutChip label="Shortcut" onClick={handleClick} />);
    fireEvent.click(screen.getByText("Shortcut"));
    expect(handleClick).toHaveBeenCalled();
  });
});
