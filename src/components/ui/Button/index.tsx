import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

import "./index.scss";
import { BaseProps } from "@/lib/interfaces/BaseProps";

const buttonVariants = cva("react-cupertino-ui-button", {
  variants: {
    variant: {
      default: "variant-default",
      destructive: "variant-destructive",
      outline: "variant-outline",
      secondary: "variant-secondary",
      ghost: "variant-ghost",
      link: "variant-link",
    },
    size: {
      default: "size-default",
      sm: "size-sm",
      lg: "size-lg",
      icon: "size-icon",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps extends BaseProps {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
