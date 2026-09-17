/**
 * Renders the four static OpsScore share images (1200×630) into public/assets/opsscore.
 * Run after changing PHASE_COPY: `npm run opsscore:og`. Needs Google Chrome; set CHROME_PATH if it
 * is not in the default macOS location.
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { PHASE_COPY, PRINT_COPY, QUIZ_COPY, RESULT_COPY } from '../src/lib/opsscore/copy';
import { phaseRange, type Phase } from '../src/lib/opsscore/scoring';

const root = resolve(import.meta.dirname, '..');
const chrome = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const fontUrl = pathToFileURL(join(root, 'public/fonts/Satoshi-Variable.ttf')).href;
const logoUrl = pathToFileURL(join(root, 'public/assets/coderoach_logo.svg')).href;
const workDir = mkdtempSync(join(tmpdir(), 'opsscore-og-'));
const PHASES: Phase[] = [1, 2, 3, 4];

const escape = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function page(phase: Phase) {
  const copy = PHASE_COPY[phase];
  const ladder = PHASES.map((p) => {
    const { from, to } = phaseRange(p);
    const state = p === phase ? 'on' : p < phase ? 'done' : '';
    return `<div class="${state}">${escape(PHASE_COPY[p].name)} <span>${from}–${to}</span></div>`;
  }).join('');
  return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: Satoshi; src: url('${fontUrl}') format('truetype'); font-weight: 100 900; }
* { box-sizing: border-box; margin: 0; }
html, body { width: 1200px; height: 630px; overflow: hidden; }
body { background: #F4F7F5; color: #08090A; font-family: Satoshi, system-ui, sans-serif; position: relative; }
.grid { position: absolute; inset: 0; opacity: .7;
  background-image: linear-gradient(#E8ECEA 1px, transparent 1px), linear-gradient(90deg, #E8ECEA 1px, transparent 1px);
  background-size: 64px 64px; }
.wrap { position: relative; height: 100%; padding: 60px 72px 64px; display: flex; flex-direction: column; }
.top { display: flex; justify-content: space-between; align-items: center; }
.brand { display: flex; align-items: center; gap: 14px; font-size: 24px; line-height: 1.05; letter-spacing: -0.02em; }
.brand img { height: 48px; }
.mono { font-family: ui-monospace, Menlo, monospace; letter-spacing: .06em; text-transform: uppercase; }
.marker { font-size: 20px; color: #7A767C; }
.phase { margin-top: auto; font-size: 22px; color: #2C70FE; }
h1 { font-size: 116px; font-weight: 700; letter-spacing: -0.035em; line-height: 1; margin-top: 10px; }
p { font-size: 32px; line-height: 1.35; color: #7A767C; margin-top: 18px; max-width: 960px; }
.ladder { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-top: 40px; }
.ladder div { border-top: 5px solid #E8ECEA; padding-top: 12px; font-size: 21px; color: #7A767C; }
.ladder span { font-family: ui-monospace, Menlo, monospace; font-size: 17px; margin-left: 6px; }
.ladder .done { border-color: #08090A; }
.ladder .on { border-color: #2C70FE; color: #08090A; font-weight: 700; }
</style></head><body><div class="grid"></div><div class="wrap">
<div class="top"><div class="brand"><img src="${logoUrl}" alt=""><div><b>coderoach</b><br>studio</div></div>
<div class="mono marker">[ ${escape(QUIZ_COPY.brand)} ] · ${escape(PRINT_COPY.footerUrl)}</div></div>
<div class="mono phase">${escape(RESULT_COPY.phaseOf(phase))}</div>
<h1>${escape(copy.title)}</h1>
<p>${escape(copy.key)}</p>
<div class="ladder">${ladder}</div>
</div></body></html>`;
}

for (const phase of PHASES) {
  const htmlFile = join(workDir, `fase-${phase}.html`);
  writeFileSync(htmlFile, page(phase));
  const output = join(root, `public/assets/opsscore/og-fase-${phase}.png`);
  execFileSync(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      '--window-size=1200,630',
      '--virtual-time-budget=3000',
      `--screenshot=${output}`,
      pathToFileURL(htmlFile).href,
    ],
    { stdio: 'ignore' },
  );
  console.log(`wrote ${output}`);
}
