import type { CollectionConfig } from 'payload';

const isAdmin = ({ req }: { req: any }) => Boolean(req.user);

export const Submissions: CollectionConfig = {
  slug: 'submissions',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'scope', 'submittedAt', 'status'],
    group: 'Inbox',
    description: 'Contact form submissions. Public can create; only admins can read/update/delete.',
  },
  access: {
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
    create: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create') return doc;
        const to = process.env.RESEND_TO_EMAIL;
        if (!to) return doc; // Email disabled in env — fail silently.
        const subject = `New brief from ${doc.email}${doc.scope ? ` · ${doc.scope}` : ''}`;
        const html = `
          <div style="font-family: ui-sans-serif, system-ui, sans-serif; max-width: 600px;">
            <h2 style="margin: 0 0 16px;">New contact form submission</h2>
            <p style="margin: 0 0 8px;"><strong>From:</strong> ${escapeHtml(doc.email)}</p>
            ${doc.scope ? `<p style="margin: 0 0 8px;"><strong>Scope:</strong> ${escapeHtml(doc.scope)}</p>` : ''}
            <p style="margin: 16px 0 8px;"><strong>Brief:</strong></p>
            <pre style="white-space: pre-wrap; background: #f5f5f5; padding: 12px; border-radius: 6px; font-family: inherit; margin: 0;">${escapeHtml(doc.brief || '')}</pre>
            ${doc.referrer ? `<p style="margin: 16px 0 4px; color: #666; font-size: 12px;"><strong>Referrer:</strong> ${escapeHtml(doc.referrer)}</p>` : ''}
            ${doc.userAgent ? `<p style="margin: 0 0 4px; color: #666; font-size: 12px;"><strong>User agent:</strong> ${escapeHtml(doc.userAgent)}</p>` : ''}
            <p style="margin: 16px 0 0; color: #666; font-size: 12px;">View in admin: ${process.env.NEXT_PUBLIC_SERVER_URL || ''}/admin/collections/submissions/${doc.id}</p>
          </div>
        `;
        try {
          await req.payload.sendEmail({
            to,
            subject,
            html,
            replyTo: doc.email,
          });
        } catch (err) {
          req.payload.logger.error({ err }, 'Failed to send submission notification email');
        }
        return doc;
      },
    ],
  },
  fields: [
    { name: 'email', type: 'email', required: true, index: true },
    {
      name: 'scope',
      type: 'select',
      options: [
        { label: 'Build', value: 'Build' },
        { label: 'Automate', value: 'Automate' },
        { label: 'Intelligence', value: 'Intelligence' },
        { label: 'Augment', value: 'Augment' },
        { label: 'Belum yakin', value: 'Belum yakin' },
        { label: 'Other', value: 'Other' },
      ],
    },
    { name: 'brief', type: 'textarea', required: true },
    {
      name: 'submittedAt',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
      admin: { position: 'sidebar', readOnly: true, date: { displayFormat: 'yyyy-MM-dd HH:mm' } },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      index: true,
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'userAgent', type: 'text', admin: { position: 'sidebar', readOnly: true } },
    { name: 'referrer', type: 'text', admin: { position: 'sidebar', readOnly: true } },
    { name: 'notes', type: 'textarea', admin: { description: 'Internal notes (admin only).' } },
  ],
};

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
