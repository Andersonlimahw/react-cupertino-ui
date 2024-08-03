import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";
import { BaseProps, BaseVariants } from "@/lib/interfaces/BaseProps";

import "./index.scss";

export interface BadgeProps extends BaseProps {
  asChild?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: BadgeProps) => {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      className={cn(
        BaseVariants("react-cupertino-ui-badge", { variant, size, className })
      )}
      {...props}
    />
  );
};
Badge.displayName = "Badge";

export { Badge };

export default Badge;
