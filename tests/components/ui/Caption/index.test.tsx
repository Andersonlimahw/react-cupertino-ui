import { render, screen } from "@testing-library/react";
import { Caption } from "@/components/ui/Caption";

describe("Caption Component", () => {
  it("renders correctly with default props", () => {
    render(<Caption onClick={() => {}}>Click Me</Caption>);
    const element = screen.getByText(/Click Me/i);
    expect(element).toBeInTheDocument();
  });

  it("applies the correct variant class", () => {
    render(
      <Caption variant="destructive" onClick={() => {}}>
        Delete
      </Caption>
    );
    const element = screen.getByText(/Delete/i);
    expect(element).toHaveClass("variant-destructive");
  });

  it("applies the correct size class", () => {
    render(
      <Caption variant="destructive" size="lg" onClick={() => {}}>
        Delete
      </Caption>
    );
    const element = screen.getByText(/Delete/i);
    expect(element).toHaveClass("size-lg");
  });
});