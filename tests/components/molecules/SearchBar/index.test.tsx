import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBar } from "@components/molecules/SearchBar";
import { describe, it, expect, vi } from "vitest";

describe("SearchBar", () => {
  it("renders correctly", () => {
    render(<SearchBar value="" onChangeValue={() => {}} />);
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("calls onChangeValue when typing", () => {
    const handleChange = vi.fn();
    render(<SearchBar value="" onChangeValue={handleChange} />);
    
    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "test" } });
    
    expect(handleChange).toHaveBeenCalledWith("test");
  });

  it("shows cancel button when focused", () => {
    render(<SearchBar value="" onChangeValue={() => {}} cancelLabel="Stop" />);
    
    const input = screen.getByPlaceholderText("Search");
    fireEvent.focus(input);
    
    const cancelButton = screen.getByText("Stop");
    // We check if it's reachable/visible logic
    // In CSS we hide it with margin, but in DOM it is present. 
    // We can check if class changes or just presence.
    expect(cancelButton).toBeInTheDocument();
    expect(input.closest(".react-cupertino-ui-search-bar")).toHaveClass("is-focused");
  });

  it("calls onCancel when cancel button clicked", () => {
    const handleCancel = vi.fn();
    render(<SearchBar value="" onChangeValue={() => {}} onCancel={handleCancel} />);
    
    const input = screen.getByPlaceholderText("Search");
    fireEvent.focus(input);
    
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    
    expect(handleCancel).toHaveBeenCalled();
  });

  it("displays suggestions when provided and focused", () => {
    render(<SearchBar value="Ap" onChangeValue={() => {}} suggestions={["Apple"]} />);
    const input = screen.getByPlaceholderText("Search");
    fireEvent.focus(input);
    
    expect(screen.getByText("Apple")).toBeInTheDocument();
  });
});
