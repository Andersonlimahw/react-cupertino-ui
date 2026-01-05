import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TypingIndicator } from "@components/atoms/TypingIndicator";

describe("TypingIndicator", () => {
    it("renders correctly", () => {
        const { container } = render(<TypingIndicator />);
        expect(container.firstChild).toHaveClass("react-cupertino-ui-typing-indicator");
        expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("applies size class", () => {
        const { container } = render(<TypingIndicator size="sm" />);
        expect(container.firstChild).toHaveClass("size-sm");
    });

    it("applies custom class", () => {
        const { container } = render(<TypingIndicator className="custom-test" />);
        expect(container.firstChild).toHaveClass("custom-test");
    });
});
