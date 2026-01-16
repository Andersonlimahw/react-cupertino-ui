import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ProgressSlider } from "@components/molecules/ProgressSlider";

describe("ProgressSlider", () => {
    it("renders with formatted time labels", () => {
        // 65s = 1:05, 125s total - 65s = 60s (1:00) remaining
        render(<ProgressSlider currentTime={65} duration={125} />);
        expect(screen.getByText("1:05")).toBeInTheDocument();
        expect(screen.getByText("-1:00")).toBeInTheDocument();
    });

    it("calculates progress percentage correctly", () => {
        const { container } = render(<ProgressSlider currentTime={50} duration={100} />);
        const fill = container.querySelector(".fill");
        expect(fill).toHaveStyle("width: 50%");
    });

    it("handles interaction", () => {
        const onSeek = vi.fn();
        const { container } = render(<ProgressSlider currentTime={0} duration={100} onSeek={onSeek} />);

        const progressBar = container.querySelector(".progress-bar-container");
        expect(progressBar).toBeInTheDocument();

        // Simulate mouse interaction
        fireEvent.mouseDown(progressBar!, { clientX: 50 });
        fireEvent.mouseUp(document, { clientX: 50 });

        // Exact value depends on mocking getBoundingClientRect which is hard in JSDOM
        // But we can check if onSeek was called
        expect(onSeek).toHaveBeenCalled();
    });
});
