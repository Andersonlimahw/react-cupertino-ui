import { render, screen } from "@testing-library/react";
import { Card } from "@/components/ui/Card";

describe("Card Component", () => {
  it("renders correctly with default props", () => {
    render(<Card onClick={() => {}}>Click Me</Card>);
    const element = screen.getByText(/Click Me/i);
    expect(element).toBeInTheDocument();
  });

  it("applies the correct variant class", () => {
    render(
      <Card variant="destructive" onClick={() => {}}>
        Delete
      </Card>
    );
    const element = screen.getByText(/Delete/i);
    expect(element).toHaveClass("variant-destructive");
  });

  it("applies the correct size class", () => {
    render(
      <Card variant="destructive" size="lg" onClick={() => {}}>
        Delete
      </Card>
    );
    const element = screen.getByText(/Delete/i);
    expect(element).toHaveClass("size-lg");
  });
});