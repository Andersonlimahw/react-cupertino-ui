import { fireEvent, render, screen } from "@testing-library/react";

import { Checkbox } from "@components/ui/Checkbox";

describe("Checkbox", () => {
  it("renders label and helper text", () => {
    render(<Checkbox label="Updates" helperText="Send me new features" />);

    expect(screen.getByText("Updates")).toBeInTheDocument();
    expect(screen.getByText("Send me new features")).toBeInTheDocument();
  });

  it("shows error message when provided", () => {
    render(<Checkbox label="Terms" error="You must accept" />);

    expect(screen.getByRole("alert")).toHaveTextContent("You must accept");
  });

  it("toggles checked state on click", () => {
    render(<Checkbox label="Notifications" />);
    const input = screen.getByRole("checkbox");

    expect(input).not.toBeChecked();
    fireEvent.click(input);
    expect(input).toBeChecked();
  });
});
