import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { Select } from "@components/ui/Select";

const mockOptions = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3", disabled: true },
];

describe("Select", () => {
  it("renders the placeholder when no value is chosen", () => {
    render(<Select options={mockOptions} placeholder="Select..." />);

    expect(screen.getByRole("combobox")).toHaveTextContent("Select...");
  });

  it("opens the dropdown and allows selecting an option", () => {
    const handleChange = vi.fn();
    render(
      <Select
        options={mockOptions}
        placeholder="Pick one"
        onChange={handleChange}
      />
    );

    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("option", { name: "Option 2" }));

    expect(screen.getByRole("combobox")).toHaveTextContent("Option 2");
    expect(handleChange).toHaveBeenCalledWith("2");
  });

  it("marks the control as invalid when there is an error", () => {
    render(<Select options={mockOptions} error="Required" />);

    expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("prevents opening when disabled", () => {
    const { container } = render(<Select options={mockOptions} disabled placeholder="Disabled" />);

    fireEvent.click(screen.getByRole("combobox"));

    // The dropdown should not have data-open attribute when disabled
    const dropdown = container.querySelector(".react-cupertino-ui-select__dropdown");
    expect(dropdown).not.toHaveAttribute("data-open");
  });

  it("supports keyboard navigation", () => {
    render(<Select options={mockOptions} placeholder="Pick" />);

    const trigger = screen.getByRole("combobox");
    trigger.focus();

    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    fireEvent.keyDown(trigger, { key: "Enter" });

    expect(trigger).toHaveTextContent("Option 1");
  });
});
