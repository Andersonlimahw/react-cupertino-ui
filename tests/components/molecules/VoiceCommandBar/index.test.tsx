import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { VoiceCommandBar } from "@components/molecules/VoiceCommandBar";

describe("VoiceCommandBar", () => {
  it("submits typed command", () => {
    const onSubmit = vi.fn();
    render(<VoiceCommandBar onSubmit={onSubmit} />);
    fireEvent.change(screen.getByPlaceholderText("Ask Siri..."), { target: { value: "Play music" } });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(onSubmit).toHaveBeenCalledWith("Play music");
  });
});
