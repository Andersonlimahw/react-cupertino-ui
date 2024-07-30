import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

import "./index.scss";
import { cva } from "class-variance-authority";

export interface BaseTitleProps {
  className?: string;
  variant?: "large" | "heading" | "heading1" | "heading2" | "heading3";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
  children?: React.ReactNode | React.ReactNode[];
}

export interface TitleProps extends BaseTitleProps {
  asChild?: boolean;
}

const titleVariants = cva("react-cupertino-ui-title", {
  variants: {
    variant: {
      large: "variant-large",
      heading: "variant-heading",
      heading1: "variant-heading1",
      heading2: "variant-heading2",
      heading3: "variant-heading3",
    },
  },
  defaultVariants: {
    variant: "large",
  },
});

const Title: React.FC<TitleProps> = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: TitleProps) => {
  const Comp = asChild ? Slot : "h1";
  return (
    <Comp className={cn(titleVariants({ variant, className }))} {...props} />
  );
};
Title.displayName = "Title";
export { Title };
export type TitleVariantsTypes = typeof titleVariants;

export default Title;
