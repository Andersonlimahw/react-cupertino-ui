import { render, screen, fireEvent } from "@testing-library/react";
import { DatePicker } from "@components/molecules/DatePicker";
import { describe, it, expect, vi } from "vitest";

describe("DatePicker", () => {
  it("renders date pickers in date mode", () => {
    const date = new Date(2023, 0, 15); // Jan 15 2023
    render(<DatePicker value={date} onChange={() => {}} mode="date" />);
    
    // Check if Month "January" is visible
    expect(screen.getByText("January")).toBeInTheDocument();
    // Check if Year "2023" is visible
    expect(screen.getByText("2023")).toBeInTheDocument();
    // Check if Day "15" is visible
    expect(screen.getByText("15")).toBeInTheDocument();
  });

  it("renders calendar layout and selects days", () => {
    const date = new Date(2023, 0, 15);
    const handleChange = vi.fn();
    render(
      <DatePicker value={date} onChange={handleChange} mode="date" layout="calendar" />
    );

    const targetDay = screen.getByRole("button", { name: /Select January 20, 2023/i });
    fireEvent.click(targetDay);

    expect(handleChange).toHaveBeenCalled();
  });

  it("disables dates before minDate in calendar layout", () => {
    const date = new Date(2023, 0, 20);
    const minDate = new Date(2023, 0, 15);
    render(
      <DatePicker
        value={date}
        onChange={() => {}}
        mode="date"
        layout="calendar"
        minDate={minDate}
      />
    );

    const disabledDay = screen.getByRole("button", { name: /Select January 10, 2023/i });
    expect(disabledDay).toBeDisabled();
  });

  it("updates value using compact selectors", () => {
    const date = new Date(2023, 0, 10, 8, 30);
    const handleChange = vi.fn();
    render(
      <DatePicker value={date} onChange={handleChange} mode="datetime" layout="compact" />
    );

    fireEvent.change(screen.getByLabelText("Hour"), { target: { value: "12" } });

    expect(handleChange).toHaveBeenCalled();
  });
});
