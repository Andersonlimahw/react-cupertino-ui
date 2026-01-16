import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { MessageInput } from "@components/molecules/MessageInput";

describe("MessageInput", () => {
  it("submits message", () => {
    const onSend = vi.fn();
    render(<MessageInput onSend={onSend} />);
    fireEvent.change(screen.getByPlaceholderText("Message"), { target: { value: "Hello" } });
    fireEvent.submit(screen.getByRole("textbox").closest("form")!);
    expect(onSend).toHaveBeenCalledWith("Hello");
  });
});
