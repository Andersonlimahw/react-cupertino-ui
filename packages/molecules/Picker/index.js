import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "@react-cupertino-ui/shared/lib/utils";
import "./index.scss";
const Picker = React.forwardRef(({ options, value, onChange, className, itemHeight = 34, visibleItems = 5, ...props }, ref) => {
    const scrollerRef = React.useRef(null);
    const isScrolling = React.useRef(false);
    const scrollTimeout = React.useRef();
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
        if (isScrolling.current)
            return;
        const index = options.findIndex((o) => o.value === value);
        if (index !== -1 && scrollerRef.current) {
            // Check if already correct to avoid jitter
            const targetScroll = index * itemHeight;
            if (Math.abs(scrollerRef.current.scrollTop - targetScroll) > 1) {
                scrollerRef.current.scrollTo({ top: targetScroll, behavior: 'smooth' });
            }
        }
    }, [value, options, itemHeight]);
    const handleScroll = (e) => {
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
    return (_jsxs("div", { ref: ref, className: cn("react-cupertino-ui-picker", className), style: { height: itemHeight * visibleItems }, ...props, children: [_jsx("div", { className: "react-cupertino-ui-picker__mask-top" }), _jsx("div", { className: "react-cupertino-ui-picker__selection-indicator", style: { height: itemHeight, marginTop: -itemHeight / 2 } }), _jsx("div", { ref: scrollerRef, className: "react-cupertino-ui-picker__scroller", onScroll: handleScroll, style: {
                    height: itemHeight * visibleItems,
                    paddingTop: (itemHeight * visibleItems) / 2 - itemHeight / 2,
                    paddingBottom: (itemHeight * visibleItems) / 2 - itemHeight / 2
                }, children: options.map((option) => (_jsx("div", { className: "react-cupertino-ui-picker__item", style: { height: itemHeight, lineHeight: `${itemHeight}px` }, children: option.label }, option.value))) }), _jsx("div", { className: "react-cupertino-ui-picker__mask-bottom" })] }));
});
Picker.displayName = "Picker";
export { Picker };
