import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export interface SegmentedTabsOption {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedTabsProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  options: SegmentedTabsOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  glass?: boolean;
}

const SegmentedTabs = React.forwardRef<HTMLDivElement, SegmentedTabsProps>((props, ref) => {
  const {
    className,
    options,
    value,
    defaultValue,
    onValueChange,
    glass = true,
    ...rest
  } = props;

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(() => defaultValue ?? options[0]?.id);
  const currentValue = isControlled ? value : internalValue;

  const select = (next: string) => {
    if (!isControlled) {
      setInternalValue(next);
    }
    onValueChange?.(next);
  };

  const activeOption = options.find((option) => option.id === currentValue) ?? options[0];

  return (
    <div ref={ref} className={cn("react-cupertino-ui-segmented-tabs", glass && "glass", className)} {...rest}>
      <div className="react-cupertino-ui-segmented-tabs__control" role="tablist">
        {options.map((option) => {
          const isActive = option.id === currentValue;
          return (
            <button
              key={option.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={cn(
                "react-cupertino-ui-segmented-tabs__trigger",
                isActive && "is-active",
                option.disabled && "is-disabled"
              )}
              onClick={() => !option.disabled && select(option.id)}
              disabled={option.disabled}
            >
              {option.icon ? <span className="icon" aria-hidden="true">{option.icon}</span> : null}
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
      <div className="react-cupertino-ui-segmented-tabs__content" role="tabpanel">
        {activeOption?.content}
      </div>
    </div>
  );
});

SegmentedTabs.displayName = "SegmentedTabs";

export { SegmentedTabs };
