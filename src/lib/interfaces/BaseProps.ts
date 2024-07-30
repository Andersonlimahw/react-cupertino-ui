import { cva } from "class-variance-authority";

export interface BaseProps {
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
  onClick?: () => void;
  children?: React.ReactNode | React.ReactNode[];
}
export const BaseVariants = (wrapperName: string, { ...restProps }) =>
  cva(wrapperName, {
    ...restProps,
    variants: {
      variant: {
        default: "variant-default",
        destructive: "variant-destructive",
        outline: "variant-outline",
        secondary: "variant-secondary",
        ghost: "variant-ghost",
        link: "variant-link",
        ...restProps.variant,
      },
      size: {
        default: "size-default",
        sm: "size-sm",
        lg: "size-lg",
        icon: "size-icon",
        ...restProps.size,
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  })(restProps);
