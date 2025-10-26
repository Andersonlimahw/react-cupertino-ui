import { render, screen } from "@testing-library/react";
import { Select } from "@/components/ui/Select";

const mockOptions = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

describe("Select Component", () => {
  it("renders correctly with options", () => {
    const { container } = render(
      <Select options={mockOptions} placeholder="Select..." />
    );
    const select = container.querySelector("select");
    expect(select).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(
      <Select label="Choose option" options={mockOptions} placeholder="Select..." />
    );
    const label = screen.getByText(/Choose option/i);
    expect(label).toBeInTheDocument();
  });

  it("displays placeholder", () => {
    render(<Select options={mockOptions} placeholder="Select an option" />);
    const placeholder = screen.getByText(/Select an option/i);
    expect(placeholder).toBeInTheDocument();
  });

  it("displays all options", () => {
    render(<Select options={mockOptions} />);
    const option1 = screen.getByText(/Option 1/i);
    const option2 = screen.getByText(/Option 2/i);
    const option3 = screen.getByText(/Option 3/i);
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
    expect(option3).toBeInTheDocument();
  });

  it("displays error message", () => {
    render(
      <Select
        options={mockOptions}
        error="This field is required"
      />
    );
    const error = screen.getByText(/This field is required/i);
    expect(error).toBeInTheDocument();
    expect(error).toHaveClass("react-cupertino-ui-select-error");
  });

  it("displays helper text", () => {
    render(
      <Select
        options={mockOptions}
        helperText="Choose wisely"
      />
    );
    const helper = screen.getByText(/Choose wisely/i);
    expect(helper).toBeInTheDocument();
  });

  it("applies correct size class", () => {
    const { container } = render(
      <Select options={mockOptions} size="lg" />
    );
    const selectContainer = container.querySelector(".react-cupertino-ui-select-container");
    expect(selectContainer).toHaveClass("size-lg");
  });

  it("applies correct variant class", () => {
    const { container } = render(
      <Select options={mockOptions} variant="outline" />
    );
    const selectContainer = container.querySelector(".react-cupertino-ui-select-container");
    expect(selectContainer).toHaveClass("variant-outline");
  });

  it("handles disabled state", () => {
    const { container } = render(
      <Select options={mockOptions} disabled />
    );
    const select = container.querySelector("select");
    expect(select).toBeDisabled();
  });
});
