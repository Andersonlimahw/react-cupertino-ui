import { render, screen } from "@testing-library/react";
import { Checkbox } from "@/components/ui/Checkbox";

describe("Checkbox Component", () => {
  it("renders correctly with label", () => {
    render(<Checkbox label="Accept terms" />);
    const label = screen.getByText(/Accept terms/i);
    expect(label).toBeInTheDocument();
  });

  it("renders without label", () => {
    const { container } = render(<Checkbox />);
    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeInTheDocument();
  });

  it("can be checked", () => {
    render(<Checkbox label="Test" defaultChecked />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("displays error message", () => {
    render(<Checkbox label="Test" error="This is required" />);
    const error = screen.getByText(/This is required/i);
    expect(error).toBeInTheDocument();
    expect(error).toHaveClass("react-cupertino-ui-checkbox-error");
  });

  it("applies correct size class", () => {
    const { container } = render(<Checkbox label="Test" size="lg" />);
    const checkbox = container.querySelector(".react-cupertino-ui-checkbox");
    expect(checkbox).toHaveClass("size-lg");
  });

  it("applies correct variant class", () => {
    const { container } = render(<Checkbox label="Test" variant="ios" />);
    const checkbox = container.querySelector(".react-cupertino-ui-checkbox");
    expect(checkbox).toHaveClass("variant-ios");
  });

  it("handles disabled state", () => {
    render(<Checkbox label="Test" disabled />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
  });
});
