import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ColorTokensViewer } from "@components/ui/ColorTokensViewer";

describe("ColorTokensViewer", () => {
  it("renders token names", () => {
    render(<ColorTokensViewer tokens={[{ name: "Token", value: "#000" }]} />);
    expect(screen.getByText("Token")).toBeInTheDocument();
  });
});
