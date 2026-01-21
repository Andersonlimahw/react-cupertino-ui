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

// Copy src/styles to dist/styles to ensure relative imports work for consumers
const srcStylesPath = path.resolve(process.cwd(), '../../../src/styles');
const distStylesPath = path.join(distDir, 'styles');

// Helper to copy directory recursively
const copyDir = async (src, dest) => {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
};

try {
  await copyDir(srcStylesPath, distStylesPath);
} catch (error) {
  console.warn('Warning: Could not copy styles directory:', error.message);
}

// Read the original SCSS file
let scssContent = await fs.readFile(scssPath, 'utf-8');

// Replace alias imports with relative path to the copied styles
// @/styles -> ./styles
scssContent = scssContent.replace(/@use\s+['"]@\/styles\/(.*)['"]/g, '@use "./styles/$1"');

// Write the modified SCSS to dist
await fs.writeFile(path.join(distDir, 'index.scss'), scssContent);
