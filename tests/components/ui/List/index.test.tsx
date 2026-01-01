import { render, screen, fireEvent } from "@testing-library/react";
import { List, ListItem } from "@components/ui/List";

describe("List Component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <List>
        <ListItem title="Item 1" />
      </List>
    );
    const list = container.querySelector(".react-cupertino-ui-list");
    expect(list).toBeInTheDocument();
  });

  it("renders multiple items", () => {
    render(
      <List>
        <ListItem title="Item 1" />
        <ListItem title="Item 2" />
        <ListItem title="Item 3" />
      </List>
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  it("applies variant class", () => {
    const { container } = render(
      <List variant="inset">
        <ListItem title="Item" />
      </List>
    );
    const list = container.querySelector(".react-cupertino-ui-list");
    expect(list).toHaveClass("variant-inset");
  });
});

describe("ListItem Component", () => {
  it("renders title", () => {
    render(<ListItem title="Test Item" />);
    expect(screen.getByText("Test Item")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(<ListItem title="Title" subtitle="Subtitle text" />);
    expect(screen.getByText("Subtitle text")).toBeInTheDocument();
  });

  it("renders right content", () => {
    render(<ListItem title="Title" rightContent="Right" />);
    expect(screen.getByText("Right")).toBeInTheDocument();
  });

  it("renders chevron when chevron prop is true", () => {
    const { container } = render(<ListItem title="Title" chevron />);
    const chevron = container.querySelector(".react-cupertino-ui-list-item-chevron");
    expect(chevron).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<ListItem title="Title" onClick={handleClick} />);

    const item = screen.getByText("Title").closest(".react-cupertino-ui-list-item");
    fireEvent.click(item!);

    expect(handleClick).toHaveBeenCalled();
  });

  it("does not call onClick when disabled", () => {
    const handleClick = jest.fn();
    render(<ListItem title="Title" onClick={handleClick} disabled />);

    const item = screen.getByText("Title").closest(".react-cupertino-ui-list-item");
    fireEvent.click(item!);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies disabled class", () => {
    const { container } = render(<ListItem title="Title" disabled />);
    const item = container.querySelector(".react-cupertino-ui-list-item");
    expect(item).toHaveClass("disabled");
  });

  it("applies clickable class when onClick is provided", () => {
    const { container } = render(
      <ListItem title="Title" onClick={() => {}} />
    );
    const item = container.querySelector(".react-cupertino-ui-list-item");
    expect(item).toHaveClass("clickable");
  });
});
