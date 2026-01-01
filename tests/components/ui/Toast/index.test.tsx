import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import Toast from "@components/ui/Toast";

describe("Toast", () => {
  it("renders title and description", () => {
    render(<Toast title="Update" description="Saved successfully" />);

    expect(screen.getByText("Update")).toBeInTheDocument();
    expect(screen.getByText("Saved successfully")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const handleClose = vi.fn();
    render(<Toast title="Notice" onClose={handleClose} />);

    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(handleClose).toHaveBeenCalled();
  });
});
