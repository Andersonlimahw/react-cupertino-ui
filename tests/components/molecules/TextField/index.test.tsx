import { fireEvent, render, screen } from "@testing-library/react";

import { TextField } from "@components/molecules/TextField";

describe("TextField Component", () => {
  it("renders correctly with default props", () => {
    render(<TextField placeholder="Enter text" />);
    expect(screen.getByPlaceholderText(/Enter text/i)).toBeInTheDocument();
  });

  it("links the floating label with the input", () => {
    render(<TextField label="Email" placeholder="Enter email" />);
    const label = screen.getByText(/Email/i) as HTMLLabelElement;
    const input = screen.getByPlaceholderText(/Enter email/i);
    expect(label).toHaveAttribute("for", input.id);
  });

  it("raises the label when the field has content", () => {
    const { container } = render(
      <TextField label="Name" placeholder="Enter" defaultValue="Jane" />
    );
    const wrapper = container.querySelector(".react-cupertino-ui-textfield");
    expect(wrapper).toHaveAttribute("data-label", "raised");
  });

  it("displays helper and success messaging", () => {
    render(
      <>
        <TextField
          label="Username"
          helperText="Choose wisely"
          placeholder="Enter username"
        />
        <TextField label="Code" placeholder="123" success="Verified" />
      </>
    );

    expect(screen.getByText(/Choose wisely/i)).toHaveClass(
      "react-cupertino-ui-textfield__message"
    );
    const success = screen.getByText(/Verified/i);
    expect(success).toHaveClass("is-success");
  });

  it("displays error messaging with aria attributes", () => {
    render(
      <TextField label="Email" error="Invalid email" placeholder="Enter email" />
    );
    const error = screen.getByText(/Invalid email/i);
    expect(error).toHaveClass("react-cupertino-ui-textfield__message", "is-error");
    expect(error).toHaveAttribute("role", "alert");
    const input = screen.getByPlaceholderText(/Enter email/i);
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("applies the correct variant and size classes", () => {
    const { container } = render(
      <TextField variant="outline" size="lg" placeholder="Test" />
    );
    const textfield = container.querySelector(".react-cupertino-ui-textfield");
    expect(textfield).toHaveClass("variant-outline", "size-lg");
  });

  it("handles disabled state", () => {
    render(<TextField disabled placeholder="Disabled" />);
    expect(screen.getByPlaceholderText(/Disabled/i)).toBeDisabled();
  });

  it("updates filled state when typing", () => {
    const { container } = render(<TextField label="Name" placeholder="Full name" />);
    const input = screen.getByPlaceholderText(/Full name/i);
    const wrapper = container.querySelector(".react-cupertino-ui-textfield");
    fireEvent.change(input, { target: { value: "Jane" } });
    expect(wrapper).toHaveAttribute("data-label", "raised");
  });
});
