import { render, screen } from "@testing-library/react";
import { TextField } from "@/components/ui/TextField";

describe("TextField Component", () => {
  it("renders correctly with default props", () => {
    render(<TextField placeholder="Enter text" />);
    const element = screen.getByPlaceholderText(/Enter text/i);
    expect(element).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(<TextField label="Email" placeholder="Enter email" />);
    const label = screen.getByText(/Email/i);
    expect(label).toBeInTheDocument();
  });

  it("displays error message", () => {
    render(
      <TextField
        label="Email"
        error="Invalid email"
        placeholder="Enter email"
      />
    );
    const error = screen.getByText(/Invalid email/i);
    expect(error).toBeInTheDocument();
    expect(error).toHaveClass("react-cupertino-ui-textfield-error");
  });

  it("displays helper text", () => {
    render(
      <TextField
        label="Username"
        helperText="Choose wisely"
        placeholder="Enter username"
      />
    );
    const helper = screen.getByText(/Choose wisely/i);
    expect(helper).toBeInTheDocument();
  });

  it("applies the correct variant class", () => {
    const { container } = render(
      <TextField variant="outline" placeholder="Test" />
    );
    const textfield = container.querySelector(".react-cupertino-ui-textfield");
    expect(textfield).toHaveClass("variant-outline");
  });

  it("applies the correct size class", () => {
    const { container } = render(
      <TextField size="lg" placeholder="Test" />
    );
    const textfield = container.querySelector(".react-cupertino-ui-textfield");
    expect(textfield).toHaveClass("size-lg");
  });

  it("handles disabled state", () => {
    render(<TextField disabled placeholder="Disabled" />);
    const input = screen.getByPlaceholderText(/Disabled/i);
    expect(input).toBeDisabled();
  });
});
