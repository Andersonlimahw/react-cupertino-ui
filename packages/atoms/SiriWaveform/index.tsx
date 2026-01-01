import * as React from "react";
import { cn } from "@react-cupertino-ui/shared/lib/utils";
import "./index.scss";

export interface SiriWaveformProps {
  active: boolean;
  className?: string;
  color?: "default" | "multicolor";
  size?: "sm" | "md" | "lg";
}

const SiriWaveform = React.forwardRef<HTMLDivElement, SiriWaveformProps>(
  ({ active, className, color = "multicolor", size = "md", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "react-cupertino-ui-siri-waveform",
          active && "is-active",
          `color-${color}`,
          `size-${size}`,
          className
        )}
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
