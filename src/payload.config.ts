import path from 'path';
import { fileURLToPath } from 'url';
import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';

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

// Globals
import { Hero } from './globals/Hero';
import { Studio } from './globals/Studio';
import { Contact } from './globals/Contact';
import { TopBar } from './globals/TopBar';
import { SiteSettings } from './globals/SiteSettings';
import { BlogSettings } from './globals/BlogSettings';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— Coderoach Studio Admin',
    },
  },
  editor: lexicalEditor(),
  collections: [
    Users,
    Media,
    Services,
    Projects,
    ProcessPhases,
    Tenets,
    FAQs,
    Clients,
    Posts,
    Authors,
  ],
  globals: [Hero, Studio, Contact, TopBar, SiteSettings, BlogSettings],
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
