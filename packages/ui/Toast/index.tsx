import * as React from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@react-cupertino-ui/shared/lib/utils";

import "./index.scss";

export interface ToastProps {
  className?: string;
  variant?: "default" | "success" | "error" | "warning" | "info";
  title: string;
  description?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
  duration?: number;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
  glass?: boolean;
}

const variantIcons = {
  default: undefined,
  success: <CheckCircle />,
  error: <AlertCircle />,
  warning: <AlertTriangle />,
  info: <Info />,
};

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      className,
      variant = "default",
      title,
      description,
      icon,
      onClose,
      duration,
      position = "top-right",
      glass = true,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(true);

    React.useEffect(() => {
      if (duration && duration > 0) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => {
            onClose?.();
          }, 300); // Wait for animation
        }, duration);

        return () => clearTimeout(timer);
      }
    }, [duration, onClose]);

    const handleClose = () => {
      setIsVisible(false);
      setTimeout(() => {
        onClose?.();
      }, 300);
    };

    const displayIcon = icon || variantIcons[variant];

    if (!isVisible) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          "react-cupertino-ui-toast",
          `variant-${variant}`,
          `position-${position}`,
          glass && "is-glass",
          {
            "toast-exit": !isVisible,
          },
          className
        )}
        role="alert"
        {...props}
      >
        {displayIcon && (
          <div className="react-cupertino-ui-toast-icon">{displayIcon}</div>
        )}
        <div className="react-cupertino-ui-toast-content">
          <div className="react-cupertino-ui-toast-title">{title}</div>
          {description && (
            <div className="react-cupertino-ui-toast-description">
              {description}
            </div>
          )}
        </div>
        {onClose && (
          <button
            className="react-cupertino-ui-toast-close"
            onClick={handleClose}
            aria-label="Close notification"
          >
            <X />
          </button>
        )}
      </div>
    );
  }
);

Toast.displayName = "Toast";

export { Toast };

export default Toast;
