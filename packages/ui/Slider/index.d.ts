import * as React from "react";
import "./index.scss";
interface SliderNativeProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "onFocus" | "onBlur"> {
}
export interface SliderProps extends SliderNativeProps {
    className?: string;
    size?: "default" | "sm" | "lg";
    label?: string;
    helperText?: string;
    error?: string;
    variant?: "glass" | "solid" | "outline";
    showValue?: boolean;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
}
declare const Slider: React.ForwardRefExoticComponent<SliderProps & React.RefAttributes<HTMLInputElement>>;
export { Slider };
export default Slider;
