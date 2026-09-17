import type { Access, CollectionConfig } from 'payload';
import { EMPLOYEE_OPTIONS, INDUSTRY_OPTIONS, REVENUE_OPTIONS, type Option } from '../lib/opsscore/questions';

const isAdmin: Access = ({ req }) => Boolean(req.user);

const toSelect = (options: Option[]) => options.map((o) => ({ label: o.label, value: o.id }));

/**
 * Contact details from the OpsScore gate — one per session, written only by the gate route handler.
 * Kept apart from AssessmentSessions so the public share page never touches personal data.
 */
export const AssessmentLeads: CollectionConfig = {
  slug: 'assessment-leads',
  labels: { singular: 'Assessment lead', plural: 'Assessment leads' },
  admin: {
    group: 'OpsScore',
    useAsTitle: 'brand',
    defaultColumns: ['brand', 'name', 'phoneE164', 'revenueBand', 'followupStatus', 'createdAt'],
    description: 'Leads from the OpsScore gate. Follow up manually over WhatsApp.',
  },
  access: {
    read: isAdmin,
    create: () => false,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'session',
      type: 'relationship',
      relationTo: 'assessment-sessions',
      required: true,
      unique: true,
      index: true,
      admin: { readOnly: true },
    },
    { name: 'name', type: 'text', required: true },
    {
      name: 'phoneE164',
      type: 'text',
      required: true,
      index: true,
      admin: { description: 'Normalised to 62… (no plus sign), ready for wa.me links.' },
    },
    { name: 'brand', type: 'text', required: true },
    { name: 'industry', type: 'select', required: true, options: toSelect(INDUSTRY_OPTIONS) },
    { name: 'employees', type: 'select', required: true, options: toSelect(EMPLOYEE_OPTIONS) },
    {
      name: 'revenueBand',
      type: 'select',
      required: true,
      index: true,
      options: toSelect(REVENUE_OPTIONS),
    },
    {
      name: 'consentAt',
      type: 'date',
      required: true,
      admin: { readOnly: true, date: { displayFormat: 'yyyy-MM-dd HH:mm' } },
    },
    {
      name: 'followupStatus',
      type: 'select',
      required: true,
      defaultValue: 'new',
      index: true,
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'Not fit', value: 'not_fit' },
        { label: 'Converted', value: 'converted' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'notes', type: 'textarea', admin: { description: 'Internal notes (admin only).' } },
  ],
};
