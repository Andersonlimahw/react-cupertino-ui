import { render, screen } from "@testing-library/react";
import { Card } from "@/components/organisms/Card";

const getCardNode = (text: string) =>
  screen
    .getByText(text)
    .closest(".react-cupertino-ui-card") as HTMLElement | null;

describe("Card", () => {
  it("renders using the glass variant by default", () => {
    render(
      <Card>
        <span>Liquid Glass</span>
      </Card>
    );

    const card = getCardNode("Liquid Glass");
    expect(card).toHaveClass("variant-glass");
    expect(card).toHaveAttribute("data-glass", "true");
  });

  it("disables the glass treatment when requested", () => {
    render(
      <Card glass={false} variant="default">
        <span>Default Card</span>
      </Card>
    );

    const card = getCardNode("Default Card");
    expect(card).not.toHaveAttribute("data-glass");
    expect(card).toHaveClass("variant-default");
  });

  it("applies the provided blur token", () => {
    render(
      <Card blur="lg">
        <span>Blurred</span>
      </Card>
    );

    const card = getCardNode("Blurred");
    expect(card).toHaveStyle("--card-glass-blur: 48px");
  });

  it("sets background image variables", () => {
    render(
      <Card backgroundImage="linear-gradient(90deg, #0a84ff, #5ac8fa)">
        <span>Media</span>
      </Card>
    );

    const card = getCardNode("Media");
    expect(card).toHaveAttribute("data-has-background", "true");
    expect(card?.style.getPropertyValue("--card-background-image")).toContain(
      "linear-gradient"
    );
  });
});
