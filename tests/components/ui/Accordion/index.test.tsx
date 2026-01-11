import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Accordion } from "@components/ui/Accordion";

const items = [
  { id: "one", title: "One", content: "Content 1" },
  { id: "two", title: "Two", content: "Content 2" },
];

describe("Accordion", () => {
  it("renders all headings", () => {
    render(<Accordion items={items} />);
    expect(screen.getByText("One")).toBeInTheDocument();
    expect(screen.getByText("Two")).toBeInTheDocument();
  });

  it("toggles panels", () => {
    render(<Accordion items={items} />);
    fireEvent.click(screen.getByRole("button", { name: /one/i }));
    expect(screen.getByText("Content 1")).toBeVisible();
  });

  it("single mode keeps one open", () => {
    render(<Accordion items={items} type="single" defaultValue={["one"]} />);
    fireEvent.click(screen.getByRole("button", { name: /two/i }));
    expect(screen.getByText("Content 1").parentElement).toHaveAttribute("hidden");
    expect(screen.getByText("Content 2")).toBeVisible();
  });
});
