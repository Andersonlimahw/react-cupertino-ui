import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

import "./index.scss";

export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: "default" | "inset";
  children: React.ReactNode;
}

export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  rightContent?: React.ReactNode;
  chevron?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const List = React.forwardRef<HTMLDivElement, ListProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "react-cupertino-ui-list",
          `variant-${variant}`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

List.displayName = "List";

const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  (
    {
      className,
      icon,
      title,
      subtitle,
      rightContent,
      chevron = false,
      disabled = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const isClickable = onClick !== undefined;

    return (
      <div
        ref={ref}
        className={cn(
          "react-cupertino-ui-list-item",
          {
            clickable: isClickable,
            disabled: disabled,
          },
          className
        )}
        onClick={disabled ? undefined : onClick}
        role={isClickable ? "button" : undefined}
        tabIndex={isClickable && !disabled ? 0 : undefined}
        {...props}
      >
        {icon && (
          <div className="react-cupertino-ui-list-item-icon">{icon}</div>
        )}
        <div className="react-cupertino-ui-list-item-content">
          <div className="react-cupertino-ui-list-item-title">{title}</div>
          {subtitle && (
            <div className="react-cupertino-ui-list-item-subtitle">
              {subtitle}
            </div>
          )}
        </div>
        {rightContent && (
          <div className="react-cupertino-ui-list-item-right">
            {rightContent}
          </div>
        )}
        {chevron && (
          <ChevronRight className="react-cupertino-ui-list-item-chevron" />
        )}
      </div>
    );
  }
);

ListItem.displayName = "ListItem";

export { List, ListItem };

export default List;
