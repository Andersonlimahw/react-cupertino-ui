import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CalendarHeatmap } from "@components/ui/CalendarHeatmap";

describe("CalendarHeatmap", () => {
  it("renders cells", () => {
    const data = [{ date: new Date().toISOString(), value: 1 }];
    const { container } = render(<CalendarHeatmap data={data} weeks={1} />);
    expect(container.querySelectorAll(".cell")).not.toHaveLength(0);
  });
});
