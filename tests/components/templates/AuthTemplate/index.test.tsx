import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { AuthTemplate } from "@components/templates/AuthTemplate";

describe("AuthTemplate", () => {
  it("renders login fields", () => {
    render(<AuthTemplate onSubmit={() => {}} />);
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it("submits the form", () => {
    const handleSubmit = vi.fn();
    render(<AuthTemplate onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@apple.com" } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "123456" } });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(handleSubmit).toHaveBeenCalled();
  });
});
