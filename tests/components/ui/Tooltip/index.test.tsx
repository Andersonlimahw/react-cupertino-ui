import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { SimpleTooltip } from "@components/ui/Tooltip";

describe("Tooltip", () => {
  it("renders trigger element", () => {
    render(
      <SimpleTooltip content="Tooltip text">
        <button>Hover me</button>
      </SimpleTooltip>
    );

    expect(screen.getByRole("button", { name: "Hover me" })).toBeInTheDocument();
  });
});
