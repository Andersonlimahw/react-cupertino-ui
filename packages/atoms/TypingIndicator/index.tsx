import * as React from "react";
import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";
import "./index.scss";

export interface TypingIndicatorProps extends Omit<BaseProps<HTMLDivElement>, "children" | "size" | "color"> {
    size?: "sm" | "md";
    color?: "gray";
}

const TypingIndicator = React.forwardRef<HTMLDivElement, TypingIndicatorProps>(({ className, size = "md", color = "gray", ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "react-cupertino-ui-typing-indicator",
                `size-${size}`,
                `color-${color}`,
                className
            )}
            role="status"
            aria-label="Typing..."
            {...props}
        >
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
        </div>
    );
});

TypingIndicator.displayName = "TypingIndicator";

export { TypingIndicator };
