import { render, screen } from "@testing-library/react";
import { Radio } from "@/components/ui/Radio";

describe("Radio Component", () => {
  it("renders correctly with label", () => {
    render(<Radio label="Option 1" />);
    const label = screen.getByText(/Option 1/i);
    expect(label).toBeInTheDocument();
  });

  it("renders without label", () => {
    const { container } = render(<Radio />);
    const radio = container.querySelector('input[type="radio"]');
    expect(radio).toBeInTheDocument();
  });

  it("can be checked", () => {
    render(<Radio label="Test" defaultChecked />);
    const radio = screen.getByRole("radio");
    expect(radio).toBeChecked();
  });

  it("displays error message", () => {
    render(<Radio label="Test" error="This is required" />);
    const error = screen.getByText(/This is required/i);
    expect(error).toBeInTheDocument();
    expect(error).toHaveClass("react-cupertino-ui-radio-error");
  });

  it("applies correct size class", () => {
    const { container } = render(<Radio label="Test" size="lg" />);
    const radio = container.querySelector(".react-cupertino-ui-radio");
    expect(radio).toHaveClass("size-lg");
  });

  it("handles disabled state", () => {
    render(<Radio label="Test" disabled />);
    const radio = screen.getByRole("radio");
    expect(radio).toBeDisabled();
  });

  it("groups radios with same name", () => {
    const { container } = render(
      <>
        <Radio label="Option 1" name="group1" value="1" />
        <Radio label="Option 2" name="group1" value="2" />
      </>
    );
    const radios = container.querySelectorAll('input[name="group1"]');
    expect(radios).toHaveLength(2);
  });
});
