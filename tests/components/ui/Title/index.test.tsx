import { render, screen } from "@testing-library/react";
import { Title, TitleProps } from "@/components/ui/Title";

describe("Title Component", () => {
  it("renders correctly with default props", () => {
    render(<Title>Click Me</Title>);
    const element = screen.getByText(/Click Me/i);
    expect(element).toBeInTheDocument();
  });

  it("applies the correct variant class", () => {
    const props: TitleProps = {
      variant: "large",
    };
    render(<Title {...props}>Delete</Title>);
    const element = screen.getByText(/Delete/i);
    expect(element).toHaveClass("variant-large");
  });
});
