"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@react-cupertino-ui/shared/lib/utils";

import "./index.scss";

export interface SwitcherProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>, "children"> {
  label?: string;
  helperText?: string;
  size?: "default" | "sm" | "lg";
  align?: "start" | "center";
  glass?: boolean;
  hapticFeedback?: boolean;
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
  showStateLabel?: boolean;
}

const Switcher = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitcherProps>(
  (props, ref) => {
    const {
      className,
      label,
      helperText,
      size = "default",
      align = "center",
      glass = true,
      hapticFeedback = false,
      checkedIcon,
      uncheckedIcon,
      showStateLabel = false,
      id,
      disabled,
      checked: checkedProp,
      defaultChecked,
      onCheckedChange,
      ...rest
    } = props;

    const generatedId = React.useId();
    const controlId = id ?? `switcher-${generatedId}`;
    const labelId = label ? `${controlId}-label` : undefined;
    const helperId = helperText ? `${controlId}-helper` : undefined;

    const isControlled = checkedProp !== undefined;
    const [internalChecked, setInternalChecked] = React.useState(Boolean(defaultChecked));
    const checked = isControlled ? Boolean(checkedProp) : internalChecked;

    const vibrate = React.useCallback(() => {
      if (!hapticFeedback || typeof window === "undefined") {
        return;
      }
      try {
        window.navigator?.vibrate?.(6);
      } catch {
        // ignore when unsupported
      }
    }, [hapticFeedback]);

    const handleCheckedChange = (next: boolean) => {
      if (!isControlled) {
        setInternalChecked(next);
      }
      vibrate();
      onCheckedChange?.(next);
    };

    const activeIcon = checked ? checkedIcon : uncheckedIcon;

    return (
      <div
        className={cn(
          "react-cupertino-ui-switcher",
          `size-${size}`,
          `align-${align}`,
          glass && "glass",
          className
        )}
        data-disabled={disabled ? "true" : undefined}
        data-checked={checked ? "true" : undefined}
      >
        <SwitchPrimitives.Root
          id={controlId}
          ref={ref}
          className="react-cupertino-ui-switcher__control"
          checked={checked}
          defaultChecked={isControlled ? undefined : defaultChecked}
          disabled={disabled}
          aria-labelledby={labelId}
          aria-describedby={helperId}
          onCheckedChange={handleCheckedChange}
          {...rest}
        >
          <span className="react-cupertino-ui-switcher__track" aria-hidden="true" />
          <SwitchPrimitives.Thumb className="react-cupertino-ui-switcher__thumb">
            {showStateLabel ? (
              <span className="react-cupertino-ui-switcher__state" aria-hidden="true">
                {checked ? "ON" : "OFF"}
              </span>
            ) : null}
            {activeIcon ? (
              <span className="react-cupertino-ui-switcher__thumb-icon" aria-hidden="true">
                {activeIcon}
              </span>
            ) : (
              <span className="react-cupertino-ui-switcher__thumb-core" aria-hidden="true" />
            )}
          </SwitchPrimitives.Thumb>
        </SwitchPrimitives.Root>

        {(label || helperText) && (
          <span className="react-cupertino-ui-switcher__text">
            {label ? (
              <span id={labelId} className="react-cupertino-ui-switcher__label">
                {label}
              </span>
            ) : null}
            {helperText ? (
              <span id={helperId} className="react-cupertino-ui-switcher__helper">
                {helperText}
              </span>
            ) : null}
          </span>
        )}
      </div>
    );
  }
);
Switcher.displayName = "Switcher";

export { Switcher };
export default Switcher;
