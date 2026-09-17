/**
 * Content of /admin/opsscore: the lead list with funnel, and one session in detail.
 * Kept apart from the view so it renders without Payload's admin template.
 */
import type { Payload } from 'payload';
import type { CSSProperties } from 'react';
import { filtersToQuery, findLeads, formatDate, funnel, optionLabels, parseFilters } from '@/lib/opsscore/admin';
import { LEADS, findSession } from '@/lib/opsscore/api';
import type { Attribution } from '@/lib/opsscore/attribution';
import { productPath } from '@/lib/opsscore/config';
import { ACTIONS, ADMIN_COPY, PHASE_COPY } from '@/lib/opsscore/copy';
import { AREAS, AREA_LABELS, EMPLOYEE_OPTIONS, INDUSTRY_OPTIONS, QUESTIONS, REVENUE_OPTIONS } from '@/lib/opsscore/questions';
import type { Answers, Scores } from '@/lib/opsscore/scoring';
import { OpsScoreStatus } from './OpsScoreStatus';

const muted: CSSProperties = { color: 'var(--theme-elevation-500, #888)' };
const eyebrow: CSSProperties = {
  ...muted,
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: '0.18em',
  fontWeight: 600,
  margin: '0 0 8px',
};
const card: CSSProperties = {
  background: 'var(--theme-elevation-50, #fafafa)',
  border: '1px solid var(--theme-elevation-100, #e5e5e5)',
  borderRadius: 8,
  padding: 16,
};
const cell: CSSProperties = {
  padding: '10px 12px',
  borderBottom: '1px solid var(--theme-elevation-100, #e5e5e5)',
  verticalAlign: 'top',
  textAlign: 'left',
};
const headCell: CSSProperties = { ...cell, ...eyebrow, margin: 0, whiteSpace: 'nowrap' };
const control: CSSProperties = {
  font: 'inherit',
  padding: '6px 8px',
  borderRadius: 4,
  border: '1px solid var(--theme-elevation-150, #ddd)',
  background: 'var(--theme-input-bg, var(--theme-elevation-0, #fff))',
  color: 'var(--theme-text, inherit)',
};
const button: CSSProperties = { ...control, cursor: 'pointer', fontWeight: 600 };

const percent = (part: number, whole: number) =>
  whole ? new Intl.NumberFormat('id-ID', { style: 'percent', maximumFractionDigits: 0 }).format(part / whole) : '—';

