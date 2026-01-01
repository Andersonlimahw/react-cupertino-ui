import * as React from "react";
import { cn } from "@/lib/utils";
import "./index.scss";

export interface IntelligenceGlowProps {
  children: React.ReactNode;
  active: boolean;
  className?: string;
  intensity?: number;
}

const IntelligenceGlow = React.forwardRef<HTMLDivElement, IntelligenceGlowProps>(
  ({ children, active, className, intensity = 1, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "react-cupertino-ui-intelligence-glow",
          active && "is-active",
          className
        )}
        style={
            active && intensity !== 1 
            ? ({ "--glow-intensity": intensity } as React.CSSProperties) 
            : undefined
        }
        {...props}
      >
        <div className="glow-container" aria-hidden="true" />
        <div className="content-container">
            {children}
        </div>
      </div>
    );
  }
);

IntelligenceGlow.displayName = "IntelligenceGlow";

export { IntelligenceGlow };
