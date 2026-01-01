import * as React from "react";
import { cn } from "@react-cupertino-ui/shared/lib/utils";

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
  variant?: "glass" | "solid" | "outline";
  options: SegmentOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  fullWidth?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
}

const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(
  (
    {
      className,
      size = "default",
      variant = "glass",
      options,
      value,
      defaultValue,
      onChange,
      fullWidth = false,
      disabled = false,
      ariaLabel,
    },
    ref
  ) => {
    const initialValue = () => value ?? defaultValue ?? options[0]?.value ?? "";
    const [selectedValue, setSelectedValue] = React.useState<string>(initialValue);
    const isControlled = value !== undefined;
    const currentValue = isControlled ? (value as string) : selectedValue;

    React.useEffect(() => {
      if (!isControlled) {
        const exists = options.some((option) => option.value === selectedValue);
        if (!exists && options[0]) {
          setSelectedValue(options[0].value);
        }
      }
    }, [options, isControlled, selectedValue]);

    const handleSelect = (optionValue: string, optionDisabled?: boolean) => {
      if (disabled || optionDisabled || optionValue === currentValue) {
        return;
      }

      if (!isControlled) {
        setSelectedValue(optionValue);
      }
      onChange?.(optionValue);
    };

    if (!options.length) {
      return null;
    }

    const selectedIndex = Math.max(
      options.findIndex((opt) => opt.value === currentValue),
      0
    );
    const indicatorWidth = 100 / options.length;

    return (
      <div
        ref={ref}
        className={cn(
          "react-cupertino-ui-segmented-control",
          `size-${size}`,
          `variant-${variant}`,
          {
            "is-full-width": fullWidth,
          },
          className
        )}
        data-disabled={disabled ? "true" : undefined}
        role="tablist"
        aria-label={ariaLabel}
      >
        <div
          className="react-cupertino-ui-segmented-control__indicator"
          style={{
            width: `${indicatorWidth}%`,
            transform: `translateX(${selectedIndex * indicatorWidth}%)`,
          }}
        />
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={option.value === currentValue}
            aria-pressed={option.value === currentValue}
            disabled={disabled || option.disabled}
            className={cn("react-cupertino-ui-segmented-control__option", {
              "is-active": option.value === currentValue,
              "is-disabled": option.disabled,
            })}
            onClick={() => handleSelect(option.value, option.disabled)}
          >
            {option.icon && (
              <span className="react-cupertino-ui-segmented-control__icon">
                {option.icon}
              </span>
            )}
            <span className="react-cupertino-ui-segmented-control__label">
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
