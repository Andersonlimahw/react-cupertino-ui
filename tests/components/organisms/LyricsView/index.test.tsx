import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { LyricsView } from "@components/organisms/LyricsView";

const lines = [
  { text: "First line" },
  { text: "Second line", active: true },
];

describe("LyricsView", () => {
  it("renders lyrics lines", () => {
    render(<LyricsView lines={lines} />);
    expect(screen.getByText("First line")).toBeInTheDocument();
  });
});
