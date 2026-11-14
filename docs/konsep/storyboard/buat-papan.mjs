// Merakit papan.html dari semua storyboard JSON di folder ini.
//   node docs/konsep/storyboard/buat-papan.mjs
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const ORDER = ['beranda', 'katalog-work', 'laporta', 'rpn-os', 'locascore', 'the-global-review', 'uruzin', 'chicken-wow',
  'coderoach-os', 'viralytics', 'rencana-ro', 'akarkita', 'jeda', 'd-day', 'yiheecam', 'fifofun', 'ridedeck'];
const files = readdirSync(dir).filter((f) => f.endsWith('.json'));
const boards = files
  .map((f) => JSON.parse(readFileSync(join(dir, f), 'utf8')))
  .sort((a, b) => (ORDER.indexOf(a.slug) + 1 || 99) - (ORDER.indexOf(b.slug) + 1 || 99));

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const KOREO = {
  none: 'Tanpa gerak scroll', 'pin-scrub': 'Pin dan scrub', 'quiet-reveal': 'Quiet reveal', 'sticky-stack': 'Sticky stack',
  wipe: 'Wipe satu bingkai', 'shared-element': 'Shared element', 'image-sequence': 'Image sequence',
  'progress-rail': 'Progress rail', 'number-reveal': 'Number reveal',
};

function shape(el) {
  const label = `<span class="lbl">${esc(el.label)}</span>`;
  switch (el.jenis) {
    case 'laptop': return `<div class="el laptop"><i></i><b></b>${label}</div>`;
    case 'ponsel': return `<div class="el ponsel"><i></i>${label}</div>`;
    case 'browser': return `<div class="el browser"><i></i>${label}</div>`;
    case 'judul': return `<div class="el judul"><i></i><i></i>${label}</div>`;
    case 'teks': return `<div class="el teks"><i></i><i></i><i></i>${label}</div>`;
    case 'angka': return `<div class="el angka"><i>123</i>${label}</div>`;
    case 'logo': case 'ikon': return `<div class="el logo"><i></i>${label}</div>`;
    case 'video': return `<div class="el video"><i></i>${label}</div>`;
    default: return `<div class="el kotak ${esc(el.jenis)}"><i></i>${label}</div>`;
  }
}

function sketch(a, id) {
  const zones = { atas: [], kiri: [], tengah: [], kanan: [], bawah: [], penuh: [] };
  for (const el of a.elemen ?? []) (zones[el.posisi] ?? zones.tengah).push(el);
  const z = (k) => (zones[k].length ? `<div class="z z-${k}">${zones[k].map(shape).join('')}</div>` : '');
  const style = `--lat:${esc(id?.latar ?? '#F7F8F9')};--tin:${esc(id?.tinta ?? '#0B0F14')};--aks:${esc(id?.aksen ?? '#2C70FE')}`;
  return `<div class="sk t-${esc(a.tata)} k-${esc(a.koreografi)}" style="${style}">${z('atas')}<div class="mid">${z('kiri')}${z('tengah')}${z('kanan')}</div>${z('bawah')}${z('penuh')}</div>`;
}

function rail(b) {
  const end = Math.max(...b.adegan.map((a) => a.scroll?.[1] ?? 0), 1);
  return `<div class="rail" aria-hidden="true">${b.adegan
    .map((a) => {
      const [s, e] = a.scroll ?? [0, 0];
      return `<span class="seg k-${esc(a.koreografi)}${a.baru ? ' baru' : ''}" style="left:${(s / end) * 100}%;width:${Math.max(((e - s) / end) * 100, 1.2)}%" title="${esc(a.id)} ${esc(a.nama)}">${esc(a.id)}</span>`;
    })
    .join('')}</div><p class="rail-k">Panjang halaman sekitar ${end} vh. Blok biru tebal: pin. Garis putus: adegan baru.</p>`;
}

function scene(a, id) {
  const aset = (a.aset ?? []).map((x) => `<li class="${x.status === 'ada' ? 'ada' : 'belum'}">${esc(x.berkas)}</li>`).join('');
  return `<article class="adegan${a.baru ? ' baru' : ''}">
  ${sketch(a, id)}
  <header><span class="id">${esc(a.id)}</span><h3>${esc(a.nama)}</h3>${a.baru ? '<span class="tag">Baru</span>' : ''}</header>
  <p class="meta"><span>${esc(a.scroll?.[0])}–${esc(a.scroll?.[1])}&nbsp;vh</span><span class="ko">${esc(KOREO[a.koreografi] ?? a.koreografi)}</span></p>
  <dl><dt>Gerak</dt><dd>${esc(a.gerak)}</dd><dt>Ponsel</dt><dd>${esc(a.ponsel)}</dd><dt>Tanpa gerak</dt><dd>${esc(a.reducedMotion)}</dd></dl>
  ${aset ? `<ul class="aset">${aset}</ul>` : ''}
</article>`;
}

