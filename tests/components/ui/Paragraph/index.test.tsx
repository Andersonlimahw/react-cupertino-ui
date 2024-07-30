import { render, screen } from "@testing-library/react";
import { Paragraph } from "@/components/ui/Paragraph";

describe("Paragraph Component", () => {
  it("renders correctly with default props", () => {
    render(<Paragraph onClick={() => {}}>Click Me</Paragraph>);
    const element = screen.getByText(/Click Me/i);
    expect(element).toBeInTheDocument();
  });

  it("applies the correct variant class", () => {
    render(
      <Paragraph variant="destructive" onClick={() => {}}>
        Delete
      </Paragraph>
    );
    const element = screen.getByText(/Delete/i);
    expect(element).toHaveClass("variant-destructive");
  });

  it("applies the correct size class", () => {
    render(
      <Paragraph variant="destructive" size="lg" onClick={() => {}}>
        Delete
      </Paragraph>
    );
    const element = screen.getByText(/Delete/i);
    expect(element).toHaveClass("size-lg");
  });
});