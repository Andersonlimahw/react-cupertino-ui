"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@react-cupertino-ui/shared/lib/utils";

import "./index.scss";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

type TooltipSide = "top" | "right" | "bottom" | "left";
type TooltipAlign = "start" | "center" | "end";
type TooltipTone = "neutral" | "info" | "success" | "warning" | "critical";
type TooltipSize = "sm" | "md";
type TooltipMotion = "shift" | "scale";

interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  glass?: boolean;
  tone?: TooltipTone;
  size?: TooltipSize;
  motion?: TooltipMotion;
  arrow?: boolean;
}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>((
  {
    className,
    sideOffset = 8,
    glass = true,
    tone = "neutral",
    size = "md",
    motion = "shift",
    arrow = true,
    children,
    ...props
  },
  ref
) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "react-cupertino-ui-tooltip",
        glass && "glass",
        `tone-${tone}`,
        `size-${size}`,
        `motion-${motion}`,
        className
      )}
      data-tone={tone}
      data-motion={motion}
      {...props}
    >
      {children}
      {arrow ? <TooltipArrow tone={tone} glass={glass} /> : null}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

interface TooltipArrowProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow> {
  tone?: TooltipTone;
  glass?: boolean;
}

const TooltipArrow = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Arrow>,
  TooltipArrowProps
>(({ className, tone = "neutral", glass = true, ...props }, ref) => (
  <TooltipPrimitive.Arrow
    ref={ref}
    className={cn(
      "react-cupertino-ui-tooltip__arrow",
      glass && "glass",
      `tone-${tone}`,
      className
    )}
    {...props}
  />
));
TooltipArrow.displayName = TooltipPrimitive.Arrow.displayName;

interface SimpleTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: TooltipSide;
  align?: TooltipAlign;
  delayDuration?: number;
  glass?: boolean;
  arrow?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  tone?: TooltipTone;
  size?: TooltipSize;
  motion?: TooltipMotion;
  sideOffset?: number;
}

const SimpleTooltip = ({
  children,
  content,
  side = "top",
  align = "center",
  delayDuration = 200,
  glass = true,
  arrow = true,
  open,
  defaultOpen,
  onOpenChange,
  tone,
  size,
  motion,
  sideOffset,
}: SimpleTooltipProps) => (
  <TooltipProvider delayDuration={delayDuration}>
    <Tooltip open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side={side}
        align={align}
        glass={glass}
        tone={tone}
        size={size}
        motion={motion}
        arrow={arrow}
        sideOffset={sideOffset}
      >
        {content}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
SimpleTooltip.displayName = "SimpleTooltip";

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
  TooltipProvider,
  SimpleTooltip,
};

export type { TooltipContentProps, SimpleTooltipProps };
