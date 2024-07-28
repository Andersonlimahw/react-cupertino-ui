import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";
import { BaseProps, BaseVariants } from "@/lib/interfaces/BaseProps";

import "./index.scss";

export interface LabelProps extends BaseProps {
  asChild?: boolean;
}

const Label = React.forwardRef<LabelProps>(
  ({ className, variant, size, asChild = false, ...props }: LabelProps) => {
    const Comp = asChild ? Slot : "label";
    return (
      <Comp
        className={cn(BaseVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Label.displayName = "Label";

export { Label };

export default Label;
