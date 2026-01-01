import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { AIResponseBubble } from "@components/molecules/AIResponseBubble";

describe("AIResponseBubble", () => {
  it("renders AI bubble content", () => {
    render(<AIResponseBubble content="Generated summary" />);
    expect(screen.getByText("Generated summary")).toBeInTheDocument();
  });

  it("renders typing indicator when typing", () => {
    render(<AIResponseBubble content="" typing />);
    expect(screen.getByRole("status", { hidden: true })).toBeInTheDocument();
  });

  it("shows timestamp", () => {
    const date = new Date("2024-01-01T10:00:00Z");
    render(<AIResponseBubble content="Testing" timestamp={date} />);
    // The component formats time in local timezone, so we check for the presence of a time element
    expect(screen.getByRole("time", { hidden: true })).toBeInTheDocument();
  });
});
