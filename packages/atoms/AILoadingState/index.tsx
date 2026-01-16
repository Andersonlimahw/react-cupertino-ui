import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export type AILoadingStateVariant = "thinking" | "generating" | "searching";

export interface AILoadingStateProps
  extends Omit<BaseProps<HTMLDivElement>, "children" | "variant" | "size"> {
  variant?: AILoadingStateVariant;
  message?: string;
}

const variantLabel: Record<AILoadingStateVariant, string> = {
  thinking: "Thinking",
  generating: "Generating",
  searching: "Searching",
};

const AILoadingState = React.forwardRef<HTMLDivElement, AILoadingStateProps>((props, ref) => {
  const { className, variant = "thinking", message, ...rest } = props;

  return (
    <div
      ref={ref}
      className={cn("react-cupertino-ui-ai-loading-state", `variant-${variant}`, className)}
      role="status"
      aria-live="polite"
      {...rest}
    >
      <div className="react-cupertino-ui-ai-loading-state__orb">
        <span /><span /><span />
      </div>
      <div className="react-cupertino-ui-ai-loading-state__text">
        <strong>{variantLabel[variant]}</strong>
        {message ? <span>{message}</span> : null}
      </div>
    </div>
  );
});

AILoadingState.displayName = "AILoadingState";

export { AILoadingState };
