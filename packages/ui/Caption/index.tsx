import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import { BaseProps, BaseVariants } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export interface CaptionProps extends BaseProps<HTMLTableCaptionElement> {
  asChild?: boolean;
}

const Caption: React.FC<CaptionProps> = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: CaptionProps) => {
  const Comp = asChild ? Slot : "caption";
  return (
    <Comp
      className={cn(
        BaseVariants("react-cupertino-ui-caption", {
          variant,
          size,
          className,
        })
      )}
      {...props}
    />
  );
};
Caption.displayName = "Caption";

export { Caption };

export default Caption;
