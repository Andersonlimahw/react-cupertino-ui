import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export interface BreadcrumbItem {
  id: string;
  label: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export interface BreadcrumbProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  items: BreadcrumbItem[];
  maxVisible?: number;
  glass?: boolean;
  separator?: React.ReactNode;
  onOverflowClick?: () => void;
}

const Breadcrumb = React.forwardRef<HTMLDivElement, BreadcrumbProps>((props, ref) => {
  const {
    items,
    maxVisible = 4,
    glass = true,
    separator = "›",
    className,
    onOverflowClick,
    ...rest
  } = props;

  const needsCollapse = items.length > maxVisible && maxVisible >= 3;
  const visibleItems = React.useMemo(() => {
    if (!needsCollapse) {
      return items;
    }
    const tailCount = maxVisible - 1;
    const tail = items.slice(-tailCount);
    return [items[0], ...tail];
  }, [items, maxVisible, needsCollapse]);

  const renderLink = (item: BreadcrumbItem, isLast: boolean) => {
    const content = (
      <span className="react-cupertino-ui-breadcrumb__label">
        {item.icon ? <span className="react-cupertino-ui-breadcrumb__icon" aria-hidden="true">{item.icon}</span> : null}
        {item.label}
      </span>
    );

    if (isLast || item.disabled) {
      return (
        <span
          key={item.id}
          className={cn("react-cupertino-ui-breadcrumb__item", isLast && "is-current")}
          aria-current={isLast ? "page" : undefined}
        >
          {content}
        </span>
      );
    }

    if (item.href) {
      return (
        <a
          key={item.id}
          className="react-cupertino-ui-breadcrumb__item"
          href={item.href}
          onClick={item.onClick}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        key={item.id}
        type="button"
        className="react-cupertino-ui-breadcrumb__item"
        onClick={item.onClick}
      >
        {content}
      </button>
    );
  };

  const overflowTrigger = needsCollapse ? (
    <button
      type="button"
      className="react-cupertino-ui-breadcrumb__overflow"
      onClick={onOverflowClick}
      aria-label="Show breadcrumb history"
    >
      …
    </button>
  ) : null;

  return (
    <nav
      ref={ref}
      className={cn("react-cupertino-ui-breadcrumb", glass && "glass", className)}
      aria-label="Breadcrumb"
      {...rest}
    >
      <ol className="react-cupertino-ui-breadcrumb__list">
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;

          if (needsCollapse && index === 1 && visibleItems.length > 2) {
            return (
              <li key="overflow" className="react-cupertino-ui-breadcrumb__segment">
                {overflowTrigger}
                <span className="react-cupertino-ui-breadcrumb__separator">{separator}</span>
              </li>
            );
          }

          if (needsCollapse && index > 1 && index < visibleItems.length - 1) {
            return null;
          }

          return (
            <li key={item.id} className="react-cupertino-ui-breadcrumb__segment">
              {renderLink(item, isLast)}
              {!isLast && <span className="react-cupertino-ui-breadcrumb__separator">{separator}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});

Breadcrumb.displayName = "Breadcrumb";

export { Breadcrumb };
