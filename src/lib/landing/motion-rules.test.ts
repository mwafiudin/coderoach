import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, test } from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AnimatedCount } from '../../app/(frontend)/_components/ui/AnimatedCount';
import { Process } from '../../app/(frontend)/_components/Process';

// Motion rules from DESIGN.md (Motion vocabulary) that pages broke in production, found while
// drawing the scroll storyboards on 14 Nov 2026 (docs/konsep/*.md).

const FRONTEND = path.join(process.cwd(), 'src/app/(frontend)');
const read = (rel: string) => readFileSync(path.join(FRONTEND, rel), 'utf8');

describe('what the HTML shows before any script runs', () => {
  test('a counted number is already its final value', () => {
    const html = renderToStaticMarkup(createElement(AnimatedCount, { value: '11' }));
    assert.match(html, />11</);
    assert.doesNotMatch(html, />0</);
  });

  test('a value that is not a number passes through untouched', () => {
    assert.match(renderToStaticMarkup(createElement(AnimatedCount, { value: 'JKT' })), />JKT</);
  });

  test('the process rail rests full with every phase lit', () => {
    const phases = [1, 2, 3, 4].map((n) => ({ id: n, tag: `0${n}`, icon: 'check' as const, name: `Tahap ${n}`, what: 'x', deliv: 'y' }));
    const html = renderToStaticMarkup(createElement(Process, { phases }));
    assert.match(html, /\[--progress:1\]/);
    assert.doesNotMatch(html, /\[--progress:0\]/);
    for (let i = 1; i <= 4; i++) {
      const dot = html.match(new RegExp(`<div[^>]*data-phase-dot="${i}"[^>]*>`))?.[0] ?? '';
      const icon = html.match(new RegExp(`<div[^>]*data-phase-icon="${i}"[^>]*>`))?.[0] ?? '';
      assert.match(dot, /background:var\(--color-electric\)/, `dot ${i}`);
      assert.match(icon, /color:var\(--color-electric\)/, `icon ${i}`);
    }
  });

  test('the studio stats on the home page and /studio do not count up', () => {
    // Studio numbers are not measured results, so they get no number reveal at all (beranda B10).
    assert.doesNotMatch(read('_components/Studio.tsx'), /AnimatedCount/);
    assert.doesNotMatch(read('studio/page.tsx'), /AnimatedCount/);
  });
});

describe('no decorative parallax', () => {
  test('the home hero grid does not follow the scroll', () => {
    assert.doesNotMatch(read('_components/Hero.tsx'), /data-hero-bg/);
    assert.doesNotMatch(read('_components/InteractionsClient.tsx'), /hero-bg|scrollY\s*\*/);
  });

  test('the YiheeCam hero photo moves a few pixels at most', () => {
    const css = read('work/_bespoke/yiheecam/yiheecam.css');
    const rule = css.match(/\.yc-hero__photo\s*\{[^}]*\}/)?.[0] ?? '';
    const shift = Number(rule.match(/translate:\s*0 calc\(var\(--p, 0\) \* (\d+)px\)/)?.[1]);
    assert.ok(shift > 0 && shift <= 12, `shift ${shift}px`);
  });
});

describe('nothing moves for more than five seconds without a way to stop it (WCAG 2.2.2)', () => {
  test('the Jeda hero phone no longer floats', () => {
    assert.doesNotMatch(read('work/_bespoke/jeda/jeda.css'), /jdFloat|infinite/);
    assert.doesNotMatch(read('work/_bespoke/jeda/JedaPage.tsx'), /jd-float/);
  });

  test('the RideDeck hero clip has a pause button that holds it', () => {
    const src = read('work/_bespoke/ridedeck/HeroLoop.tsx');
    assert.match(src, /<button type="button" aria-pressed=\{held\}/);
    assert.match(src, /if \(held\) \{\s*video\.pause\(\);\s*return;/);
    // Shown only while the clip can play, so reduced motion keeps the still poster with no button.
    assert.match(src, /\{play && \(\s*<button/);
  });
});
