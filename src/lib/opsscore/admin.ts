/**
 * Server-only data for the admin view and its CSV export.
 */
import type { Payload, Where } from 'payload';
import { LEADS, SESSIONS } from './api';
import type { Attribution } from './attribution';
import { productPath } from './config';
import { ADMIN_COPY } from './copy';
import { SECTION_LABELS, lastAnsweredSection } from './flow';
import {
  AREA_LABELS,
  EMPLOYEE_OPTIONS,
  INDUSTRY_OPTIONS,
  QUESTION_BY_ID,
  REVENUE_OPTIONS,
  type Option,
} from './questions';
import type { Answers, Scores } from './scoring';

export type LeadFilters = { qualified: boolean; withPhone: boolean; phase: number | null; status: string | null };

type SearchParams = Record<string, string | string[] | undefined> | undefined;

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

export function parseFilters(searchParams: SearchParams): LeadFilters {
  const phase = Number(first(searchParams?.fase));
  const status = first(searchParams?.status) ?? null;
  return {
    qualified: first(searchParams?.omset) === '50',
    withPhone: first(searchParams?.wa) === '1',
    phase: [1, 2, 3, 4].includes(phase) ? phase : null,
    status: status && Object.hasOwn(ADMIN_COPY.followup, status) ? status : null,
  };
}

export const filtersToQuery = (filters: LeadFilters) => {
  const params = new URLSearchParams();
  if (filters.qualified) params.set('omset', '50');
  if (filters.withPhone) params.set('wa', '1');
  if (filters.phase) params.set('fase', String(filters.phase));
  if (filters.status) params.set('status', filters.status);
  const query = params.toString();
  return query ? `?${query}` : '';
};

const label = (options: Option[], id: string | null | undefined) => options.find((o) => o.id === id)?.label ?? id ?? '';

export const optionLabels = (questionId: string, value: Answers[string] | undefined) => {
  const question = QUESTION_BY_ID[questionId];
  const ids = Array.isArray(value) ? value : value ? [value] : [];
  return ids.map((id) => question?.options.find((o) => o.id === id)?.label ?? id);
};

function source(utm: Attribution) {
  const campaign = [utm.utm_source, utm.utm_medium, utm.utm_campaign].filter(Boolean).join(' / ');
  if (campaign) return campaign;
  if (utm.referrer) {
    try {
      return new URL(utm.referrer).hostname;
    } catch {
      return utm.referrer;
    }
  }
  return ADMIN_COPY.direct;
}

/** How far a session got: WhatsApp given, finished, or the quiz section of the furthest saved answer. */
export function progressLabel(status: string | null | undefined, answers: Answers) {
  if (status === 'gated') return ADMIN_COPY.progress.gated;
  if (status === 'completed') return ADMIN_COPY.progress.completed;
  return ADMIN_COPY.progress.stoppedAt(SECTION_LABELS[lastAnsweredSection(answers) ?? 'intro']);
}

export type LeadRow = {
  id: number;
  createdAt: string;
  name: string;
  brand: string;
  phone: string;
  email: string;
  website: string;
  repeatContact: boolean;
  industry: string;
  employees: string;
  revenue: string;
  followupStatus: string;
  notes: string;
  sessionId: string;
  phase: number | null;
  total: number | null;
  priorities: string[];
  serviceClass: string;
  progress: string;
  intent: string[];
  source: string;
  utm: Attribution;
};

export async function findLeads(payload: Payload, filters: LeadFilters): Promise<LeadRow[]> {
  const and: Where[] = [];
  if (filters.qualified) and.push({ revenueBand: { not_equals: 'lt50' } });
  if (filters.withPhone) and.push({ phoneE164: { exists: true } });
  if (filters.status) and.push({ followupStatus: { equals: filters.status } });
  if (filters.phase) and.push({ 'session.phase': { equals: filters.phase } });

  const { docs } = await payload.find({
    collection: LEADS,
    where: and.length ? { and } : {},
    sort: '-createdAt',
    limit: 1000,
    depth: 1,
    overrideAccess: true,
  });

  return docs.map((lead) => {
    const session = typeof lead.session === 'object' ? lead.session : null;
    const scores = (session?.scores ?? null) as Scores | null;
    const answers = (session?.answers ?? {}) as Answers;
    const utm = (session?.utm ?? {}) as Attribution;
    return {
      id: lead.id,
      createdAt: lead.createdAt,
      name: lead.name ?? '',
      brand: lead.brand ?? '',
      phone: lead.phoneE164 ?? '',
      email: lead.email ?? '',
      website: lead.website ?? '',
      repeatContact: Boolean(lead.repeatContact),
      industry: label(INDUSTRY_OPTIONS, lead.industry),
      employees: label(EMPLOYEE_OPTIONS, lead.employees),
      revenue: label(REVENUE_OPTIONS, lead.revenueBand),
      followupStatus: lead.followupStatus,
      notes: lead.notes ?? '',
      sessionId: session?.id ?? (typeof lead.session === 'string' ? lead.session : ''),
      phase: scores?.phase ?? null,
      total: scores?.total ?? null,
      priorities: (scores?.priorities ?? []).map((p) => AREA_LABELS[p.area]),
      serviceClass: scores?.serviceClass ?? '',
      progress: progressLabel(session?.status, answers),
      intent: optionLabels('H3', answers.H3),
      source: source(utm),
      utm,
    };
  });
}

/** Cohort of sessions started in the last `days`: how many of them completed and passed the gate. */
export async function funnel(payload: Payload, days: number) {
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  const count = (reached?: 'completedAt' | 'gatedAt') =>
    payload
      .count({
        collection: SESSIONS,
        where: {
          and: [
            { startedAt: { greater_than_equal: since } },
            ...(reached ? [{ [reached]: { exists: true } }] : []),
          ],
        },
        overrideAccess: true,
      })
      .then((result) => result.totalDocs);
  const [started, completed, gated] = await Promise.all([count(), count('completedAt'), count('gatedAt')]);
  return { days, started, completed, gated };
}

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Jakarta' }).format(
    new Date(iso),
  );

const csvCell = (value: string | number | null) => `"${String(value ?? '').replace(/"/g, '""')}"`;

/** CSV with a UTF-8 BOM so Sheets and Excel read Indonesian text and dashes correctly. */
export function leadsToCsv(rows: LeadRow[], siteUrl: string) {
  const header = [
    'tanggal', 'nama', 'brand', 'wa', 'wa_link', 'email', 'website', 'nomor_berulang', 'bidang_usaha', 'karyawan', 'omset', 'fase', 'total',
    'prioritas', 'kelas', 'progres', 'intent_h3', 'utm_source', 'utm_medium', 'utm_campaign', 'referrer',
    'followup_status', 'notes', 'session_id', 'hasil_url',
  ];
  const lines = rows.map((row) =>
    [
      formatDate(row.createdAt), row.name, row.brand, row.phone, row.phone ? `https://wa.me/${row.phone}` : '',
      row.email, row.website, row.repeatContact ? 'ya' : '',
      row.industry, row.employees, row.revenue, row.phase, row.total, row.priorities.join(' | '), row.serviceClass,
      row.progress, row.intent.join(' | '), row.utm.utm_source ?? '', row.utm.utm_medium ?? '', row.utm.utm_campaign ?? '',
      row.utm.referrer ?? '', row.followupStatus, row.notes, row.sessionId,
      `${siteUrl}${productPath(`/hasil/${row.sessionId}`)}`,
    ]
      .map(csvCell)
      .join(','),
  );
  return `﻿${[header.map(csvCell).join(','), ...lines].join('\r\n')}\r\n`;
}
