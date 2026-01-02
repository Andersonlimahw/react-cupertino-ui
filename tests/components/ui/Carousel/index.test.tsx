import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Carousel } from "@components/ui/Carousel";

const slides = [<div key="1">Slide 1</div>, <div key="2">Slide 2</div>, <div key="3">Slide 3</div>];

describe("Carousel", () => {
  it("renders slides", () => {
    render(<Carousel slides={slides} />);
    expect(screen.getByText("Slide 1")).toBeInTheDocument();
  });

  it("changes slide when indicator clicked", () => {
    render(<Carousel slides={slides} />);
    const indicators = screen.getAllByRole("tab");
    fireEvent.click(indicators[1]);
    expect(indicators[1]).toHaveAttribute("aria-selected", "true");
  });
});
