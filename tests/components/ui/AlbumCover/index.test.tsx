import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AlbumCover } from "@components/ui/AlbumCover";

describe("AlbumCover", () => {
  it("renders metadata", () => {
    render(
      <AlbumCover title="Song" artist="Artist" artwork="https://picsum.photos/seed/test/200" />
    );
    expect(screen.getByText("Song")).toBeInTheDocument();
    expect(screen.getByRole("img").getAttribute("src")).toContain("picsum");
  });

  it("triggers play", () => {
    const onPlay = vi.fn();
    render(
      <AlbumCover title="Song" artwork="https://picsum.photos/seed/test/200" onPlay={onPlay} />
    );
    fireEvent.click(screen.getByRole("button", { name: /play/i }));
    expect(onPlay).toHaveBeenCalled();
  });
});
