import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { MiniNotification } from "@components/ui/MiniNotification";

describe("MiniNotification", () => {
  it("renders title", () => {
    render(<MiniNotification title="Test" />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("handles dismiss", () => {
    const onDismiss = vi.fn();
    render(<MiniNotification title="Test" onDismiss={onDismiss} />);
    fireEvent.click(screen.getByRole("button", { name: /dismiss/i }));
    expect(onDismiss).toHaveBeenCalled();
  });
});
