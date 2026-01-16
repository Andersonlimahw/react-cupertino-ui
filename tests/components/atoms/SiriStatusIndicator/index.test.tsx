import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiriStatusIndicator } from "@components/atoms/SiriStatusIndicator";

describe("SiriStatusIndicator", () => {
  it("renders three dots", () => {
    const { container } = render(<SiriStatusIndicator />);
    expect(container.querySelectorAll("span")).toHaveLength(3);
  });
});
