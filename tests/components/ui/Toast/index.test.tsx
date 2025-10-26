import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Toast } from "@/components/ui/Toast";

describe("Toast Component", () => {
  it("renders with title", () => {
    render(<Toast title="Test notification" />);
    expect(screen.getByText("Test notification")).toBeInTheDocument();
  });

  it("renders with description", () => {
    render(<Toast title="Title" description="Description text" />);
    expect(screen.getByText("Description text")).toBeInTheDocument();
  });

  it("applies correct variant class", () => {
    const { container } = render(<Toast title="Test" variant="success" />);
    const toast = container.querySelector(".react-cupertino-ui-toast");
    expect(toast).toHaveClass("variant-success");
  });

  it("renders close button when onClose is provided", () => {
    const handleClose = jest.fn();
    render(<Toast title="Test" onClose={handleClose} />);

    const closeButton = screen.getByLabelText("Close notification");
    expect(closeButton).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const handleClose = jest.fn();
    render(<Toast title="Test" onClose={handleClose} />);

    const closeButton = screen.getByLabelText("Close notification");
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(handleClose).toHaveBeenCalled();
    }, { timeout: 500 });
  });

  it("auto-dismisses after duration", async () => {
    jest.useFakeTimers();
    const handleClose = jest.fn();

    render(<Toast title="Test" duration={1000} onClose={handleClose} />);

    expect(screen.getByText("Test")).toBeInTheDocument();

    jest.advanceTimersByTime(1300); // duration + animation time

    await waitFor(() => {
      expect(handleClose).toHaveBeenCalled();
    });

    jest.useRealTimers();
  });

  it("displays variant-specific icon", () => {
    const { container } = render(<Toast title="Test" variant="success" />);
    const icon = container.querySelector(".react-cupertino-ui-toast-icon");
    expect(icon).toBeInTheDocument();
  });

  it("renders custom icon when provided", () => {
    const CustomIcon = () => <div data-testid="custom-icon">Custom</div>;
    render(<Toast title="Test" icon={<CustomIcon />} />);

    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("does not render close button when onClose is not provided", () => {
    render(<Toast title="Test" />);
    const closeButton = screen.queryByLabelText("Close notification");
    expect(closeButton).not.toBeInTheDocument();
  });

  it("applies correct position class", () => {
    const { container } = render(<Toast title="Test" position="top-left" />);
    const toast = container.querySelector(".react-cupertino-ui-toast");
    expect(toast).toHaveClass("position-top-left");
  });
});
