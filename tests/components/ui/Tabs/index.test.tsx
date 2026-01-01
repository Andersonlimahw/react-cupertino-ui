import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@components/ui/Tabs";

describe("Tabs", () => {
  const setup = () =>
    render(
      <Tabs defaultValue="one">
        <TabsList>
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
          <TabsTrigger value="three">Three</TabsTrigger>
        </TabsList>
        <TabsContent value="one">Content 1</TabsContent>
        <TabsContent value="two">Content 2</TabsContent>
        <TabsContent value="three">Content 3</TabsContent>
      </Tabs>
    );

  it("renders triggers and default content", () => {
    setup();
    expect(screen.getByRole("tab", { name: "One" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Content 1")).toBeInTheDocument();
  });

  it("changes tabs on click", () => {
    setup();
    fireEvent.click(screen.getByRole("tab", { name: "Two" }));
    expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Content 2")).toBeInTheDocument();
  });

  it("supports keyboard navigation", () => {
    setup();
    const firstTab = screen.getByRole("tab", { name: "One" });
    firstTab.focus();
    fireEvent.keyDown(firstTab, { key: "ArrowRight" });
    expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute("aria-selected", "true");
  });
});
