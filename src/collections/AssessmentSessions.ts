import type { Access, CollectionConfig } from 'payload';
import { INSTRUMENT_VERSION } from '../lib/opsscore/config';

const isAdmin: Access = ({ req }) => Boolean(req.user);

/**
 * One row per OpsScore attempt. Only the /api/opsscore route handlers write here (Local API with
 * overrideAccess); the public never reads this collection directly. Contact details live in
 * AssessmentLeads so the share page can never reach them.
 */
export const AssessmentSessions: CollectionConfig = {
  slug: 'assessment-sessions',
  labels: { singular: 'Assessment session', plural: 'Assessment sessions' },
  admin: {
    group: 'OpsScore',
    useAsTitle: 'shareSlug',
    defaultColumns: ['shareSlug', 'status', 'phase', 'total', 'startedAt'],
    description: 'One row per OpsScore attempt. Answers are stored raw so results can be recomputed.',
  },
  access: {
    read: isAdmin,
    create: () => false,
    update: () => false,
    delete: isAdmin,
  },
  hooks: {
    // leads.session is NOT NULL with ON DELETE SET NULL, so the lead has to go first.
    beforeDelete: [
      async ({ id, req }) => {
        await req.payload.delete({
          collection: 'assessment-leads',
          where: { session: { equals: id } },
          overrideAccess: true,
          req,
        });
      },
    ],
  },
  fields: [
    // UUID generated on the server; unguessable, so /opsscore/hasil/[id] is safe to share by link.
    { name: 'id', type: 'text', required: true, admin: { readOnly: true } },
    {
      name: 'shareSlug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { readOnly: true, description: 'Public /opsscore/r/[slug] link, scores only.' },
    },
    {
      name: 'instrumentVersion',
      type: 'number',
      required: true,
      defaultValue: INSTRUMENT_VERSION,
      admin: { readOnly: true },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'started',
      index: true,
      options: [
        { label: 'Started', value: 'started' },
        { label: 'Completed', value: 'completed' },
        { label: 'Gated', value: 'gated' },
      ],
      admin: { readOnly: true, position: 'sidebar' },
    },
    {
      name: 'phase',
      type: 'number',
      index: true,
      admin: { readOnly: true, position: 'sidebar', description: 'Copy of scores.phase, for filtering.' },
    },
    {
      name: 'total',
      type: 'number',
      admin: { readOnly: true, position: 'sidebar', description: 'Copy of scores.total.' },
    },
    { name: 'answers', type: 'json', admin: { readOnly: true } },
    { name: 'scores', type: 'json', admin: { readOnly: true } },
    { name: 'utm', type: 'json', admin: { readOnly: true } },
    { name: 'referrer', type: 'text', admin: { readOnly: true } },
    { name: 'userAgent', type: 'text', admin: { readOnly: true } },
    {
      name: 'startedAt',
      type: 'date',
      required: true,
      index: true,
      admin: { readOnly: true, position: 'sidebar', date: { displayFormat: 'yyyy-MM-dd HH:mm' } },
    },
    {
      name: 'completedAt',
      type: 'date',
      index: true,
      admin: { readOnly: true, position: 'sidebar', date: { displayFormat: 'yyyy-MM-dd HH:mm' } },
    },
    {
      name: 'gatedAt',
      type: 'date',
      index: true,
      admin: { readOnly: true, position: 'sidebar', date: { displayFormat: 'yyyy-MM-dd HH:mm' } },
    },
  ],
};
