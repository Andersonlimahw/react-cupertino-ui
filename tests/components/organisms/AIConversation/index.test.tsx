import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { AIConversation } from "@components/organisms/AIConversation";

const messages = [
  { id: "1", content: "Olá", isUser: true },
  { id: "2", content: "Oi! Como posso ajudar?", isUser: false },
];

describe("AIConversation", () => {
  it("renders conversation messages", () => {
    render(<AIConversation messages={messages} onSend={() => {}} />);
    expect(screen.getByText("Olá")).toBeInTheDocument();
    expect(screen.getByText("Oi! Como posso ajudar?")).toBeInTheDocument();
  });

  it("submits prompt via input", () => {
    const handleSend = vi.fn();
    render(<AIConversation messages={messages} onSend={handleSend} />);

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Crie um resumo" } });
    fireEvent.keyDown(screen.getByRole("textbox"), { key: "Enter" });

    expect(handleSend).toHaveBeenCalledWith("Crie um resumo");
  });

  it("renders suggestions and triggers send", () => {
    const handleSend = vi.fn();
    render(
      <AIConversation
        messages={messages}
        onSend={handleSend}
        suggestions={["Draft reply"]}
      />
    );

    fireEvent.click(screen.getByText("Draft reply"));
    expect(handleSend).toHaveBeenCalledWith("Draft reply");
  });
});
