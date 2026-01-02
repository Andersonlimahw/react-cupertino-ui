import * as React from "react";
import { cn } from "@react-cupertino-ui/shared/lib/utils";
import "./index.scss";

export type SiriWaveformPalette = "multicolor" | "mono" | "ocean" | "sunset";
export type SiriWaveformMotion = "calm" | "pulse";

export interface SiriWaveformProps {
  active: boolean;
  className?: string;
  palette?: SiriWaveformPalette;
  color?: SiriWaveformPalette; // legacy alias
  size?: "sm" | "md" | "lg";
  motion?: SiriWaveformMotion;
  amplitude?: number;
}

const clampAmplitude = (value?: number) => {
  if (value === undefined) return 1;
  if (Number.isNaN(value)) return 1;
  return Math.min(Math.max(value, 0.5), 1.5);
};

const SiriWaveform = React.forwardRef<HTMLDivElement, SiriWaveformProps>(
  (
    {
      active,
      className,
      palette,
      color,
      size = "md",
      motion = "pulse",
      amplitude = 1,
      ...props
    },
    ref
  ) => {
    const resolvedPalette = palette ?? color ?? "multicolor";
    const waveformStyle = React.useMemo(
      () => ({ "--wave-amplitude": clampAmplitude(amplitude).toString() } as React.CSSProperties),
      [amplitude]
    );

    return (
      <div
        ref={ref}
        className={cn(
          "react-cupertino-ui-siri-waveform",
          active && "is-active",
          `palette-${resolvedPalette}`,
          `size-${size}`,
          `motion-${motion}`,
          className
        )}
        style={waveformStyle}
        role="presentation"
        {...props}
      >
        <div className="waveform-container">
            <div className="wave wave-1" />
            <div className="wave wave-2" />
            <div className="wave wave-3" />
        </div>
      </div>
    );
  }
);

SiriWaveform.displayName = "SiriWaveform";

export { SiriWaveform };
