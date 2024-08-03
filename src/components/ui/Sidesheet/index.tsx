import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";
import { BaseProps, BaseVariants } from "@/lib/interfaces/BaseProps";

import "./index.scss";

export interface SidesheetProps extends BaseProps {
  asChild?: boolean;
}

const Sidesheet: React.FC<SidesheetProps> = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: SidesheetProps) => {
  const Comp = asChild ? Slot : "aside";
  return (
    <Comp
      className={cn(
        BaseVariants("react-cupertino-ui-sidesheet", {
          variant,
          size,
          className,
        })
      )}
      {...props}
    />
  );
};
Sidesheet.displayName = "Sidesheet";

export { Sidesheet };

export default Sidesheet;
