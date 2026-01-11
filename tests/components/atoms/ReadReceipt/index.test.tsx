import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ReadReceipt } from "@components/atoms/ReadReceipt";

describe("ReadReceipt", () => {
    it("renders sent status", () => {
        render(<ReadReceipt status="sent" />);
        expect(screen.getByText("Sent")).toBeInTheDocument();
    });

    it("renders delivered status", () => {
        render(<ReadReceipt status="delivered" />);
        expect(screen.getByText("Delivered")).toBeInTheDocument();
    });

    it("renders read status with timestamp", () => {
        const date = new Date("2024-01-01T12:00:00");
        // Mock locale string to ensure consistency across environments
        const timeString = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

        render(<ReadReceipt status="read" timestamp={date} />);
        expect(screen.getByText(`Read ${timeString}`)).toBeInTheDocument();
    });

    it("renders failed status", () => {
        const { container } = render(<ReadReceipt status="failed" />);
        expect(screen.getByText("Not Delivered")).toBeInTheDocument();
        expect(container.firstChild).toHaveClass("status-failed");
    });
});
