import { fireEvent, render, screen } from "@testing-library/react";

import { Slider } from "@components/ui/Slider";

describe("Slider", () => {
  it("renders label and helper text", () => {
    render(<Slider label="Brightness" helperText="Adjust intensity" />);

    expect(screen.getByText("Brightness")).toBeInTheDocument();
    expect(screen.getByText("Adjust intensity")).toBeInTheDocument();
  });

  it("shows current value when showValue is true", () => {
    render(<Slider label="Volume" showValue defaultValue={35} />);

    expect(screen.getByText("35")).toBeInTheDocument();
  });

  it("updates value when changed", () => {
    render(<Slider label="Opacity" defaultValue={20} />);
    const input = screen.getByRole("slider");

    fireEvent.change(input, { target: { value: "45" } });
    expect(input).toHaveValue("45");
  });
});
