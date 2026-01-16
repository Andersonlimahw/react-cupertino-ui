import { cva } from "class-variance-authority";
export const BaseVariants = (wrapperName, props, overrides) => {
    const variantMap = {
        default: "variant-default",
        glass: "variant-glass",
        solid: "variant-solid",
        destructive: "variant-destructive",
        outline: "variant-outline",
        secondary: "variant-secondary",
        ghost: "variant-ghost",
        link: "variant-link",
        ...(overrides?.variants?.variant || {}),
    };
    const sizeMap = {
        default: "size-default",
        sm: "size-sm",
        lg: "size-lg",
        icon: "size-icon",
        ...(overrides?.variants?.size || {}),
    };
    const builder = cva(wrapperName, {
        variants: {
            variant: variantMap,
            size: sizeMap,
        },
        defaultVariants: {
            variant: overrides?.defaultVariants?.variant || "default",
            size: overrides?.defaultVariants?.size || "default",
        },
    });
    return builder({
        variant: props.variant || undefined,
        size: props.size || undefined,
        className: props.className,
    });
};
