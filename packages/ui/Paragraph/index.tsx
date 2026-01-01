import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import { BaseProps, BaseVariants } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

export interface ParagraphProps extends BaseProps<HTMLParagraphElement> {
  asChild?: boolean;
}

const Paragraph: React.FC<ParagraphProps> = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ParagraphProps) => {
  const Comp = asChild ? Slot : "p";
  return (
    <Comp
      className={cn(
        BaseVariants("react-cupertino-ui-paragraph", {
          variant,
          size,
          className,
        })
      )}
      {...props}
    />
  );
};
Paragraph.displayName = "Paragraph";

export { Paragraph };

export default Paragraph;
