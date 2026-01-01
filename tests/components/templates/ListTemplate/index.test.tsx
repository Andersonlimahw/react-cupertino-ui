import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { ListTemplate } from "@components/templates/ListTemplate";

const items = [{ title: "One" }, { title: "Two" }];
const renderItem = (item: { title: string }) => <div>{item.title}</div>;

describe("ListTemplate", () => {
  it("renders header and items", () => {
    render(<ListTemplate title="Agenda" items={items} renderItem={renderItem} />);
    expect(screen.getByText("Agenda")).toBeInTheDocument();
    expect(screen.getByText("One")).toBeInTheDocument();
  });

  it("filters items when searchable", () => {
    render(<ListTemplate title="Search" items={items} renderItem={renderItem} searchable />);
    fireEvent.change(screen.getByPlaceholderText("Search"), { target: { value: "Two" } });
    expect(screen.queryByText("One")).not.toBeInTheDocument();
    expect(screen.getByText("Two")).toBeInTheDocument();
  });

  it("triggers refresh callback", async () => {
    const onRefresh = vi.fn();
    render(
      <ListTemplate title="Agenda" items={items} renderItem={renderItem} refreshable onRefresh={onRefresh} />
    );
    fireEvent.click(screen.getByText(/refresh/i));
    expect(onRefresh).toHaveBeenCalled();
  });
});
