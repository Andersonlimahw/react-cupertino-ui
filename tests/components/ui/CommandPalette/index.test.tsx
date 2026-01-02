import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CommandPalette } from "@components/ui/CommandPalette";

const actions = [
  { id: "open", label: "Open file" },
  { id: "save", label: "Save file" },
];

describe("CommandPalette", () => {
  it("renders commands", () => {
    render(
      <CommandPalette
        open
        onClose={() => {}}
        query=""
        onQueryChange={() => {}}
        actions={actions}
      />
    );

    expect(screen.getByPlaceholderText("Type a command")).toBeInTheDocument();
    expect(screen.getByText("Open file")).toBeInTheDocument();
  });

  it("closes when clicking backdrop", () => {
    const onClose = vi.fn();
    render(
      <CommandPalette
        open
        onClose={onClose}
        query=""
        onQueryChange={() => {}}
        actions={actions}
      />
    );

    fireEvent.click(screen.getByRole("status").parentElement!);
    expect(onClose).toHaveBeenCalled();
  });

  it("highlights query matches", () => {
    render(
      <CommandPalette
        open
        onClose={() => {}}
        query="Open"
        onQueryChange={() => {}}
        actions={actions}
      />
    );

    expect(screen.getByText("Open", { selector: "mark" })).toBeInTheDocument();
  });
});
