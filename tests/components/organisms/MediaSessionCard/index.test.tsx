import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MediaSessionCard } from "@components/organisms/MediaSessionCard";

const tracks = [
  { id: "1", title: "Track 1" },
  { id: "2", title: "Track 2" },
];

describe("MediaSessionCard", () => {
  it("renders hero and tracks", () => {
    render(
      <MediaSessionCard
        artwork="https://picsum.photos/seed/test/200"
        title="Glow"
        subtitle="Artist"
        tracks={tracks}
      />
    );
    expect(screen.getByText("Glow")).toBeInTheDocument();
    expect(screen.getByText("Track 1")).toBeInTheDocument();
  });
});
