import { render, screen } from "@testing-library/react";
import { Title } from "@/components/ui/Title";

describe("Title Component", () => {
  it("renders correctly with default props", () => {
    render(<Title onClick={() => {}}>Click Me</Title>);
    const element = screen.getByText(/Click Me/i);
    expect(element).toBeInTheDocument();
  });

  it("applies the correct variant class", () => {
    render(
      <Title variant="destructive" onClick={() => {}}>
        Delete
      </Title>
    );
    const element = screen.getByText(/Delete/i);
    expect(element).toHaveClass("bg-destructive");
  });
});