import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import "./index.scss";
export interface SwitcherProps extends Omit<React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>, "children"> {
    label?: string;
    helperText?: string;
    size?: "default" | "sm" | "lg";
    align?: "start" | "center";
    glass?: boolean;
    hapticFeedback?: boolean;
    checkedIcon?: React.ReactNode;
    uncheckedIcon?: React.ReactNode;
    showStateLabel?: boolean;
}
declare const Switcher: React.ForwardRefExoticComponent<SwitcherProps & React.RefAttributes<HTMLButtonElement>>;
export { Switcher };
export default Switcher;
