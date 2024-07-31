import { render, screen } from "@testing-library/react";
import { Dialog } from "@/components/ui/Dialog";

describe("Dialog Component", () => {
  it("renders correctly with default props", () => {
    render(<Dialog>Click Me</Dialog>);
    const element = screen.getByText(/Click Me/i);
    expect(element).toBeInTheDocument();
  });

  it("renders correctly with default open props", () => {
    render(<Dialog open>Click Me</Dialog>);
    const element = screen.getByText(/Click Me/i);
    expect(element).toBeInTheDocument();
  });
});
