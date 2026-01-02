import { fireEvent, render, screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";

import { Switcher } from "@components/ui/Switcher";

describe("Switcher", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the label and helper text", () => {
    render(<Switcher label="Airplane Mode" helperText="Disable wireless radios" />);

    expect(screen.getByText("Airplane Mode")).toBeInTheDocument();
    expect(screen.getByText("Disable wireless radios")).toBeInTheDocument();
  });

  it("toggles the checked state when clicked", () => {
    render(<Switcher label="Wi-Fi" />);

    const control = screen.getByRole("switch");
    expect(control).toHaveAttribute("data-state", "unchecked");

    fireEvent.click(control);
    expect(control).toHaveAttribute("data-state", "checked");
  });
});
