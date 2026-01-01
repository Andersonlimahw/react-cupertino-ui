import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "@react-cupertino-ui/shared/lib/utils";

import "./index.scss";

const DEFAULT_SNAP_POINTS = [0.25, 0.5, 0.9];

type BottomSheetContextValue = {
  requestClose?: () => void;
};

const BottomSheetContext = React.createContext<BottomSheetContextValue | null>(null);

export const BottomSheetTrigger = DialogPrimitive.Trigger;
export const BottomSheetClose = DialogPrimitive.Close;
export const BottomSheetPortal = DialogPrimitive.Portal;

export const BottomSheet = ({
  children,
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: DialogPrimitive.DialogProps) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false);
  const isControlled = open !== undefined;
  const currentOpen = isControlled ? open : internalOpen;

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setInternalOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  const requestClose = React.useCallback(() => handleOpenChange(false), [handleOpenChange]);
  const contextValue = React.useMemo(() => ({ requestClose }), [requestClose]);

  return (
    <DialogPrimitive.Root open={currentOpen} onOpenChange={handleOpenChange} {...props}>
      <BottomSheetContext.Provider value={contextValue}>{children}</BottomSheetContext.Provider>
    </DialogPrimitive.Root>
  );
};

const BottomSheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn("react-cupertino-ui-bottom-sheet__overlay", className)}
    {...props}
  />
));
BottomSheetOverlay.displayName = DialogPrimitive.Overlay.displayName;

interface BottomSheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  snapPoints?: number[];
  initialSnap?: number;
  handle?: boolean;
  glass?: boolean;
  onSnapChange?: (value: number, index: number) => void;
}

const clampRatio = (value: number) => Math.min(1, Math.max(0, value));

const useBottomSheetContext = () => React.useContext(BottomSheetContext);

const BottomSheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  BottomSheetContentProps
>(({ className, children, snapPoints, initialSnap, handle = true, glass = true, onSnapChange, ...props }, ref) => {
  const context = useBottomSheetContext();
  const sanitizedSnapPoints = React.useMemo(() => {
    const points = (snapPoints && snapPoints.length ? snapPoints : DEFAULT_SNAP_POINTS)
      .map((point) => clampRatio(point))
      .filter((point) => point > 0)
      .sort((a, b) => a - b);

    return points.length ? points : DEFAULT_SNAP_POINTS;
  }, [snapPoints]);

  const getNearestSnapIndex = React.useCallback(
    (value: number) => {
      let nearestIndex = 0;
      sanitizedSnapPoints.forEach((point, index) => {
        const currentDiff = Math.abs(point - value);
        const bestDiff = Math.abs(sanitizedSnapPoints[nearestIndex] - value);
        if (currentDiff < bestDiff) {
          nearestIndex = index;
        }
      });
      return nearestIndex;
    },
    [sanitizedSnapPoints]
  );

  const initialIndex = React.useMemo(() => {
    if (typeof initialSnap === "number") {
      return getNearestSnapIndex(clampRatio(initialSnap));
    }
    return sanitizedSnapPoints.length - 1;
  }, [getNearestSnapIndex, initialSnap, sanitizedSnapPoints.length]);

  const [currentSnapIndex, setCurrentSnapIndex] = React.useState(initialIndex);
  const [dragOffset, setDragOffset] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);

  React.useEffect(() => {
    setCurrentSnapIndex(initialIndex);
  }, [initialIndex]);

  React.useEffect(() => {
    const value = sanitizedSnapPoints[currentSnapIndex];
    if (typeof value === "number") {
      onSnapChange?.(value, currentSnapIndex);
    }
  }, [currentSnapIndex, onSnapChange, sanitizedSnapPoints]);

  const handlePointerDown = React.useCallback(
    (event: React.PointerEvent<HTMLButtonElement | HTMLDivElement>) => {
      if (event.button && event.button !== 0) {
        return;
      }

      event.preventDefault();
      const startY = event.clientY;
      const baseSnap = sanitizedSnapPoints[currentSnapIndex] ?? sanitizedSnapPoints[0];
      setIsDragging(true);

      const handleMove = (moveEvent: PointerEvent) => {
        const delta = moveEvent.clientY - startY;
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
        setDragOffset(delta / viewportHeight);
      };

      const cleanup = () => {
        setIsDragging(false);
        setDragOffset(0);
        window.removeEventListener("pointermove", handleMove);
        window.removeEventListener("pointerup", handleUp);
        window.removeEventListener("pointercancel", handleUp);
      };

      const handleUp = (upEvent: PointerEvent) => {
        const delta = upEvent.clientY - startY;
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
        const offset = delta / viewportHeight;
        finishDrag(baseSnap, offset);
        cleanup();
      };

      const finishDrag = (startSnap: number, offsetRatio: number) => {
        const smallestSnap = sanitizedSnapPoints[0] ?? 0.25;
        const nextRatio = clampRatio(startSnap - offsetRatio);

        if (nextRatio <= smallestSnap * 0.5) {
          context?.requestClose?.();
          return;
        }

        const targetIndex = getNearestSnapIndex(nextRatio);
        setCurrentSnapIndex(targetIndex);
      };

      window.addEventListener("pointermove", handleMove);
      window.addEventListener("pointerup", handleUp);
      window.addEventListener("pointercancel", handleUp);
    },
    [context?.requestClose, currentSnapIndex, getNearestSnapIndex, sanitizedSnapPoints]
  );

  const resolvedSnap = sanitizedSnapPoints[currentSnapIndex] ?? sanitizedSnapPoints[0];
  const heightRatio = clampRatio(resolvedSnap - dragOffset);
  const downwardDrag = dragOffset > 0 ? Math.min(dragOffset, 1) : 0;

  const style = {
    "--bottom-sheet-height": heightRatio.toString(),
    "--bottom-sheet-offset": downwardDrag.toString(),
  } as React.CSSProperties;

  return (
    <BottomSheetPortal forceMount>
      <BottomSheetOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "react-cupertino-ui-bottom-sheet__content",
          glass && "glass",
          isDragging && "is-dragging",
          className
        )}
        data-dragging={isDragging ? "true" : undefined}
        data-snap-index={currentSnapIndex}
        style={style}
        {...props}
      >
        {handle && (
          <button
            type="button"
            className="react-cupertino-ui-bottom-sheet__handle"
            aria-label="Ajustar painel"
            onPointerDown={handlePointerDown}
          />
        )}
        <div
          className="react-cupertino-ui-bottom-sheet__body"
          onPointerDown={handle ? undefined : handlePointerDown}
        >
          {children}
        </div>
      </DialogPrimitive.Content>
    </BottomSheetPortal>
  );
});
BottomSheetContent.displayName = DialogPrimitive.Content.displayName;

const BottomSheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("react-cupertino-ui-bottom-sheet__title", className)}
    {...props}
  />
));
BottomSheetTitle.displayName = DialogPrimitive.Title.displayName;

const BottomSheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("react-cupertino-ui-bottom-sheet__description", className)}
    {...props}
  />
));
BottomSheetDescription.displayName = DialogPrimitive.Description.displayName;

export {
  BottomSheetOverlay,
  BottomSheetContent,
  BottomSheetTitle,
  BottomSheetDescription,
};
