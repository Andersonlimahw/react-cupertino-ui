import { render, screen } from "@testing-library/react";
import { Dialog } from "@/components/ui/Dialog";

describe("Dialog Component", () => {
  it("renders correctly with default props", () => {
    render(<Dialog onClick={() => {}}>Click Me</Dialog>);
    const element = screen.getByText(/Click Me/i);
    expect(element).toBeInTheDocument();
  });

  it("applies the correct variant class", () => {
    render(
      <Dialog variant="destructive" onClick={() => {}}>
        Delete
      </Dialog>
    );
    const element = screen.getByText(/Delete/i);
    expect(element).toHaveClass("variant-destructive");
  });

  it("applies the correct size class", () => {
    render(
      <Dialog variant="destructive" size="lg" onClick={() => {}}>
        Delete
      </Dialog>
    );
    const element = screen.getByText(/Delete/i);
    expect(element).toHaveClass("size-lg");
  });
});