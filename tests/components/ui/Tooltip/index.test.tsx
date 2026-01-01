import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SimpleTooltip, Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@components/ui/Tooltip";

describe("Tooltip", () => {
  it("renders trigger element", () => {
    render(
      <SimpleTooltip content="Tooltip text">
        <button>Hover me</button>
      </SimpleTooltip>
    );

    expect(screen.getByRole("button", { name: "Hover me" })).toBeInTheDocument();
  });

  it("shows tooltip on hover", async () => {
    const user = userEvent.setup();
    render(
      <SimpleTooltip content="Tooltip text" delayDuration={0}>
        <button>Hover me</button>
      </SimpleTooltip>
    );

    const trigger = screen.getByRole("button", { name: "Hover me" });
    await user.hover(trigger);

    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    expect(screen.getByText("Tooltip text")).toBeInTheDocument();
  });

  it("hides tooltip on unhover", async () => {
    const user = userEvent.setup();
    render(
      <SimpleTooltip content="Tooltip text" delayDuration={0}>
        <button>Hover me</button>
      </SimpleTooltip>
    );

    const trigger = screen.getByRole("button", { name: "Hover me" });
    await user.hover(trigger);

    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    await user.unhover(trigger);

    await waitFor(() => {
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });

  it("applies glass class when glass prop is true", async () => {
    const user = userEvent.setup();
    render(
      <SimpleTooltip content="Tooltip text" delayDuration={0} glass={true}>
        <button>Hover me</button>
      </SimpleTooltip>
    );

    await user.hover(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toHaveClass("glass");
    });
  });

  it("does not apply glass class when glass prop is false", async () => {
    const user = userEvent.setup();
    render(
      <SimpleTooltip content="Tooltip text" delayDuration={0} glass={false}>
        <button>Hover me</button>
      </SimpleTooltip>
    );

    await user.hover(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByRole("tooltip")).not.toHaveClass("glass");
    });
  });

  it("supports composable API", async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button>Trigger</button>
          </TooltipTrigger>
          <TooltipContent>
            Content
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    await user.hover(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies tone modifier", async () => {
    const user = userEvent.setup();
    render(
      <SimpleTooltip content="Tone tooltip" delayDuration={0} tone="info">
        <button>Hover me</button>
      </SimpleTooltip>
    );

    await user.hover(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByRole("tooltip")).toHaveClass("tone-info");
    });
  });
});
