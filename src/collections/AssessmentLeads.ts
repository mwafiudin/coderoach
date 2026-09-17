import type { Access, CollectionConfig } from 'payload';
import { EMPLOYEE_OPTIONS, INDUSTRY_OPTIONS, REVENUE_OPTIONS, type Option } from '../lib/opsscore/questions';

const isAdmin: Access = ({ req }) => Boolean(req.user);

const toSelect = (options: Option[]) => options.map((o) => ({ label: o.label, value: o.id }));

/**
 * Profile and contact details for one OpsScore session, filled in as the quiz goes: name and business
 * name first, industry/revenue/team size inside their sections, WhatsApp and consent at the gate.
 * Fields are optional because a visitor can stop anywhere. Written only by the /api/opsscore route
 * handlers; kept apart from AssessmentSessions so the public share page never touches personal data.
 */
export const AssessmentLeads: CollectionConfig = {
  slug: 'assessment-leads',
  labels: { singular: 'Assessment lead', plural: 'Assessment leads' },
  admin: {
    group: 'OpsScore',
    useAsTitle: 'brand',
    defaultColumns: ['brand', 'name', 'phoneE164', 'revenueBand', 'followupStatus', 'createdAt'],
    description: 'Profiles and contacts from OpsScore. Only rows with a WhatsApp number can be followed up.',
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
    { name: 'name', type: 'text' },
    {
      name: 'phoneE164',
      type: 'text',
      index: true,
      admin: { description: 'Normalised to 62… (no plus sign), ready for wa.me links.' },
    },
    { name: 'brand', type: 'text' },
    { name: 'industry', type: 'select', options: toSelect(INDUSTRY_OPTIONS) },
    { name: 'employees', type: 'select', options: toSelect(EMPLOYEE_OPTIONS) },
    {
      name: 'revenueBand',
      type: 'select',
      index: true,
      options: toSelect(REVENUE_OPTIONS),
    },
    {
      name: 'consentAt',
      type: 'date',
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
