'use client';

import { useEffect, useRef, type CSSProperties, type RefObject } from 'react';

/**
 * The small engine behind the OpsScore scenes (section score cards, persona hero): static SVG markup
 * plus particles moving along paths, driven by requestAnimationFrame, with a still frame for reduced
 * motion. No animation library.
 */

export type Point = [number, number];
export type Palette = { ink: string; paper: string; electric: string; mist: string; error: string };
export type Loop = { every: number; spawn: () => void; tick?: (dt: number, time: number) => void };
/** Markup behind (`back`) and in front of (`front`) the moving particles, and the loop that moves them. */
export type Scene = { back: string; front: string; start: (stage: Stage) => Loop };

const SVG_NS = 'http://www.w3.org/2000/svg';

/** 0 for a perfect score, 1 for zero. */
export const messOf = (score: number | undefined) => Math.min(1, Math.max(0, 1 - (score ?? 100) / 100));
export const chance = (probability: number) => Math.random() < probability;
export const pick = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)];

export const octagonPoints = (cx: number, cy: number, r: number) =>
  Array.from({ length: 8 }, (_, i) => {
    const angle = Math.PI / 8 + (i * Math.PI) / 4;
    return `${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`;
  }).join(' ');

/** A faint blueprint grid behind scene panels, echoing the site's grid backgrounds. */
export const SCENE_PANEL_GRID: CSSProperties = {
  backgroundImage:
    'linear-gradient(rgba(244,247,245,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(244,247,245,0.04) 1px, transparent 1px)',
  backgroundSize: '20px 20px',
};

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
export class Stage {
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

  dot(radius: number, fill: string, parent?: Element) {
    return this.add('circle', { r: radius, fill, cx: -20, cy: -20 }, parent);
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

/** Theme colors from the site tokens, so scenes follow globals.css. */
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

/**
 * Draws the scene from `build` into the SVG and runs it until unmount. A new `key` restarts it; a new
 * `build` function alone does not.
 */
export function useScene(ref: RefObject<SVGSVGElement | null>, build: (c: Palette) => Scene | null, key: string) {
  const buildRef = useRef(build);
  buildRef.current = build;

  useEffect(() => {
    const svg = ref.current;
    const scene = svg ? buildRef.current(palette(svg)) : null;
    if (!svg || !scene) return;

    svg.innerHTML = `<g>${scene.back}</g><g data-fx></g><g>${scene.front}</g>`;
    const stage = new Stage(svg, svg.querySelector<SVGGElement>('[data-fx]')!);
    const loop = scene.start(stage);

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
  }, [ref, key]);
}
