import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { EmptyStateTemplate } from "@components/templates/EmptyStateTemplate";

describe("EmptyStateTemplate", () => {
  it("renders icon and action", () => {
    render(
      <EmptyStateTemplate
        icon={<span>★</span>}
        title="Nothing here"
        description="Create your first item"
        action={{ label: "Create", onPress: () => {} }}
      />
    );
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument();
  });
});
