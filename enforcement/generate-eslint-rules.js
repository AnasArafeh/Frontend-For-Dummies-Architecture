#!/usr/bin/env node

/**
 * FFD ESLint Rule Generator
 *
 * Scans all example projects for (modules)/ directories and generates
 * `.eslintrc.json` files that enforce same-level isolation. Each module
 * gets a local config that prevents it from importing sibling modules.
 *
 * Usage:
 *   node enforcement/generate-eslint-rules.js
 *
 * Run after adding or renaming modules. Commit the generated files.
 */

const fs = require('fs');
const path = require('path');

// --- Configuration ---
const EXAMPLES_DIR = path.resolve(__dirname, '..', 'examples');

// Each example defines its src root — all module paths are relative to this.
const EXAMPLE_SRC_ROOTS = {
  'react-vite': 'src',
  'nextjs-app-router': path.join('src', 'app'),
  'angular': path.join('src', 'app'),
};

// Page file patterns per framework.
const PAGE_PATTERNS = ['.page.tsx', '.page.ts', 'page.tsx', 'page.ts'];

// --- Helpers ---
function getDirectories(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== '(modules)')
    .map((d) => d.name);
}

function collectModules(baseDir, parentPath = '') {
  const modules = [];
  const dirs = getDirectories(baseDir);

  for (const dir of dirs) {
    const fullPath = path.join(baseDir, dir);
    const relativePath = parentPath ? `${parentPath}/${dir}` : dir;

    const hasPage = fs.existsSync(fullPath)
      ? fs.readdirSync(fullPath).some((f) => PAGE_PATTERNS.some((p) => f.endsWith(p)))
      : false;

    modules.push({
      name: dir,
      path: relativePath,
      isLeaf: hasPage,
    });

    const nestedDir = path.join(fullPath, '(modules)');
    if (fs.existsSync(nestedDir)) {
      modules.push(...collectModules(nestedDir, relativePath + '/(modules)'));
    }
  }

  return modules;
}

function getSiblingPatterns(allModules, currentModulePath) {
  const currentDepth = currentModulePath.split('/').length;

  return allModules
    .filter((m) => {
      const siblingDepth = m.path.split('/').length;
      return siblingDepth === currentDepth && m.path !== currentModulePath && m.isLeaf;
    })
    .map((s) => `(modules)/${s.path.replace('/(modules)/', '/')}/*`);
}

// --- Main ---
function main() {
  const exampleNames = Object.keys(EXAMPLE_SRC_ROOTS).filter((name) =>
    fs.existsSync(path.join(EXAMPLES_DIR, name))
  );

  if (exampleNames.length === 0) {
    console.error('No example directories found.');
    process.exit(1);
  }

  for (const exampleName of exampleNames) {
    const srcDir = path.join(EXAMPLES_DIR, exampleName, EXAMPLE_SRC_ROOTS[exampleName]);
    const modulesDir = path.join(srcDir, '(modules)');

    if (!fs.existsSync(modulesDir)) {
      console.log(`Skipping ${exampleName}: no (modules)/ directory at ${path.relative(process.cwd(), modulesDir)}`);
      continue;
    }

    console.log(`\n${exampleName}:`);
    const allModules = collectModules(modulesDir);
    console.log(`  Found ${allModules.length} module(s):`);
    allModules.forEach((m) => console.log(`    ${m.path} (${m.isLeaf ? 'leaf' : 'container'})`));

    for (const mod of allModules) {
      if (!mod.isLeaf) continue;

      const moduleDir = path.join(modulesDir, ...mod.path.split('/'));
      const eslintPath = path.join(moduleDir, '.eslintrc.json');
      const patterns = getSiblingPatterns(allModules, mod.path);

      if (patterns.length === 0) {
        // No siblings — no isolation needed. Remove stale config if present.
        if (fs.existsSync(eslintPath)) {
          fs.unlinkSync(eslintPath);
          console.log(`  Removed: ${path.relative(process.cwd(), eslintPath)} (no siblings)`);
        } else {
          console.log(`  Skipped: ${mod.path} (no siblings)`);
        }
        continue;
      }

      const config = {
        rules: {
          'no-restricted-imports': ['error', { patterns }],
        },
      };

      fs.writeFileSync(eslintPath, JSON.stringify(config, null, 2) + '\n');
      console.log(`  Generated: ${path.relative(process.cwd(), eslintPath)}`);
    }
  }

  console.log('\nDone. Run this script after adding or renaming modules.');
}

main();
