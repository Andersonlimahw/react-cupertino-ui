import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { FullPlayerTemplate } from "@components/templates/FullPlayerTemplate";

describe("FullPlayerTemplate", () => {
  it("renders artwork and metadata", () => {
    render(
      <FullPlayerTemplate artwork="art.jpg" title="Song" subtitle="Artist">
        <p>Lyrics</p>
      </FullPlayerTemplate>
    );
    expect(screen.getByText("Song")).toBeInTheDocument();
    expect(screen.getByText("Lyrics")).toBeInTheDocument();
  });
});
