import { render, screen } from "@testing-library/react";
import { Slider } from "@/components/ui/Slider";

describe("Slider Component", () => {
  it("renders correctly", () => {
    const { container } = render(<Slider />);
    const slider = container.querySelector('input[type="range"]');
    expect(slider).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(<Slider label="Volume" />);
    const label = screen.getByText(/Volume/i);
    expect(label).toBeInTheDocument();
  });

  it("shows value when showValue is true", () => {
    render(<Slider showValue defaultValue={75} />);
    const value = screen.getByText("75");
    expect(value).toBeInTheDocument();
  });

  it("displays helper text", () => {
    render(<Slider helperText="Adjust the value" />);
    const helper = screen.getByText(/Adjust the value/i);
    expect(helper).toBeInTheDocument();
  });

  it("displays error message", () => {
    render(<Slider error="Value is too high" />);
    const error = screen.getByText(/Value is too high/i);
    expect(error).toBeInTheDocument();
    expect(error).toHaveClass("react-cupertino-ui-slider-error");
  });

  it("applies correct size class", () => {
    const { container } = render(<Slider size="lg" />);
    const sliderContainer = container.querySelector(".react-cupertino-ui-slider-container");
    expect(sliderContainer).toHaveClass("size-lg");
  });

  it("handles custom min and max", () => {
    const { container } = render(<Slider min={10} max={50} defaultValue={30} />);
    const slider = container.querySelector('input[type="range"]');
    expect(slider).toHaveAttribute("min", "10");
    expect(slider).toHaveAttribute("max", "50");
    expect(slider).toHaveAttribute("value", "30");
  });

  it("handles disabled state", () => {
    const { container } = render(<Slider disabled />);
    const slider = container.querySelector('input[type="range"]');
    expect(slider).toBeDisabled();
  });

  it("uses default value", () => {
    const { container } = render(<Slider defaultValue={60} />);
    const slider = container.querySelector('input[type="range"]');
    expect(slider).toHaveAttribute("value", "60");
  });
});
