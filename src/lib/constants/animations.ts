export const springConfig = {
  gentle: {
    tension: 120,
    friction: 14,
  },
  wobbly: {
    tension: 180,
    friction: 12,
  },
  stiff: {
    tension: 210,
    friction: 20,
  },
  slow: {
    tension: 280,
    friction: 60,
  },
} as const;

export const transitions = {
  fast: "150ms cubic-bezier(0.25, 0.1, 0.25, 1)",
  normal: "250ms cubic-bezier(0.25, 0.1, 0.25, 1)",
  slow: "400ms cubic-bezier(0.25, 0.1, 0.25, 1)",
  spring: "500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)",
} as const;

export type SpringPreset = keyof typeof springConfig;
export type TransitionPreset = keyof typeof transitions;
