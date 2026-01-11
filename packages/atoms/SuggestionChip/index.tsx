import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import { BaseProps, BaseVariants } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

type NativeChipProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "color" | "className" | "children"
>;

export interface SuggestionChipProps
  extends BaseProps<HTMLButtonElement>,
    NativeChipProps {
  asChild?: boolean;
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  active?: boolean;
  loading?: boolean;
}

const chipClasses = (
  props: Pick<SuggestionChipProps, "variant" | "size" | "className"> & {
    active?: boolean;
    loading?: boolean;
    hasIcon?: boolean;
    hasTrailing?: boolean;
  }
) => {
  const { variant, size, className, active, loading, hasIcon, hasTrailing } = props;

  return BaseVariants(
    "react-cupertino-ui-suggestion-chip",
    {
      variant,
      size,
      className: cn(
        active && "is-active",
        loading && "is-loading",
        hasIcon && "has-icon",
        hasTrailing && "has-trailing-icon",
        className
      ),
    },
    {
      variants: {
        variant: {
          glass: "variant-glass",
          outline: "variant-outline",
          ghost: "variant-ghost",
          secondary: "variant-secondary",
          default: "variant-glass",
        },
        size: {
          default: "size-default",
          sm: "size-sm",
        },
      },
      defaultVariants: {
        variant: "glass",
        size: "default",
      },
    }
  );
};

const SuggestionChip = React.forwardRef<HTMLButtonElement, SuggestionChipProps>((props, ref) => {
  const {
    asChild = false,
    icon,
    trailingIcon,
    active = false,
    loading = false,
    disabled,
    children,
    className,
    variant,
    size,
    ...rest
  } = props;

  const Comp = asChild ? Slot : "button";
  const isDisabled = Boolean(disabled || loading);
  const classes = chipClasses({
    variant,
    size,
    className,
    active,
    loading,
    hasIcon: Boolean(icon),
    hasTrailing: Boolean(trailingIcon),
  });

  return (
    <Comp
      ref={ref}
      className={cn(classes)}
      data-active={active ? "true" : undefined}
      data-loading={loading ? "true" : undefined}
      disabled={!asChild ? isDisabled : undefined}
      aria-disabled={asChild && isDisabled ? "true" : undefined}
      {...rest}
    >
      {loading ? (
        <span className="react-cupertino-ui-suggestion-chip__spinner" aria-hidden="true" />
      ) : icon ? (
        <span className="react-cupertino-ui-suggestion-chip__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {children && (
        <span className="react-cupertino-ui-suggestion-chip__label">{children}</span>
      )}
      {trailingIcon ? (
        <span className="react-cupertino-ui-suggestion-chip__trailing" aria-hidden="true">
          {trailingIcon}
        </span>
      ) : null}
    </Comp>
  );
});

SuggestionChip.displayName = "SuggestionChip";

export { SuggestionChip };
