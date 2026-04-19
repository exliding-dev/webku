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

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  email: nodemailerAdapter({
    defaultFromAddress: process.env.EMAIL_FROM || 'info@exliding.com',
    defaultFromName: 'Exliding',
    transportOptions: {
      host: process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com',
      port: Number(process.env.EMAIL_SERVER_PORT) || 587,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    },
  }),
  collections: [Users, Products, Portfolios, BlogPosts],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'payload-secret-dev', // Default untuk development (akan diisi .env nanti)
  db: postgresAdapter({
    // Payload uses the standard DATABASE_URL environment variable by default
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    // We can define pushing behavior here, but Drizzle setup typically auto-pushes when dev starts if enabled
    push: true, // Turn on auto push to sync schema in dev
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
