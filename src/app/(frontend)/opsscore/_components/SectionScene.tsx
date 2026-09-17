'use client';

import { useRef } from 'react';
import type { SectionId } from '@/lib/opsscore/flow';
import type { AreaId } from '@/lib/opsscore/questions';
import { chance, messOf, octagonPoints, pick, useScene, type Palette, type Point, type Scene } from './scene-engine';

/**
 * The animated scene on a section's score card. It pictures the section's keyword, and the area scores
 * decide how messy it looks: leads leaking out of the funnel, reports arriving late, stock counts that
 * won't hold still.
 */

type Scores = Partial<Record<AreaId, number>>;
type Builder = (c: Palette, scores: Scores) => Scene;

/** Penjualan & prospek: leads pour into a funnel; the ones nobody follows up leak out. */
const sales: Builder = (c, scores) => {
  const mess = messOf(scores.sales);
  const wall = `fill="none" stroke="${c.paper}" stroke-opacity="0.55" stroke-width="1.75" stroke-linejoin="round"`;
  const stat = `text-anchor="end" style="font-size:18px;font-weight:700"`;
  return {
    back: `<polyline points="70,10 170,48 214,48" ${wall}/><polyline points="70,100 170,62 214,62" ${wall}/>`,
    front: `<text data-ref="won" x="276" y="44" fill="${c.electric}" ${stat}>0</text>
      <text x="276" y="57" text-anchor="end" fill="${c.mist}">closing</text>
      <text data-ref="lost" x="276" y="82" fill="${c.mist}" ${stat}>0</text>
      <text x="276" y="95" text-anchor="end" fill="${c.mist}">hilang</text>`,
    start(stage) {
      const won = stage.ref('won');
      const lost = stage.ref('lost');
      const recent: boolean[] = [];
      const log = (closed: boolean) => {
        recent.push(closed);
        if (recent.length > 20) recent.shift();
        const count = recent.filter(Boolean).length;
        won.textContent = String(count);
        lost.textContent = String(recent.length - count);
      };
      return {
        every: 0.34,
        spawn() {
          const x = 4 + Math.random() * 36;
          const y = 16 + Math.random() * 78;
          const node = stage.dot(3.2, c.paper);
          if (chance(mess * 0.85)) {
            const out = y < 55 ? -1 : 1;
            stage.send({
              node,
              duration: 1.8,
              fadeFrom: 0.55,
              path: [[x, y], [72, y], [112, 55 + out * 36], [140, 55 + out * 64]],
              tint: (progress) => {
                if (progress > 0.4) node.setAttribute('fill', c.mist);
              },
              done: () => log(false),
            });
            return;
          }
          stage.send({
            node,
            duration: 2.2,
            path: [[x, y], [72, y], [170, 55 + (y - 55) * 0.08], [222, 55]],
            tint: (progress) => {
              if (progress > 0.7) node.setAttribute('fill', c.electric);
            },
            done: () => log(true),
          });
        },
      };
    },
  };
};

