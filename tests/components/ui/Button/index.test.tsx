import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

describe("Button Component", () => {
  it("renders correctly with default props", () => {
    render(<Button onClick={() => {}}>Click Me</Button>);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it("applies the correct variant class", () => {
    render(
      <Button variant="destructive" onClick={() => {}}>
        Delete
      </Button>
    );
    const buttonElement = screen.getByText(/Delete/i);
    expect(buttonElement).toHaveClass("bg-destructive");
  });
});
