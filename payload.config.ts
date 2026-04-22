import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { Users } from './src/collections/Users'
import { Products } from './src/collections/Products'
import { Portfolios } from './src/collections/Portfolios'
import { BlogPosts } from './src/collections/BlogPosts'
import { Media } from './src/collections/Media'
import { Services } from './src/collections/Services'
import { Templates } from './src/collections/Templates'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
    components: {
      afterNavLinks: ['@/src/components/admin/LogoutButton#default'],
    },
  },
  email: process.env.EMAIL_SERVER_USER ? nodemailerAdapter({
    defaultFromAddress: process.env.EMAIL_FROM || 'info@exliding.com',
    defaultFromName: 'Exliding Admin',
    transportOptions: {
      host: process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com',
      port: Number(process.env.EMAIL_SERVER_PORT) || 587,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    },
  }) : undefined,
  collections: [Users, Products, Portfolios, BlogPosts, Media, Services, Templates],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'payload-secret-dev',
  db: postgresAdapter({
    pool: (() => {
      // On Vercel: use the pooler (DATABASE_URL). The direct host is firewalled.
      // Locally: use DIRECT_URL (true direct, no pgBouncer) for schema push support.
      const isVercel = !!process.env.VERCEL
      if (isVercel) {
        // Pooler URL — keep all query params (pgbouncer=true, sslmode, etc.)
        return {
          connectionString: process.env.DATABASE_URL || '',
          ssl: { rejectUnauthorized: false },
        }
      }
      // Local dev: strip query params to use direct TCP with SSL option below
      return {
        connectionString: (process.env.DIRECT_URL || process.env.DATABASE_URL || '').split('?')[0],
        ssl: { rejectUnauthorized: false },
      }
    })(),
    // Tables live in the 'payload' schema (created during initial push)
    schemaName: 'payload',
    // Only push schema in local dev — on Vercel it's already synced
    // and pgBouncer pooler doesn't support DDL introspection queries
    push: !process.env.VERCEL,
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
