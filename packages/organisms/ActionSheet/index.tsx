"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import "./index.scss";

const ActionSheetRoot = DialogPrimitive.Root;
const ActionSheetTrigger = DialogPrimitive.Trigger;
const ActionSheetPortal = DialogPrimitive.Portal;

const ActionSheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn("react-cupertino-ui-action-sheet__overlay", className)}
    {...props}
  />
));
ActionSheetOverlay.displayName = DialogPrimitive.Overlay.displayName;

interface ActionSheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  glass?: boolean;
}

const ActionSheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ActionSheetContentProps
>(({ className, children, glass = true, ...props }, ref) => (
  <ActionSheetPortal>
    <ActionSheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "react-cupertino-ui-action-sheet__content",
        glass && "glass",
        className
      )}
      {...props}
    >
      <div className="react-cupertino-ui-action-sheet__group">
        {children}
      </div>
    </DialogPrimitive.Content>
  </ActionSheetPortal>
));
ActionSheetContent.displayName = DialogPrimitive.Content.displayName;

const ActionSheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("react-cupertino-ui-action-sheet__title", className)}
    {...props}
  />
));
ActionSheetTitle.displayName = DialogPrimitive.Title.displayName;

const ActionSheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("react-cupertino-ui-action-sheet__description", className)}
    {...props}
  />
));
ActionSheetDescription.displayName = DialogPrimitive.Description.displayName;

interface ActionSheetActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  destructive?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
  icon?: React.ReactNode;
}

const ActionSheetAction = React.forwardRef<HTMLButtonElement, ActionSheetActionProps>(
  ({ className, destructive, disabled, onSelect, icon, children, ...props }, ref) => {
    return (
        <DialogPrimitive.Close asChild>
            <button
                ref={ref}
                type="button"
                className={cn(
                "react-cupertino-ui-action-sheet__action",
                destructive && "destructive",
                className
                )}
                disabled={disabled}
                onClick={onSelect}
                {...props}
            >
                {icon && <span className="action-icon">{icon}</span>}
                <span className="action-label">{children}</span>
            </button>
        </DialogPrimitive.Close>
    );
  }
);
ActionSheetAction.displayName = "ActionSheetAction";

interface ActionSheetCancelProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ActionSheetCancel = React.forwardRef<HTMLButtonElement, ActionSheetCancelProps>(
  ({ className, children, ...props }, ref) => {
    return (
        <DialogPrimitive.Close asChild>
            <button
                ref={ref}
                type="button"
                className={cn(
                "react-cupertino-ui-action-sheet__cancel",
                className
                )}
                {...props}
            >
                {children}
            </button>
        </DialogPrimitive.Close>
    );
  }
);
ActionSheetCancel.displayName = "ActionSheetCancel";

// Helper component for Header/Message area
const ActionSheetHeader = ({ className, children }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("react-cupertino-ui-action-sheet__header", className)}>
        {children}
    </div>
);

export {
  ActionSheetRoot as ActionSheet,
  ActionSheetTrigger,
  ActionSheetContent,
  ActionSheetAction,
  ActionSheetCancel,
  ActionSheetTitle,
  ActionSheetDescription,
  ActionSheetHeader,
};
