"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@react-cupertino-ui/shared/lib/utils";
import "./index.scss";
const Switcher = React.forwardRef((props, ref) => {
    const { className, label, helperText, size = "default", align = "center", glass = true, hapticFeedback = false, checkedIcon, uncheckedIcon, showStateLabel = false, id, disabled, checked: checkedProp, defaultChecked, onCheckedChange, ...rest } = props;
    const generatedId = React.useId();
    const controlId = id ?? `switcher-${generatedId}`;
    const labelId = label ? `${controlId}-label` : undefined;
    const helperId = helperText ? `${controlId}-helper` : undefined;
    const isControlled = checkedProp !== undefined;
    const [internalChecked, setInternalChecked] = React.useState(Boolean(defaultChecked));
    const checked = isControlled ? Boolean(checkedProp) : internalChecked;
    const vibrate = React.useCallback(() => {
        if (!hapticFeedback || typeof window === "undefined") {
            return;
        }
        try {
            window.navigator?.vibrate?.(6);
        }
        catch {
            // ignore when unsupported
        }
    }, [hapticFeedback]);
    const handleCheckedChange = (next) => {
        if (!isControlled) {
            setInternalChecked(next);
        }
        vibrate();
        onCheckedChange?.(next);
    };
    const activeIcon = checked ? checkedIcon : uncheckedIcon;
    return (_jsxs("div", { className: cn("react-cupertino-ui-switcher", `size-${size}`, `align-${align}`, glass && "glass", className), "data-disabled": disabled ? "true" : undefined, "data-checked": checked ? "true" : undefined, children: [_jsxs(SwitchPrimitives.Root, { id: controlId, ref: ref, className: "react-cupertino-ui-switcher__control", checked: checked, defaultChecked: isControlled ? undefined : defaultChecked, disabled: disabled, "aria-labelledby": labelId, "aria-describedby": helperId, onCheckedChange: handleCheckedChange, ...rest, children: [_jsx("span", { className: "react-cupertino-ui-switcher__track", "aria-hidden": "true" }), _jsxs(SwitchPrimitives.Thumb, { className: "react-cupertino-ui-switcher__thumb", children: [showStateLabel ? (_jsx("span", { className: "react-cupertino-ui-switcher__state", "aria-hidden": "true", children: checked ? "ON" : "OFF" })) : null, activeIcon ? (_jsx("span", { className: "react-cupertino-ui-switcher__thumb-icon", "aria-hidden": "true", children: activeIcon })) : (_jsx("span", { className: "react-cupertino-ui-switcher__thumb-core", "aria-hidden": "true" }))] })] }), (label || helperText) && (_jsxs("span", { className: "react-cupertino-ui-switcher__text", children: [label ? (_jsx("span", { id: labelId, className: "react-cupertino-ui-switcher__label", children: label })) : null, helperText ? (_jsx("span", { id: helperId, className: "react-cupertino-ui-switcher__helper", children: helperText })) : null] }))] }));
});
Switcher.displayName = "Switcher";
export { Switcher };
export default Switcher;
