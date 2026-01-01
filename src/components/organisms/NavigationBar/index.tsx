import * as React from "react";
import { cn } from "@/lib/utils";
import "./index.scss";
import { Button } from "@/components/molecules/Button";
import { ArrowLeft } from "lucide-react"; // Assuming lucide-react is available or I should check icons

export interface NavigationBarProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  subtitle?: string;
  leftItems?: React.ReactNode;
  rightItems?: React.ReactNode;
  large?: boolean;
  transparent?: boolean;
  scrolled?: boolean;
  withBackButton?: boolean;
  onBack?: () => void;
  backLabel?: string;
}

const NavigationBar = React.forwardRef<HTMLElement, NavigationBarProps>(
  (
    {
      className,
      title,
      subtitle,
      leftItems,
      rightItems,
      large = false,
      transparent = false,
      scrolled = false,
      withBackButton = false,
      onBack,
      backLabel = "Back",
      ...props
    },
    ref
  ) => {
    return (
      <nav
        ref={ref}
        className={cn(
          "react-cupertino-ui-navigation-bar",
          large && "large-title",
          transparent && "transparent",
          scrolled && "scrolled",
          className
        )}
        {...props}
      >
        <div className="react-cupertino-ui-navigation-bar__content">
          <div className="react-cupertino-ui-navigation-bar__left">
            {withBackButton && (
              <Button
                variant="ghost"
                size="sm"
                className="back-button"
                onClick={onBack}
                icon={<ArrowLeft size={20} />}
              >
                {backLabel}
              </Button>
            )}
            {leftItems}
          </div>

          <div className="react-cupertino-ui-navigation-bar__center">
            <span className="title-compact">{title}</span>
            {subtitle && <span className="subtitle">{subtitle}</span>}
          </div>

          <div className="react-cupertino-ui-navigation-bar__right">
            {rightItems}
          </div>
        </div>

        {large && (
          <div className="react-cupertino-ui-navigation-bar__large-title">
             <h1 className="title-large">{title}</h1>
          </div>
        )}
      </nav>
    );
  }
);

NavigationBar.displayName = "NavigationBar";

export { NavigationBar };
