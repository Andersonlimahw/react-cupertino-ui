import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { MailDetailTemplate } from "@components/templates/MailDetailTemplate";

describe("MailDetailTemplate", () => {
  it("renders subject and body", () => {
    render(
      <MailDetailTemplate subject="Update" from="A" to="B">
        <p>Body</p>
      </MailDetailTemplate>
    );
    expect(screen.getByText("Update")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
  });
});
