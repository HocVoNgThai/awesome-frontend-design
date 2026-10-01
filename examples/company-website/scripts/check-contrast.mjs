#!/usr/bin/env node
// Dependency-free WCAG contrast gate.
// Usage: node check-contrast.mjs themes.json
// themes.json:
// {
//   "gray":  { "pairs": [ { "name": "body", "fg": "#0d1012", "bg": "#c8cbcd", "min": 4.5 } ] },
//   "black": { "pairs": [ { "name": "focus ring", "fg": "#7cd4f5", "bg": "#101214", "min": 3 } ] }
// }
import { readFileSync } from 'node:fs';

const file = process.argv[2];
if (!file) {
  console.error('usage: check-contrast.mjs themes.json');
  process.exit(2);
}

const hex = (h) => {
  let s = h.replace('#', '');
  if (s.length === 3) s = [...s].map((c) => c + c).join('');
  if (!/^[0-9a-f]{6}$/i.test(s)) throw new Error(`bad colour: ${h}`);
  return [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16) / 255);
};
const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const lum = (rgb) => {
  const [r, g, b] = rgb.map(lin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(hex(a)), lum(hex(b))].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const themes = JSON.parse(readFileSync(file, 'utf8'));
let failed = 0;
let total = 0;
for (const [theme, { pairs }] of Object.entries(themes)) {
  for (const p of pairs) {
    const min = p.min ?? 4.5;
    const r = ratio(p.fg, p.bg);
    total += 1;
    if (r < min) {
      failed += 1;
      console.error(`FAIL ${theme} / ${p.name}: ${r.toFixed(2)} < ${min} (${p.fg} on ${p.bg})`);
    }
  }
}
console.log(`${total - failed}/${total} pairs pass`);
process.exit(failed ? 1 : 0);
