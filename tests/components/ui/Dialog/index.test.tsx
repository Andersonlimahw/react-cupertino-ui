import { render, screen } from "@testing-library/react";
import { AlertDialog } from "@/components/ui/Dialog";

describe("Dialog Component", () => {
  it("renders correctly with default props", () => {
    render(<AlertDialog>Click Me</AlertDialog>);
    const element = screen.getByText(/Click Me/i);
    expect(element).toBeInTheDocument();
  });

  it("renders correctly with default open props", () => {
    render(<AlertDialog open>Click Me</AlertDialog>);
    const element = screen.getByText(/Click Me/i);
    expect(element).toBeInTheDocument();
  });
});
