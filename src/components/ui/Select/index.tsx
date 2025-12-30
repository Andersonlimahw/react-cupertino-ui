import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

import "./index.scss";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

type NativeSelectAttributes = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  | "children"
  | "value"
  | "defaultValue"
  | "onChange"
  | "size"
  | "multiple"
  | "onFocus"
  | "onBlur"
  | "onKeyDown"
  | "onKeyUp"
>;

export interface SelectProps extends NativeSelectAttributes {
  className?: string;
  /**
   * Predefined set of options displayed in the dropdown.
   */
  options: SelectOption[];
  label?: string;
  helperText?: string;
  error?: string;
  placeholder?: string;
  size?: "default" | "sm" | "lg";
  variant?: "glass" | "solid" | "outline" | "default";
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onFocus?: React.FocusEventHandler<HTMLButtonElement>;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLButtonElement>;
}

const getFirstEnabledIndex = (options: SelectOption[]) =>
  options.findIndex((option) => !option.disabled);

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      options,
      placeholder = "Select an option",
      size = "default",
      variant = "glass",
      disabled = false,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      onKeyUp,
      id,
      ...nativeProps
    },
    ref
  ) => {
    const resolvedVariant = variant === "default" ? "glass" : variant;
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const triggerRef = React.useRef<HTMLButtonElement | null>(null);
    const optionRefs = React.useRef<Array<HTMLDivElement | null>>([]);

    const assignRootRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        rootRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref]
    );

    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState<string | undefined>(
      defaultValue
    );
    const [isOpen, setIsOpen] = React.useState(false);
    const selectedValue = isControlled ? value : internalValue;
    const selectedOption = options.find((option) => option.value === selectedValue);

    const listboxId = React.useId();
    const messageId = React.useId();

    const findOptionIndex = React.useCallback(
      (searchValue?: string) =>
        searchValue
          ? options.findIndex((option) => option.value === searchValue)
          : -1,
      [options]
    );

    const getInitialHighlight = React.useCallback(() => {
      const selectedIndex = findOptionIndex(selectedValue);
      if (selectedIndex >= 0 && !options[selectedIndex]?.disabled) {
        return selectedIndex;
      }
      return getFirstEnabledIndex(options);
    }, [findOptionIndex, options, selectedValue]);

    const [highlightedIndex, setHighlightedIndex] = React.useState<number>(() =>
      getInitialHighlight()
    );

    React.useEffect(() => {
      if (!isOpen) {
        return;
      }
      setHighlightedIndex(getInitialHighlight());
    }, [getInitialHighlight, isOpen, options.length]);

    React.useEffect(() => {
      if (!isOpen) {
        return undefined;
      }

      const handlePointerDown = (event: MouseEvent | TouchEvent) => {
        if (!rootRef.current) {
          return;
        }

        if (!rootRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener("pointerdown", handlePointerDown);
      return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, [isOpen]);

    React.useEffect(() => {
      if (!isOpen || highlightedIndex < 0) {
        return;
      }

      optionRefs.current[highlightedIndex]?.scrollIntoView({
        block: "nearest",
      });
    }, [highlightedIndex, isOpen]);

    const handleValueChange = (nextValue: string) => {
      if (!isControlled) {
        setInternalValue(nextValue);
      }
      onChange?.(nextValue);
    };

    const handleOptionSelect = (option: SelectOption) => {
      if (option.disabled) {
        return;
      }

      handleValueChange(option.value);
      setIsOpen(false);
      triggerRef.current?.focus();
    };

    const moveHighlight = (direction: 1 | -1) => {
      if (!options.length) {
        return;
      }

      let nextIndex = highlightedIndex;
      for (let attempt = 0; attempt < options.length; attempt += 1) {
        nextIndex = (nextIndex + direction + options.length) % options.length;
        if (!options[nextIndex]?.disabled) {
          setHighlightedIndex(nextIndex);
          break;
        }
      }
    };

    const selectHighlighted = () => {
      if (highlightedIndex < 0) {
        return;
      }
      const highlighted = options[highlightedIndex];
      if (highlighted) {
        handleOptionSelect(highlighted);
      }
    };

    const handleTriggerKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (
      event
    ) => {
      switch (event.key) {
        case "ArrowDown": {
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            moveHighlight(1);
          }
          break;
        }
        case "ArrowUp": {
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            moveHighlight(-1);
          }
          break;
        }
        case "Enter":
        case " ": {
          event.preventDefault();
          if (isOpen) {
            selectHighlighted();
          } else {
            setIsOpen(true);
          }
          break;
        }
        case "Escape": {
          if (isOpen) {
            event.preventDefault();
            setIsOpen(false);
          }
          break;
        }
        default:
      }

      onKeyDown?.(event);
    };

    const handleTriggerKeyUp: React.KeyboardEventHandler<HTMLButtonElement> = (
      event
    ) => {
      onKeyUp?.(event);
    };

    const handleTriggerFocus: React.FocusEventHandler<HTMLButtonElement> = (
      event
    ) => {
      onFocus?.(event);
    };

    const handleTriggerBlur: React.FocusEventHandler<HTMLButtonElement> = (
      event
    ) => {
      onBlur?.(event);
    };

    const messageToRender = error ?? helperText;
    const messageType = error ? "error" : helperText ? "helper" : undefined;
    const messageElementId = messageToRender ? `${messageId}-${messageType}` : undefined;
    const controlId = id ?? React.useId();
    const isPlaceholder = Boolean(!selectedOption && placeholder);

    const { autoFocus, ...restNativeProps } = nativeProps;

    return (
      <div
        ref={assignRootRef}
        className={cn(
          "react-cupertino-ui-select",
          `size-${size}`,
          className
        )}
        data-open={isOpen ? "true" : undefined}
        data-state={error ? "error" : undefined}
        data-disabled={disabled ? "true" : undefined}
      >
        {label && (
          <label className="react-cupertino-ui-select__label" htmlFor={controlId}>
            {label}
          </label>
        )}
        <div className="react-cupertino-ui-select__control">
          <button
            ref={triggerRef}
            type="button"
            id={controlId}
            className={cn(
              "react-cupertino-ui-select__trigger",
              `variant-${resolvedVariant}`,
              {
                "is-placeholder": isPlaceholder,
              }
            )}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-controls={listboxId}
            aria-describedby={messageElementId}
            aria-invalid={error ? "true" : undefined}
            aria-activedescendant={
              isOpen && highlightedIndex >= 0
                ? `${listboxId}-option-${highlightedIndex}`
                : undefined
            }
            role="combobox"
            disabled={disabled}
            data-open={isOpen ? "true" : undefined}
            onClick={() => (!disabled ? setIsOpen((prev) => !prev) : undefined)}
            onKeyDown={handleTriggerKeyDown}
            onKeyUp={handleTriggerKeyUp}
            onFocus={handleTriggerFocus}
            onBlur={handleTriggerBlur}
            autoFocus={autoFocus}
          >
            <span className="react-cupertino-ui-select__value">
              {selectedOption?.label ?? placeholder}
            </span>
            <ChevronDown className="react-cupertino-ui-select__chevron" aria-hidden="true" />
          </button>

          <div
            id={listboxId}
            role="listbox"
            className="react-cupertino-ui-select__dropdown"
            data-open={isOpen ? "true" : undefined}
          >
            {options.map((option, index) => (
              <div
                key={option.value}
                id={`${listboxId}-option-${index}`}
                role="option"
                ref={(node) => {
                  optionRefs.current[index] = node;
                }}
                aria-selected={selectedValue === option.value}
                data-disabled={option.disabled ? "true" : undefined}
                className={cn("react-cupertino-ui-select__option", {
                  "is-active": highlightedIndex === index,
                })}
                onMouseEnter={() =>
                  !option.disabled ? setHighlightedIndex(index) : undefined
                }
                onClick={() => handleOptionSelect(option)}
              >
                {option.label}
              </div>
            ))}
          </div>

          <select
            className="react-cupertino-ui-select__native"
            tabIndex={-1}
            aria-hidden="true"
            value={selectedValue ?? ""}
            disabled={disabled}
            {...restNativeProps}
            onChange={(event) => handleValueChange(event.target.value)}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {messageToRender && (
          <span
            id={messageElementId}
            className={cn(
              "react-cupertino-ui-select__message",
              messageType === "error" && "is-error"
            )}
            role={messageType === "error" ? "alert" : undefined}
          >
            {messageToRender}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };

export default Select;
