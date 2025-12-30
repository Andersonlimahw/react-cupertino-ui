import { render, screen } from "@testing-library/react";

import { Badge } from "@/components/ui/Badge";

describe("Badge", () => {
  it("renders with content", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("supports icons", () => {
    render(<Badge startIcon={<span data-testid="icon">*</span>}>Info</Badge>);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });
});
