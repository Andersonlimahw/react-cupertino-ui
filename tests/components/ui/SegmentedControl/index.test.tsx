import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { SegmentedControl } from "@components/ui/SegmentedControl";

const mockOptions = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

describe("SegmentedControl Component", () => {
  it("renders correctly with options", () => {
    render(<SegmentedControl options={mockOptions} />);
    const option1 = screen.getByText(/Option 1/i);
    const option2 = screen.getByText(/Option 2/i);
    const option3 = screen.getByText(/Option 3/i);
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
    expect(option3).toBeInTheDocument();
  });

  it("selects default value", () => {
    render(<SegmentedControl options={mockOptions} defaultValue="2" />);
    const option2 = screen.getByText(/Option 2/i);
    expect(option2.closest("button")).toHaveClass("is-active");
  });

  it("calls onChange when option is clicked", () => {
    const handleChange = vi.fn();
    render(<SegmentedControl options={mockOptions} onChange={handleChange} />);

    const option2 = screen.getByText(/Option 2/i);
    fireEvent.click(option2);

    expect(handleChange).toHaveBeenCalledWith("2");
  });

  it("applies correct size class", () => {
    const { container } = render(
      <SegmentedControl options={mockOptions} size="lg" />
    );
    const control = container.querySelector(".react-cupertino-ui-segmented-control");
    expect(control).toHaveClass("size-lg");
  });

  it("handles disabled state", () => {
    const handleChange = vi.fn();
    render(
      <SegmentedControl options={mockOptions} disabled onChange={handleChange} />
    );

    const option2 = screen.getByText(/Option 2/i);
    fireEvent.click(option2);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it("handles disabled option", () => {
    const handleChange = vi.fn();
    const optionsWithDisabled = [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2", disabled: true },
      { value: "3", label: "Option 3" },
    ];

    render(
      <SegmentedControl options={optionsWithDisabled} onChange={handleChange} />
    );

    const option2 = screen.getByText(/Option 2/i);
    fireEvent.click(option2);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it("applies full-width class when fullWidth is true", () => {
    const { container } = render(
      <SegmentedControl options={mockOptions} fullWidth />
    );
    const control = container.querySelector(".react-cupertino-ui-segmented-control");
    expect(control).toHaveClass("is-full-width");
  });

  it("works in controlled mode", () => {
    const { rerender } = render(
      <SegmentedControl options={mockOptions} value="1" />
    );

    const option1 = screen.getByText(/Option 1/i);
    expect(option1.closest("button")).toHaveClass("is-active");

    rerender(<SegmentedControl options={mockOptions} value="3" />);

    const option3 = screen.getByText(/Option 3/i);
    expect(option3.closest("button")).toHaveClass("is-active");
  });
});
