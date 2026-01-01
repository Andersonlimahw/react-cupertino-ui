import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import Stepper from "@components/molecules/Stepper";

describe("Stepper", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

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

  it("increments repeatedly while held", () => {
    vi.useFakeTimers();
    render(<Stepper defaultValue={0} max={10} />);
    const input = screen.getByRole("spinbutton");
    const incrementButton = screen.getByLabelText("Increase value");

    fireEvent.pointerDown(incrementButton, { button: 0 });
    vi.advanceTimersByTime(400); // trigger hold delay and first repeat
    vi.advanceTimersByTime(400); // allow more repeats
    fireEvent.pointerUp(incrementButton);

    expect(Number((input as HTMLInputElement).value)).toBeGreaterThan(0);

    const valueAfterRelease = Number((input as HTMLInputElement).value);
    vi.advanceTimersByTime(400);
    expect(Number((input as HTMLInputElement).value)).toBe(valueAfterRelease);
  });

  it("applies trend attribute on change", () => {
    vi.useFakeTimers();
    render(<Stepper defaultValue={1} />);
    const input = screen.getByRole("spinbutton");
    const incrementButton = screen.getByLabelText("Increase value");

    fireEvent.click(incrementButton);
    expect(input).toHaveAttribute("data-trend", "up");

    vi.advanceTimersByTime(600);
    expect(input).not.toHaveAttribute("data-trend");
  });
});
