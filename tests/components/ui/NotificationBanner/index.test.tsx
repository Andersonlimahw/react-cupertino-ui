import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { NotificationBanner } from "@components/ui/NotificationBanner";

describe("NotificationBanner", () => {
  it("renders title and message", () => {
    render(<NotificationBanner title="Update" message="All good" />);
    expect(screen.getByText("Update")).toBeInTheDocument();
    expect(screen.getByText("All good")).toBeInTheDocument();
  });

  it("invokes dismiss callback", () => {
    const handleDismiss = vi.fn();
    render(<NotificationBanner title="Dismiss" onDismiss={handleDismiss} />);

    fireEvent.click(screen.getByRole("button", { name: /dismiss/i }));
    expect(handleDismiss).toHaveBeenCalled();
  });
});