const toc = boards.map((b) => `<a href="#${esc(b.slug)}">${esc(b.judul)}</a>`).join('');
const body = boards
  .map((b) => {
    const id = b.identitas ?? {};
    const sw = ['latar', 'tinta', 'aksen'].filter((k) => id[k]).map((k) => `<span class="sw" style="background:${esc(id[k])}" title="${k} ${esc(id[k])}"></span>`).join('');
    const baru = b.adegan.filter((a) => a.baru).length;
    const belum = b.adegan.flatMap((a) => a.aset ?? []).filter((x) => x.status !== 'ada').length;
    return `<section id="${esc(b.slug)}" class="hal">
  <div class="hal-k"><p class="url">${esc(b.halaman)}</p><h2>${esc(b.judul)}</h2><p class="pesan">${esc(b.satuPesan)}</p>
  <p class="ring">${sw}<span>${b.adegan.length} adegan, ${baru} baru, ${belum} aset belum ada</span>${id.huruf ? `<span>${esc(id.huruf)}</span>` : ''}</p></div>
  ${rail(b)}
  <div class="grid">${b.adegan.map((a) => scene(a, id)).join('')}</div>
</section>`;
  })
  .join('\n');

const html = `<!doctype html>
<html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Papan storyboard scroll</title>
<style>
:root{--paper:#F7F8F9;--card:#fff;--ink:#0B0F14;--mist:#5B6573;--line:#E3E6EA;--blue:#2C70FE;--ok:#1F7A4D;--warn:#A15C00}
@media (prefers-color-scheme:dark){:root:not([data-theme=light]){--paper:#0E1217;--card:#151A21;--ink:#EEF1F4;--mist:#9AA4B1;--line:#26303B;--ok:#5CC18C;--warn:#E3A24A}}
*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:15px/1.55 system-ui,-apple-system,"Segoe UI",sans-serif}
.top{position:sticky;top:0;z-index:5;background:var(--paper);border-bottom:1px solid var(--line);padding:12px 16px;display:flex;gap:6px 14px;flex-wrap:wrap;align-items:baseline}
.top h1{font-size:17px;margin:0 12px 0 0}.top a{color:var(--mist);text-decoration:none;font-size:13px}.top a:hover{color:var(--blue)}
main{max-width:1240px;margin:0 auto;padding:0 16px 80px}
.hal{padding:48px 0 8px;border-bottom:1px solid var(--line);scroll-margin-top:60px}
.url{font:12px ui-monospace,Menlo,monospace;color:var(--mist);margin:0;text-transform:uppercase;letter-spacing:.08em}
h2{font-size:30px;margin:4px 0 6px;letter-spacing:-.01em}.pesan{margin:0 0 10px;max-width:68ch}
.ring{display:flex;gap:10px;align-items:center;flex-wrap:wrap;color:var(--mist);font-size:13px;margin:0}
.sw{width:18px;height:18px;border-radius:4px;border:1px solid var(--line);display:inline-block}
.rail{position:relative;height:26px;margin:20px 0 4px;background:var(--card);border:1px solid var(--line);border-radius:6px;overflow:hidden}
.seg{position:absolute;top:3px;bottom:3px;border-radius:4px;background:color-mix(in srgb,var(--blue) 14%,transparent);font:10px ui-monospace,monospace;color:var(--ink);display:flex;align-items:center;justify-content:center;overflow:hidden;border:1px solid transparent}
.seg.k-pin-scrub{background:var(--blue);color:#fff}.seg.baru{border:1px dashed var(--blue)}
.rail-k{font-size:12px;color:var(--mist);margin:0 0 18px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,280px),1fr));gap:16px}
.adegan{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:12px;display:flex;flex-direction:column;gap:6px}
.adegan.baru{border-color:color-mix(in srgb,var(--blue) 45%,var(--line))}
.adegan header{display:flex;gap:8px;align-items:baseline}.adegan h3{font-size:15px;margin:0;flex:1}
.id{font:12px ui-monospace,monospace;color:var(--mist)}.tag{font-size:11px;color:var(--blue);border:1px solid var(--blue);border-radius:4px;padding:0 6px}
.meta{display:flex;justify-content:space-between;gap:8px;margin:0;font:12px ui-monospace,monospace;color:var(--mist)}.ko{color:var(--ink)}
dl{margin:0;font-size:13px}dt{font-size:11px;color:var(--mist);text-transform:uppercase;letter-spacing:.06em;margin-top:6px}dd{margin:0}
.aset{list-style:none;padding:0;margin:6px 0 0;font:11px ui-monospace,monospace;display:flex;flex-wrap:wrap;gap:4px}
.aset li{padding:1px 6px;border-radius:4px;border:1px solid var(--line);overflow-wrap:anywhere}.aset .ada{color:var(--ok)}.aset .belum{color:var(--warn);border-style:dashed}
.sk{aspect-ratio:16/10;border-radius:8px;background:var(--lat);color:var(--tin);border:1px solid var(--line);padding:8px;display:flex;flex-direction:column;gap:6px;position:relative;overflow:hidden;
 background-image:linear-gradient(color-mix(in srgb,var(--tin) 6%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--tin) 6%,transparent) 1px,transparent 1px);background-size:14px 14px}
.sk.k-pin-scrub::after{content:"PIN";position:absolute;right:6px;top:6px;font:9px ui-monospace,monospace;background:var(--aks);color:#fff;padding:1px 4px;border-radius:3px}
.mid{flex:1;display:flex;gap:6px;min-height:0}.z{display:flex;gap:5px;flex-wrap:wrap;align-content:center;justify-content:center;min-width:0}
.z-kiri,.z-kanan,.z-tengah{flex:1}.z-atas,.z-bawah{flex:0 0 auto}.z-penuh{position:absolute;inset:8px;pointer-events:none;opacity:.55}
.t-split-kanan .mid{flex-direction:row-reverse}.t-tumpuk-kartu .z .el+.el{margin-left:-22px;margin-top:8px}
.t-wipe .mid::after{content:"";position:absolute;left:50%;top:12%;bottom:12%;border-left:2px dashed var(--aks)}
.el{position:relative;display:flex;flex-direction:column;align-items:center;gap:2px;min-width:0;max-width:100%}
.lbl{font-size:9px;line-height:1.2;text-align:center;max-width:110px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;opacity:.8}
.laptop i{width:78px;height:48px;border:2px solid var(--tin);border-radius:4px 4px 0 0;background:color-mix(in srgb,var(--aks) 12%,transparent)}.laptop b{width:94px;height:4px;background:var(--tin);border-radius:0 0 3px 3px}
.ponsel i{width:30px;height:56px;border:2px solid var(--tin);border-radius:7px;background:color-mix(in srgb,var(--aks) 12%,transparent)}
.browser i{width:84px;height:52px;border:2px solid var(--tin);border-top-width:7px;border-radius:4px;background:color-mix(in srgb,var(--aks) 10%,transparent)}
.judul i{height:7px;width:70px;background:var(--tin);border-radius:2px}.judul i+i{width:46px}
.teks i{height:3px;width:64px;background:color-mix(in srgb,var(--tin) 55%,transparent);border-radius:2px}.teks i:last-of-type{width:40px}
.angka i{font:700 20px/1 ui-monospace,monospace;font-style:normal;color:var(--aks)}
.logo i{width:24px;height:24px;border-radius:50%;border:2px solid var(--aks)}
.video i{width:60px;height:38px;border:2px solid var(--tin);border-radius:4px;position:relative}.video i::after{content:"";position:absolute;left:24px;top:11px;border:8px solid transparent;border-left:12px solid var(--aks)}
.kotak i{width:52px;height:34px;border:1.5px solid var(--tin);border-radius:5px;background:color-mix(in srgb,var(--aks) 8%,transparent)}
.kotak.diagram i{border-style:dashed}.kotak.foto i{background:color-mix(in srgb,var(--tin) 18%,transparent)}
@media (max-width:640px){h2{font-size:24px}}
</style></head><body>
<nav class="top"><h1>Papan storyboard scroll</h1>${toc}</nav>
<main>${body}</main>
</body></html>
`;
writeFileSync(join(dir, 'papan.html'), html);
console.log(`papan.html: ${boards.length} halaman, ${boards.reduce((n, b) => n + b.adegan.length, 0)} adegan`);
