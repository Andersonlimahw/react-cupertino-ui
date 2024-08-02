import { render, screen } from "@testing-library/react";
import { Switcher } from "@/components/ui/Switcher";

describe("Switcher Component", () => {
  it("renders correctly with default props", () => {
    render(<Switcher data-testid="Switcher" />);
    const element = screen.getByTestId("Switcher");
    expect(element).toBeInTheDocument();
  });
});
