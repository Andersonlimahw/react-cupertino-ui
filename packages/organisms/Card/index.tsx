import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@react-cupertino-ui/shared/lib/utils";
import { BaseProps, BaseVariants } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";
import glassTokens from "@react-cupertino-ui/shared/lib/constants/tokens/glass";

import "./index.scss";

type GlassBlur = keyof typeof glassTokens.blur;

type CardCSSVariables = React.CSSProperties & {
  "--card-glass-opacity"?: string;
  "--card-glass-blur"?: string;
  "--card-background-image"?: string;
};

export interface CardProps
  extends BaseProps<HTMLDivElement>,
    React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  /**
   * Enables the Liquid Glass visual treatment regardless of the variant prop.
   */
  glass?: boolean;
  /**
   * Controls the blur radius applied to the glass surface.
   */
  blur?: GlassBlur;
  /**
   * Adjusts surface opacity for the glass panel (0 - transparent, 1 - solid).
   */
  intensity?: number;
  /**
   * Optional background image that appears behind the glass overlay.
   */
  backgroundImage?: string;
  /**
   * Enables hover/focus elevation interactions.
   */
  interactive?: boolean;
}

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));

CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      glass = true,
      blur = "md",
      intensity,
      backgroundImage,
      interactive = true,
      style,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div";
    const cssVars: CardCSSVariables = {
      ...(style as CardCSSVariables),
    };

    if (blur && glass) {
      cssVars["--card-glass-blur"] = glassTokens.blur[blur];
    }

    if (typeof intensity === "number") {
      const clamped = Math.min(Math.max(intensity, 0), 1);
      cssVars["--card-glass-opacity"] = clamped.toString();
    }

    if (backgroundImage) {
      const trimmed = backgroundImage.trim();
      const isCssFunction = /^(url|linear-gradient|radial-gradient|conic-gradient)\(/i.test(
        trimmed
      );
      cssVars["--card-background-image"] = isCssFunction
        ? trimmed
        : `url(${backgroundImage})`;
    }

    const resolvedVariant = variant ?? (glass ? "glass" : undefined);

    const classes = BaseVariants(
      "react-cupertino-ui-card",
      {
        variant: resolvedVariant,
        size,
        className: cn(
          glass && "react-cupertino-ui-card--glass",
          backgroundImage && "react-cupertino-ui-card--media",
          className
        ),
      },
      {
        defaultVariants: {
          variant: glass ? "glass" : "default",
        },
      }
    );

    return (
      <Comp
        ref={ref}
        className={cn(classes)}
        style={cssVars}
        data-glass={glass ? "true" : undefined}
        data-interactive={interactive ? "true" : undefined}
        data-has-background={backgroundImage ? "true" : undefined}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};

export default Card;
