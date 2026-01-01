import { render, screen } from "@testing-library/react";
import { Picker } from "@/components/molecules/Picker";
import { describe, it, expect } from "vitest";

const options = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

describe("Picker", () => {
  it("renders options", () => {
    render(<Picker options={options} value="1" onChange={() => {}} />);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  // Scroll testing is hard in JSDOM as it doesn't layout
  // We can test if the initial scroll position logic is triggered via mocking layout effects? 
  // Or simply check basic rendering.
});