/** Operasional & stok: field reports ride to the owner, some late and half empty; stock counts flicker. */
const operations: Builder = (c, scores) => {
  const opsMess = messOf(scores.ops);
  const hasStock = scores.stock !== undefined;
  const stockMess = messOf(scores.stock);
  const beltStart = hasStock ? 124 : 8;
  const box = (x: number, y: number, ref?: string) =>
    `<rect ${ref ? `data-ref="${ref}" ` : ''}x="${x}" y="${y}" width="28" height="14" rx="2" fill="none" stroke="${c.paper}" stroke-opacity="0.65" stroke-width="1.5"/>`;
  const count = (i: number, x: number, y: number, value: number) =>
    `<text data-ref="count${i}" x="${x}" y="${y}" text-anchor="middle" fill="${c.paper}" style="font-size:13px">${value}</text>`;
  const shelf = hasStock
    ? `<line x1="6" y1="72" x2="112" y2="72" stroke="${c.paper}" stroke-opacity="0.4" stroke-width="1.5"/>
      ${box(10, 58)}${box(10, 44, 'box0')}${box(44, 58, 'box1')}${box(78, 58)}${box(78, 44, 'box2')}
      ${count(0, 24, 37, 12)}${count(1, 58, 51, 8)}${count(2, 92, 37, 20)}
      <text x="59" y="90" text-anchor="middle" fill="${c.mist}">stok</text>`
    : '';
  return {
    back: `${shelf}
      <line data-ref="belt" x1="${beltStart}" y1="86" x2="236" y2="86" stroke="${c.paper}" stroke-opacity="0.4" stroke-width="1.75" stroke-dasharray="7 6"/>
      <text x="${beltStart}" y="102" fill="${c.mist}">lapangan</text>`,
    front: `<polygon data-ref="owner" points="${octagonPoints(256, 66, 14)}" fill="${c.ink}" stroke="${c.paper}" stroke-opacity="0.8" stroke-width="2"/>
      <text data-ref="question" x="256" y="42" text-anchor="middle" fill="${c.error}" opacity="0" style="font-size:18px;font-weight:700">?</text>
      <text x="256" y="102" text-anchor="middle" fill="${c.mist}">owner</text>`,
    start(stage) {
      const belt = stage.ref('belt');
      const owner = stage.ref('owner');
      const question = stage.ref('question');
      const counts = [12, 8, 20];
      const misread = [9, 5, 16];
      const unsteadyFrom = [0.2, 0.45, 0.7];
      const labels = hasStock ? counts.map((_, i) => stage.ref(`count${i}`)) : [];
      const tops = hasStock ? counts.map((_, i) => stage.ref(`box${i}`)) : [];
      const travel = (226 - beltStart) / 55;
      let questionFor = 0;
      let flashFor = 0;
      let blink = 0;
      let wrongNow = false;
      return {
        every: 0.8,
        spawn() {
          const late = chance(opsMess * 0.8);
          const sheet = stage.add('g', { transform: 'translate(-40 0)' });
          stage.add(
            'rect',
            {
              width: 13,
              height: 17,
              rx: 2,
              fill: c.ink,
              stroke: late ? c.mist : c.paper,
              'stroke-opacity': late ? 0.9 : 0.85,
              'stroke-width': 1.25,
              'stroke-dasharray': late ? '2.5 2' : 'none',
            },
            sheet,
          );
          stage.add('line', { x1: 3.5, y1: 4.5, x2: 9.5, y2: 4.5, stroke: late ? c.mist : c.electric, 'stroke-width': 1.5 }, sheet);
          if (!late) {
            stage.add('line', { x1: 3.5, y1: 8.5, x2: 9.5, y2: 8.5, stroke: c.paper, 'stroke-opacity': 0.6 }, sheet);
            stage.add('line', { x1: 3.5, y1: 12.5, x2: 8, y2: 12.5, stroke: c.paper, 'stroke-opacity': 0.6 }, sheet);
          }
          stage.send({
            node: sheet,
            duration: late ? travel * (1.2 + Math.random() * 0.6) : travel,
            path: [[beltStart, 66], [226, 66]],
            move: (x, y) => sheet.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`),
            done: () => {
              if (late) questionFor = 0.9;
              else flashFor = 0.35;
            },
          });
        },
        tick(dt, time) {
          belt.setAttribute('stroke-dashoffset', (-time * 20).toFixed(1));
          questionFor = Math.max(0, questionFor - dt);
          flashFor = Math.max(0, flashFor - dt);
          question.setAttribute('opacity', questionFor > 0 ? '1' : '0');
          owner.setAttribute('stroke', flashFor > 0 ? c.electric : c.paper);
          blink += dt;
          if (blink > 0.6) {
            blink = 0;
            wrongNow = !wrongNow;
          }
          labels.forEach((label, i) => {
            const unsteady = stockMess > unsteadyFrom[i];
            const wrong = unsteady && wrongNow;
            label.textContent = wrong ? `${misread[i]}?` : String(counts[i]);
            label.setAttribute('fill', unsteady ? c.mist : c.paper);
            tops[i].setAttribute('opacity', wrong ? '0.3' : '1');
          });
        },
      };
    },
  };
};

/** Keuangan & kas: the cash-flow line breaks where nothing was recorded; some money drops out as "selisih". */
const finance: Builder = (c, scores) => {
  const mess = messOf(scores.finance);
  return {
    back: `<line x1="8" y1="52" x2="276" y2="52" stroke="${c.paper}" stroke-opacity="0.14"/>
      <g data-ref="gaps"></g>
      <path data-ref="line" fill="none" stroke="${c.electric}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
      <text x="8" y="70" fill="${c.mist}">masuk</text>
      <text x="272" y="70" text-anchor="end" fill="${c.mist}">keluar</text>`,
    front: `<rect x="122" y="68" width="48" height="32" rx="5" fill="${c.ink}" stroke="${c.paper}" stroke-opacity="0.6" stroke-width="1.5"/>
      <text x="146" y="89" text-anchor="middle" fill="${c.paper}" fill-opacity="0.8" style="font-size:12px">kas</text>
      <text data-ref="diff" x="178" y="106" fill="${c.error}" opacity="0" style="font-size:12px">selisih?</text>`,
    start(stage) {
      const chart = stage.ref('line');
      const gaps = stage.ref('gaps');
      const diff = stage.ref('diff');
      const values: Array<number | null> = Array.from({ length: 30 }, (_, i) => 0.45 + 0.2 * Math.sin(i / 3));
      let shift = 0;
      let diffFor = 0;
      return {
        every: 0.5,
        spawn() {
          const node = stage.dot(4.5, c.paper);
          if (chance(mess * 0.5)) {
            stage.send({
              node,
              duration: 1.9,
              fadeFrom: 0.8,
              path: [[-6, 84], [140, 84], [146, 120]],
              tint: (progress) => {
                if (progress > 0.85) node.setAttribute('fill', c.error);
              },
              done: () => {
                diffFor = 0.9;
              },
            });
            return;
          }
          stage.send({
            node,
            duration: 3.2,
            path: [[-6, 84], [146, 84], [292, 84]],
            tint: (progress) => {
              if (progress > 0.5) node.setAttribute('fill', c.electric);
            },
          });
        },
        tick(dt) {
          shift += dt;
          if (shift >= 0.2) {
            shift -= 0.2;
            values.shift();
            const last = [...values].reverse().find((v): v is number => v !== null) ?? 0.5;
            const next = last + (Math.random() - 0.5) * 0.22 + (0.55 - last) * 0.08;
            values.push(chance(mess * 0.55) ? null : Math.min(0.95, Math.max(0.08, next)));
          }
          const offset = (shift / 0.2) * 9.2;
          let d = '';
          let pen = false;
          let marks = '';
          values.forEach((value, i) => {
            const x = (8 + i * 9.2 - offset).toFixed(1);
            if (value === null) {
              pen = false;
              marks += `<line x1="${x}" y1="10" x2="${x}" y2="50" stroke="${c.mist}" stroke-opacity="0.35" stroke-dasharray="2 3"/>`;
            } else {
              d += `${pen ? 'L' : 'M'}${x} ${(48 - value * 38).toFixed(1)} `;
              pen = true;
            }
          });
          chart.setAttribute('d', d);
          gaps.innerHTML = marks;
          diffFor = Math.max(0, diffFor - dt);
          diff.setAttribute('opacity', diffFor > 0 ? '1' : '0');
        },
      };
    },
  };
};

/** Tim & peran owner: the team's questions pile up on the owner, or flow to a system instead. */
const team: Builder = (c, scores) => {
  const ownerMess = messOf(scores.owner);
  const peopleMess = messOf(scores.people);
  const owner: Point = [100, 55];
  const system: Point = [190, 55];
  const members: Point[] = [
    [22, 16],
    [146, 10],
    [258, 16],
    [22, 94],
    [146, 100],
    [258, 94],
  ];
  const edges = members
    .map(([x, y]) => `<line x1="${x}" y1="${y}" x2="100" y2="55"/><line x1="${x}" y1="${y}" x2="190" y2="55"/>`)
    .join('');
  // Undocumented work (low team score) draws the team with broken outlines.
  const memberStyle = peopleMess > 0.6 ? ' stroke-dasharray="3 2.5"' : '';
  return {
    back: `<g stroke="${c.paper}" stroke-opacity="0.1">${edges}</g>`,
    front: `<circle data-ref="ring" cx="100" cy="55" r="17" fill="none" stroke="${c.error}" stroke-opacity="0" stroke-width="2.5"/>
      <circle cx="100" cy="55" r="15" fill="${c.ink}" stroke="${c.paper}" stroke-opacity="0.85" stroke-width="2"/>
      <polygon data-ref="system" points="${octagonPoints(190, 55, 16)}" fill="${c.electric}" fill-opacity="0" stroke="${c.paper}" stroke-opacity="0.85" stroke-width="2"/>
      <g fill="${c.ink}" stroke="${c.paper}" stroke-opacity="0.65" stroke-width="1.5"${memberStyle}>
        ${members.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6"/>`).join('')}
      </g>
      <text x="100" y="88" text-anchor="middle" fill="${c.mist}">owner</text>
      <text x="190" y="88" text-anchor="middle" fill="${c.mist}">sistem</text>
      <text data-ref="question" x="130" y="28" text-anchor="middle" fill="${c.error}" opacity="0" style="font-size:18px;font-weight:700">?</text>`,
    start(stage) {
      const ring = stage.ref('ring');
      const hub = stage.ref('system');
      const question = stage.ref('question');
      let load = 0;
      let flash = 0;
      return {
        every: 0.2,
        spawn() {
          const toOwner = chance(ownerMess);
          stage.send({
            node: stage.dot(3, toOwner ? c.paper : c.electric),
            duration: 1,
            path: [pick(members), toOwner ? owner : system],
            done: () => {
              if (toOwner) load += 1;
              else flash = 1;
            },
          });
        },
        tick(dt, time) {
          load *= Math.exp(-dt * 0.6);
          flash = Math.max(0, flash - dt * 2.5);
          ring.setAttribute('r', (17 + Math.min(9, load * 0.9)).toFixed(1));
          ring.setAttribute('stroke-opacity', Math.min(0.85, load * 0.1).toFixed(2));
          hub.setAttribute('fill-opacity', (flash * 0.55).toFixed(2));
          question.setAttribute('opacity', load > 5 ? (Math.sin(time * 6) > 0 ? '1' : '0.25') : '0');
        },
      };
    },
  };
};

/** Digitalisasi & AI: website visitors get lost in a personal WhatsApp, or land in a CRM that AI can read. */
const digital: Builder = (c, scores) => {
  const webMess = messOf(scores.web);
  const aiMess = messOf(scores.ai);
  const rows = [60, 74, 88];
  return {
    back: `<rect x="8" y="12" width="76" height="70" rx="6" fill="none" stroke="${c.paper}" stroke-opacity="0.55" stroke-width="1.5"/>
      <line x1="8" y1="26" x2="84" y2="26" stroke="${c.paper}" stroke-opacity="0.3"/>
      <g fill="${c.paper}" fill-opacity="0.5"><circle cx="17" cy="19" r="2"/><circle cx="24" cy="19" r="2"/><circle cx="31" cy="19" r="2"/></g>
      <text x="46" y="100" text-anchor="middle" fill="${c.mist}">website</text>
      <rect x="104" y="8" width="84" height="28" rx="12" fill="none" stroke="${c.paper}" stroke-opacity="0.5" stroke-width="1.5"/>
      <path d="M118 36 L113 45 L130 36" fill="none" stroke="${c.paper}" stroke-opacity="0.5" stroke-width="1.5"/>
      <text x="146" y="26" text-anchor="middle" fill="${c.mist}">WA pribadi</text>
      ${rows
        .map(
          (y, i) =>
            `<rect data-ref="row${i}" x="112" y="${y - 4.5}" width="64" height="9" rx="2.5" fill="none" stroke="${c.paper}" stroke-opacity="0.4" stroke-width="1.25"/>`,
        )
        .join('')}
      <text x="144" y="106" text-anchor="middle" fill="${c.mist}">CRM</text>
      <text x="238" y="96" text-anchor="middle" fill="${c.mist}">AI</text>`,
    front: `<path data-ref="ai" d="M238 28 L244 46 L262 52 L244 58 L238 76 L232 58 L214 52 L232 46 Z" fill="${c.electric}"/>
      <text data-ref="question" x="266" y="30" text-anchor="middle" fill="${c.mist}" opacity="0" style="font-size:18px;font-weight:700">?</text>`,
    start(stage) {
      const ai = stage.ref('ai');
      const question = stage.ref('question');
      const rowRects = rows.map((_, i) => stage.ref(`row${i}`));
      const flash = rows.map(() => 0);
      return {
        every: 0.45,
        spawn() {
          const from: Point = [16 + Math.random() * 60, 34 + Math.random() * 42];
          if (chance(webMess)) {
            stage.send({ node: stage.dot(3, c.paper), duration: 1.4, fadeFrom: 0.7, path: [from, [146, 22]] });
            return;
          }
          const row = Math.floor(Math.random() * rows.length);
          const y = rows[row];
          stage.send({
            node: stage.dot(3, c.electric),
            duration: 1.4,
            path: [from, [100, y], [140, y]],
            done: () => {
              flash[row] = 0.5;
              stage.send({ node: stage.dot(2.2, c.electric), duration: 0.5, path: [[180, y], [222, 52]] });
            },
          });
        },
        tick(dt, time) {
          ai.setAttribute('fill-opacity', (0.15 + 0.85 * (1 - aiMess) * (0.85 + 0.15 * Math.sin(time * 3))).toFixed(2));
          question.setAttribute('opacity', aiMess > 0.55 ? (Math.sin(time * 5) > 0 ? '1' : '0.2') : '0');
          rowRects.forEach((rect, i) => {
            flash[i] = Math.max(0, flash[i] - dt);
            rect.setAttribute('stroke', flash[i] > 0 ? c.electric : c.paper);
            rect.setAttribute('stroke-opacity', flash[i] > 0 ? '1' : '0.4');
          });
        },
      };
    },
  };
};

const SCENES: Partial<Record<SectionId, Builder>> = { sales, operations, finance, team, digital };

export function SectionScene({
  section,
  scores,
  className = '',
}: {
  section: SectionId;
  scores: Scores;
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  // A stable key, so a new scores object with the same numbers doesn't restart the scene.
  const key = `${section}:${JSON.stringify(scores)}`;
  useScene(ref, (c) => SCENES[section]?.(c, scores) ?? null, key);

  if (!SCENES[section]) return null;
  return (
    <svg
      ref={ref}
      viewBox="0 0 280 110"
      preserveAspectRatio="xMidYMid meet"
      className={`font-mono text-[11px] ${className}`}
      aria-hidden
    />
  );
}
