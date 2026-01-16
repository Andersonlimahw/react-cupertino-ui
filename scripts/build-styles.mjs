import path from 'path';
import { promises as fs, accessSync } from 'fs';
import * as sass from 'sass';

const cwd = process.cwd();
const scssPath = path.join(cwd, 'index.scss');
const distDir = path.join(cwd, 'dist');

const fileExists = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

if (!(await fileExists(scssPath))) {
  process.exit(0);
}

await fs.mkdir(distDir, { recursive: true });
const resolveAliasPath = (specifier) => {
  if (!specifier.startsWith('@/')) {
    return null;
  }
  const relativePath = specifier.slice(2);
  const baseFile = path.resolve(process.cwd(), '..', '..', '..', 'src', relativePath);
  const candidates = [
    `${baseFile}.scss`,
    `${baseFile}.sass`,
    path.join(path.dirname(baseFile), `_${path.basename(baseFile)}.scss`),
    path.join(path.dirname(baseFile), `_${path.basename(baseFile)}.sass`)
  ];
  for (const candidate of candidates) {
    try {
      accessSync(candidate);
      return candidate;
    } catch {
      // continue
    }
  }
  return null;
};

const result = sass.compile(scssPath, {
  style: 'expanded',
  importers: [
    {
      findFileUrl(url) {
        const resolved = resolveAliasPath(url);
        if (!resolved) {
          return null;
        }
        return new URL(`file://${resolved}`);
      }
    }
  ]
});
await fs.writeFile(path.join(distDir, 'index.css'), result.css);
await fs.copyFile(scssPath, path.join(distDir, 'index.scss'));
