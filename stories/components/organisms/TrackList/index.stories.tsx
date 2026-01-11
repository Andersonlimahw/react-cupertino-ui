import type { Meta, StoryObj } from "@storybook/react";
import { TrackList } from "@components/organisms/TrackList";

const meta = {
    title: "Organisms/TrackList",
    component: TrackList,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        activeTrackId: { control: "text" },
        showIndex: { control: "boolean" },
        showArtwork: { control: "boolean" },
    },
} satisfies Meta<typeof TrackList>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTracks = [
    { id: "1", title: "Blinding Lights", artist: "The Weeknd", duration: "3:20" },
    { id: "2", title: "As It Was", artist: "Harry Styles", duration: "2:47" },
    { id: "3", title: "Stay", artist: "The Kid LAROI & Justin Bieber", duration: "2:21" },
    { id: "4", title: "Heat Waves", artist: "Glass Animals", duration: "3:58" },
    { id: "5", title: "Bad Habits", artist: "Ed Sheeran", duration: "3:51" },
];

const sampleTracksWithArtwork = sampleTracks.map(track => ({
    ...track,
    artwork: `https://picsum.photos/seed/${track.id}/40/40`,
}));

export const Default: Story = {
    args: {
        tracks: sampleTracks,
        showIndex: true,
    },
    render: (args) => (
        <div style={{ width: 375, background: "#f9f9f9", borderRadius: 20, padding: 20 }}>
            <TrackList {...args} />
        </div>
    ),
};

export const WithActiveTrack: Story = {
    args: {
        tracks: sampleTracks,
        activeTrackId: "2",
        showIndex: true,
    },
    render: (args) => (
        <div style={{ width: 375, background: "#f9f9f9", borderRadius: 20, padding: 20 }}>
            <TrackList {...args} />
        </div>
    ),
};

export const WithArtwork: Story = {
    args: {
        tracks: sampleTracksWithArtwork,
        showArtwork: true,
        showIndex: false,
    },
    render: (args) => (
        <div style={{ width: 375, background: "#f9f9f9", borderRadius: 20, padding: 20 }}>
            <TrackList {...args} />
        </div>
    ),
};
