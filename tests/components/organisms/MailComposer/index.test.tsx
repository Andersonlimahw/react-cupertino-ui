import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MailComposer } from "@components/organisms/MailComposer";

describe("MailComposer", () => {
    it("renders when open", () => {
        render(
            <MailComposer
                isOpen={true}
                onClose={() => { }}
                onSend={() => { }}
            />
        );
        expect(screen.getByText("New Message")).toBeInTheDocument();
        expect(screen.getByText("To:")).toBeInTheDocument();
    });

    it("does not render when closed", () => {
        render(
            <MailComposer
                isOpen={false}
                onClose={() => { }}
                onSend={() => { }}
            />
        );
        expect(screen.queryByText("New Message")).not.toBeInTheDocument();
    });

    it("updates fields and sends data", () => {
        const onSend = vi.fn();
        render(
            <MailComposer
                isOpen={true}
                onClose={() => { }}
                onSend={onSend}
            />
        );

        // Type in fields
        fireEvent.change(screen.getByLabelText("To:"), { target: { value: "test@example.com" } });
        fireEvent.change(screen.getByLabelText("Subject:"), { target: { value: "Hello" } });

        // Click send
        // Assuming send button is the one with the ArrowUp
        const button = screen.getAllByRole("button").find(b => b.classList.contains("send-button"));
        fireEvent.click(button!);

        expect(onSend).toHaveBeenCalledWith(expect.objectContaining({
            to: "test@example.com",
            subject: "Hello"
        }));
    });

    it("toggles cc field", () => {
        render(
            <MailComposer
                isOpen={true}
                onClose={() => { }}
                onSend={() => { }}
            />
        );

        expect(screen.queryByLabelText("Cc:")).not.toBeInTheDocument();

        fireEvent.click(screen.getByText("Cc/Bcc"));

        expect(screen.getByLabelText("Cc:")).toBeInTheDocument();
    });
});
