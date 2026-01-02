import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { MediaTransport } from "@components/ui/MediaTransport";

describe("MediaTransport", () => {
  it("calls play/pause handler", () => {
    const onPlayPause = vi.fn();
    render(<MediaTransport state="paused" onPlayPause={onPlayPause} />);
    fireEvent.click(screen.getByRole("button", { name: /play/i }));
    expect(onPlayPause).toHaveBeenCalled();
  });

  it("renders loading spinner", () => {
    render(<MediaTransport state="loading" />);
    expect(screen.getByRole("button", { name: /play/i })).toBeDisabled();
  });
});
