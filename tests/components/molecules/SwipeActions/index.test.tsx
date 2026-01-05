import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SwipeActions } from "@components/molecules/SwipeActions";

describe("SwipeActions", () => {
    it("renders content", () => {
        render(<SwipeActions>Test Content</SwipeActions>);
        expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("renders actions", () => {
        render(
            <SwipeActions
                startActions={[{ label: "Action 1", onClick: () => { } }]}
                endActions={[{ label: "Action 2", onClick: () => { } }]}
            >
                Test Content
            </SwipeActions>
        );
        expect(screen.getByText("Action 1")).toBeInTheDocument();
        expect(screen.getByText("Action 2")).toBeInTheDocument();
    });

    it("triggers action onClick", () => {
        const onClick = vi.fn();
        render(
            <SwipeActions
                endActions={[{ label: "Delete", onClick }]}
            >
                Content
            </SwipeActions>
        );

        const button = screen.getByText("Delete").closest("button");
        fireEvent.click(button!);
        expect(onClick).toHaveBeenCalled();
    });
});
