import { render, screen } from "@testing-library/react";
import { Input } from "@/components/ui/Input";

describe("Input Component", () => {
  it("renders correctly with default props", () => {
    render(<Input onClick={() => {}}>Click Me</Input>);
    const element = screen.getByText(/Click Me/i);
    expect(element).toBeInTheDocument();
  });

  it("applies the correct variant class", () => {
    render(
      <Input variant="destructive" onClick={() => {}}>
        Delete
      </Input>
    );
    const element = screen.getByText(/Delete/i);
    expect(element).toHaveClass("bg-destructive");
  });
});