export async function LeadList({
  payload,
  searchParams,
  base,
  apiRoute,
}: {
  payload: Payload;
  searchParams: Record<string, string | string[] | undefined> | undefined;
  base: string;
  apiRoute: string;
}) {
  const filters = parseFilters(searchParams);
  const [rows, week, month] = await Promise.all([findLeads(payload, filters), funnel(payload, 7), funnel(payload, 30)]);

  return (
    <>
      <h1 style={{ margin: 0 }}>{ADMIN_COPY.title}</h1>

      <div style={{ display: 'grid', gap: 12 }}>
        {[week, month].map((f) => (
          <div key={f.days}>
            <p style={eyebrow}>{ADMIN_COPY.funnelTitle(f.days)}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
              {[
                [ADMIN_COPY.started, f.started],
                [ADMIN_COPY.completed, f.completed],
                [ADMIN_COPY.gated, f.gated],
                [ADMIN_COPY.completionRate, percent(f.completed, f.started)],
                [ADMIN_COPY.gateRate, percent(f.gated, f.completed)],
              ].map(([name, value]) => (
                <div key={String(name)} style={card}>
                  <div style={{ ...muted, fontSize: 12 }}>{name}</div>
                  <div style={{ fontSize: 28, fontWeight: 700, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <form method="get" action={base} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <input type="checkbox" name="omset" value="50" defaultChecked={filters.qualified} />
          {ADMIN_COPY.filters.qualified}
        </label>
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          {ADMIN_COPY.filters.phase}
          <select name="fase" defaultValue={filters.phase ?? ''} style={control}>
            <option value="">{ADMIN_COPY.filters.all}</option>
            {([1, 2, 3, 4] as const).map((p) => (
              <option key={p} value={p}>
                {p} · {PHASE_COPY[p].name}
              </option>
            ))}
          </select>
        </label>
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          {ADMIN_COPY.filters.status}
          <select name="status" defaultValue={filters.status ?? ''} style={control}>
            <option value="">{ADMIN_COPY.filters.all}</option>
            {Object.entries(ADMIN_COPY.followup).map(([key, text]) => (
              <option key={key} value={key}>
                {text}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" style={button}>
          {ADMIN_COPY.filters.apply}
        </button>
        <a href={base} style={muted}>
          {ADMIN_COPY.filters.reset}
        </a>
        <span style={{ marginLeft: 'auto', display: 'inline-flex', gap: 12, alignItems: 'center' }}>
          <span style={muted}>{ADMIN_COPY.leadsCount(rows.length)}</span>
          <a href={`/api/opsscore/leads/csv${filtersToQuery(filters)}`} style={button}>
            {ADMIN_COPY.exportCsv}
          </a>
        </span>
      </form>

      {rows.length === 0 ? (
        <p style={muted}>{ADMIN_COPY.empty}</p>
      ) : (
        <div style={{ overflowX: 'auto', border: '1px solid var(--theme-elevation-100, #e5e5e5)', borderRadius: 8 }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 13, minWidth: 1500 }}>
            <thead>
              <tr>
                {Object.values(ADMIN_COPY.columns).map((name) => (
                  <th key={name} style={headCell}>
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td style={{ ...cell, whiteSpace: 'nowrap' }}>{formatDate(row.createdAt)}</td>
                  <td style={cell}>{row.name}</td>
                  <td style={cell}>{row.brand}</td>
                  <td style={{ ...cell, whiteSpace: 'nowrap' }}>
                    <a href={`https://wa.me/${row.phone}`} target="_blank" rel="noopener noreferrer">
                      +{row.phone}
                    </a>
                  </td>
                  <td style={cell}>{row.industry}</td>
                  <td style={cell}>{row.employees}</td>
                  <td style={{ ...cell, whiteSpace: 'nowrap' }}>{row.revenue}</td>
                  <td style={cell}>{row.phase ?? '—'}</td>
                  <td style={cell}>{row.total ?? '—'}</td>
                  <td style={cell}>{row.priorities.join(', ')}</td>
                  <td style={{ ...cell, whiteSpace: 'nowrap' }}>{row.serviceClass}</td>
                  <td style={cell}>{row.intent.join(', ')}</td>
                  <td style={cell}>{row.source}</td>
                  <td style={cell}>
                    <OpsScoreStatus id={row.id} value={row.followupStatus} apiRoute={apiRoute} />
                  </td>
                  <td style={cell}>
                    <a href={`${base}?sesi=${row.sessionId}`}>{ADMIN_COPY.openDetail}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export async function SessionDetail({ payload, id, base, apiRoute }: { payload: Payload; id: string; base: string; apiRoute: string }) {
  const session = await findSession(payload, id);
  if (!session) {
    return (
      <>
        <a href={base}>{ADMIN_COPY.back}</a>
        <p>{ADMIN_COPY.notFound}</p>
      </>
    );
  }
  const { docs } = await payload.find({
    collection: LEADS,
    where: { session: { equals: id } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  const lead = docs[0];
  const scores = (session.scores ?? null) as Scores | null;
  const answers = (session.answers ?? {}) as Answers;
  const utm = (session.utm ?? {}) as Attribution;
  const dates = [
    [ADMIN_COPY.sessionStatus.started, session.startedAt],
    [ADMIN_COPY.sessionStatus.completed, session.completedAt],
    [ADMIN_COPY.sessionStatus.gated, session.gatedAt],
  ] as const;

  return (
    <>
      <a href={base}>{ADMIN_COPY.back}</a>
      <h1 style={{ margin: 0 }}>{ADMIN_COPY.detailTitle}</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        <div style={card}>
          <p style={eyebrow}>{ADMIN_COPY.leadTitle}</p>
          {lead ? (
            <div style={{ display: 'grid', gap: 6 }}>
              <strong>{lead.brand}</strong>
              <span>{lead.name}</span>
              <a href={`https://wa.me/${lead.phoneE164}`} target="_blank" rel="noopener noreferrer">
                +{lead.phoneE164}
              </a>
              <span style={muted}>
                {INDUSTRY_OPTIONS.find((o) => o.id === lead.industry)?.label} ·{' '}
                {EMPLOYEE_OPTIONS.find((o) => o.id === lead.employees)?.label} ·{' '}
                {REVENUE_OPTIONS.find((o) => o.id === lead.revenueBand)?.label}
              </span>
              <OpsScoreStatus id={lead.id} value={lead.followupStatus} apiRoute={apiRoute} />
            </div>
          ) : (
            <p style={muted}>{ADMIN_COPY.noLead}</p>
          )}
        </div>

        <div style={card}>
          <p style={eyebrow}>{ADMIN_COPY.sessionMeta}</p>
          <div style={{ display: 'grid', gap: 6 }}>
            <span>
              {ADMIN_COPY.sessionStatus[session.status]} · {ADMIN_COPY.instrumentVersion(session.instrumentVersion)}
            </span>
            {dates.map(([name, value]) => (
              <span key={name} style={muted}>
                {name}: {value ? formatDate(value) : '—'}
              </span>
            ))}
            <span style={muted}>
              {Object.entries(utm)
                .map(([key, value]) => `${key}=${value}`)
                .join(' · ') || ADMIN_COPY.direct}
            </span>
            <a href={productPath(`/hasil/${session.id}`)} target="_blank" rel="noopener noreferrer">
              {productPath(`/hasil/${session.id}`)}
            </a>
          </div>
        </div>

        {scores && (
          <div style={card}>
            <p style={eyebrow}>{ADMIN_COPY.scoresTitle}</p>
            <div style={{ display: 'grid', gap: 4 }}>
              <strong>
                {scores.total} · {PHASE_COPY[scores.phase].title} · {scores.serviceClass}
              </strong>
              {AREAS.map(({ id: area, label }) =>
                scores.areas[area] === undefined ? null : (
                  <span key={area} style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                    <span>{label}</span>
                    <span style={{ fontVariantNumeric: 'tabular-nums' }}>{scores.areas[area]}</span>
                  </span>
                ),
              )}
              {scores.priorities.map((p, i) => (
                <span key={p.area} style={{ ...muted, marginTop: i === 0 ? 8 : 0 }}>
                  {i + 1}. {AREA_LABELS[p.area]} ({p.score}) — {ACTIONS[p.focusQuestion]}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        <p style={eyebrow}>{ADMIN_COPY.answersTitle}</p>
        <div style={{ overflowX: 'auto', border: '1px solid var(--theme-elevation-100, #e5e5e5)', borderRadius: 8 }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 13 }}>
            <tbody>
              {QUESTIONS.map((q) => (
                <tr key={q.id}>
                  <td style={{ ...cell, ...muted, whiteSpace: 'nowrap' }}>{q.id}</td>
                  <td style={cell}>{q.prompt}</td>
                  <td style={cell}>{optionLabels(q.id, answers[q.id]).join(', ') || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
