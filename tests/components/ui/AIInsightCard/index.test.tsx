import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AIInsightCard } from "@components/ui/AIInsightCard";

describe("AIInsightCard", () => {
  it("renders title and description", () => {
    render(<AIInsightCard title="Insight" description="Details" />);
    expect(screen.getByText("Insight")).toBeInTheDocument();
    expect(screen.getByText("Details")).toBeInTheDocument();
  });
});
