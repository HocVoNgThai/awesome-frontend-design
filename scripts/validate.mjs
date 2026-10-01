#!/usr/bin/env node
// Validates the skill pack: frontmatter, names, links to references/scripts, banned dashes in prose.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const skillsDir = join(root, 'skills');
const DASHES = new RegExp(`[${String.fromCharCode(0x2013)}${String.fromCharCode(0x2014)}]`);
const errors = [];
const err = (m) => errors.push(m);

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const skills = readdirSync(skillsDir).filter((d) => statSync(join(skillsDir, d)).isDirectory());
if (!skills.length) err('no skills found');

for (const s of skills) {
  const file = join(skillsDir, s, 'SKILL.md');
  if (!existsSync(file)) {
    err(`${s}: missing SKILL.md`);
    continue;
  }
  const text = readFileSync(file, 'utf8');
  const fm = /^---\n([\s\S]*?)\n---\n/.exec(text);
  if (!fm) {
    err(`${s}: missing frontmatter`);
    continue;
  }
  const name = /^name:\s*(.+)$/m.exec(fm[1])?.[1].trim();
  const desc = /^description:\s*(.+)$/m.exec(fm[1])?.[1].trim();
  if (name !== s) err(`${s}: frontmatter name "${name}" must equal folder name`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s) || s.length > 64) err(`${s}: invalid skill name`);
  if (!desc) err(`${s}: missing description`);
  else if (desc.length > 1024) err(`${s}: description ${desc.length} chars (max 1024)`);
  else if (desc.length < 80) err(`${s}: description too short to trigger reliably`);

  // every `references/x` or `scripts/x` mention must exist
  for (const m of text.matchAll(/`((?:references|scripts)\/[A-Za-z0-9._-]+)`/g)) {
    if (!existsSync(join(skillsDir, s, m[1]))) err(`${s}: broken link ${m[1]}`);
  }
}

// banned characters in all prose and code of the pack (house rule: no em dash, no en dash)
const textFiles = [...walk(root).filter((f) => !f.includes('/.git/') && !f.includes('/node_modules/') && !f.includes('/dist/') && !f.includes('/.astro/'))].filter((f) =>
  /\.(md|mjs|json|yml|yaml)$/.test(f),
);
for (const f of textFiles) {
  const t = readFileSync(f, 'utf8');
  if (DASHES.test(t)) err(`${f.replace(`${root}/`, '')}: contains an em or en dash`);
}

if (errors.length) {
  console.error(errors.map((e) => `- ${e}`).join('\n'));
  process.exit(1);
}
console.log(`ok: ${skills.length} skills, ${textFiles.length} text files checked`);
