import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export type AccordionValue = string[];
export type AccordionType = "single" | "multiple";
export type AccordionVariant = "glass" | "soft" | "minimal";

export interface AccordionItem {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  content: React.ReactNode;
  helper?: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps extends Omit<BaseProps<HTMLDivElement>, "children" | "variant"> {
  items: AccordionItem[];
  type?: AccordionType;
  defaultValue?: AccordionValue;
  value?: AccordionValue;
  onValueChange?: (value: AccordionValue) => void;
  variant?: AccordionVariant;
  glass?: boolean;
}

const normalize = (value: AccordionValue | undefined) => value ?? [];

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>((props, ref) => {
  const {
    className,
    items,
    type = "multiple",
    defaultValue,
    value,
    onValueChange,
    variant = "glass",
    glass = true,
    ...rest
  } = props;

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState<AccordionValue>(normalize(defaultValue));
  const expanded = isControlled ? normalize(value) : internalValue;

  const toggle = (id: string) => {
    const isOpen = expanded.includes(id);
    let next: AccordionValue;

    if (type === "single") {
      next = isOpen ? [] : [id];
    } else {
      next = isOpen ? expanded.filter((item) => item !== id) : [...expanded, id];
    }

    if (!isControlled) {
      setInternalValue(next);
    }
    onValueChange?.(next);
  };

  return (
    <div
      ref={ref}
      className={cn("react-cupertino-ui-accordion", glass && "glass", `variant-${variant}`, className)}
      {...rest}
    >
      {items.map((item) => {
        const isOpen = expanded.includes(item.id);
        return (
          <section
            key={item.id}
            className={cn(
              "react-cupertino-ui-accordion__item",
              isOpen && "is-open",
              item.disabled && "is-disabled"
            )}
          >
            <button
              type="button"
              className="react-cupertino-ui-accordion__trigger"
              onClick={() => !item.disabled && toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
              disabled={item.disabled}
            >
              <div>
                <p className="title">{item.title}</p>
                {item.description ? <p className="description">{item.description}</p> : null}
              </div>
              <span className="react-cupertino-ui-accordion__chevron" aria-hidden="true">
                ▾
              </span>
            </button>
            <div
              id={`accordion-panel-${item.id}`}
              className="react-cupertino-ui-accordion__content"
              hidden={!isOpen}
            >
              <div className="react-cupertino-ui-accordion__content-inner">{item.content}</div>
              {item.helper ? <p className="helper">{item.helper}</p> : null}
            </div>
          </section>
        );
      })}
    </div>
  );
});

Accordion.displayName = "Accordion";

export { Accordion };
