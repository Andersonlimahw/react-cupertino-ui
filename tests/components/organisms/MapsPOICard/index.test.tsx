import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MapsPOICard } from "@components/organisms/MapsPOICard";

describe("MapsPOICard", () => {
  it("renders POI details", () => {
    render(
      <MapsPOICard
        title="Apple Park"
        subtitle="Visitor Center"
        category="Landmark"
        distance="2 mi"
      />
    );
    expect(screen.getByText("Apple Park")).toBeInTheDocument();
    expect(screen.getByText("Visitor Center")).toBeInTheDocument();
  });
});
