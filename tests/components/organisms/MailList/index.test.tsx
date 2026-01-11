import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MailList } from "@components/organisms/MailList";

const emails = [
    {
        id: "1",
        sender: "Sender 1",
        subject: "Subject 1",
        preview: "Preview 1",
        date: "Today",
        unread: true,
    }
];

describe("MailList", () => {
    it("renders emails", () => {
        render(<MailList emails={emails} />);
        expect(screen.getAllByText("Read")).toHaveLength(1);
        expect(screen.getAllByText("Flag")).toHaveLength(1);
        expect(screen.getAllByText("Trash")).toHaveLength(1);
    });

    it("handles interactions", () => {
        const onSelect = vi.fn();
        render(<MailList emails={emails} onEmailSelect={onSelect} />);

        // Find the clickable item (might be nested in SwipeActions)
        const item = screen.getByText("Read");
        fireEvent.click(item!);

        expect(screen.getAllByText("Read")).toHaveLength(1);
    });
});
