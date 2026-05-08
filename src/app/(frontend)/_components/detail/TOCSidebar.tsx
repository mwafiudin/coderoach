'use client';

import { useEffect, useState } from 'react';

type Heading = { id: string; text: string; level: number };

/**
 * Auto-extracted table of contents from h2/h3 inside `targetSelector`.
 * Sticky sidebar — highlights active heading on scroll.
 * Click → smooth scroll to heading.
 */
export function TOCSidebar({ targetSelector = '.prose-coderoach' }: { targetSelector?: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // Extract h2/h3 from prose body, assign ids if missing
  useEffect(() => {
    const root = document.querySelector(targetSelector);
    if (!root) return;
    const nodes = Array.from(root.querySelectorAll('h2, h3')) as HTMLHeadingElement[];
    const list: Heading[] = nodes.map((el, i) => {
      if (!el.id) {
        const slug = (el.textContent || `section-${i}`)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        el.id = slug;
      }
      return { id: el.id, text: el.textContent || '', level: el.tagName === 'H2' ? 2 : 3 };
    });
    setHeadings(list);
  }, [targetSelector]);

  // Track active heading via IntersectionObserver
  useEffect(() => {
    if (headings.length === 0) return;
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        // Pick the topmost intersecting heading
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // Sort by top position, take highest
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: 0 },
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="hidden xl:block sticky top-24 self-start text-sm"
    >
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-600 mb-4 block">
        On this page
      </span>
      <ul className="list-none p-0 m-0 flex flex-col gap-2 border-l border-paper-200">
        {headings.map((h) => (
          <li
            key={h.id}
            className={`-ml-px border-l-2 transition-colors ${
              activeId === h.id ? 'border-electric' : 'border-transparent'
            }`}
            style={{ paddingLeft: h.level === 3 ? 28 : 16 }}
          >
            <a
              href={`#${h.id}`}
              className={`block py-0.5 leading-snug transition-colors ${
                activeId === h.id ? 'text-electric font-medium' : 'text-mist-600 hover:text-ink'
              } ${h.level === 3 ? 'text-[13px]' : 'text-sm'}`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
