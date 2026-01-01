import { render, screen } from "@testing-library/react";

import Avatar from "@components/ui/Avatar";

describe("Avatar", () => {
  it("renders fallback initials", () => {
    render(<Avatar fallback="John Doe" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("displays status indicator", () => {
    const { container } = render(<Avatar status="online" fallback="Jane" />);
    expect(container.querySelector(".react-cupertino-ui-avatar__status")).toBeInTheDocument();
  });
});
