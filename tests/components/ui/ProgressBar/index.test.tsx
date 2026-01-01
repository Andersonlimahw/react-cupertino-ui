import { render, screen } from "@testing-library/react";

import ProgressBar from "@components/ui/ProgressBar";

describe("ProgressBar", () => {
  it("shows label and helper text", () => {
    render(<ProgressBar value={40} label="Download" helperText="Processing" />);

    expect(screen.getByText("Download")).toBeInTheDocument();
    expect(screen.getByText("Processing")).toBeInTheDocument();
  });

  it("renders the percentage when showValue is true", () => {
    render(<ProgressBar value={50} showValue />);
    expect(screen.getByText("50%"));
  });

  it("sets the aria attributes correctly", () => {
    render(<ProgressBar value={30} max={80} />);
    const track = screen.getByRole("progressbar");

    expect(track).toHaveAttribute("aria-valuenow", "30");
    expect(track).toHaveAttribute("aria-valuemax", "80");
  });
});
