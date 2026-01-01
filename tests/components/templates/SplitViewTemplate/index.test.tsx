import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { SplitViewTemplate } from "@components/templates/SplitViewTemplate";

describe("SplitViewTemplate", () => {
  it("renders sidebar and content", () => {
    render(
      <SplitViewTemplate sidebar={<div>Sidebar</div>} content={<div>Main</div>} />
    );
    expect(screen.getByText("Sidebar")).toBeInTheDocument();
    expect(screen.getByText("Main")).toBeInTheDocument();
  });
});
