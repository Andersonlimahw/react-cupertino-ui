import * as React from "react";
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
declare const Picker: React.ForwardRefExoticComponent<PickerProps & React.RefAttributes<HTMLDivElement>>;
export { Picker };
