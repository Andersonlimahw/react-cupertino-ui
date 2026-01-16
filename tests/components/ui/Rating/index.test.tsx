import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Rating } from "@components/ui/Rating";

describe("Rating", () => {
  it("renders the provided default value", () => {
    render(<Rating defaultValue={3} />);
    expect(screen.getAllByRole("button")[2]).toHaveAttribute("data-active", "true");
  });

  it("changes value when clicked", () => {
    const handleChange = vi.fn();
    // Disable allowHalf to get deterministic click behavior (full star values)
    render(<Rating onValueChange={handleChange} allowHalf={false} />);

    fireEvent.click(screen.getAllByRole("button")[3]);
    expect(handleChange).toHaveBeenCalledWith(4);
  });

  it("renders divs instead of buttons when readOnly", () => {
    render(<Rating value={4} readOnly />);
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });
});
