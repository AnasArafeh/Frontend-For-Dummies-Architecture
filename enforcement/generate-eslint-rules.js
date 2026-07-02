#!/usr/bin/env node

/**
 * FFD ESLint Rule Generator
 *
 * Scans the (modules)/ directory and generates `.eslintrc.json` files
 * that enforce same-level isolation. Each module gets a local config
 * that prevents it from importing sibling modules.
 *
 * Usage:
 *   node enforcement/generate-eslint-rules.js
 *
 * Run after adding or renaming modules. Commit the generated files.
 */

const fs = require('fs');
const path = require('path');

// --- Configuration ---
const SRC_DIR = path.resolve(__dirname, '..', 'examples', 'react-vite', 'src');
const MODULES_DIR = path.join(SRC_DIR, '(modules)');

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

    // Check if this is a leaf module (has a .page.tsx) or container
    const hasPage = fs.existsSync(fullPath)
      ? fs.readdirSync(fullPath).some((f) => f.endsWith('.page.tsx'))
      : false;

    modules.push({
      name: dir,
      path: relativePath,
      isLeaf: hasPage,
    });

    // Recurse into nested (modules)/
    const nestedDir = path.join(fullPath, '(modules)');
    if (fs.existsSync(nestedDir)) {
      modules.push(...collectModules(nestedDir, relativePath + '/(modules)'));
    }
  }

  return modules;
}

function generateEslintConfig(allModules, currentModulePath) {
  // Block imports from sibling modules (at the same depth)
  const siblings = allModules.filter((m) => {
    const currentDepth = currentModulePath.split('/').length;
    const siblingDepth = m.path.split('/').length;
    return (
      siblingDepth === currentDepth &&
      m.path !== currentModulePath &&
      m.isLeaf
    );
  });

  const patterns = siblings.map(
    (s) => `(modules)/${s.path.replace('/(modules)/', '/')}/*`
  );

  return {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: patterns.length > 0 ? patterns : ['NONEXISTENT_MODULE_PLACEHOLDER'],
        },
      ],
    },
  };
}

// --- Main ---
function main() {
  if (!fs.existsSync(MODULES_DIR)) {
    console.error(`Modules directory not found: ${MODULES_DIR}`);
    process.exit(1);
  }

  const allModules = collectModules(MODULES_DIR);

  console.log(`Found ${allModules.length} modules:`);
  allModules.forEach((m) => console.log(`  ${m.path} (${m.isLeaf ? 'leaf' : 'container'})`));

  // Generate .eslintrc.json for each leaf module
  for (const mod of allModules) {
    if (!mod.isLeaf) continue;

    const moduleDir = path.join(MODULES_DIR, ...mod.path.split('/'));
    const eslintPath = path.join(moduleDir, '.eslintrc.json');
    const config = generateEslintConfig(allModules, mod.path);

    fs.writeFileSync(eslintPath, JSON.stringify(config, null, 2) + '\n');
    console.log(`Generated: ${path.relative(process.cwd(), eslintPath)}`);
  }

  console.log('\nDone. Run this script after adding or renaming modules.');
}

main();
