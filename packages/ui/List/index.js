import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@react-cupertino-ui/shared/lib/utils";
import "./index.scss";
const List = React.forwardRef(({ className, variant = "default", children, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn("react-cupertino-ui-list", `variant-${variant}`, className), ...props, children: children }));
});
List.displayName = "List";
const ListItem = React.forwardRef(({ className, icon, title, subtitle, rightContent, chevron = false, disabled = false, onClick, ...props }, ref) => {
    const isClickable = onClick !== undefined;
    return (_jsxs("div", { ref: ref, className: cn("react-cupertino-ui-list-item", {
            clickable: isClickable,
            disabled: disabled,
        }, className), onClick: disabled ? undefined : onClick, role: isClickable ? "button" : undefined, tabIndex: isClickable && !disabled ? 0 : undefined, ...props, children: [icon && (_jsx("div", { className: "react-cupertino-ui-list-item-icon", children: icon })), _jsxs("div", { className: "react-cupertino-ui-list-item-content", children: [_jsx("div", { className: "react-cupertino-ui-list-item-title", children: title }), subtitle && (_jsx("div", { className: "react-cupertino-ui-list-item-subtitle", children: subtitle }))] }), rightContent && (_jsx("div", { className: "react-cupertino-ui-list-item-right", children: rightContent })), chevron && (_jsx(ChevronRight, { className: "react-cupertino-ui-list-item-chevron" }))] }));
});
ListItem.displayName = "ListItem";
export { List, ListItem };
export default List;
