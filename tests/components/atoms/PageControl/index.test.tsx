import { render, screen, fireEvent } from "@testing-library/react";
import { PageControl } from "@components/atoms/PageControl";
import { describe, it, expect, vi } from "vitest";

describe("PageControl", () => {
  it("renders correct number of indicators", () => {
    render(<PageControl total={5} current={0} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(5);
  });

  it("highlights current page", () => {
    render(<PageControl total={3} current={1} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons[1]).toHaveClass("is-active");
    expect(buttons[0]).not.toHaveClass("is-active");
  });

  it("calls onChange when clicked", () => {
    const handleChange = vi.fn();
    render(<PageControl total={3} current={0} onChange={handleChange} />);
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[2]);
    expect(handleChange).toHaveBeenCalledWith(2);
  });
});
