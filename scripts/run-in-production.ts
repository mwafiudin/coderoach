/**
 * Runs one of the sync scripts inside the production web service.
 *
 * The Railway image only carries what `next start` needs, so scripts/ (and the files in
 * scripts/portfolio-assets) is not in it, and `railway ssh -- "npx tsx scripts/…"` finds nothing.
 * This packs the script (plus the assets for portfolio-sync) from this checkout, sends it over
 * `railway ssh` stdin, checks the sha256 on the other side, unpacks it into /app, and runs it there,
 * where the media volume, the private database, and CODEROACH_OS_TOKEN already are. No production
 * secret leaves Railway. The copy is gone at the next deploy; the archive is deleted once unpacked.
 *
 *   npx tsx scripts/run-in-production.ts portfolio-sync           # dry run
 *   npx tsx scripts/run-in-production.ts portfolio-sync --apply
 *
 * Run it from the main checkout (the folder `railway link`ed to coderoach-web), on exactly
 * origin/main: that is the code Railway runs, and the assets must match the projects.ts it was
 * built from.
 */
import { createHash } from 'node:crypto';
import { spawn, spawnSync } from 'node:child_process';

/** What each script needs besides itself. Anything not listed here cannot be run this way. */
const SCRIPTS: Record<string, string[]> = {
  'portfolio-sync': ['scripts/portfolio-assets'],
  'landing-sync': [],
  // Writes text-cleanup-backup-<time>.json in /app on --apply: copy it out before the next deploy.
  'text-cleanup': [],
};

const name = process.argv[2] ?? '';
const apply = process.argv.includes('--apply');
if (!(name in SCRIPTS)) {
  console.error(`Usage: npx tsx scripts/run-in-production.ts <${Object.keys(SCRIPTS).join('|')}> [--apply]`);
  process.exit(1);
}

const git = (...args: string[]) => spawnSync('git', args, { encoding: 'utf8' }).stdout.trim();
git('fetch', '--quiet', 'origin', 'main');
const head = git('rev-parse', 'HEAD');
const main = git('rev-parse', 'origin/main');
const dirty = git('status', '--porcelain', '--', 'scripts', 'src');
if (head !== main || dirty) {
  console.error(`Check out origin/main (${main.slice(0, 7)}) with no changes in scripts/ or src/ first; this is ${head.slice(0, 7)}${dirty ? ', modified' : ''}.`);
  process.exit(1);
}

const files = [`scripts/${name}.ts`, ...SCRIPTS[name]];
const tar = spawnSync('tar', ['czf', '-', ...files], { maxBuffer: 256 * 1024 * 1024 });
if (tar.status !== 0) {
  console.error(`tar failed: ${tar.stderr}`);
  process.exit(1);
}
const sum = createHash('sha256').update(tar.stdout).digest('hex');
console.log(`Sending ${files.join(', ')} from ${main.slice(0, 7)}: ${(tar.stdout.length / 1048576).toFixed(1)} MB, sha256 ${sum.slice(0, 12)}`);

// The whole remote script goes over stdin to a bare `sh`, archive included as a heredoc, so no
// argument needs quoting (on Windows `railway` is a .cmd shim and its arguments pass through cmd).
const b64 = tar.stdout.toString('base64').replace(/.{1,76}/g, '$&\n');
const remote = `set -e
f=/tmp/${name}-${sum.slice(0, 12)}.tgz
base64 -d > "$f" <<'ARSIP'
${b64}ARSIP
echo "${sum}  $f" | sha256sum -c - >/dev/null
tar xzf "$f" -C /app
rm -f "$f"
cd /app && npx tsx scripts/${name}.ts${apply ? ' --apply' : ''}
`;

// Streamed, not spawnSync: through the Windows shim spawnSync loses stdin (EOF) before ssh reads it.
const ssh = spawn('railway', ['ssh', '--service', 'web', '--', 'sh'], {
  shell: process.platform === 'win32',
  stdio: ['pipe', 'inherit', 'inherit'],
});
// EOF here means railway quit before reading, usually because this folder is not linked to the project.
ssh.stdin.on('error', () => console.error('railway ssh closed its input; is this folder linked (`railway status`)?'));
ssh.stdin.end(remote);
ssh.on('error', (err) => {
  console.error(err);
  process.exit(1);
});
ssh.on('close', (code) => process.exit(code ?? 1));
