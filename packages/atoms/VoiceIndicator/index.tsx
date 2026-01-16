import * as React from "react";
import { cn } from "@react-cupertino-ui/shared/lib/utils";
import "./index.scss";

export interface VoiceIndicatorProps {
  listening: boolean;
  volume?: number; // 0 to 1
  className?: string;
}

const VoiceIndicator = React.forwardRef<HTMLDivElement, VoiceIndicatorProps>(
  ({ listening, volume = 0, className, ...props }, ref) => {
    // Map volume to scale (min 1, max ~1.5 or 2 depending on design)
    // Only apply volume scale if listening
    const scale = listening ? 1 + volume * 0.8 : 1;

    return (
      <div
        ref={ref}
        className={cn(
          "react-cupertino-ui-voice-indicator",
          listening && "is-listening",
          className
        )}
        style={
          {
            "--voice-scale": scale,
          } as React.CSSProperties
        }
        {...props}
      >
        <div className="voice-circle main-circle" />
        <div className="voice-circle ripple-1" />
        <div className="voice-circle ripple-2" />
      </div>
    );
  }
);

VoiceIndicator.displayName = "VoiceIndicator";

export { VoiceIndicator };
