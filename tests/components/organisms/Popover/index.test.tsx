import { render, screen, fireEvent } from "@testing-library/react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/organisms/Popover";
import { describe, it, expect } from "vitest";

describe("Popover", () => {
  it("shows content when triggered", async () => {
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    );

    fireEvent.click(screen.getByText("Open"));
    
    // Popover content usually renders async or portal
    expect(await screen.findByText("Content")).toBeInTheDocument();
  });

  it("renders arrow by default", async () => {
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Arrow content</PopoverContent>
      </Popover>
    );

    fireEvent.click(screen.getByText("Open"));

    await screen.findByText("Arrow content");
    expect(document.querySelector('[data-element="popover-arrow"]')).not.toBeNull();
  });

  it("allows disabling the arrow", async () => {
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent showArrow={false}>No arrow</PopoverContent>
      </Popover>
    );

    fireEvent.click(screen.getByText("Open"));
    await screen.findByText("No arrow");
    expect(document.querySelector('[data-element="popover-arrow"]')).toBeNull();
  });
});
