import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";
import { BaseProps, BaseVariants } from "@/lib/interfaces/BaseProps";

import "./index.scss";

export interface CardProps extends BaseProps {
  asChild?: boolean;
}

const Card: React.FC<CardProps> = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: CardProps) => {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      className={cn(
        BaseVariants("react-cupertino-ui-card", { variant, size, className })
      )}
      {...props}
    />
  );
};
Card.displayName = "Card";

export { Card };

export default Card;
