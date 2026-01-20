import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "@react-cupertino-ui/shared/lib/utils";
import "./index.scss";
const Slider = React.forwardRef(({ className, size = "default", label, helperText, error, variant = "glass", showValue = false, min = 0, max = 100, value, defaultValue, disabled, onChange, onFocus, onBlur, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(typeof value === "number"
        ? value
        : typeof defaultValue === "number"
            ? defaultValue
            : Number(min));
    const currentValue = typeof value === "number" ? value : internalValue;
    const handleChange = (event) => {
        const nextValue = Number(event.target.value);
        if (typeof value !== "number") {
            setInternalValue(nextValue);
        }
        onChange?.(event);
    };
    const percentage = ((Number(currentValue) - Number(min)) / (Number(max) - Number(min))) * 100;
    const uniqueId = React.useId();
    const helperId = helperText ? `${props.id ?? "slider"}-${uniqueId}-helper` : undefined;
    const errorId = error ? `${props.id ?? "slider"}-${uniqueId}-error` : undefined;
    const messageId = error ? errorId : helperId;
    return (_jsxs("div", { className: cn("react-cupertino-ui-slider", `size-${size}`, `variant-${variant}`, className), "data-disabled": disabled ? "true" : undefined, "data-error": error ? "true" : undefined, children: [(label || showValue) && (_jsxs("div", { className: "react-cupertino-ui-slider__header", children: [label && _jsx("label", { className: "react-cupertino-ui-slider__label", children: label }), showValue && (_jsx("span", { className: "react-cupertino-ui-slider__value", children: currentValue }))] })), _jsxs("div", { className: "react-cupertino-ui-slider__track", children: [_jsx("div", { className: "react-cupertino-ui-slider__progress", style: { width: `${percentage}%` } }), _jsx("input", { ref: ref, type: "range", min: min, max: max, value: currentValue, onChange: handleChange, disabled: disabled, className: "react-cupertino-ui-slider__input", "aria-describedby": messageId, onFocus: onFocus, onBlur: onBlur, ...props }), _jsx("span", { className: "react-cupertino-ui-slider__thumb", style: { left: `${percentage}%` } })] }), (helperText || error) && (_jsx("span", { id: messageId, className: cn("react-cupertino-ui-slider__message", error && "is-error"), role: error ? "alert" : undefined, children: error ?? helperText }))] }));
});
Slider.displayName = "Slider";
export { Slider };
export default Slider;
