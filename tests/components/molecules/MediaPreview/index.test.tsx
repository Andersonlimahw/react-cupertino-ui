import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MediaPreview } from "@components/molecules/MediaPreview";

describe("MediaPreview", () => {
    it("renders image type", () => {
        render(<MediaPreview src="test.jpg" alt="Test image" type="image" />);
        const img = screen.getByRole("img");
        expect(img).toHaveAttribute("src", "test.jpg");
        expect(img).toHaveAttribute("alt", "Test image");
    });

    it("renders video type", () => {
        const { container } = render(
            <MediaPreview src="test.mp4" type="video" />
        );
        const video = container.querySelector("video");
        expect(video).toBeInTheDocument();
        expect(video).toHaveAttribute("src", "test.mp4");
    });

    it("applies aspect ratio style", () => {
        const { container } = render(
            <MediaPreview src="test.jpg" aspectRatio={1.5} />
        );
        expect(container.firstChild).toHaveStyle("aspect-ratio: 1.5");
    });
});
