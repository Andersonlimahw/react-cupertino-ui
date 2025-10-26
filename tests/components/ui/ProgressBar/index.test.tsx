import { render, screen } from "@testing-library/react";
import { ProgressBar } from "@/components/ui/ProgressBar";

describe("ProgressBar Component", () => {
  it("renders correctly", () => {
    const { container } = render(<ProgressBar value={50} />);
    const progressBar = container.querySelector(".react-cupertino-ui-progressbar");
    expect(progressBar).toBeInTheDocument();
  });

  it("displays correct width based on value", () => {
    const { container } = render(<ProgressBar value={75} />);
    const fill = container.querySelector(".react-cupertino-ui-progressbar-fill");
    expect(fill).toHaveStyle({ width: "75%" });
  });

  it("renders label when provided", () => {
    render(<ProgressBar value={50} label="Progress" />);
    expect(screen.getByText("Progress")).toBeInTheDocument();
  });

  it("shows percentage when showValue is true", () => {
    render(<ProgressBar value={60} showValue />);
    expect(screen.getByText("60%")).toBeInTheDocument();
  });

  it("applies correct size class", () => {
    const { container } = render(<ProgressBar value={50} size="lg" />);
    const progressBar = container.querySelector(".react-cupertino-ui-progressbar");
    expect(progressBar).toHaveClass("size-lg");
  });

  it("applies correct variant class", () => {
    const { container } = render(<ProgressBar value={50} variant="success" />);
    const progressBar = container.querySelector(".react-cupertino-ui-progressbar");
    expect(progressBar).toHaveClass("variant-success");
  });

  it("handles value of 0", () => {
    const { container } = render(<ProgressBar value={0} />);
    const fill = container.querySelector(".react-cupertino-ui-progressbar-fill");
    expect(fill).toHaveStyle({ width: "0%" });
  });

  it("handles value of 100", () => {
    const { container } = render(<ProgressBar value={100} />);
    const fill = container.querySelector(".react-cupertino-ui-progressbar-fill");
    expect(fill).toHaveStyle({ width: "100%" });
  });

  it("clamps value above max to 100%", () => {
    const { container } = render(<ProgressBar value={150} max={100} />);
    const fill = container.querySelector(".react-cupertino-ui-progressbar-fill");
    expect(fill).toHaveStyle({ width: "100%" });
  });

  it("clamps negative value to 0%", () => {
    const { container } = render(<ProgressBar value={-10} />);
    const fill = container.querySelector(".react-cupertino-ui-progressbar-fill");
    expect(fill).toHaveStyle({ width: "0%" });
  });

  it("calculates percentage with custom max", () => {
    const { container } = render(<ProgressBar value={50} max={200} />);
    const fill = container.querySelector(".react-cupertino-ui-progressbar-fill");
    expect(fill).toHaveStyle({ width: "25%" });
  });

  it("applies animated class when animated is true", () => {
    const { container } = render(<ProgressBar value={50} animated />);
    const fill = container.querySelector(".react-cupertino-ui-progressbar-fill");
    expect(fill).toHaveClass("animated");
  });

  it("sets correct ARIA attributes", () => {
    const { container } = render(<ProgressBar value={60} max={100} />);
    const progressBar = container.querySelector(".react-cupertino-ui-progressbar");

    expect(progressBar).toHaveAttribute("role", "progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "60");
    expect(progressBar).toHaveAttribute("aria-valuemin", "0");
    expect(progressBar).toHaveAttribute("aria-valuemax", "100");
  });
});
