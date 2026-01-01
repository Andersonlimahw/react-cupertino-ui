import path from "path";
import type { StorybookConfig } from "@storybook/react-vite";
import { getComponentAliases } from "../config/component-aliases";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.stories.@(ts|tsx)",
    "../stories/**/*.stories.@(ts|tsx)",
    "../stories/components/ui/**/*.stories.@(ts|tsx)",
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    defaultName: "Documentation",
  },
  viteFinal: async (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "../src"),
      "@components": path.resolve(__dirname, "../packages"),
      "@react-cupertino-ui/shared": path.resolve(__dirname, "../packages/shared"),
      "@globalstyles": path.resolve(__dirname, "../app/globals.css"),
      ...getComponentAliases(),
    };
    return config;
  },
};
export default config;
