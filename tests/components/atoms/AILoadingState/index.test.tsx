import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { AILoadingState } from "@components/atoms/AILoadingState";

describe("AILoadingState", () => {
  it("renders default thinking label", () => {
    render(<AILoadingState />);
    expect(screen.getByText(/Thinking/i)).toBeInTheDocument();
  });

  it("renders message when provided", () => {
    render(<AILoadingState message="Looking up" />);
    expect(screen.getByText("Looking up")).toBeInTheDocument();
  });
});
