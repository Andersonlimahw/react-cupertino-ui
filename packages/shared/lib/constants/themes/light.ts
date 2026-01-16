import { lightColors as colors } from "../tokens/colors";
import sizeTokens from "../tokens/size";
import spacingTokens from "../tokens/spacing";

export const lightTheme = {
  colors: {
    "--background": colors.foreground,
    "--foreground": colors.background,
    "--card": colors.foreground,
    "--card-foreground": colors.background,
    "--popover": colors.foreground,
    "--popover-foreground": colors.background,
    "--primary": colors.primaryForeground,
    "--primary-foreground": colors.primary,
    "--secondary": colors.secondaryForeground,
    "--secondary-foreground": colors.secondary,
    "--muted": colors.mutedForeground,
    "--muted-foreground": colors.muted,
    "--accent": colors.accentForeground,
    "--accent-foreground": colors.accent,
    "--destructive": colors.destructive,
    "--destructive-foreground": colors.destructiveForeground,
  },
  spacing: spacingTokens,
  size: sizeTokens,
};

export type LightTheme = typeof lightTheme;
