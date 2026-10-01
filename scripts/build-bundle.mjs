#!/usr/bin/env node
// Builds bundles/awesome-frontend-design.md (SKILL.md bodies) and bundles/awesome-frontend-design.full.md (with references).
// `--check` fails when the committed bundles are out of date.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const cli = join(root, 'bin', 'cli.mjs');
const outputs = [
  ['awesome-frontend-design.md', []],
  ['awesome-frontend-design.full.md', ['--full']],
];
const check = process.argv.includes('--check');
let stale = 0;

mkdirSync(join(root, 'bundles'), { recursive: true });
for (const [file, extra] of outputs) {
  const content = execFileSync('node', [cli, 'bundle', ...extra], { encoding: 'utf8' });
  const path = join(root, 'bundles', file);
  if (check) {
    if (!existsSync(path) || readFileSync(path, 'utf8') !== content) {
      console.error(`stale: bundles/${file} (run npm run bundle)`);
      stale += 1;
    }
  } else {
    writeFileSync(path, content);
    console.log(`wrote bundles/${file} (${Math.round(content.length / 1024)} KB)`);
  }
}
if (stale) process.exit(1);
