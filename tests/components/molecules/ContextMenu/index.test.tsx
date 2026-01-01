import { render, screen, fireEvent } from "@testing-library/react";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "@components/molecules/ContextMenu";
import { describe, it, expect } from "vitest";

describe("ContextMenu", () => {
  it("renders trigger", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right Click Me</ContextMenuTrigger>
        <ContextMenuContent>
            <ContextMenuItem>Item</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
    expect(screen.getByText("Right Click Me")).toBeInTheDocument();
  });

  it("renders preview section when provided", async () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right Click Me</ContextMenuTrigger>
        <ContextMenuContent preview={<div data-testid="preview">Preview</div>}>
          <ContextMenuItem>Item</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );

    fireEvent.contextMenu(screen.getByText("Right Click Me"));

    expect(await screen.findByTestId("preview")).toBeInTheDocument();
  });
  
  // Interaction testing for context menu usually requires real browser events or complex mocking
  // We can verify the structure mainly here.
});
