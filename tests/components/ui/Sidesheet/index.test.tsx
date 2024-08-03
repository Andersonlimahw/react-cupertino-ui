import { render, screen } from "@testing-library/react";
import { Sidesheet } from "@/components/ui/Sidesheet";

describe("Sidesheet Component", () => {
  it("renders correctly with default props", () => {
    render(<Sidesheet onClick={() => {}}>Click Me</Sidesheet>);
    const element = screen.getByText(/Click Me/i);
    expect(element).toBeInTheDocument();
  });

  it("applies the correct variant class", () => {
    render(
      <Sidesheet variant="destructive" onClick={() => {}}>
        Delete
      </Sidesheet>
    );
    const element = screen.getByText(/Delete/i);
    expect(element).toHaveClass("variant-destructive");
  });

  it("applies the correct size class", () => {
    render(
      <Sidesheet variant="destructive" size="lg" onClick={() => {}}>
        Delete
      </Sidesheet>
    );
    const element = screen.getByText(/Delete/i);
    expect(element).toHaveClass("size-lg");
  });
});