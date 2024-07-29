import breakpoints from "../tokens/breakpoints";
import { darkColors, lightColors, lemonColors } from "../tokens/colors";
import sizeTokens from "../tokens/size";
import spacingTokens from "../tokens/spacing";

export const themes = {
  dark: {
    colors: darkColors,
    spacing: spacingTokens,
    size: sizeTokens,
    breakpoints,
  },
  light: {
    colors: lightColors,
    spacing: spacingTokens,
    size: sizeTokens,
    breakpoints,
  },
  lemon: {
    colors: lemonColors,
    spacing: spacingTokens,
    size: sizeTokens,
    breakpoints,
  },
};

export default themes;
export type ThemeTypes = typeof themes;
