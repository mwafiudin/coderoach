'use client';

import { useEffect, useRef } from 'react';
import type { SectionId } from '@/lib/opsscore/flow';
import type { AreaId } from '@/lib/opsscore/questions';

/**
 * The animated scene at the top of a section's score card. It pictures the section's keyword, and the
 * area scores decide how messy it looks: leads leaking out of the funnel, reports arriving late, stock
 * counts that won't hold still. Plain SVG moved by requestAnimationFrame; a still frame for reduced motion.
 */

type Scores = Partial<Record<AreaId, number>>;
type Point = [number, number];
type Palette = { ink: string; paper: string; electric: string; mist: string; error: string };
type Loop = { every: number; spawn: () => void; tick?: (dt: number, time: number) => void };
type Scene = (c: Palette, scores: Scores) => { back: string; front: string; start: (stage: Stage) => Loop };

const WIDTH = 280;
const HEIGHT = 72;
const SVG_NS = 'http://www.w3.org/2000/svg';

/** 0 for a perfect score, 1 for zero. */
const messOf = (score: number | undefined) => Math.min(1, Math.max(0, 1 - (score ?? 100) / 100));
const chance = (probability: number) => Math.random() < probability;
const pick = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)];

const octagonPoints = (cx: number, cy: number, r: number) =>
  Array.from({ length: 8 }, (_, i) => {
    const angle = Math.PI / 8 + (i * Math.PI) / 4;
    return `${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`;
  }).join(' ');

type Particle = {
  node: SVGElement;
  path: Point[];
  duration: number;
  /** Progress (0–1) after which the particle fades out. */
  fadeFrom?: number;
  move?: (x: number, y: number) => void;
  tint?: (progress: number) => void;
  done?: () => void;
};

/** Holds the moving particles of one scene and advances them along their paths. */
class Stage {
  private moving: Array<Particle & { lengths: number[]; total: number; age: number }> = [];

  constructor(
    readonly root: SVGSVGElement,
    private readonly fx: SVGGElement,
  ) {}

  ref(name: string) {
    return this.root.querySelector<SVGElement>(`[data-ref="${name}"]`)!;
  }

  add<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number>, parent: Element = this.fx) {
    const node = document.createElementNS(SVG_NS, tag);
    for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, String(value));
    parent.appendChild(node);
    return node;
  }

  dot(radius: number, fill: string) {
    return this.add('circle', { r: radius, fill, cx: -20, cy: -20 });
  }

  send(particle: Particle) {
    const { path } = particle;
    const lengths = path.slice(1).map(([x, y], i) => Math.hypot(x - path[i][0], y - path[i][1]));
    this.moving.push({ ...particle, lengths, total: lengths.reduce((sum, length) => sum + length, 0), age: 0 });
  }

  step(dt: number) {
    for (const p of [...this.moving]) {
      p.age += dt;
      const progress = Math.min(1, p.age / p.duration);
      const [x, y] = pointAlong(p.path, p.lengths, progress * p.total);
      if (p.move) p.move(x, y);
      else {
        p.node.setAttribute('cx', x.toFixed(1));
        p.node.setAttribute('cy', y.toFixed(1));
      }
      if (p.fadeFrom !== undefined && progress > p.fadeFrom) {
        p.node.setAttribute('opacity', (1 - (progress - p.fadeFrom) / (1 - p.fadeFrom)).toFixed(2));
      }
      p.tint?.(progress);
      if (progress >= 1) {
        p.node.remove();
        this.moving.splice(this.moving.indexOf(p), 1);
        p.done?.();
      }
    }
  }
}

function pointAlong(path: Point[], lengths: number[], distance: number): Point {
  let left = distance;
  for (let i = 0; i < lengths.length; i++) {
    if (left <= lengths[i] || i === lengths.length - 1) {
      const t = lengths[i] ? Math.min(1, left / lengths[i]) : 1;
      const [ax, ay] = path[i];
      const [bx, by] = path[i + 1];
      return [ax + (bx - ax) * t, ay + (by - ay) * t];
    }
    left -= lengths[i];
  }
  return path[path.length - 1];
}

