import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import "./index.scss";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  glass?: boolean;
  showArrow?: boolean;
  arrowSize?: number;
  arrowOffset?: number;
}

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(
  (
    {
      className,
      align = "center",
      sideOffset = 8,
      glass = true,
      showArrow = true,
      arrowSize = 14,
      arrowOffset = 8,
      children,
      ...props
    },
    ref
  ) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "react-cupertino-ui-popover__content",
          glass && "glass",
          showArrow && "has-arrow",
          className
        )}
        {...props}
      >
        {children}
        {showArrow && (
          <PopoverPrimitive.Arrow
            width={arrowSize}
            height={arrowSize}
            offset={arrowOffset}
            data-element="popover-arrow"
            className={cn(
              "react-cupertino-ui-popover__arrow",
              glass && "glass"
            )}
          />
        )}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
