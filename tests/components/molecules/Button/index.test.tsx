import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "@/components/molecules/Button";

describe("Button", () => {
  it("renders with the glass variant by default", () => {
    render(<Button>Tap me</Button>);
    expect(screen.getByRole("button")).toHaveClass("variant-glass");
  });

  it("disables interactions while loading and shows the spinner", () => {
    render(<Button loading>Saving</Button>);
    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("data-loading", "true");
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Carregando");
  });

  it("toggles the pressed state with pointer events", () => {
    render(<Button>Press</Button>);
    const button = screen.getByRole("button");

    fireEvent.pointerDown(button);
    expect(button).toHaveAttribute("data-pressed", "true");

    fireEvent.pointerUp(button);
    expect(button).not.toHaveAttribute("data-pressed");
  });

  it("supports full-width layout", () => {
    render(<Button fullWidth>Continue</Button>);
    expect(screen.getByRole("button")).toHaveClass(
      "react-cupertino-ui-button--full"
    );
  });
});
