import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { MiniPlayer } from "@components/organisms/MiniPlayer";

describe("MiniPlayer", () => {
  it("renders artwork and title", () => {
    render(
      <MiniPlayer artwork="art.jpg" title="Song" artist="Artist" />
    );
    expect(screen.getByText("Song")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "art.jpg");
  });
});
