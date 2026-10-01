#!/usr/bin/env node
// Builds every example as a hosted demo under a sub-path of an existing site.
//
//   node examples/build-hosted.mjs <outDir> [--site https://thiscooking.site] [--prefix /samples]
//
// Result: <outDir>/web-agency/ and <outDir>/company-website/, ready to drop into the `public/` folder of a static site.
// Hosted mode: pages are noindex, no sitemap/robots/404 files, no <form>, no inline scripts (fits a strict CSP).
import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const out = args[0] && !args[0].startsWith('--') ? resolve(args[0]) : null;
const opt = (n, d) => (args.includes(`--${n}`) ? args[args.indexOf(`--${n}`) + 1] : d);
if (!out) {
  console.error('usage: node examples/build-hosted.mjs <outDir> [--site https://example.com] [--prefix /samples]');
  process.exit(2);
}
const site = opt('site', 'https://thiscooking.site').replace(/\/$/, '');
const prefix = `/${opt('prefix', '/samples').replace(/^\/|\/$/g, '')}`;

const examples = { 'web-agency-landing': 'web-agency', 'company-website': 'company-website' };
const run = (cwd, cmd, argv, env = {}) => {
  const r = spawnSync(cmd, argv, { cwd, stdio: 'inherit', env: { ...process.env, ...env } });
  if (r.status !== 0) process.exit(r.status ?? 1);
};

for (const [dir, slug] of Object.entries(examples)) {
  const cwd = join(here, dir);
  if (!existsSync(join(cwd, 'node_modules'))) run(cwd, 'npm', ['ci', '--no-audit', '--no-fund']);
  run(cwd, 'npx', ['astro', 'build'], { SITE_URL: site, BASE_PATH: `${prefix}/${slug}`, PUBLIC_DEMO_HOSTED: '1' });

  const dest = join(out, slug);
  rmSync(dest, { recursive: true, force: true });
  mkdirSync(dest, { recursive: true });
  cpSync(join(cwd, 'dist'), dest, { recursive: true });
  for (const f of readdirSync(dest)) {
    if (f === 'robots.txt' || f === '404.html' || /^sitemap.*\.xml$/.test(f)) rmSync(join(dest, f));
  }
  console.log(`built ${dir} -> ${dest} (${site}${prefix}/${slug}/)`);
}
