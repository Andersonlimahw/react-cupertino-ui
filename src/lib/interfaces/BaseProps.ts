import type React from "react";
import { cva } from "class-variance-authority";

export interface BaseProps<TElement = HTMLElement> {
  className?: string;
  variant?:
    | "default"
    | "glass"
    | "solid"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
  onClick?: React.MouseEventHandler<TElement>;
  children?: React.ReactNode;
}

type VariantClassMap = Record<string, string>;

interface VariantOverrideOptions {
  variants?: {
    variant?: VariantClassMap;
    size?: VariantClassMap;
  };
  defaultVariants?: {
    variant?: string;
    size?: string;
  };
}

interface VariantInput {
  className?: string;
  variant?: string | null;
  size?: string | null;
}

export const BaseVariants = (
  wrapperName: string,
  props: VariantInput,
  overrides?: VariantOverrideOptions
) => {
  const variantMap: VariantClassMap = {
    default: "variant-default",
    glass: "variant-glass",
    solid: "variant-solid",
    destructive: "variant-destructive",
    outline: "variant-outline",
    secondary: "variant-secondary",
    ghost: "variant-ghost",
    link: "variant-link",
    ...(overrides?.variants?.variant || {}),
  };

  const sizeMap: VariantClassMap = {
    default: "size-default",
    sm: "size-sm",
    lg: "size-lg",
    icon: "size-icon",
    ...(overrides?.variants?.size || {}),
  };

  const builder = cva(wrapperName, {
    variants: {
      variant: variantMap,
      size: sizeMap,
    },
    defaultVariants: {
      variant: overrides?.defaultVariants?.variant || "default",
      size: overrides?.defaultVariants?.size || "default",
    },
  });

  return builder({
    variant: props.variant || undefined,
    size: props.size || undefined,
    className: props.className,
  });
};
