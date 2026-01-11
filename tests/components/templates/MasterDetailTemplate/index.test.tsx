import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { MasterDetailTemplate } from "@components/templates/MasterDetailTemplate";

describe("MasterDetailTemplate", () => {
  it("renders master and detail", () => {
    render(
      <MasterDetailTemplate master={<div>Left</div>} detail={<div>Right</div>} />
    );
    expect(screen.getByText("Left")).toBeInTheDocument();
    expect(screen.getByText("Right")).toBeInTheDocument();
  });
});
