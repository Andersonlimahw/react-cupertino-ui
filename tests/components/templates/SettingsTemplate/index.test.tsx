import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { SettingsTemplate } from "@components/templates/SettingsTemplate";

const groups = [
  {
    title: "Group",
    items: [{ type: "navigation" as const, label: "Wi-Fi" }],
  },
];

describe("SettingsTemplate", () => {
  it("renders title and groups", () => {
    render(<SettingsTemplate title="Settings" groups={groups} />);
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Wi-Fi")).toBeInTheDocument();
  });
});
