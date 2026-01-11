import type React from "react";
export interface BaseProps<TElement = HTMLElement> {
    className?: string;
    variant?: "default" | "glass" | "solid" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
    asChild?: boolean;
    onClick?: React.MouseEventHandler<TElement>;
    children?: React.ReactNode;
}
type VariantClassMap = Record<string, string>;
interface VariantOverrideOptions {
    variants?: {
        variant?: VariantClassMap;
        size?: VariantClassMap;
    };
    defaultVariants?: {
        variant?: string;
        size?: string;
    };
}
interface VariantInput {
    className?: string;
    variant?: string | null;
    size?: string | null;
}
export declare const BaseVariants: (wrapperName: string, props: VariantInput, overrides?: VariantOverrideOptions) => string;
export {};
