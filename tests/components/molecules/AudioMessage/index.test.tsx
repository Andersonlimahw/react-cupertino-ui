import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AudioMessage } from "@components/molecules/AudioMessage";

describe("AudioMessage", () => {
    it("renders with duration", () => {
        render(<AudioMessage duration={65} />);
        // 65 seconds = 1:05
        expect(screen.getByText("1:05")).toBeInTheDocument();
    });

    it("handles string duration", () => {
        render(<AudioMessage duration="0:30" />);
        expect(screen.getByText("0:30")).toBeInTheDocument();
    });

    it("toggles play state", () => {
        const onPlayPause = vi.fn();
        render(<AudioMessage duration={30} onPlayPause={onPlayPause} />);

        const button = screen.getByRole("button", { name: /play/i });
        fireEvent.click(button);
        expect(onPlayPause).toHaveBeenCalled();
    });

    it("shows pause icon when playing", () => {
        render(<AudioMessage duration={30} isPlaying={true} />);
        expect(screen.getByRole("button", { name: /pause/i })).toBeInTheDocument();
    });
});
