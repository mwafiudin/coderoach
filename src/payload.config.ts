import path from 'path';
import { fileURLToPath } from 'url';
import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import { resendAdapter } from '@payloadcms/email-resend';

// Collections
import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Services } from './collections/Services';
import { Projects } from './collections/Projects';
import { ProcessPhases } from './collections/ProcessPhases';
import { Tenets } from './collections/Tenets';
import { FAQs } from './collections/FAQs';
import { Clients } from './collections/Clients';
import { Posts } from './collections/Posts';
import { Authors } from './collections/Authors';
import { Submissions } from './collections/Submissions';
import { Pages } from './collections/Pages';

// Globals
import { Hero } from './globals/Hero';
import { Studio } from './globals/Studio';
import { Contact } from './globals/Contact';
import { TopBar } from './globals/TopBar';
import { SiteSettings } from './globals/SiteSettings';
import { BlogSettings } from './globals/BlogSettings';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

if (process.env.NODE_ENV === 'production' && !process.env.PAYLOAD_SECRET) {
  throw new Error(
    'PAYLOAD_SECRET is required in production. Set it in your environment before starting the server.',
  );
}

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Studio';

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: '@/components/admin/Logo',
        Icon: '@/components/admin/Icon',
      },
      views: {
        dashboard: {
          Component: '@/components/admin/Dashboard',
        },
      },
    },
    livePreview: {
      url: ({ data, collectionConfig }) => {
        const base = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
        const slug = (data as any)?.slug;
        if (!collectionConfig) return base;
        if (collectionConfig.slug === 'posts' && slug) return `${base}/notes/${slug}?preview=1`;
        if (collectionConfig.slug === 'projects' && slug) return `${base}/work/${slug}?preview=1`;
        if (collectionConfig.slug === 'pages') {
          if (!slug || slug === 'home') return `${base}/?preview=1`;
          return `${base}/${slug}?preview=1`;
        }
        return base;
      },
      breakpoints: [
        { name: 'mobile', label: 'Mobile', width: 375, height: 667 },
        { name: 'tablet', label: 'Tablet', width: 768, height: 1024 },
        { name: 'desktop', label: 'Desktop', width: 1440, height: 900 },
      ],
      collections: ['posts', 'projects', 'pages'],
    },
    meta: {
      titleSuffix: `— ${siteName} Admin`,
    },
  },
  editor: lexicalEditor(),
  collections: [
    Users,
    Media,
    Pages,
    Services,
    Projects,
    ProcessPhases,
    Tenets,
    FAQs,
    Clients,
    Posts,
    Authors,
    Submissions,
  ],
  globals: [Hero, Studio, Contact, TopBar, SiteSettings, BlogSettings],
  graphQL: {
    disablePlaygroundInProduction: true,
  },
  email: process.env.RESEND_API_KEY
    ? resendAdapter({
        defaultFromAddress: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        defaultFromName: siteName,
        apiKey: process.env.RESEND_API_KEY,
      })
    : undefined,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URI ||
        process.env.POSTGRES_URL ||
        process.env.DATABASE_URL ||
        '',
    },
  }),
  plugins: [
    vercelBlobStorage({
      enabled: !!process.env.BLOB_READ_WRITE_TOKEN,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  cors: [process.env.NEXT_PUBLIC_SERVER_URL || ''].filter(Boolean),
});
