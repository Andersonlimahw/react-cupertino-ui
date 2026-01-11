import * as React from "react";
import { createPortal } from "react-dom";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import "./index.scss";

type PreviewPlacement = "menu" | "trigger" | "both";

interface PreviewConfig {
  size: "sm" | "md" | "lg";
  placement: PreviewPlacement;
  offset: number;
}

interface PreviewState {
  node: React.ReactNode | null;
  config: PreviewConfig;
}

interface ContextMenuPreviewContextValue {
  triggerNode: HTMLElement | null;
  setTriggerNode: (node: HTMLElement | null) => void;
  previewState: PreviewState;
  setPreview: (node: React.ReactNode | null, config?: Partial<PreviewConfig>) => void;
  isOpen: boolean;
}

const defaultPreviewConfig: PreviewConfig = {
  size: "md",
  placement: "menu",
  offset: -28,
};

const ContextMenuPreviewContext = React.createContext<ContextMenuPreviewContextValue | null>(
  null
);

const useContextMenuPreview = () => React.useContext(ContextMenuPreviewContext);

const ContextMenuTriggerPreview = () => {
  const context = useContextMenuPreview();
  const previewNode = context?.previewState.node;
  const { placement, size, offset } = context?.previewState.config ?? defaultPreviewConfig;
  const triggerNode = context?.triggerNode;

  const shouldShow = Boolean(
    typeof document !== "undefined" &&
      previewNode &&
      triggerNode &&
      context?.isOpen &&
      (placement === "trigger" || placement === "both")
  );

  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const updatePosition = React.useCallback(() => {
    if (!triggerNode || typeof window === "undefined") {
      return;
    }
    const rect = triggerNode.getBoundingClientRect();
    setPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2 + offset,
    });
  }, [offset, triggerNode]);

  React.useLayoutEffect(() => {
    if (shouldShow) {
      updatePosition();
    }
  }, [shouldShow, updatePosition]);

  React.useEffect(() => {
    if (!shouldShow) {
      return;
    }
    const handle = () => updatePosition();
    window.addEventListener("resize", handle);
    window.addEventListener("scroll", handle, true);
    return () => {
      window.removeEventListener("resize", handle);
      window.removeEventListener("scroll", handle, true);
    };
  }, [shouldShow, updatePosition]);

  if (!shouldShow || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className={cn(
        "react-cupertino-ui-context-menu__trigger-preview",
        `size-${size}`
      )}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      data-state={context?.isOpen ? "open" : "closed"}
    >
      <div className="react-cupertino-ui-context-menu__trigger-preview-inner">
        {previewNode}
      </div>
    </div>,
    document.body
  );
};

function assignRef<T>(ref: React.ForwardedRef<T>, value: T | null) {
  if (!ref) return;
  if (typeof ref === "function") {
    ref(value);
    return;
  }
  (ref as React.MutableRefObject<T | null>).current = value;
}

interface ContextMenuProps extends Omit<React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Root>, "children"> {
  children?: React.ReactNode;
}

const ContextMenu = ({
  children,
  onOpenChange,
  ...props
}: ContextMenuProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [triggerNode, setTriggerNode] = React.useState<HTMLElement | null>(null);
  const [previewState, setPreviewState] = React.useState<PreviewState>({
    node: null,
    config: defaultPreviewConfig,
  });

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      setIsOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [onOpenChange]
  );

  const setPreview = React.useCallback(
    (node: React.ReactNode | null, config?: Partial<PreviewConfig>) => {
      if (!node) {
        setPreviewState({ node: null, config: defaultPreviewConfig });
        return;
      }
      setPreviewState((prev) => ({
        node,
        config: {
          size: config?.size ?? prev.config.size,
          placement: config?.placement ?? prev.config.placement,
          offset: config?.offset ?? prev.config.offset,
        },
      }));
    },
    []
  );

  const contextValue = React.useMemo<ContextMenuPreviewContextValue>(
    () => ({
      triggerNode,
      setTriggerNode,
      previewState,
      setPreview,
      isOpen,
    }),
    [isOpen, previewState, setPreview, triggerNode]
  );

  return (
    <ContextMenuPreviewContext.Provider value={contextValue}>
      <ContextMenuPrimitive.Root
        {...props}
        onOpenChange={handleOpenChange}
      >
        {children}
      </ContextMenuPrimitive.Root>
      <ContextMenuTriggerPreview />
    </ContextMenuPreviewContext.Provider>
  );
};

const ContextMenuTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Trigger>
>((props, forwardedRef) => {
  const { className, ...rest } = props;
  const context = useContextMenuPreview();
  const showPreview = Boolean(
    context?.isOpen &&
      context.previewState.node &&
      (context.previewState.config.placement === "trigger" ||
        context.previewState.config.placement === "both")
  );

  const setTriggerNode = context?.setTriggerNode;

  const composedRef = React.useCallback(
    (node: React.ElementRef<typeof ContextMenuPrimitive.Trigger> | null) => {
      if (setTriggerNode) {
        if (node instanceof HTMLElement) {
          setTriggerNode(node);
        } else {
          setTriggerNode(null);
        }
      }
      assignRef(forwardedRef, node);
    },
    [forwardedRef, setTriggerNode]
  );

  return (
    <ContextMenuPrimitive.Trigger
      {...rest}
      ref={composedRef}
      className={className}
      data-context-menu-trigger="true"
      data-preview-visible={showPreview ? "true" : undefined}
    />
  );
});
ContextMenuTrigger.displayName = ContextMenuPrimitive.Trigger.displayName;

const ContextMenuGroup = ContextMenuPrimitive.Group;

const ContextMenuPortal = ContextMenuPrimitive.Portal;

const ContextMenuSub = ContextMenuPrimitive.Sub;

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "react-cupertino-ui-context-menu__sub-trigger",
      inset && "inset",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn("react-cupertino-ui-context-menu__sub-content", className)}
    {...props}
  />
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

interface ContextMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content> {
  preview?: React.ReactNode;
  previewSize?: "sm" | "md" | "lg";
  previewPlacement?: PreviewPlacement;
  previewOffset?: number;
}

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  ContextMenuContentProps
>(({ className, preview, previewSize = "md", previewPlacement = "menu", previewOffset, children, ...props }, ref) => {
  const previewContext = useContextMenuPreview();
  const previewApi = previewContext?.setPreview;
  const shouldRenderInline = Boolean(
    preview && (previewPlacement === "menu" || previewPlacement === "both")
  );

  React.useEffect(() => {
    if (!previewApi) {
      return;
    }
    if (!preview) {
      previewApi(null);
      return;
    }
    previewApi(preview, {
      size: previewSize,
      placement: previewPlacement,
      offset: previewOffset ?? defaultPreviewConfig.offset,
    });

    return () => {
      previewApi(null);
    };
  }, [previewApi, preview, previewSize, previewPlacement, previewOffset]);

  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        ref={ref}
        className={cn(
          "react-cupertino-ui-context-menu__content",
          shouldRenderInline && "has-preview",
          className
        )}
        data-has-preview={shouldRenderInline ? "true" : undefined}
        {...props}
      >
        {shouldRenderInline ? (
          <div
            className={cn(
              "react-cupertino-ui-context-menu__preview",
              `size-${previewSize}`
            )}
          >
            {preview}
          </div>
        ) : null}
        {children}
      </ContextMenuPrimitive.Content>
    </ContextMenuPrimitive.Portal>
  );
});
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

interface ContextMenuPreviewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  media?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  meta?: React.ReactNode;
  footer?: React.ReactNode;
}

const ContextMenuPreview = ({
  className,
  media,
  title,
  subtitle,
  meta,
  footer,
  children,
  ...props
}: ContextMenuPreviewProps) => {
  return (
    <div className={cn("react-cupertino-ui-context-menu__preview-card", className)} {...props}>
      {media ? (
        <div className="react-cupertino-ui-context-menu__preview-media">{media}</div>
      ) : null}
      {(title || subtitle || meta || children) && (
        <div className="react-cupertino-ui-context-menu__preview-body">
          {title && <p className="react-cupertino-ui-context-menu__preview-title">{title}</p>}
          {subtitle && (
            <p className="react-cupertino-ui-context-menu__preview-subtitle">{subtitle}</p>
          )}
          {children ? (
            <div className="react-cupertino-ui-context-menu__preview-children">{children}</div>
          ) : null}
          {meta && <span className="react-cupertino-ui-context-menu__preview-meta">{meta}</span>}
        </div>
      )}
      {footer ? (
        <div className="react-cupertino-ui-context-menu__preview-footer">{footer}</div>
      ) : null}
    </div>
  );
};
ContextMenuPreview.displayName = "ContextMenuPreview";

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "react-cupertino-ui-context-menu__item",
      inset && "inset",
      className
    )}
    {...props}
  />
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn("react-cupertino-ui-context-menu__checkbox-item", className)}
    checked={checked}
    {...props}
  >
    <span className="checkbox-indicator">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName;

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn("react-cupertino-ui-context-menu__radio-item", className)}
    {...props}
  >
    <span className="radio-indicator">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      "react-cupertino-ui-context-menu__label",
      inset && "inset",
      className
    )}
    {...props}
  />
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("react-cupertino-ui-context-menu__separator", className)}
    {...props}
  />
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

const ContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("react-cupertino-ui-context-menu__shortcut", className)}
      {...props}
    />
  );
};
ContextMenuShortcut.displayName = "ContextMenuShortcut";

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
  ContextMenuPreview,
};

export type { ContextMenuContentProps, ContextMenuProps };
