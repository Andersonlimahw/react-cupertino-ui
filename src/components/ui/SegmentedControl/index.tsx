import * as React from "react";
import { cn } from "@/lib/utils";

import "./index.scss";

export interface SegmentOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  className?: string;
  size?: "default" | "sm" | "lg";
  options: SegmentOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  fullWidth?: boolean;
  disabled?: boolean;
}

const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(
  (
    {
      className,
      size = "default",
      options,
      value,
      defaultValue,
      onChange,
      fullWidth = false,
      disabled = false,
    },
    ref
  ) => {
    const [selectedValue, setSelectedValue] = React.useState<string>(
      value || defaultValue || options[0]?.value || ""
    );

    const currentValue = value !== undefined ? value : selectedValue;

    const handleSelect = (optionValue: string, optionDisabled?: boolean) => {
      if (disabled || optionDisabled) return;

      setSelectedValue(optionValue);
      onChange?.(optionValue);
    };

    const selectedIndex = options.findIndex((opt) => opt.value === currentValue);

    return (
      <div
        ref={ref}
        className={cn(
          "react-cupertino-ui-segmented-control",
          `size-${size}`,
          {
            "full-width": fullWidth,
            disabled: disabled,
          },
          className
        )}
        role="tablist"
      >
        <div
          className="react-cupertino-ui-segmented-control-indicator"
          style={{
            transform: `translateX(${selectedIndex * 100}%)`,
            width: `${100 / options.length}%`,
          }}
        />
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={option.value === currentValue}
            disabled={disabled || option.disabled}
            className={cn("react-cupertino-ui-segmented-control-option", {
              active: option.value === currentValue,
              disabled: option.disabled,
            })}
            onClick={() => handleSelect(option.value, option.disabled)}
          >
            {option.icon && (
              <span className="react-cupertino-ui-segmented-control-icon">
                {option.icon}
              </span>
            )}
            <span className="react-cupertino-ui-segmented-control-label">
              {option.label}
            </span>
          </button>
        ))}
      </div>
    );
  }
);

SegmentedControl.displayName = "SegmentedControl";

export { SegmentedControl };

export default SegmentedControl;
