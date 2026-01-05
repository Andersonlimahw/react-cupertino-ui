import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TrackList } from "@components/organisms/TrackList";

const tracks = [
    { id: "1", title: "Track 1", artist: "Artist 1", duration: "3:00" },
    { id: "2", title: "Track 2", artist: "Artist 2", duration: "4:00" },
];

describe("TrackList", () => {
    it("renders list of tracks", () => {
        render(<TrackList tracks={tracks} />);
        expect(screen.getByText("Track 1")).toBeInTheDocument();
        expect(screen.getByText("Track 2")).toBeInTheDocument();
        expect(screen.getByText("Artist 1")).toBeInTheDocument();
    });

    it("handles track selection", () => {
        const onSelect = vi.fn();
        render(<TrackList tracks={tracks} onTrackSelect={onSelect} />);

        // Clicking the first item (might need to target specific clickable element depending on List implementation)
        // Assuming the List item is clickable or has a button if onClick is provided
        const trackItem = screen.getByText("Track 1").closest(".react-cupertino-ui-list-item");
        fireEvent.click(trackItem!);

        expect(onSelect).toHaveBeenCalledWith(tracks[0]);
    });

    it("highlights active track", () => {
        const { container } = render(<TrackList tracks={tracks} activeTrackId="2" />);
        const activeItem = container.querySelector(".is-active");
        expect(activeItem).toBeInTheDocument();
        expect(activeItem).toHaveTextContent("Track 2");
    });

    it("shows playing indicator for active track", () => {
        const { container } = render(<TrackList tracks={tracks} activeTrackId="1" />);
        // Check for the indicator bars
        const indicator = container.querySelector(".playing-indicator");
        expect(indicator).toBeInTheDocument();
    });
});
