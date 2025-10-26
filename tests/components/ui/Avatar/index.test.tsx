import { render, screen } from "@testing-library/react";
import { Avatar } from "@/components/ui/Avatar";
import { Settings } from "lucide-react";

describe("Avatar Component", () => {
  it("renders correctly", () => {
    const { container } = render(<Avatar />);
    const avatar = container.querySelector(".react-cupertino-ui-avatar");
    expect(avatar).toBeInTheDocument();
  });

  it("displays image when src is provided", () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="Test" />);
    const image = screen.getByAltText("Test");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/avatar.jpg");
  });

  it("displays fallback initials", () => {
    render(<Avatar fallback="John Doe" />);
    const fallback = screen.getByText("JD");
    expect(fallback).toBeInTheDocument();
  });

  it("displays single initial for single name", () => {
    render(<Avatar fallback="John" />);
    const fallback = screen.getByText("J");
    expect(fallback).toBeInTheDocument();
  });

  it("displays custom icon when provided", () => {
    const { container } = render(<Avatar icon={<Settings data-testid="settings-icon" />} />);
    const icon = container.querySelector('[data-testid="settings-icon"]');
    expect(icon).toBeInTheDocument();
  });

  it("applies correct size class", () => {
    const { container } = render(<Avatar size="lg" />);
    const avatar = container.querySelector(".react-cupertino-ui-avatar");
    expect(avatar).toHaveClass("size-lg");
  });

  it("applies correct shape class", () => {
    const { container } = render(<Avatar shape="rounded" />);
    const avatar = container.querySelector(".react-cupertino-ui-avatar");
    expect(avatar).toHaveClass("shape-rounded");
  });

  it("shows fallback when image fails to load", () => {
    const { container } = render(
      <Avatar src="invalid-url.jpg" fallback="Test User" />
    );

    const image = container.querySelector("img");
    if (image) {
      // Simulate image load error
      const errorEvent = new Event("error");
      image.dispatchEvent(errorEvent);
    }

    const fallback = screen.getByText("TU");
    expect(fallback).toBeInTheDocument();
  });

  it("renders default icon when no src, fallback, or icon provided", () => {
    const { container } = render(<Avatar />);
    const defaultIcon = container.querySelector(".react-cupertino-ui-avatar-default-icon");
    expect(defaultIcon).toBeInTheDocument();
  });

  it("truncates fallback to 2 characters", () => {
    render(<Avatar fallback="John Jacob Doe Smith" />);
    const fallback = screen.getByText("JJ");
    expect(fallback).toBeInTheDocument();
  });
});
