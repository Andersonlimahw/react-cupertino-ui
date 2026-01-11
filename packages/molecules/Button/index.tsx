import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import { BaseProps, BaseVariants } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

type NativeButtonProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "color" | "className" | "children"
>;

export interface ButtonProps
  extends BaseProps<HTMLButtonElement>,
    NativeButtonProps {
  asChild?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "glass",
      size = "default",
      asChild = false,
      icon,
      loading = false,
      fullWidth = false,
      children,
      type = "button",
      onPointerDown,
      onPointerUp,
      onPointerLeave,
      onPointerCancel,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const [isPressed, setPressed] = React.useState(false);
    const isDisabled = Boolean(disabled || loading);

    const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
      setPressed(true);
      onPointerDown?.(event);
    };

    const handlePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
      setPressed(false);
      onPointerUp?.(event);
    };

    const handlePointerLeave = (event: React.PointerEvent<HTMLButtonElement>) => {
      setPressed(false);
      onPointerLeave?.(event);
    };

    const handlePointerCancel = (event: React.PointerEvent<HTMLButtonElement>) => {
      setPressed(false);
      onPointerCancel?.(event);
    };

    const classes = BaseVariants(
      "react-cupertino-ui-button",
      {
        variant,
        size,
        className: cn(
          fullWidth && "react-cupertino-ui-button--full",
          loading && "react-cupertino-ui-button--loading",
          className
        ),
      },
      {
        defaultVariants: {
          variant: "glass",
        },
      }
    );

    return (
      <Comp
        ref={ref}
        className={cn(classes)}
        type={!asChild ? type : undefined}
        data-pressed={isPressed ? "true" : undefined}
        data-loading={loading ? "true" : undefined}
        aria-busy={loading}
        disabled={!asChild ? isDisabled : undefined}
        aria-disabled={asChild && isDisabled ? "true" : undefined}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onPointerCancel={handlePointerCancel}
        {...props}
      >
        {loading && (
          <span
            className="react-cupertino-ui-button__spinner"
            role="status"
            aria-live="polite"
            aria-label="Carregando"
          />
        )}
        {icon && (
          <span className="react-cupertino-ui-button__icon" aria-hidden="true">
            {icon}
          </span>
        )}
        {children && (
          <span className="react-cupertino-ui-button__label">{children}</span>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button };
