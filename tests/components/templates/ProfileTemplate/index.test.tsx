import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { ProfileTemplate } from "@components/templates/ProfileTemplate";

describe("ProfileTemplate", () => {
  it("renders avatar and name", () => {
    render(
      <ProfileTemplate avatar="avatar.jpg" name="Alex" subtitle="Designer">
        <p>Content</p>
      </ProfileTemplate>
    );
    expect(screen.getByText("Alex")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
