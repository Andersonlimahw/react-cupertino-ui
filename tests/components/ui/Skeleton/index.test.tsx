import { render, screen } from "@testing-library/react";
import { Skeleton } from "@/components/ui/Skeleton";

describe("Skeleton Component", () => {
  it("renders correctly with default props", () => {
    render(<Skeleton onClick={() => {}}>Click Me</Skeleton>);
    const element = screen.getByText(/Click Me/i);
    expect(element).toBeInTheDocument();
  });

  it("applies the correct variant class", () => {
    render(<Skeleton>Delete</Skeleton>);
    const element = screen.getByText(/Delete/i);
    expect(element).toHaveClass("react-cupertino-ui-skeleton ");
  });
});
