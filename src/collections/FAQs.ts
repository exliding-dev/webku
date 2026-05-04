import type { CollectionConfig } from 'payload'


const isAdminOrPublicRead = ({ req: { user } }: any) => {
  if (user) return true
  return { isActive: { equals: true } }
}

const isAdmin = ({ req: { user } }: any) => Boolean(user)

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'isActive', 'order'],
    description: 'Kelola FAQ (Pertanyaan Umum). Tambah, Edit, Hapus pertanyaan dan jawaban.',
  },
  access: {
    read: isAdminOrPublicRead,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        import('next/cache').then((mod) => mod.revalidatePath('/', 'layout'))
        return doc
      }
    ],
    afterDelete: [
      ({ doc }) => {
        import('next/cache').then((mod) => mod.revalidatePath('/', 'layout'))
        return doc
      }
    ],
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      label: 'Pertanyaan',
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      label: 'Jawaban',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Kategori',
      options: [
        { label: 'Umum', value: 'general' },
        { label: 'Layanan', value: 'service' },
        { label: 'Pembayaran', value: 'payment' },
        { label: 'Teknis', value: 'technical' },
      ],
      defaultValue: 'general',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: 'Urutan Tampil',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Aktifkan FAQ',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
