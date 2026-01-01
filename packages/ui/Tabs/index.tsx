import * as React from "react";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";

import "./index.scss";

type TabsVariant = "glass" | "soft" | "underline";
type TabsSize = "sm" | "md" | "lg";
type TabsAlign = "start" | "center" | "full";
type TabsActivationMode = "automatic" | "manual";

type TabsItem = {
  value: string;
  ref: HTMLButtonElement | null;
};

interface TabsContextValue {
  value?: string;
  setValue: (value: string) => void;
  activationMode: TabsActivationMode;
  variant: TabsVariant;
  size: TabsSize;
  align: TabsAlign;
  triggers: TabsItem[];
  registerTrigger: (value: string, node: HTMLButtonElement | null) => void;
  unregisterTrigger: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within <Tabs>");
  }
  return context;
};

export interface TabsProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  activationMode?: TabsActivationMode;
  variant?: TabsVariant;
  size?: TabsSize;
  align?: TabsAlign;
  children?: React.ReactNode;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
  const {
    className,
    value,
    defaultValue,
    onValueChange,
    activationMode = "automatic",
    variant = "glass",
    size = "md",
    align = "center",
    children,
    ...rest
  } = props;

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue);
  const currentValue = isControlled ? value : internalValue;

  const [triggers, setTriggers] = React.useState<TabsItem[]>([]);

  const setValue = React.useCallback(
    (next: string) => {
      if (!isControlled) {
        setInternalValue(next);
      }
      onValueChange?.(next);
    },
    [isControlled, onValueChange]
  );

  const registerTrigger = React.useCallback((value: string, node: HTMLButtonElement | null) => {
    setTriggers((prev) => {
      const existingIndex = prev.findIndex((item) => item.value === value);
      if (existingIndex !== -1) {
        const existing = prev[existingIndex];
        if (existing.ref === node) {
          return prev;
        }
        const next = [...prev];
        next[existingIndex] = { value, ref: node };
        return next;
      }
      return [...prev, { value, ref: node }];
    });

    if (!isControlled && currentValue === undefined) {
      setInternalValue(value);
    }
  }, [currentValue, isControlled]);

  const unregisterTrigger = React.useCallback((value: string) => {
    setTriggers((prev) => prev.filter((item) => item.value !== value));
  }, []);

  const contextValue = React.useMemo(
    () => ({
      value: currentValue,
      setValue,
      activationMode,
      variant,
      size,
      align,
      triggers,
      registerTrigger,
      unregisterTrigger,
    }),
    [activationMode, align, currentValue, registerTrigger, setValue, size, triggers, unregisterTrigger, variant]
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div ref={ref} className={cn("react-cupertino-ui-tabs", className)} {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  );
});
Tabs.displayName = "Tabs";

export interface TabsListProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
  variant?: TabsVariant;
  size?: TabsSize;
  align?: TabsAlign;
}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>((props, ref) => {
  const { className, children, variant, size, align, ...rest } = props;
  const context = useTabsContext();
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => listRef.current as HTMLDivElement);

  const resolvedVariant = variant ?? context.variant;
  const resolvedSize = size ?? context.size;
  const resolvedAlign = align ?? context.align;

  const indicatorStyle = React.useMemo(() => {
    const total = context.triggers.length || 1;
    const activeIndex = Math.max(
      0,
      context.triggers.findIndex((item) => item.value === context.value)
    );
    return {
      "--tabs-count": total,
      "--tabs-active-index": activeIndex,
    } as React.CSSProperties;
  }, [context.triggers, context.value]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!context.triggers.length) {
      return;
    }

    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) {
      return;
    }

    event.preventDefault();
    const currentActive = document.activeElement as HTMLButtonElement | null;
    const ordered = context.triggers.map((item) => item.ref).filter(Boolean) as HTMLButtonElement[];
    if (!ordered.length) {
      return;
    }

    const currentIndex = ordered.findIndex((node) => node === currentActive);
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") {
      nextIndex = currentIndex >= 0 ? (currentIndex + 1) % ordered.length : 0;
    } else if (event.key === "ArrowLeft") {
      nextIndex = currentIndex >= 0 ? (currentIndex - 1 + ordered.length) % ordered.length : ordered.length - 1;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = ordered.length - 1;
    }

    const targetNode = ordered[nextIndex];
    const targetValue = context.triggers.find((item) => item.ref === targetNode)?.value;
    requestAnimationFrame(() => targetNode?.focus());
    if (context.activationMode === "automatic" && targetValue) {
      context.setValue(targetValue);
    }
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      className={cn(
        "react-cupertino-ui-tabs__list",
        `variant-${resolvedVariant}`,
        `size-${resolvedSize}`,
        `align-${resolvedAlign}`,
        className
      )}
      style={indicatorStyle}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <span className="react-cupertino-ui-tabs__indicator" aria-hidden="true" />
      {children}
    </div>
  );
});
TabsList.displayName = "TabsList";

export interface TabsTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "value">,
    Pick<BaseProps<HTMLButtonElement>, "variant" | "size"> {
  value: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>((props, ref) => {
  const { className, value, icon, badge, children, disabled, ...rest } = props;
  const context = useTabsContext();
  const localRef = React.useRef<HTMLButtonElement>(null);

  const assignRef = (node: HTMLButtonElement | null) => {
    localRef.current = node;
    if (typeof ref === "function") {
      ref(node);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
    }
  };

  React.useLayoutEffect(() => {
    context.registerTrigger(value, localRef.current);
    return () => context.unregisterTrigger(value);
  }, [context, value]);

  const isActive = context.value === value;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    rest.onClick?.(event);
    if (!disabled) {
      context.setValue(value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (context.activationMode === "manual" && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      context.setValue(value);
    }
  };

  return (
    <button
      id={`tabs-trigger-${value}`}
      ref={assignRef}
      role="tab"
      type="button"
      data-tabs-trigger
      aria-selected={isActive}
      aria-controls={`tabs-panel-${value}`}
      data-state={isActive ? "active" : "inactive"}
      className={cn("react-cupertino-ui-tabs__trigger", isActive && "is-active", className)}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {icon ? <span className="react-cupertino-ui-tabs__icon" aria-hidden="true">{icon}</span> : null}
      <span className="react-cupertino-ui-tabs__label">{children}</span>
      {badge ? <span className="react-cupertino-ui-tabs__badge">{badge}</span> : null}
    </button>
  );
});
TabsTrigger.displayName = "TabsTrigger";

export interface TabsContentProps extends BaseProps<HTMLDivElement> {
  value: string;
  forceMount?: boolean;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>((props, ref) => {
  const { className, children, value, forceMount = false, ...rest } = props;
  const context = useTabsContext();
  const isActive = context.value === value;

  if (!isActive && !forceMount) {
    return null;
  }

  return (
    <div
      ref={ref}
      role="tabpanel"
      id={`tabs-panel-${value}`}
      aria-labelledby={`tabs-trigger-${value}`}
      className={cn(
        "react-cupertino-ui-tabs__content",
        isActive ? "is-active" : "is-hidden",
        className
      )}
      hidden={!isActive}
      {...rest}
    >
      {children}
    </div>
  );
});
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
