import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Alert } from "@components/molecules/Alert";

describe("Alert", () => {
  it("renders title and description", () => {
    render(<Alert title="Liquid Glass" description="Enabled" />);

    expect(screen.getByText("Liquid Glass")).toBeInTheDocument();
    expect(screen.getByText("Enabled")).toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    render(
      <Alert
        title="Update available"
        actions={[
          { label: "Later" },
          { label: "Install", variant: "solid" },
        ]}
      />
    );

    expect(screen.getByRole("button", { name: "Later" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Install" })).toBeInTheDocument();
  });

  it("hides and calls onDismiss when dismissible", () => {
    const handleDismiss = vi.fn();
    render(
      <Alert title="Warning" dismissible onDismiss={handleDismiss} />
    );

    const dismissButton = screen.getByRole("button", { name: /dismiss alert/i });
    fireEvent.click(dismissButton);

    expect(handleDismiss).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("Warning")).not.toBeInTheDocument();
  });

  it("allows overriding the icon", () => {
    render(
      <Alert
        title="Custom icon"
        icon={<span data-testid="custom-icon">✨</span>}
      />
    );

    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("sets appropriate aria-live based on tone", () => {
    const { rerender } = render(<Alert title="Heads up" tone="info" />);

    expect(screen.getByRole("alert")).toHaveAttribute("aria-live", "polite");

    rerender(<Alert title="Danger" tone="warning" />);
    expect(screen.getByRole("alert")).toHaveAttribute("aria-live", "assertive");
  });
});
