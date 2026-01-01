import breakpoints from "../tokens/breakpoints";
import { darkColors, lightColors, lemonColors } from "../tokens/colors";
import glassTokens from "../tokens/glass";
import sizeTokens from "../tokens/size";
import spacingTokens from "../tokens/spacing";

export const themes = {
  dark: {
    colors: darkColors,
    glass: glassTokens,
    spacing: spacingTokens,
    size: sizeTokens,
    breakpoints,
  },
  light: {
    colors: lightColors,
    glass: glassTokens,
    spacing: spacingTokens,
    size: sizeTokens,
    breakpoints,
  },
  lemon: {
    colors: lemonColors,
    glass: glassTokens,
    spacing: spacingTokens,
    size: sizeTokens,
    breakpoints,
  },
};

export default themes;
export type ThemeTypes = typeof themes;
