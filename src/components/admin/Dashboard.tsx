/**
 * Custom Payload admin Dashboard.
 * Replaces the default collection-list landing screen with a marketer-friendly hub:
 *   - Quick links to high-traffic Globals (SiteSettings, Hero, Footer)
 *   - Recent drafts across Pages/Posts/Projects
 *   - New submission count
 */
import { getPayload } from 'payload';
import config from '@payload-config';

const card = {
  background: 'var(--theme-elevation-50, #fafafa)',
  border: '1px solid var(--theme-elevation-100, #e5e5e5)',
  borderRadius: 8,
  padding: 16,
  display: 'block',
  textDecoration: 'none',
  color: 'inherit',
} as const;

const eyebrow = {
  fontSize: 11,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.18em',
  fontWeight: 600,
  color: 'var(--theme-elevation-500, #888)',
  marginBottom: 6,
};

export default async function Dashboard() {
  let drafts: Array<{ collection: string; title: string; id: string | number; updatedAt?: string }> = [];
  let submissionCount = 0;
  try {
    const payload = await getPayload({ config });
    const [pages, posts, projects, submissions] = await Promise.all([
      payload
        .find({
          collection: 'pages',
          where: { _status: { equals: 'draft' } },
          sort: '-updatedAt',
          limit: 3,
          depth: 0,
          overrideAccess: true,
        })
        .catch(() => ({ docs: [] })),
      payload
        .find({
          collection: 'posts',
          where: { _status: { equals: 'draft' } },
          sort: '-updatedAt',
          limit: 3,
          depth: 0,
          overrideAccess: true,
        })
        .catch(() => ({ docs: [] })),
      payload
        .find({
          collection: 'projects',
          where: { _status: { equals: 'draft' } },
          sort: '-updatedAt',
          limit: 3,
          depth: 0,
          overrideAccess: true,
        })
        .catch(() => ({ docs: [] })),
      payload
        .find({
          collection: 'submissions',
          where: { status: { equals: 'new' } },
          limit: 0,
          depth: 0,
          overrideAccess: true,
        })
        .catch(() => ({ totalDocs: 0 })),
    ]);
    drafts = [
      ...(pages.docs as any[]).map((d) => ({ collection: 'pages', title: d.title, id: d.id, updatedAt: d.updatedAt })),
      ...(posts.docs as any[]).map((d) => ({ collection: 'posts', title: d.title, id: d.id, updatedAt: d.updatedAt })),
      ...(projects.docs as any[]).map((d) => ({ collection: 'projects', title: d.client, id: d.id, updatedAt: d.updatedAt })),
    ]
      .sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''))
      .slice(0, 5);
    submissionCount = (submissions as any).totalDocs || 0;
  } catch {
    // Fresh boot — collections may not exist yet. Render with empty state.
  }

  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <header>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>
          Welcome back.
        </h1>
        <p style={{ marginTop: 6, color: 'var(--theme-elevation-500, #888)', fontSize: 14 }}>
          Edit globals, draft pages, or check the inbox below.
        </p>
      </header>

      {/* Quick actions */}
      <section>
        <h2 style={eyebrow}>Quick actions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12, marginTop: 8 }}>
          <a href="/admin/collections/pages" style={card}>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>Pages</div>
            <div style={{ fontSize: 13, color: 'var(--theme-elevation-500, #888)' }}>
              Edit homepage + landing pages with blocks
            </div>
          </a>
          <a href="/admin/globals/site-settings" style={card}>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>Site settings</div>
            <div style={{ fontSize: 13, color: 'var(--theme-elevation-500, #888)' }}>
              Brand name, logo, footer, social links
            </div>
          </a>
          <a href="/admin/globals/hero" style={card}>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>Hero global</div>
            <div style={{ fontSize: 13, color: 'var(--theme-elevation-500, #888)' }}>
              Default hero copy used as fallback
            </div>
          </a>
          <a href="/admin/globals/contact" style={card}>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>Contact</div>
            <div style={{ fontSize: 13, color: 'var(--theme-elevation-500, #888)' }}>
              Form copy, scopes, success message
            </div>
          </a>
          <a href="/admin/collections/submissions" style={{ ...card, position: 'relative' }}>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
              Inbox
              {submissionCount > 0 && (
                <span
                  style={{
                    background: '#2C70FE',
                    color: 'white',
                    borderRadius: 99,
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '2px 8px',
                  }}
                >
                  {submissionCount} new
                </span>
              )}
            </div>
            <div style={{ fontSize: 13, color: 'var(--theme-elevation-500, #888)' }}>
              Contact form submissions
            </div>
          </a>
          <a href="/admin/collections/posts" style={card}>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>Field notes</div>
            <div style={{ fontSize: 13, color: 'var(--theme-elevation-500, #888)' }}>
              Blog posts
            </div>
          </a>
        </div>
      </section>

      {/* Recent drafts */}
      <section>
        <h2 style={eyebrow}>Recent drafts</h2>
        {drafts.length === 0 ? (
          <p style={{ fontSize: 13, color: 'var(--theme-elevation-500, #888)', marginTop: 8 }}>
            No drafts in progress. Create a new Page or Post to start.
          </p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {drafts.map((d) => (
              <li key={`${d.collection}-${d.id}`}>
                <a
                  href={`/admin/collections/${d.collection}/${d.id}`}
                  style={{ ...card, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <span style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{d.title || '(untitled)'}</span>
                    <span style={{ fontSize: 11, color: 'var(--theme-elevation-500, #888)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      {d.collection} · draft
                    </span>
                  </span>
                  <span style={{ color: 'var(--theme-elevation-500, #888)', fontSize: 13 }}>→</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
