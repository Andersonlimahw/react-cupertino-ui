import * as React from "react";
import { cn } from "@/lib/utils";
import "./index.scss";

export interface PickerOption {
  value: string | number;
  label: string;
}

export interface PickerProps {
  options: PickerOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  className?: string;
  itemHeight?: number;
  visibleItems?: number;
}

const Picker = React.forwardRef<HTMLDivElement, PickerProps>(
  (
    {
      options,
      value,
      onChange,
      className,
      itemHeight = 34,
      visibleItems = 5,
      ...props
    },
    ref
  ) => {
    const scrollerRef = React.useRef<HTMLDivElement>(null);
    const isScrolling = React.useRef(false);
    const scrollTimeout = React.useRef<NodeJS.Timeout>();

    // Initial scroll
    React.useLayoutEffect(() => {
      const index = options.findIndex((o) => o.value === value);
      if (index !== -1 && scrollerRef.current) {
        scrollerRef.current.scrollTop = index * itemHeight;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only on mount

    // Update scroll when value changes externally (and not scrolling)
    React.useEffect(() => {
        if (isScrolling.current) return;
        const index = options.findIndex((o) => o.value === value);
        if (index !== -1 && scrollerRef.current) {
            // Check if already correct to avoid jitter
            const targetScroll = index * itemHeight;
            if (Math.abs(scrollerRef.current.scrollTop - targetScroll) > 1) {
                scrollerRef.current.scrollTo({ top: targetScroll, behavior: 'smooth' });
            }
        }
    }, [value, options, itemHeight]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      isScrolling.current = true;
      clearTimeout(scrollTimeout.current);

      const scrollTop = e.currentTarget.scrollTop;
      
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false;
        // Snap logic handled by CSS mostly, but we need to update value
        const index = Math.round(scrollTop / itemHeight);
        const clampedIndex = Math.min(Math.max(index, 0), options.length - 1);
        const option = options[clampedIndex];
        
        if (option && option.value !== value) {
            onChange(option.value);
        }
        
        // Ensure perfect snap
        // e.currentTarget.scrollTo({ top: clampedIndex * itemHeight, behavior: 'smooth' });
      }, 100);
    };

    return (
      <div
        ref={ref}
        className={cn("react-cupertino-ui-picker", className)}
        style={{ height: itemHeight * visibleItems }}
        {...props}
      >
        <div className="react-cupertino-ui-picker__mask-top" />
        <div className="react-cupertino-ui-picker__selection-indicator" style={{ height: itemHeight, marginTop: -itemHeight/2 }} />
        
        <div
            ref={scrollerRef}
            className="react-cupertino-ui-picker__scroller"
            onScroll={handleScroll}
            style={{ 
                height: itemHeight * visibleItems, 
                paddingTop: (itemHeight * visibleItems) / 2 - itemHeight / 2,
                paddingBottom: (itemHeight * visibleItems) / 2 - itemHeight / 2
            }}
        >
            {options.map((option) => (
                <div
                    key={option.value}
                    className="react-cupertino-ui-picker__item"
                    style={{ height: itemHeight, lineHeight: `${itemHeight}px` }}
                >
                    {option.label}
                </div>
            ))}
        </div>
        
        <div className="react-cupertino-ui-picker__mask-bottom" />
      </div>
    );
  }
);

Picker.displayName = "Picker";

export { Picker };
