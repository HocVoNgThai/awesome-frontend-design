#!/usr/bin/env node
// Render matrix: pages x themes x viewports with Playwright.
// Collects console errors, CSP violations, failed requests, horizontal overflow, visible h1 count, screenshots.
//
// Usage:
//   node render-matrix.mjs --base http://localhost:4321 --pages / /about/ \
//     --themes light dark --viewports 360x780 1440x900 --out .afd-review [--theme-key theme] [--reduced]
//
// Themes are applied by setting localStorage[theme-key] before load (default key: "theme").
// Requires: npm i -D playwright-core (and a browser: npx playwright install chromium) or playwright.
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  if (i === -1) return fallback;
  const out = [];
  for (let j = i + 1; j < args.length && !args[j].startsWith('--'); j += 1) out.push(args[j]);
  return out.length ? out : [true];
};

const base = (opt('base', ['http://localhost:4321'])[0]).replace(/\/$/, '');
const pages = opt('pages', ['/']);
const themes = opt('themes', ['light', 'dark']);
const viewports = opt('viewports', ['360x780', '1440x900']);
const outDir = opt('out', ['.afd-review'])[0];
const themeKey = opt('theme-key', ['theme'])[0];
const reduced = opt('reduced', [false])[0] === true;
mkdirSync(outDir, { recursive: true });

let chromium;
try {
  ({ chromium } = await import('playwright-core'));
} catch {
  ({ chromium } = await import('playwright'));
}

const browser = await chromium.launch();
const findings = [];
let shots = 0;

for (const theme of themes) {
  for (const vp of viewports) {
    const [width, height] = vp.split('x').map(Number);
    const ctx = await browser.newContext({
      viewport: { width, height },
      reducedMotion: reduced ? 'reduce' : 'no-preference',
    });
    await ctx.addInitScript(([k, v]) => { try { localStorage.setItem(k, v); } catch {} }, [themeKey, theme]);

    for (const path of pages) {
      const page = await ctx.newPage();
      const tag = `${path} | ${theme} | ${vp}`;
      const problems = [];

      page.on('console', (m) => { if (m.type() === 'error') problems.push(`console error: ${m.text()}`); });
      page.on('pageerror', (e) => problems.push(`page error: ${e.message}`));
      page.on('requestfailed', (r) => problems.push(`request failed: ${r.url()}`));
      await page.addInitScript(() => {
        document.addEventListener('securitypolicyviolation', (e) => {
          console.error(`CSP violation: ${e.violatedDirective} ${e.blockedURI}`);
        });
      });

      try {
        await page.goto(base + path, { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts && document.fonts.ready);
        const m = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth > innerWidth,
          h1: [...document.querySelectorAll('h1')].filter((h) => h.getClientRects().length > 0 && getComputedStyle(h).visibility !== 'hidden').length,
          noAlt: [...document.images].filter((i) => !i.hasAttribute('alt')).length,
          unlabeled: [...document.querySelectorAll('button, a')].filter((el) => !(el.textContent || '').trim() && !el.getAttribute('aria-label') && !el.getAttribute('aria-labelledby') && !el.querySelector('img[alt]')).length,
        }));
        if (m.overflow) problems.push('horizontal overflow');
        if (m.h1 !== 1) problems.push(`visible h1 count is ${m.h1} (expected 1)`);
        if (m.noAlt) problems.push(`${m.noAlt} image(s) without alt attribute`);
        if (m.unlabeled) problems.push(`${m.unlabeled} link/button without accessible name`);

        const slug = path.replace(/[^a-z0-9]+/gi, '_').replace(/^_+|_+$/g, '') || 'home';
        const name = `${slug}__${theme}__${vp}.png`;
        await page.screenshot({ path: join(outDir, name), fullPage: true });
        shots += 1;
      } catch (e) {
        problems.push(`navigation failed: ${e.message}`);
      }
      for (const p of problems) findings.push(`${tag}: ${p}`);
      await page.close();
    }
    await ctx.close();
  }
}
await browser.close();

console.log(`screenshots: ${shots} in ${outDir}`);
if (findings.length) {
  console.log(`findings (${findings.length}):`);
  for (const f of findings) console.log(`- ${f}`);
  process.exit(1);
}
console.log('no automated findings (still look at the screenshots)');
