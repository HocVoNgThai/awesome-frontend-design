import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const cli = fileURLToPath(new URL('../bin/cli.mjs', import.meta.url));

for (const command of ['init', 'install', 'add', 'remove', 'uninstall', 'list', 'bundle']) {
  for (const flag of ['--help', '-h']) {
    test(`${command} ${flag} shows help without changing the project`, () => {
      const cwd = mkdtempSync(join(tmpdir(), 'afd-cli-help-'));
      try {
        const result = spawnSync(process.execPath, [cli, command, flag], {
          cwd,
          encoding: 'utf8',
        });
        assert.equal(result.status, 0, result.stderr);
        assert.ok(result.stdout.includes('Usage:'), 'expected CLI usage information');
        assert.deepEqual(readdirSync(cwd), []);
      } finally {
        rmSync(cwd, { recursive: true, force: true });
      }
    });
  }
}

test('remove --help preserves installed skills', () => {
  const cwd = mkdtempSync(join(tmpdir(), 'afd-cli-help-'));
  const run = (...args) => spawnSync(process.execPath, [cli, ...args], { cwd, encoding: 'utf8' });
  try {
    const installed = run('init', '--skills', 'afd-motion');
    assert.equal(installed.status, 0, installed.stderr);
    const skill = join(cwd, '.agents', 'skills', 'afd-motion', 'SKILL.md');
    assert.ok(existsSync(skill));
    const help = run('remove', '--help', '--skills', 'afd-motion');
    assert.equal(help.status, 0, help.stderr);
    assert.ok(help.stdout.includes('Usage:'), 'expected CLI usage information');
    assert.ok(existsSync(skill), 'help must preserve installed skills');
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});
const missingValues = ['--skills', '--ai', '--dir'];
const malformedCommands = [
  ...['init', 'install', 'add', 'remove', 'uninstall'].flatMap((command) =>
    missingValues.map((option) => [command, option])),
  ...['init', 'remove'].flatMap((command) =>
    missingValues.flatMap((option) => [[command, option, ''], [command, option, '--dry-run']])),
  ['remove', '--skills', '   '],
];

for (const args of malformedCommands) {
  test(`${JSON.stringify(args)} rejects a missing value without changing installed skills`, () => {
    const cwd = mkdtempSync(join(tmpdir(), 'afd-cli-options-'));
    const run = (...args) => spawnSync(process.execPath, [cli, ...args], { cwd, encoding: 'utf8' });
    try {
      const installed = run('init', '--skills', 'afd-motion,afd-theme-systems');
      assert.equal(installed.status, 0, installed.stderr);
      const result = run(...args);
      assert.equal(result.status, 1, result.stderr);
      assert.match(result.stderr, /requires a value/);
      assert.deepEqual(readdirSync(join(cwd, '.agents', 'skills')).sort(), ['afd-motion', 'afd-theme-systems']);
      for (const name of ['afd-motion', 'afd-theme-systems']) {
        assert.ok(existsSync(join(cwd, '.agents', 'skills', name, 'SKILL.md')));
      }
    } finally {
      rmSync(cwd, { recursive: true, force: true });
    }
  });
}

for (const args of [[], ['--skills', 'afd-motion']]) {
  test(`remove ${JSON.stringify(args)} retains its intended selection`, () => {
    const cwd = mkdtempSync(join(tmpdir(), 'afd-cli-options-'));
    const run = (...args) => spawnSync(process.execPath, [cli, ...args], { cwd, encoding: 'utf8' });
    try {
      const installed = run('init', '--skills', 'afd-motion,afd-theme-systems');
      assert.equal(installed.status, 0, installed.stderr);
      const removed = run('remove', ...args);
      assert.equal(removed.status, 0, removed.stderr);
      assert.deepEqual(readdirSync(join(cwd, '.agents', 'skills')), args.length ? ['afd-theme-systems'] : []);
    } finally {
      rmSync(cwd, { recursive: true, force: true });
    }
  });
}
