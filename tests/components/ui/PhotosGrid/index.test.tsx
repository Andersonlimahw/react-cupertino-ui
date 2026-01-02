import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { PhotosGrid } from "@components/ui/PhotosGrid";

const items = [
  { id: "1", src: "https://picsum.photos/seed/1/100/100" },
  { id: "2", src: "https://picsum.photos/seed/2/100/100" },
];

describe("PhotosGrid", () => {
  it("renders images", () => {
    render(<PhotosGrid items={items} />);
    expect(screen.getAllByRole("img")).toHaveLength(2);
  });

  it("calls select handler", () => {
    const handleSelect = vi.fn();
    render(<PhotosGrid items={items} onSelect={handleSelect} />);
    fireEvent.click(screen.getAllByRole("button")[0]);
    expect(handleSelect).toHaveBeenCalledWith(items[0]);
  });
});
