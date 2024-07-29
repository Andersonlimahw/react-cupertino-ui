import breakpoints from "../tokens/breakpoints";
import sizeTokens from "../tokens/size";
import spacingTokens from "../tokens/spacing";
import { darkTheme } from "./dartk";
import { lightTheme } from "./light";

export const themes = {
  dark: {
    colors: {
      ...darkTheme.colors,
    },
    spacing: spacingTokens,
    size: sizeTokens,
    breakpoints,
  },
  light: {
    colors: {
      ...lightTheme.colors,
    },
    spacing: spacingTokens,
    size: sizeTokens,
    breakpoints,
  },
};

export default themes;
export type ThemeTypes = typeof themes;
