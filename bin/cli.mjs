#!/usr/bin/env node
// awesome-frontend-design installer. Zero dependencies, Node >= 18.
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const skillsDir = join(root, 'skills');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));

// Project-level and user-level skill folders per agent. Each agent documents its own location;
// override with --dir when a tool changes it.
const TARGETS = {
  claude: { project: '.claude/skills', global: '.claude/skills', label: 'Claude Code' },
  codex: { project: '.agents/skills', global: '.agents/skills', label: 'OpenAI Codex' },
  gemini: { project: '.gemini/skills', global: '.gemini/skills', label: 'Gemini CLI' },
  antigravity: { project: '.agent/skills', global: '.gemini/antigravity/skills', label: 'Google Antigravity' },
  cursor: { project: '.cursor/skills', global: '.cursor/skills', label: 'Cursor' },
  copilot: { project: '.github/skills', global: '.copilot/skills', label: 'GitHub Copilot' },
  opencode: { project: '.opencode/skills', global: '.config/opencode/skills', label: 'OpenCode' },
  windsurf: { project: '.windsurf/skills', global: '.codeium/windsurf/skills', label: 'Windsurf' },
  agents: { project: '.agents/skills', global: '.agents/skills', label: 'Universal (.agents/skills)' },
};

const HELP = `awesome-frontend-design ${pkg.version}

Usage:
  npx awesome-frontend-design init [options]     install the skills
  npx awesome-frontend-design list               list skills and supported agents
  npx awesome-frontend-design bundle [--full]    print one Markdown file (for ChatGPT, Gemini web, any chat)
  npx awesome-frontend-design remove [options]   remove installed skills

Options:
  --ai <names>       comma list: ${Object.keys(TARGETS).join(', ')}, all
                     default: detect agent folders in the current project, else "agents"
  --global, -g       install for your user instead of the current project
  --skills <names>   comma list of skills (default: all)
  --dir <path>       install into this exact folder (overrides --ai)
  --force, -f        overwrite existing skill folders without asking
  --dry-run          show what would happen
  --full             (bundle) include the references/ files
  --help, -h         show this help
`;

const argv = process.argv.slice(2);
const cmd = argv[0] && !argv[0].startsWith('-') ? argv[0] : 'help';
const flag = (n, short) => argv.includes(`--${n}`) || (short && argv.includes(`-${short}`));
const value = (n) => {
  const i = argv.indexOf(`--${n}`);
  return i !== -1 && argv[i + 1] && !argv[i + 1].startsWith('-') ? argv[i + 1] : undefined;
};

const allSkills = () =>
  readdirSync(skillsDir).filter((d) => existsSync(join(skillsDir, d, 'SKILL.md'))).sort();

function pickSkills() {
  const wanted = value('skills')?.split(',').map((s) => s.trim()).filter(Boolean);
  const all = allSkills();
  if (!wanted) return all;
  const bad = wanted.filter((s) => !all.includes(s));
  if (bad.length) fail(`unknown skill: ${bad.join(', ')}\navailable: ${all.join(', ')}`);
  return wanted;
}

function pickAgents() {
  const raw = value('ai');
  if (raw) {
    const names = raw === 'all' ? Object.keys(TARGETS) : raw.split(',').map((s) => s.trim());
    const bad = names.filter((n) => !TARGETS[n]);
    if (bad.length) fail(`unknown agent: ${bad.join(', ')}\nsupported: ${Object.keys(TARGETS).join(', ')}, all`);
    return names;
  }
  const found = Object.keys(TARGETS).filter(
    (n) => n !== 'agents' && n !== 'codex' && existsSync(join(process.cwd(), TARGETS[n].project.split('/')[0])),
  );
  return found.length ? found : ['agents'];
}

function targetDirs() {
  const dir = value('dir');
  if (dir) return [{ label: dir, path: resolve(dir) }];
  const seen = new Set();
  const out = [];
  for (const n of pickAgents()) {
    const base = flag('global', 'g') ? homedir() : process.cwd();
    const path = join(base, flag('global', 'g') ? TARGETS[n].global : TARGETS[n].project);
    if (seen.has(path)) continue;
    seen.add(path);
    out.push({ label: TARGETS[n].label, path });
  }
  return out;
}

function fail(msg) {
  console.error(`error: ${msg}`);
  process.exit(1);
}

function init() {
  const skills = pickSkills();
  const dry = flag('dry-run');
  for (const t of targetDirs()) {
    console.log(`${t.label}: ${t.path}`);
    for (const s of skills) {
      const dest = join(t.path, s);
      if (existsSync(dest) && !flag('force', 'f')) {
        console.log(`  skip ${s} (exists, use --force to overwrite)`);
        continue;
      }
      console.log(`  ${dry ? 'would install' : 'install'} ${s}`);
      if (dry) continue;
      mkdirSync(t.path, { recursive: true });
      if (existsSync(dest)) rmSync(dest, { recursive: true, force: true });
      cpSync(join(skillsDir, s), dest, { recursive: true });
    }
  }
  if (!dry) console.log('\nDone. Start your agent and ask for a UI, for example:\n  "Use awesome-frontend-design: static, expressive. Build my portfolio."');
}

function remove() {
  const skills = pickSkills();
  for (const t of targetDirs()) {
    for (const s of skills) {
      const dest = join(t.path, s);
      if (!existsSync(dest)) continue;
      if (flag('dry-run')) console.log(`would remove ${dest}`);
      else {
        rmSync(dest, { recursive: true, force: true });
        console.log(`removed ${dest}`);
      }
    }
  }
}

function list() {
  console.log('Skills:');
  for (const s of allSkills()) {
    const text = readFileSync(join(skillsDir, s, 'SKILL.md'), 'utf8');
    const desc = /^description:\s*(.+)$/m.exec(text)?.[1] ?? '';
    console.log(`  ${s}\n    ${desc.length > 110 ? `${desc.slice(0, 107)}...` : desc}`);
  }
  console.log('\nAgents:');
  for (const [n, t] of Object.entries(TARGETS)) console.log(`  ${n.padEnd(12)} ${t.label}  (${t.project})`);
}

function bundle() {
  const full = flag('full');
  const strip = (t) => t.replace(/^---\n[\s\S]*?\n---\n/, '').trim();
  const parts = [
    '# Awesome Frontend Design (single-file bundle)',
    '',
    'Paste this as custom instructions, project knowledge or a system prompt. Follow the options and routing in the first skill.',
    '',
  ];
  const order = ['awesome-frontend-design', ...allSkills().filter((s) => s !== 'awesome-frontend-design')];
  for (const s of order) {
    parts.push(`\n\n<!-- skill: ${s} -->\n`, strip(readFileSync(join(skillsDir, s, 'SKILL.md'), 'utf8')));
    if (!full) continue;
    const refs = join(skillsDir, s, 'references');
    if (!existsSync(refs)) continue;
    for (const f of readdirSync(refs).sort()) {
      if (statSync(join(refs, f)).isFile()) parts.push(`\n\n<!-- ${s}/references/${f} -->\n`, strip(readFileSync(join(refs, f), 'utf8')));
    }
  }
  process.stdout.write(`${parts.join('\n')}\n`);
}

switch (cmd) {
  case 'init':
  case 'add':
  case 'install':
    init();
    break;
  case 'remove':
  case 'uninstall':
    remove();
    break;
  case 'list':
    list();
    break;
  case 'bundle':
    bundle();
    break;
  default:
    console.log(HELP);
}
