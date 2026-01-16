import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { PlaybackQueue } from "@components/ui/PlaybackQueue";

const items = [
  { id: "1", title: "Song 1" },
  { id: "2", title: "Song 2" },
];

describe("PlaybackQueue", () => {
  it("renders items", () => {
    render(<PlaybackQueue items={items} />);
    expect(screen.getByText("Song 1")).toBeInTheDocument();
  });

  it("handles select", () => {
    const handleSelect = vi.fn();
    render(<PlaybackQueue items={items} onSelect={handleSelect} />);
    fireEvent.click(screen.getByText("Song 2"));
    expect(handleSelect).toHaveBeenCalledWith(items[1]);
  });
});
