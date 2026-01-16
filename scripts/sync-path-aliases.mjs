import fs from 'fs';
import path from 'path';

const categories = ['atoms', 'molecules', 'organisms', 'ui'];
const toKebab = (value) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, '$1-$2')
    .toLowerCase();

const collectComponents = () => {
  const root = process.cwd();
  const list = [];
  for (const category of categories) {
    const dir = path.join(root, 'packages', category);
    if (!fs.existsSync(dir)) {
      continue;
    }
    for (const entry of fs.readdirSync(dir)) {
      const compDir = path.join(dir, entry);
      if (!fs.statSync(compDir).isDirectory()) {
        continue;
      }
      list.push({ slug: toKebab(entry), rel: `./packages/${category}/${entry}` });
    }
  }
  return list;
};

const stripComments = (content) =>
  content.replace(/\/\*[\s\S]*?\*\//g, '').replace(/([^:\\])\/\/.*$/gm, '$1');

const updateTsconfig = (file, components) => {
  const tsconfigPath = path.join(process.cwd(), file);
  const raw = fs.readFileSync(tsconfigPath, 'utf8');
  const config = JSON.parse(stripComments(raw));
  config.compilerOptions = config.compilerOptions || {};
  config.compilerOptions.paths = config.compilerOptions.paths || {};
  for (const { slug, rel } of components) {
    config.compilerOptions.paths[`@react-cupertino-ui/${slug}`] = [rel];
  }
  fs.writeFileSync(tsconfigPath, JSON.stringify(config, null, 2) + '\n');
};

const components = collectComponents();
['tsconfig.json', 'tsconfig.app.json', 'tsconfig.packages.json'].forEach((file) =>
  updateTsconfig(file, components)
);
