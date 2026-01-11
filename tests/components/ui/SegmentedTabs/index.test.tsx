import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SegmentedTabs } from "@components/ui/SegmentedTabs";

const options = [
  { id: "one", label: "One", content: "Content 1" },
  { id: "two", label: "Two", content: "Content 2" },
];

describe("SegmentedTabs", () => {
  it("renders tabs", () => {
    render(<SegmentedTabs options={options} />);
    expect(screen.getByText("One")).toBeInTheDocument();
  });

  it("switches when clicked", () => {
    const handleChange = vi.fn();
    render(<SegmentedTabs options={options} onValueChange={handleChange} />);
    fireEvent.click(screen.getByRole("tab", { name: "Two" }));
    expect(handleChange).toHaveBeenCalledWith("two");
  });
});
