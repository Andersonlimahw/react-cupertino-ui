import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { AIPromptInput } from "@components/molecules/AIPromptInput";

const defaultProps = {
  value: "",
  onChange: vi.fn(),
  onSubmit: vi.fn(),
};

describe("AIPromptInput", () => {
  it("renders provided placeholder", () => {
    render(<AIPromptInput {...defaultProps} placeholder="Pergunte algo" />);
    expect(screen.getByPlaceholderText("Pergunte algo")).toBeInTheDocument();
  });

  it("invokes onChange when typing", () => {
    const handleChange = vi.fn();
    render(<AIPromptInput {...defaultProps} onChange={handleChange} />);

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Nova pergunta" } });
    expect(handleChange).toHaveBeenCalledWith("Nova pergunta");
  });

  it("submits with Enter", () => {
    const handleSubmit = vi.fn();
    render(<AIPromptInput {...defaultProps} value="Write summary" onSubmit={handleSubmit} />);

    fireEvent.keyDown(screen.getByRole("textbox"), { key: "Enter" });
    expect(handleSubmit).toHaveBeenCalledWith("Write summary");
  });

  it("renders suggestions", () => {
    render(
      <AIPromptInput
        {...defaultProps}
        suggestions={["Summarize", "Draft email"]}
        value=""
        onChange={vi.fn()}
      />
    );

    expect(screen.getByText("Summarize")).toBeInTheDocument();
    expect(screen.getByText("Draft email")).toBeInTheDocument();
  });
});
