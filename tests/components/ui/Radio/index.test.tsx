import { fireEvent, render, screen } from "@testing-library/react";

import { Radio } from "@/components/ui/Radio";

describe("Radio", () => {
  it("renders label and helper", () => {
    render(<Radio label="Primary" helperText="This is the default" />);
    expect(screen.getByText("Primary")).toBeInTheDocument();
    expect(screen.getByText("This is the default")).toBeInTheDocument();
  });

  it("shows error message when provided", () => {
    render(<Radio label="Primary" error="Select one option" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Select one option");
  });

  it("checks when clicked", () => {
    render(<Radio name="group" label="Option" />);
    const control = screen.getByRole("radio");

    expect(control).not.toBeChecked();
    fireEvent.click(control);
    expect(control).toBeChecked();
  });
});
