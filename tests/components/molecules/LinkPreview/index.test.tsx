import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LinkPreview } from "@components/molecules/LinkPreview";

describe("LinkPreview", () => {
    it("renders title and description", () => {
        render(
            <LinkPreview
                url="https://example.com"
                title="Test Title"
                description="Test Description"
            />
        );
        expect(screen.getByText("Test Title")).toBeInTheDocument();
        expect(screen.getByText("Test Description")).toBeInTheDocument();
    });

    it("renders image when provided", () => {
        const { container } = render(
            <LinkPreview
                url="https://example.com"
                image="test.jpg"
            />
        );
        // The image is inside the .preview-image div
        const img = container.querySelector("img");
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("src", "test.jpg");
    });

    it("has correct link attributes", () => {
        render(<LinkPreview url="https://example.com" />);
        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", "https://example.com");
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
});