/** Penjualan & prospek: leads pour into a funnel; the ones nobody follows up leak out. */
const sales: Scene = (c, scores) => {
  const mess = messOf(scores.sales);
  const wall = `fill="none" stroke="${c.paper}" stroke-opacity="0.5" stroke-width="1.5" stroke-linejoin="round"`;
  return {
    back: `<polyline points="60,6 150,30 196,30" ${wall}/><polyline points="60,66 150,42 196,42" ${wall}/>`,
    front: `<text data-ref="won" x="276" y="31" text-anchor="end" fill="${c.electric}">closing 0</text>
      <text data-ref="lost" x="276" y="49" text-anchor="end" fill="${c.mist}">hilang 0</text>`,
    start(stage) {
      const won = stage.ref('won');
      const lost = stage.ref('lost');
      const recent: boolean[] = [];
      const log = (closed: boolean) => {
        recent.push(closed);
        if (recent.length > 20) recent.shift();
        const count = recent.filter(Boolean).length;
        won.textContent = `closing ${count}`;
        lost.textContent = `hilang ${recent.length - count}`;
      };
      return {
        every: 0.34,
        spawn() {
          const x = 2 + Math.random() * 28;
          const y = 10 + Math.random() * 52;
          const node = stage.dot(2.4, c.paper);
          if (chance(mess * 0.85)) {
            const out = y < 36 ? -1 : 1;
            stage.send({
              node,
              duration: 1.7,
              fadeFrom: 0.55,
              path: [[x, y], [62, y], [100, 36 + out * 24], [128, 36 + out * 44]],
              tint: (progress) => {
                if (progress > 0.4) node.setAttribute('fill', c.mist);
              },
              done: () => log(false),
            });
            return;
          }
          stage.send({
            node,
            duration: 2,
            path: [[x, y], [62, y], [150, 36 + (y - 36) * 0.08], [204, 36]],
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
const operations: Scene = (c, scores) => {
  const opsMess = messOf(scores.ops);
  const hasStock = scores.stock !== undefined;
  const stockMess = messOf(scores.stock);
  const beltStart = hasStock ? 108 : 8;
  const box = (x: number, y: number, ref?: string) =>
    `<rect ${ref ? `data-ref="${ref}" ` : ''}x="${x}" y="${y}" width="22" height="10" rx="1.5" fill="none" stroke="${c.paper}" stroke-opacity="0.6"/>`;
  const shelf = hasStock
    ? `<line x1="6" y1="46" x2="94" y2="46" stroke="${c.paper}" stroke-opacity="0.35"/>
      ${box(8, 36)}${box(8, 26, 'box0')}${box(36, 36, 'box1')}${box(64, 36)}${box(64, 26, 'box2')}
      <text data-ref="count0" x="19" y="21" text-anchor="middle" fill="${c.paper}">12</text>
      <text data-ref="count1" x="47" y="31" text-anchor="middle" fill="${c.paper}">8</text>
      <text data-ref="count2" x="75" y="21" text-anchor="middle" fill="${c.paper}">20</text>
      <text x="50" y="62" text-anchor="middle" fill="${c.mist}">stok</text>`
    : '';
  return {
    back: `${shelf}
      <line data-ref="belt" x1="${beltStart}" y1="58" x2="244" y2="58" stroke="${c.paper}" stroke-opacity="0.35" stroke-dasharray="6 5"/>
      <text x="${beltStart}" y="69" fill="${c.mist}">lapangan</text>`,
    front: `<polygon data-ref="owner" points="${octagonPoints(262, 40, 10)}" fill="${c.ink}" stroke="${c.paper}" stroke-opacity="0.75" stroke-width="1.5"/>
      <text data-ref="question" x="262" y="22" text-anchor="middle" fill="${c.error}" opacity="0" style="font-size:13px">?</text>
      <text x="262" y="69" text-anchor="middle" fill="${c.mist}">owner</text>`,
    start(stage) {
      const belt = stage.ref('belt');
      const owner = stage.ref('owner');
      const question = stage.ref('question');
      const counts = [12, 8, 20];
      const misread = [9, 5, 16];
      const unsteadyFrom = [0.2, 0.45, 0.7];
      const labels = hasStock ? counts.map((_, i) => stage.ref(`count${i}`)) : [];
      const tops = hasStock ? counts.map((_, i) => stage.ref(`box${i}`)) : [];
      const travel = (238 - beltStart) / 55;
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
              width: 10,
              height: 13,
              rx: 1.5,
              fill: c.ink,
              stroke: late ? c.mist : c.paper,
              'stroke-opacity': late ? 0.9 : 0.8,
              'stroke-dasharray': late ? '2 2' : 'none',
            },
            sheet,
          );
          stage.add('line', { x1: 2.5, y1: 3.5, x2: 7.5, y2: 3.5, stroke: late ? c.mist : c.electric, 'stroke-width': 1.2 }, sheet);
          if (!late) {
            stage.add('line', { x1: 2.5, y1: 6.5, x2: 7.5, y2: 6.5, stroke: c.paper, 'stroke-opacity': 0.6 }, sheet);
            stage.add('line', { x1: 2.5, y1: 9.5, x2: 6, y2: 9.5, stroke: c.paper, 'stroke-opacity': 0.6 }, sheet);
          }
          stage.send({
            node: sheet,
            duration: late ? travel * (1.2 + Math.random() * 0.6) : travel,
            path: [[beltStart, 43], [238, 43]],
            move: (x, y) => sheet.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`),
            done: () => {
              if (late) questionFor = 0.9;
              else flashFor = 0.35;
            },
          });
        },
        tick(dt, time) {
          belt.setAttribute('stroke-dashoffset', (-time * 18).toFixed(1));
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
const finance: Scene = (c, scores) => {
  const mess = messOf(scores.finance);
  return {
    back: `<line x1="8" y1="38" x2="276" y2="38" stroke="${c.paper}" stroke-opacity="0.12"/>
      <g data-ref="gaps"></g>
      <path data-ref="line" fill="none" stroke="${c.electric}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/>
      <text x="8" y="50" fill="${c.mist}">masuk</text>
      <text x="272" y="50" text-anchor="end" fill="${c.mist}">keluar</text>`,
    front: `<rect x="126" y="46" width="40" height="24" rx="4" fill="${c.ink}" stroke="${c.paper}" stroke-opacity="0.55"/>
      <text x="146" y="62" text-anchor="middle" fill="${c.paper}" fill-opacity="0.75">kas</text>
      <text data-ref="diff" x="172" y="70" fill="${c.error}" opacity="0">selisih?</text>`,
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
          const node = stage.dot(3.2, c.paper);
          if (chance(mess * 0.5)) {
            stage.send({
              node,
              duration: 1.8,
              fadeFrom: 0.8,
              path: [[-4, 56], [140, 56], [146, 80]],
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
            duration: 3,
            path: [[-4, 56], [146, 56], [290, 56]],
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
              marks += `<line x1="${x}" y1="10" x2="${x}" y2="34" stroke="${c.mist}" stroke-opacity="0.35" stroke-dasharray="2 3"/>`;
            } else {
              d += `${pen ? 'L' : 'M'}${x} ${(34 - value * 26).toFixed(1)} `;
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
const team: Scene = (c, scores) => {
  const ownerMess = messOf(scores.owner);
  const peopleMess = messOf(scores.people);
  const owner: Point = [96, 34];
  const system: Point = [186, 34];
  const members: Point[] = [
    [20, 10],
    [140, 8],
    [262, 10],
    [20, 60],
    [140, 64],
    [262, 60],
  ];
  const edges = members
    .map(([x, y]) => `<line x1="${x}" y1="${y}" x2="96" y2="34"/><line x1="${x}" y1="${y}" x2="186" y2="34"/>`)
    .join('');
  // Undocumented work (low team score) draws the team with broken outlines.
  const memberStyle = peopleMess > 0.6 ? ' stroke-dasharray="2 2"' : '';
  return {
    back: `<g stroke="${c.paper}" stroke-opacity="0.1">${edges}</g>`,
    front: `<circle data-ref="ring" cx="96" cy="34" r="12" fill="none" stroke="${c.error}" stroke-opacity="0" stroke-width="2"/>
      <circle cx="96" cy="34" r="10" fill="${c.ink}" stroke="${c.paper}" stroke-opacity="0.85" stroke-width="1.5"/>
      <polygon data-ref="system" points="${octagonPoints(186, 34, 11)}" fill="${c.electric}" fill-opacity="0" stroke="${c.paper}" stroke-opacity="0.85" stroke-width="1.5"/>
      <g fill="${c.ink}" stroke="${c.paper}" stroke-opacity="0.6"${memberStyle}>
        ${members.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4"/>`).join('')}
      </g>
      <text x="96" y="58" text-anchor="middle" fill="${c.mist}">owner</text>
      <text x="186" y="58" text-anchor="middle" fill="${c.mist}">sistem</text>
      <text data-ref="question" x="116" y="16" text-anchor="middle" fill="${c.error}" opacity="0" style="font-size:13px">?</text>`,
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
            node: stage.dot(2.2, toOwner ? c.paper : c.electric),
            duration: 0.95,
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
          ring.setAttribute('r', (12 + Math.min(7, load * 0.7)).toFixed(1));
          ring.setAttribute('stroke-opacity', Math.min(0.85, load * 0.1).toFixed(2));
          hub.setAttribute('fill-opacity', (flash * 0.55).toFixed(2));
          question.setAttribute('opacity', load > 5 ? (Math.sin(time * 6) > 0 ? '1' : '0.25') : '0');
        },
      };
    },
  };
};

/** Digitalisasi & AI: website visitors get lost in a personal WhatsApp, or land in a CRM that AI can read. */
const digital: Scene = (c, scores) => {
  const webMess = messOf(scores.web);
  const aiMess = messOf(scores.ai);
  const rows = [41, 51, 61];
  return {
    back: `<rect x="6" y="6" width="56" height="54" rx="5" fill="none" stroke="${c.paper}" stroke-opacity="0.5"/>
      <line x1="6" y1="16" x2="62" y2="16" stroke="${c.paper}" stroke-opacity="0.3"/>
      <g fill="${c.paper}" fill-opacity="0.5"><circle cx="12" cy="11" r="1.4"/><circle cx="17" cy="11" r="1.4"/><circle cx="22" cy="11" r="1.4"/></g>
      <text x="34" y="71" text-anchor="middle" fill="${c.mist}">website</text>
      <rect x="92" y="4" width="72" height="20" rx="9" fill="none" stroke="${c.paper}" stroke-opacity="0.45"/>
      <path d="M104 24 L100 30 L112 24" fill="none" stroke="${c.paper}" stroke-opacity="0.45"/>
      <text x="128" y="17.5" text-anchor="middle" fill="${c.mist}">WA pribadi</text>
      ${rows
        .map(
          (y, i) =>
            `<rect data-ref="row${i}" x="100" y="${y - 3}" width="52" height="6" rx="2" fill="none" stroke="${c.paper}" stroke-opacity="0.35"/>`,
        )
        .join('')}
      <text x="126" y="71" text-anchor="middle" fill="${c.mist}">CRM</text>
      <text x="236" y="66" text-anchor="middle" fill="${c.mist}">AI</text>`,
    front: `<path data-ref="ai" d="M236 18 L240 30 L252 34 L240 38 L236 50 L232 38 L220 34 L232 30 Z" fill="${c.electric}"/>
      <text data-ref="question" x="256" y="18" text-anchor="middle" fill="${c.mist}" opacity="0" style="font-size:13px">?</text>`,
    start(stage) {
      const ai = stage.ref('ai');
      const question = stage.ref('question');
      const rowRects = rows.map((_, i) => stage.ref(`row${i}`));
      const flash = rows.map(() => 0);
      return {
        every: 0.45,
        spawn() {
          const from: Point = [12 + Math.random() * 44, 22 + Math.random() * 34];
          if (chance(webMess)) {
            stage.send({ node: stage.dot(2.2, c.paper), duration: 1.3, fadeFrom: 0.7, path: [from, [128, 14]] });
            return;
          }
          const row = Math.floor(Math.random() * rows.length);
          const y = rows[row];
          stage.send({
            node: stage.dot(2.2, c.electric),
            duration: 1.3,
            path: [from, [88, y], [126, y]],
            done: () => {
              flash[row] = 0.5;
              stage.send({ node: stage.dot(1.6, c.electric), duration: 0.5, path: [[154, y], [222, 34]] });
            },
          });
        },
        tick(dt, time) {
          ai.setAttribute('fill-opacity', (0.15 + 0.85 * (1 - aiMess) * (0.85 + 0.15 * Math.sin(time * 3))).toFixed(2));
          question.setAttribute('opacity', aiMess > 0.55 ? (Math.sin(time * 5) > 0 ? '1' : '0.2') : '0');
          rowRects.forEach((rect, i) => {
            flash[i] = Math.max(0, flash[i] - dt);
            rect.setAttribute('stroke', flash[i] > 0 ? c.electric : c.paper);
            rect.setAttribute('stroke-opacity', flash[i] > 0 ? '1' : '0.35');
          });
        },
      };
    },
  };
};

const SCENES: Partial<Record<SectionId, Scene>> = { sales, operations, finance, team, digital };

/** Theme colors from the site tokens, so the scene follows globals.css. */
function palette(element: Element): Palette {
  const css = getComputedStyle(element);
  const token = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;
  return {
    ink: token('--color-ink', '#08090A'),
    paper: token('--color-paper', '#F4F7F5'),
    electric: token('--color-electric', '#2C70FE'),
    mist: token('--color-mist-500', '#A7A2A9'),
    error: token('--color-error', '#E5484D'),
  };
}

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
  const scoresKey = JSON.stringify(scores);

  useEffect(() => {
    const svg = ref.current;
    const scene = SCENES[section];
    if (!svg || !scene) return;

    const { back, front, start } = scene(palette(svg), JSON.parse(scoresKey) as Scores);
    svg.innerHTML = `<g>${back}</g><g data-fx></g><g>${front}</g>`;
    const stage = new Stage(svg, svg.querySelector<SVGGElement>('[data-fx]')!);
    const loop = start(stage);

    let time = 0;
    let sinceSpawn = 0;
    const advance = (dt: number) => {
      time += dt;
      sinceSpawn += dt;
      while (sinceSpawn >= loop.every) {
        sinceSpawn -= loop.every;
        loop.spawn();
      }
      stage.step(dt);
      loop.tick?.(dt, time);
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Run five seconds off-screen and keep that frame.
      for (let i = 0; i < 150; i++) advance(1 / 30);
      return () => {
        svg.innerHTML = '';
      };
    }

    let frame = 0;
    let last = performance.now();
    const run = (now: number) => {
      advance(Math.min(0.05, (now - last) / 1000));
      last = now;
      frame = requestAnimationFrame(run);
    };
    frame = requestAnimationFrame(run);
    return () => {
      cancelAnimationFrame(frame);
      svg.innerHTML = '';
    };
  }, [section, scoresKey]);

  if (!SCENES[section]) return null;
  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid meet"
      className={`font-mono text-[10px] ${className}`}
      aria-hidden
    />
  );
}
