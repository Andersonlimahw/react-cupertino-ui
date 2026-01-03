import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

type SiriStatus = "listening" | "thinking" | "responding";

export interface SiriStatusIndicatorProps extends Omit<BaseProps<HTMLDivElement>, "children" | "size"> {
  status?: SiriStatus;
  size?: "sm" | "md" | "lg";
}

const SiriStatusIndicator = React.forwardRef<HTMLDivElement, SiriStatusIndicatorProps>((props, ref) => {
  const { className, status = "thinking", size = "md", ...rest } = props;

  return (
    <div
      ref={ref}
      className={cn(
        "react-cupertino-ui-siri-status-indicator",
        `status-${status}`,
        `size-${size}`,
        className
      )}
      {...rest}
    >
      <span /><span /><span />
    </div>
  );
});

SiriStatusIndicator.displayName = "SiriStatusIndicator";

export { SiriStatusIndicator };
