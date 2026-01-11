"use client";

import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import "./index.scss";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import glassTokens from "@react-cupertino-ui/shared/lib/constants/tokens/glass";
import { Button, type ButtonProps } from "@react-cupertino-ui/button";

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

type GlassBlur = keyof typeof glassTokens.blur;
type DialogSize = "sm" | "md" | "lg";
type DialogTone = "default" | "destructive" | "success";

type OverlayCSSVars = React.CSSProperties & {
  "--dialog-overlay-blur"?: string;
  "--dialog-overlay-opacity"?: string;
};

type ContentCSSVars = React.CSSProperties & {
  "--dialog-glass-blur"?: string;
  "--dialog-glass-opacity"?: string;
};

interface AlertDialogOverlayProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay> {
  blur?: GlassBlur;
  overlayOpacity?: number;
}

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  AlertDialogOverlayProps
>(({ className, blur = "lg", overlayOpacity = 0.65, style, ...props }, ref) => {
  const clampedOpacity = Math.min(Math.max(overlayOpacity, 0), 1);
  const overlayStyle: OverlayCSSVars = {
    ...(style as OverlayCSSVars),
    "--dialog-overlay-blur": glassTokens.blur[blur],
    "--dialog-overlay-opacity": clampedOpacity.toString(),
  };

  return (
    <AlertDialogPrimitive.Overlay
      ref={ref}
      className={cn("react-cupertino-ui-dialog__overlay", className)}
      style={overlayStyle}
      {...props}
    />
  );
});
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

export interface AlertDialogContentProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> {
  glass?: boolean;
  blur?: GlassBlur;
  intensity?: number;
  size?: DialogSize;
  tone?: DialogTone;
}

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  AlertDialogContentProps
>(
  (
    {
      className,
      children,
      glass = true,
      blur = "lg",
      intensity,
      size = "md",
      tone = "default",
      style,
      ...props
    },
    ref
  ) => {
    const cssVars: ContentCSSVars = {
      ...(style as ContentCSSVars),
    };

    if (glass) {
      cssVars["--dialog-glass-blur"] = glassTokens.blur[blur];
    }

    if (typeof intensity === "number") {
      const clamped = Math.min(Math.max(intensity, 0), 1);
      cssVars["--dialog-glass-opacity"] = clamped.toString();
    }

    return (
      <AlertDialogPortal>
        <AlertDialogOverlay />
        <AlertDialogPrimitive.Content
          ref={ref}
          className={cn(
            "react-cupertino-ui-dialog__content",
            glass && "react-cupertino-ui-dialog__content--glass",
            `react-cupertino-ui-dialog__content--${size}`,
            className
          )}
          data-tone={tone}
          data-glass={glass ? "true" : undefined}
          style={cssVars}
          {...props}
        >
          {children}
        </AlertDialogPrimitive.Content>
      </AlertDialogPortal>
    );
  }
);
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("react-cupertino-ui-dialog__header", className)}
    {...props}
  />
));
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("react-cupertino-ui-dialog__footer", className)}
    {...props}
  />
));
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("react-cupertino-ui-dialog__title", className)}
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("react-cupertino-ui-dialog__description", className)}
    {...props}
  />
));
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName;

type DialogButtonOptions = Partial<
  Pick<ButtonProps, "size" | "fullWidth" | "loading" | "icon">
> & {
  buttonVariant?: ButtonProps["variant"];
  buttonClassName?: string;
};

interface AlertDialogActionProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>,
    DialogButtonOptions {}

interface AlertDialogCancelProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>,
    DialogButtonOptions {}

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  AlertDialogActionProps
>(
  (
    {
      className,
      children,
      size = "default",
      fullWidth = true,
      loading = false,
      icon,
      buttonVariant = "glass",
      buttonClassName,
      ...props
    },
    ref
  ) => (
    <AlertDialogPrimitive.Action ref={ref} asChild {...props}>
      <Button
        variant={buttonVariant}
        size={size}
        fullWidth={fullWidth}
        loading={loading}
        icon={icon}
        className={cn("react-cupertino-ui-dialog__button", buttonClassName, className)}
      >
        {children}
      </Button>
    </AlertDialogPrimitive.Action>
  )
);
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  AlertDialogCancelProps
>(
  (
    {
      className,
      children,
      size = "default",
      fullWidth = true,
      loading = false,
      icon,
      buttonVariant = "outline",
      buttonClassName,
      ...props
    },
    ref
  ) => (
    <AlertDialogPrimitive.Cancel ref={ref} asChild {...props}>
      <Button
        variant={buttonVariant}
        size={size}
        fullWidth={fullWidth}
        loading={loading}
        icon={icon}
        className={cn("react-cupertino-ui-dialog__button", buttonClassName, className)}
      >
        {children}
      </Button>
    </AlertDialogPrimitive.Cancel>
  )
);
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
