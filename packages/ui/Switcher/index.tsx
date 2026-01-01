"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@react-cupertino-ui/shared/lib/utils";

import "./index.scss";

export interface SwitcherProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  label?: string;
  helperText?: string;
  size?: "default" | "sm" | "lg";
}

const Switcher = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitcherProps
>((
  { className, label, helperText, size = "default", id, disabled, ...props },
  ref
) => {
  const generatedId = React.useId();
  const controlId = id ?? `switcher-${generatedId}`;
  const helperId = helperText ? `${controlId}-helper` : undefined;

  return (
    <label
      className={cn("react-cupertino-ui-switcher", `size-${size}`, className)}
      data-disabled={disabled ? "true" : undefined}
      htmlFor={controlId}
    >
      <SwitchPrimitives.Root
        id={controlId}
        ref={ref}
        className="react-cupertino-ui-switcher__control"
        {...props}
        disabled={disabled}
        aria-describedby={helperId}
      >
        <span className="react-cupertino-ui-switcher__track" aria-hidden="true" />
        <SwitchPrimitives.Thumb className="react-cupertino-ui-switcher__thumb">
          <span className="react-cupertino-ui-switcher__thumb-core" />
        </SwitchPrimitives.Thumb>
      </SwitchPrimitives.Root>

      {(label || helperText) && (
        <span className="react-cupertino-ui-switcher__text">
          {label && (
            <span className="react-cupertino-ui-switcher__label">{label}</span>
          )}
          {helperText && (
            <span id={helperId} className="react-cupertino-ui-switcher__helper">
              {helperText}
            </span>
          )}
        </span>
      )}
    </label>
  );
});
Switcher.displayName = "Switcher";

export { Switcher };
export default Switcher;
