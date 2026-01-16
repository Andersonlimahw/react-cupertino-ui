import fs from "fs";
import path from "path";

const categories = ["atoms", "molecules", "organisms", "ui"];

const toKebab = (value: string) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, "$1-$2")
    .toLowerCase();

export const getComponentAliases = () => {
  const rootDir = path.resolve(__dirname, "..");
  const aliases: Record<string, string> = {};
  for (const category of categories) {
    const categoryDir = path.join(rootDir, "packages", category);
    if (!fs.existsSync(categoryDir)) {
      continue;
    }
    const components = fs.readdirSync(categoryDir);
    for (const component of components) {
      const componentDir = path.join(categoryDir, component);
      if (!fs.statSync(componentDir).isDirectory()) {
        continue;
      }
      aliases[`@react-cupertino-ui/${toKebab(component)}`] = componentDir;
    }
  }
  return aliases;
};
