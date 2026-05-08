'use client';

import { useEffect, useRef, useState } from 'react';

type EventCategory = 'build' | 'alert' | 'query' | 'trace' | 'ship';

type OpsEvent = {
  id: number;
  category: EventCategory;
  subject: string;
  status: string;
  resolved?: boolean; // alert state — resolves after a beat
};

const CATEGORY_STYLES: Record<EventCategory, { color: string; label: string }> = {
  build: { color: 'text-electric', label: 'build' },
  alert: { color: 'text-warning', label: 'alert' },
  query: { color: 'text-mist-400', label: 'query' },
  trace: { color: 'text-[#5DD79A]', label: 'trace' },
  ship: { color: 'text-[#5DD79A]', label: 'ship' },
};

const POOL: Omit<OpsEvent, 'id'>[] = [
  { category: 'build', subject: 'laporta@v4.2.1', status: '✓ shipped in 23s' },
  { category: 'alert', subject: 'bumi-dispatch latency', status: '→ auto-resolved' },
  { category: 'query', subject: 'adira-search', status: '+38% throughput' },
  { category: 'trace', subject: 'viralytics campaigns', status: '380 active · 12 live' },
  { category: 'ship', subject: 'senayan@v2.0', status: '✓ deployed ap-se-1' },
  { category: 'build', subject: 'kopi-co-reports', status: '✓ shipped in 11s' },
  { category: 'alert', subject: 'citra-maju cron', status: '→ escalated to ops' },
  { category: 'query', subject: 'halo-portfolio kpis', status: 'refresh complete' },
  { category: 'trace', subject: 'bumi-fleet routes', status: '3,221 drivers active' },
  { category: 'ship', subject: 'laporta@hotfix-4.2.2', status: '✓ rolled forward' },
];

const formatTime = (date: Date) => {
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');
  return `${h}:${m}:${s}`;
};

export function OpsConsole() {
  const [now, setNow] = useState<Date | null>(null);
  const [events, setEvents] = useState<OpsEvent[]>([]);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const idRef = useRef(0);
  const poolIndexRef = useRef(0);

  // Init: detect reduce-motion + seed 3 starting events
  useEffect(() => {
    setNow(new Date());
    setReduceMotion(matchMedia('(prefers-reduced-motion: reduce)').matches);
    const seed: OpsEvent[] = [];
    for (let i = 0; i < 3; i++) {
      const e = POOL[i % POOL.length];
      seed.push({ ...e, id: idRef.current++ });
    }
    setEvents(seed);
    poolIndexRef.current = 3;
  }, []);

  // Live clock — ticks every second
  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, [reduceMotion]);

  // Event ticker — every 3.2s, push new event, drop oldest
  useEffect(() => {
    if (reduceMotion || paused) return;
    const id = setInterval(() => {
      setEvents((prev) => {
        const next = POOL[poolIndexRef.current % POOL.length];
        poolIndexRef.current += 1;
        const newEvent: OpsEvent = { ...next, id: idRef.current++ };
        return [newEvent, ...prev].slice(0, 3);
      });
    }, 3200);
    return () => clearInterval(id);
  }, [paused, reduceMotion]);

  return (
    <div
      className="bg-shadow-900 text-paper rounded-2xl border border-shadow-700 overflow-hidden font-mono text-[12px] tabular shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_24px_48px_-24px_rgba(8,9,10,0.4)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-shadow-700">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse-dot" />
          <span className="text-mist-400 tracking-[0.06em]">coderoach.studio · uplink</span>
        </div>
        <span className="text-mist-600 tracking-[0.04em]">{now ? formatTime(now) : '--:--:--'}</span>
      </div>

      {/* Event stack */}
      <div className="flex flex-col">
        {events.map((e, i) => (
          <OpsEventRow key={e.id} event={e} index={i} reduceMotion={reduceMotion} />
        ))}
        {/* Pad to 3 rows minimum to avoid layout jump */}
        {Array.from({ length: Math.max(0, 3 - events.length) }).map((_, i) => (
          <div key={`pad-${i}`} className="h-[58px]" />
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 py-2.5 border-t border-shadow-700 flex items-center justify-between text-[10px] text-mist-600 tracking-[0.06em]">
        <span>{paused ? 'paused' : 'streaming'} · 8 services · 3 regions</span>
        <span>{paused ? '⏸' : '▮'}</span>
      </div>
    </div>
  );
}

function OpsEventRow({
  event,
  index,
  reduceMotion,
}: {
  event: OpsEvent;
  index: number;
  reduceMotion: boolean;
}) {
  const cat = CATEGORY_STYLES[event.category];
  const opacity = index === 0 ? 'opacity-100' : index === 1 ? 'opacity-80' : 'opacity-50';
  return (
    <div
      className={`flex items-center gap-4 px-5 py-3.5 border-b border-shadow-700/60 last:border-b-0 ${opacity} ${
        !reduceMotion && index === 0 ? 'animate-ops-row-in' : ''
      }`}
    >
      <span className={`shrink-0 ${cat.color} font-medium tracking-[0.04em] w-12`}>{cat.label}</span>
      <span className="flex-1 text-paper truncate">{event.subject}</span>
      <span className="text-mist-500 truncate text-right">{event.status}</span>
    </div>
  );
}
