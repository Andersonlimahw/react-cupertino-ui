export const glassTokens = {
  blur: {
    sm: "20px",
    md: "32px",
    lg: "48px",
  },
  saturation: "180%",
  opacity: {
    surface: 0.7,
    hover: 0.82,
    pressed: 0.6,
    dark: 0.45,
  },
  border: {
    light: "rgba(255, 255, 255, 0.18)",
    dark: "rgba(255, 255, 255, 0.12)",
  },
  shadow: {
    light: "0 8px 32px rgba(0, 0, 0, 0.12)",
    dark: "0 20px 50px rgba(0, 0, 0, 0.45)",
  },
  refraction: "linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 60%)",
  glow: "0 0 40px rgba(0, 122, 255, 0.35)",
};

export type GlassTokens = typeof glassTokens;
export default glassTokens;
