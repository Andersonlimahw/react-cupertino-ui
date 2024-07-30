import { render, screen } from "@testing-library/react";
import { Headline } from "@/components/ui/Headline";

describe("Headline Component", () => {
  it("renders correctly with default props", () => {
    render(<Headline onClick={() => {}}>Click Me</Headline>);
    const element = screen.getByText(/Click Me/i);
    expect(element).toBeInTheDocument();
  });

  it("applies the correct variant class", () => {
    render(
      <Headline variant="destructive" onClick={() => {}}>
        Delete
      </Headline>
    );
    const element = screen.getByText(/Delete/i);
    expect(element).toHaveClass("variant-destructive");
  });
});
