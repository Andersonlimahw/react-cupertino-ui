import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { ConversationList } from "@components/organisms/ConversationList";

const items = [
  { id: "1", avatar: "img.jpg", name: "Sarah", preview: "Hi" },
];

describe("ConversationList", () => {
  it("renders conversations", () => {
    render(<ConversationList items={items} />);
    expect(screen.getByText("Sarah")).toBeInTheDocument();
  });

  it("fires onSelect", () => {
    const handleSelect = vi.fn();
    render(<ConversationList items={items} onSelect={handleSelect} />);
    fireEvent.click(screen.getByText("Sarah"));
    expect(handleSelect).toHaveBeenCalledWith("1");
  });
});
