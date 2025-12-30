import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import Stepper from "@/components/molecules/Stepper";

describe("Stepper", () => {
  it("renders current value", () => {
    render(<Stepper defaultValue={4} label="Qty" />);
    expect(screen.getByDisplayValue("4")).toBeInTheDocument();
  });

  it("increments and decrements within bounds", () => {
    render(<Stepper defaultValue={2} min={0} max={3} />);
    const input = screen.getByRole("spinbutton");
    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[1]);
    expect(input).toHaveValue(3);
    fireEvent.click(buttons[0]);
    expect(input).toHaveValue(2);
  });

  it("calls onChange", () => {
    const handleChange = vi.fn();
    render(<Stepper defaultValue={1} onChange={handleChange} />);
    fireEvent.click(screen.getAllByRole("button")[1]);
    expect(handleChange).toHaveBeenCalledWith(2);
  });
});
