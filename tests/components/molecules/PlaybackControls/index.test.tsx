import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { PlaybackControls } from "@components/molecules/PlaybackControls";

describe("PlaybackControls", () => {
  it("invokes play/pause", () => {
    const onPlayPause = vi.fn();
    render(<PlaybackControls onPlayPause={onPlayPause} />);
    fireEvent.click(screen.getByRole("button", { name: /play/i }));
    expect(onPlayPause).toHaveBeenCalled();
  });
});
