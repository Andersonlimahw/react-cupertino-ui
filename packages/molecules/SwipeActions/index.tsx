import * as React from "react";
import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";
import "./index.scss";

export type SwipeActionColor = "danger" | "primary" | "secondary" | "gray" | "orange";

export interface SwipeAction {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    color?: SwipeActionColor;
}

export interface SwipeActionsProps extends Omit<BaseProps<HTMLDivElement>, "children"> {
    children: React.ReactNode;
    startActions?: SwipeAction[];
    endActions?: SwipeAction[];
}

const SwipeActions = React.forwardRef<HTMLDivElement, SwipeActionsProps>(({
    className,
    children,
    startActions = [],
    endActions = [],
    ...props
}, ref) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);

    React.useLayoutEffect(() => {
        if (containerRef.current && contentRef.current && startActions.length > 0) {
            // Scroll to show content initially (hide start actions)
            // We assume Content is the second child if StartActions exist
            const startActionsWidth = containerRef.current.children[0].clientWidth;
            containerRef.current.scrollLeft = startActionsWidth;
        }
    }, [startActions.length]);

    // A simple CSS-scroll-snap based implementation for "swipe" behavior
    // This allows native-like feel without complex JS touch tracking

    return (
        <div
            ref={ref}
            className={cn("react-cupertino-ui-swipe-actions", className)}
            {...props}
        >
            <div className="swipe-container" ref={containerRef}>
                {startActions.length > 0 && (
                    <div className="actions start">
                        {startActions.map((action, i) => (
                            <button
                                key={i}
                                className={cn("action-button", `color-${action.color || "gray"}`)}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    action.onClick();
                                    // Optional: Close swipe after action
                                }}
                            >
                                {action.icon}
                                <span className="label">{action.label}</span>
                            </button>
                        ))}
                    </div>
                )}

                <div className="content" ref={contentRef}>
                    {children}
                </div>

                {endActions.length > 0 && (
                    <div className="actions end">
                        {endActions.map((action, i) => (
                            <button
                                key={i}
                                className={cn("action-button", `color-${action.color || "gray"}`)}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    action.onClick();
                                    // Optional: Close swipe after action
                                }}
                            >
                                {action.icon}
                                <span className="label">{action.label}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
});

SwipeActions.displayName = "SwipeActions";

export { SwipeActions };
