import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export interface SiriShortcutChipProps
  extends Omit<BaseProps<HTMLButtonElement>, "children"> {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  tone?: "default" | "pink" | "blue" | "green";
}

const SiriShortcutChip = React.forwardRef<HTMLButtonElement, SiriShortcutChipProps>((props, ref) => {
  const { className, label, icon, active = false, tone = "default", ...rest } = props;

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "react-cupertino-ui-siri-shortcut-chip",
        `tone-${tone}`,
        active && "is-active",
        className
      )}
      {...rest}
    >
      {icon ? <span className="icon" aria-hidden="true">{icon}</span> : null}
      {label}
    </button>
  );
});

SiriShortcutChip.displayName = "SiriShortcutChip";

export { SiriShortcutChip };
