import { render } from "@testing-library/react";
import { VoiceIndicator } from "@/components/atoms/VoiceIndicator";
import { describe, it, expect } from "vitest";

describe("VoiceIndicator", () => {
  it("renders correctly", () => {
    const { container } = render(<VoiceIndicator listening={false} />);
    expect(container.firstChild).toHaveClass("react-cupertino-ui-voice-indicator");
  });

  it("applies listening class", () => {
    const { container } = render(<VoiceIndicator listening={true} />);
    expect(container.firstChild).toHaveClass("is-listening");
  });
});
