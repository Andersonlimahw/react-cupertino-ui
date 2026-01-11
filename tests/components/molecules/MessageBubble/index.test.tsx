import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MessageBubble } from "@components/molecules/MessageBubble";

describe("MessageBubble", () => {
  it("renders message text", () => {
    render(<MessageBubble message="Test" />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
