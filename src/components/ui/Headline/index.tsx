import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";
import { BaseProps, BaseVariants } from "@/lib/interfaces/BaseProps";

import "./index.scss";

export interface HeadlineProps extends BaseProps {
  asChild?: boolean;
}

const Headline: React.FC<HeadlineProps> = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: HeadlineProps) => {
  const Comp = asChild ? Slot : "h4";
  return (
    <Comp
      className={cn(
        BaseVariants("react-cupertino-ui-headline ", {
          variant,
          size,
          className,
        })
      )}
      {...props}
    />
  );
};
Headline.displayName = "Headline";

export { Headline };

export default Headline;
