'use client';

import { useId, useRef } from 'react';
import type { Phase } from '@/lib/opsscore/scoring';
import { octagonPoints, pick, useScene, type Palette, type Point, type Scene } from './scene-engine';

/**
 * The persona illustration on the results page, one per phase: the Juggler keeps the business in the
 * air by hand, the Connector loses numbers in scrolling chats, the Organizer copies cells into reports,
 * and the Autopilot's data flows on its own.
 */

/** The Juggler: kas, stok, and order kept in the air by one person; now and then one drops. */
const juggler = (c: Palette): Scene => ({
  back: `<line x1="60" y1="136" x2="220" y2="136" stroke="${c.paper}" stroke-opacity="0.15"/>
    <path d="M122 136 L126 104 Q140 96 154 104 L158 136" fill="none" stroke="${c.paper}" stroke-opacity="0.6" stroke-width="2" stroke-linejoin="round"/>
    <path d="M128 106 L104 116 M152 106 L176 116" fill="none" stroke="${c.paper}" stroke-opacity="0.6" stroke-width="2" stroke-linecap="round"/>
    <polygon points="${octagonPoints(140, 82, 11)}" fill="${c.ink}" stroke="${c.paper}" stroke-opacity="0.9" stroke-width="2"/>`,
  front: `<text data-ref="question" x="178" y="72" text-anchor="middle" fill="${c.error}" opacity="0" style="font-size:18px;font-weight:700">?</text>`,
  start(stage) {
    const balls = ['kas', 'stok', 'order'].map((label) => {
      const ball = stage.add('g', { transform: 'translate(-40 -40)' });
      const ring = stage.add('circle', { r: 13, fill: c.ink, stroke: c.paper, 'stroke-opacity': 0.85, 'stroke-width': 1.75 }, ball);
      stage.add('text', { 'text-anchor': 'middle', y: 3.5, fill: c.paper, style: 'font-size:9px' }, ball).textContent = label;
      return { ball, ring };
    });
    const question = stage.ref('question');
    // Up over the head from the right hand to the left, then passed back low, in front of the body.
    const position = (theta: number): Point => {
      const angle = ((theta % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      if (angle < Math.PI) return [140 + 36 * Math.cos(angle), 116 - 86 * Math.sin(angle)];
      const u = (angle - Math.PI) / Math.PI;
      return [104 + 72 * u, 116 + 6 * Math.sin(u * Math.PI)];
    };
    let drop: { index: number; x: number; y: number; t: number } | null = null;
    let untilDrop = 2.5;
    return {
      every: 60,
      spawn() {},
      tick(dt, time) {
        untilDrop -= dt;
        if (!drop && untilDrop <= 0) {
          const index = Math.floor(Math.random() * balls.length);
          const [x, y] = position(time * 2.2 + (index * 2 * Math.PI) / 3);
          drop = { index, x, y, t: 0 };
        }
        balls.forEach(({ ball, ring }, i) => {
          if (drop?.index === i) {
            drop.t += dt;
            const s = Math.min(1, drop.t / 1.1);
            ball.setAttribute('transform', `translate(${(drop.x + 24 * s).toFixed(1)} ${(drop.y + (160 - drop.y) * s * s).toFixed(1)})`);
            ball.setAttribute('opacity', (1 - s).toFixed(2));
            ring.setAttribute('stroke', c.error);
            if (s >= 1) {
              drop = null;
              untilDrop = 2.5 + Math.random() * 2;
              ball.setAttribute('opacity', '1');
              ring.setAttribute('stroke', c.paper);
            }
            return;
          }
          const [x, y] = position(time * 2.2 + (i * 2 * Math.PI) / 3);
          ball.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
        });
        question.setAttribute('opacity', drop ? '1' : '0');
      },
    };
  },
});

/** The Connector: chats scroll by in a phone; the one message with the number scrolls away too. */
const connector = (c: Palette, clipId: string): Scene => ({
  back: `<defs><clipPath id="${clipId}"><rect x="96" y="20" width="88" height="110" rx="8"/></clipPath></defs>
    <rect x="90" y="6" width="100" height="130" rx="16" fill="none" stroke="${c.paper}" stroke-opacity="0.6" stroke-width="2"/>
    <line x1="126" y1="13" x2="154" y2="13" stroke="${c.paper}" stroke-opacity="0.4" stroke-width="2" stroke-linecap="round"/>
    <g data-ref="screen" clip-path="url(#${clipId})"></g>
    <circle cx="44" cy="62" r="17" fill="none" stroke="${c.paper}" stroke-opacity="0.5" stroke-width="2"/>
    <line x1="56" y1="74" x2="70" y2="88" stroke="${c.paper}" stroke-opacity="0.5" stroke-width="3" stroke-linecap="round"/>
    <text x="44" y="116" text-anchor="middle" fill="${c.mist}">cari angka</text>
    <text x="236" y="116" text-anchor="middle" fill="${c.mist}">pesan</text>`,
  front: `<text data-ref="question" x="44" y="68" text-anchor="middle" fill="${c.error}" opacity="0" style="font-size:18px;font-weight:700">?</text>
    <text data-ref="count" x="236" y="96" text-anchor="middle" fill="${c.paper}" style="font-size:22px;font-weight:700">128</text>`,
  start(stage) {
    const screen = stage.ref('screen');
    const question = stage.ref('question');
    const count = stage.ref('count');
    let messages = 128;
    let sent = 0;
    let lostFor = 0;
    return {
      every: 0.9,
      spawn() {
        sent += 1;
        const important = sent % 5 === 0;
        const width = important ? 64 : 34 + Math.random() * 30;
        const x = sent % 2 ? 180 - width : 100;
        const bubble = stage.add('g', { transform: `translate(${x} 140)` }, screen);
        stage.add(
          'rect',
          { width, height: 15, rx: 7, fill: important ? c.electric : c.paper, 'fill-opacity': important ? 0.95 : 0.14 },
          bubble,
        );
        if (important) stage.add('text', { x: 8, y: 11, fill: c.paper, style: 'font-size:9px' }, bubble).textContent = 'omzet 12jt';
        messages += 1 + Math.floor(Math.random() * 4);
        count.textContent = String(messages);
        stage.send({
          node: bubble,
          duration: 6,
          path: [[x, 132], [x, -4]],
          move: (px, py) => bubble.setAttribute('transform', `translate(${px.toFixed(1)} ${py.toFixed(1)})`),
          done: () => {
            if (important) lostFor = 1.2;
          },
        });
      },
      tick(dt, time) {
        lostFor = Math.max(0, lostFor - dt);
        question.setAttribute('opacity', lostFor > 0 ? (Math.sin(time * 10) > 0 ? '1' : '0.3') : '0');
      },
    };
  },
});

/** The Organizer: cells filled one by one, then copied by hand into a report. */
const organizer = (c: Palette): Scene => {
  const cols = 6;
  const rows = 5;
  const cellW = 22;
  const cellH = 18;
  const x0 = 12;
  const y0 = 20;
  let cells = '';
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      cells += `<rect data-ref="cell-${row}-${col}" x="${x0 + col * cellW}" y="${y0 + row * cellH}" width="${cellW}" height="${cellH}" fill="${c.paper}" fill-opacity="${row === 0 ? 0.14 : 0}" stroke="${c.paper}" stroke-opacity="0.25"/>`;
    }
  }
  return {
    back: `${cells}
      <text x="78" y="128" text-anchor="middle" fill="${c.mist}">spreadsheet</text>
      <rect x="198" y="24" width="68" height="88" rx="5" fill="none" stroke="${c.paper}" stroke-opacity="0.6" stroke-width="1.5"/>
      <line x1="208" y1="37" x2="240" y2="37" stroke="${c.electric}" stroke-width="2.5" stroke-linecap="round"/>
      <g data-ref="lines"></g>
      <text x="232" y="128" text-anchor="middle" fill="${c.mist}">laporan</text>
      <text x="172" y="14" text-anchor="middle" fill="${c.mist}">salin → tempel</text>`,
    front: `<rect data-ref="cursor" x="-40" y="-40" width="${cellW}" height="${cellH}" fill="none" stroke="${c.electric}" stroke-width="2"/>
      <polygon points="${octagonPoints(172, 100, 9)}" fill="${c.ink}" stroke="${c.paper}" stroke-opacity="0.75" stroke-width="1.75"/>`,
    start(stage) {
      const cursor = stage.ref('cursor');
      const lines = stage.ref('lines');
      let filled = 0;
      let written = 0;
      return {
        every: 0.28,
        spawn() {
          const row = 1 + Math.floor(filled / cols);
          const col = filled % cols;
          cursor.setAttribute('x', String(x0 + col * cellW));
          cursor.setAttribute('y', String(y0 + row * cellH));
          stage.ref(`cell-${row}-${col}`).setAttribute('fill-opacity', '0.22');
          filled += 1;
          if (filled % 4 === 0) {
            const chip = stage.add('rect', { x: -6, y: -3.5, width: 12, height: 7, rx: 1.5, fill: c.electric });
            const line = Math.min(written, 5);
            stage.send({
              node: chip,
              duration: 1.1,
              path: [[146, y0 + row * cellH + 9], [172, 84], [212, 50 + line * 10]],
              move: (x, y) => chip.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`),
              done: () => {
                if (written >= 6) {
                  lines.innerHTML = '';
                  written = 0;
                }
                stage.add(
                  'line',
                  { x1: 208, y1: 50 + written * 10, x2: 226 + Math.random() * 30, y2: 50 + written * 10, stroke: c.paper, 'stroke-opacity': 0.6, 'stroke-width': 2, 'stroke-linecap': 'round' },
                  lines,
                );
                written += 1;
              },
            });
          }
          if (filled >= cols * (rows - 1)) {
            filled = 0;
            for (let r = 1; r < rows; r++) {
              for (let k = 0; k < cols; k++) stage.ref(`cell-${r}-${k}`).setAttribute('fill-opacity', '0');
            }
          }
        },
      };
    },
  };
};

/** The Autopilot: sales, stock, and cash flow into one system, the dashboard updates itself, AI reads it. */
const autopilot = (c: Palette): Scene => {
  const sources = [
    { label: 'penjualan', y: 30 },
    { label: 'stok', y: 70 },
    { label: 'kas', y: 110 },
  ];
  return {
    back: `${sources
      .map(
        ({ label, y }) =>
          `<rect x="6" y="${y - 11}" width="70" height="22" rx="6" fill="none" stroke="${c.paper}" stroke-opacity="0.6" stroke-width="1.5"/>
          <text x="41" y="${y + 4}" text-anchor="middle" fill="${c.paper}" fill-opacity="0.8">${label}</text>
          <line x1="76" y1="${y}" x2="128" y2="70" stroke="${c.paper}" stroke-opacity="0.15" stroke-width="1.5"/>`,
      )
      .join('')}
      <line x1="164" y1="70" x2="198" y2="70" stroke="${c.paper}" stroke-opacity="0.15" stroke-width="1.5"/>
      <rect x="198" y="40" width="74" height="70" rx="6" fill="none" stroke="${c.paper}" stroke-opacity="0.6" stroke-width="1.5"/>
      <line x1="206" y1="100" x2="264" y2="100" stroke="${c.paper}" stroke-opacity="0.25"/>
      ${[0, 1, 2, 3].map((i) => `<rect data-ref="bar${i}" x="${210 + i * 14}" y="80" width="9" height="20" rx="1.5" fill="${c.electric}" fill-opacity="0.85"/>`).join('')}
      <text x="235" y="126" text-anchor="middle" fill="${c.mist}">dashboard</text>`,
    front: `<polygon points="${octagonPoints(146, 70, 18)}" fill="${c.ink}" stroke="${c.electric}" stroke-width="2.5"/>
      <text x="146" y="73.5" text-anchor="middle" fill="${c.paper}" fill-opacity="0.85" style="font-size:8.5px">sistem</text>
      <path data-ref="ai" d="M236 8 L239 17 L248 20 L239 23 L236 32 L233 23 L224 20 L233 17 Z" fill="${c.electric}" fill-opacity="0.55"/>
      <text x="258" y="24" fill="${c.mist}">AI</text>`,
    start(stage) {
      const bars = [0, 1, 2, 3].map((i) => stage.ref(`bar${i}`));
      const ai = stage.ref('ai');
      const heights = [20, 32, 26, 40];
      const targets = [...heights];
      let pulses = 0;
      let glow = 0;
      return {
        every: 0.35,
        spawn() {
          const { y } = pick(sources);
          stage.send({
            node: stage.dot(3, c.electric),
            duration: 0.7,
            path: [[76, y], [128, 70]],
            done: () =>
              stage.send({
                node: stage.dot(3, c.electric),
                duration: 0.45,
                path: [[164, 70], [198, 70]],
                done: () => {
                  targets[Math.floor(Math.random() * targets.length)] = 18 + Math.random() * 38;
                  pulses += 1;
                  if (pulses % 4 === 0) {
                    stage.send({
                      node: stage.dot(2.2, c.electric),
                      duration: 0.35,
                      path: [[235, 40], [236, 30]],
                      done: () => {
                        glow = 1;
                      },
                    });
                  }
                },
              }),
          });
        },
        tick(dt) {
          glow = Math.max(0, glow - dt * 1.5);
          ai.setAttribute('fill-opacity', (0.55 + 0.45 * glow).toFixed(2));
          bars.forEach((bar, i) => {
            targets[i] += (24 - targets[i]) * dt * 0.15;
            heights[i] += (targets[i] - heights[i]) * Math.min(1, dt * 4);
            bar.setAttribute('y', (100 - heights[i]).toFixed(1));
            bar.setAttribute('height', heights[i].toFixed(1));
          });
        },
      };
    },
  };
};

export function PhaseScene({ phase, className = '' }: { phase: Phase; className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  // useId gives ":r1:"-style ids, which don't work inside url(#…).
  const clipId = `ops-screen-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  useScene(
    ref,
    (c) => (phase === 1 ? juggler(c) : phase === 2 ? connector(c, clipId) : phase === 3 ? organizer(c) : autopilot(c)),
    `${phase}:${clipId}`,
  );
  return (
    <svg
      ref={ref}
      viewBox="0 0 280 140"
      preserveAspectRatio="xMidYMid meet"
      className={`font-mono text-[10px] ${className}`}
      aria-hidden
    />
  );
}
