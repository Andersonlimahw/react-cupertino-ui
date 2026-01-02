import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { NowPlayingBar } from "@components/organisms/NowPlayingBar";

describe("NowPlayingBar", () => {
  it("renders metadata", () => {
    render(
      <NowPlayingBar
        artwork="https://picsum.photos/seed/test/200"
        title="Track"
        artist="Artist"
      />
    );
    expect(screen.getByText("Track")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("triggers like toggle", () => {
    const onLikeToggle = vi.fn();
    render(
      <NowPlayingBar
        artwork="https://picsum.photos/seed/test/200"
        title="Track"
        onLikeToggle={onLikeToggle}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /like/i }));
    expect(onLikeToggle).toHaveBeenCalled();
  });
});
