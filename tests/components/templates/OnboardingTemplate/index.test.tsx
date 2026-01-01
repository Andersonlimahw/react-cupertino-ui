import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { OnboardingTemplate } from "@components/templates/OnboardingTemplate";

const steps = [
  {
    image: "one.jpg",
    title: "Step 1",
    description: "Intro",
  },
  {
    image: "two.jpg",
    title: "Step 2",
    description: "Outro",
  },
];

describe("OnboardingTemplate", () => {
  it("renders step content", () => {
    render(<OnboardingTemplate steps={steps} onComplete={() => {}} />);
    expect(screen.getByText("Step 1")).toBeInTheDocument();
  });

  it("advances to next step", () => {
    const handleComplete = vi.fn();
    render(<OnboardingTemplate steps={steps} onComplete={handleComplete} />);
    fireEvent.click(screen.getByText("Next"));
    expect(screen.getByText("Step 2")).toBeInTheDocument();
  });
});
