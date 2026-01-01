import { render, screen } from "@testing-library/react";
import { IntelligenceGlow } from "@/components/atoms/IntelligenceGlow";
import { describe, it, expect } from "vitest";

describe("IntelligenceGlow", () => {
  it("renders children", () => {
    render(
      <IntelligenceGlow active={true}>
        <div>Test Content</div>
      </IntelligenceGlow>
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies active class", () => {
    const { container } = render(
      <IntelligenceGlow active={true}>
        <div>Content</div>
      </IntelligenceGlow>
    );
    expect(container.firstChild).toHaveClass("is-active");
  });
});
