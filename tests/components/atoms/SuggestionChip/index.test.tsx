import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SuggestionChip } from "@components/atoms/SuggestionChip";

describe("SuggestionChip", () => {
  it("renders with default glass variant", () => {
    render(<SuggestionChip>Summarize</SuggestionChip>);
    expect(screen.getByRole("button")).toHaveClass("variant-glass");
  });

  it("accepts icons and trailing icons", () => {
    render(
      <SuggestionChip icon={<span data-testid="icon" />} trailingIcon={<span data-testid="trail" />}>
        Draft
      </SuggestionChip>
    );

    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByTestId("trail")).toBeInTheDocument();
  });

  it("sets active data attribute when active", () => {
    render(<SuggestionChip active>Focus</SuggestionChip>);
    expect(screen.getByRole("button")).toHaveAttribute("data-active", "true");
  });

  it("prevents clicks while loading", () => {
    const spy = vi.fn();
    render(
      <SuggestionChip loading onClick={spy}>
        Plan
      </SuggestionChip>
    );
    const chip = screen.getByRole("button");
    expect(chip).toBeDisabled();

    fireEvent.click(chip);
    expect(spy).not.toHaveBeenCalled();
  });
});
