import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { DetailTemplate } from "@components/templates/DetailTemplate";

describe("DetailTemplate", () => {
  it("renders header and content", () => {
    render(
      <DetailTemplate title="Liquid Glass">
        <p>Content</p>
      </DetailTemplate>
    );
    expect(screen.getByText("Liquid Glass")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
