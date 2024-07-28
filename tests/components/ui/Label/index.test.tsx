import { render, screen } from "@testing-library/react";
import { Label } from "@/components/ui/Label";

describe("Label Component", () => {
  it("renders correctly with default props", () => {
    render(<Label onClick={() => {}}>Click Me</Label>);
    const element = screen.getByText(/Click Me/i);
    expect(element).toBeInTheDocument();
  });

  it("applies the correct variant class", () => {
    render(
      <Label variant="destructive" onClick={() => {}}>
        Delete
      </Label>
    );
    const element = screen.getByText(/Delete/i);
    expect(element).toHaveClass("bg-destructive");
  });
});