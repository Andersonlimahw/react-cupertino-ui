import { render } from "@testing-library/react";
import { SiriWaveform } from "@components/atoms/SiriWaveform";
import { describe, it, expect } from "vitest";

describe("SiriWaveform", () => {
  it("renders correctly", () => {
    const { container } = render(<SiriWaveform active={true} />);
    expect(container.firstChild).toHaveClass("react-cupertino-ui-siri-waveform");
    expect(container.firstChild).toHaveClass("is-active");
  });

  it("applies size class", () => {
    const { container } = render(<SiriWaveform active={true} size="lg" />);
    expect(container.firstChild).toHaveClass("size-lg");
  });

  it("supports palette and motion props", () => {
    const { container } = render(
      <SiriWaveform active palette="sunset" motion="calm" amplitude={1.3} />
    );
    expect(container.firstChild).toHaveClass("palette-sunset");
    expect(container.firstChild).toHaveClass("motion-calm");
    expect((container.firstChild as HTMLElement).style.getPropertyValue("--wave-amplitude")).toBe("1.3");
  });
});
