import type { CollectionConfig } from 'payload'


const isAdminOrPublicRead = ({ req: { user } }: any) => {
  if (user) return true
  return { isActive: { equals: true } }
}

const isAdmin = ({ req: { user } }: any) => Boolean(user)

export const Templates: CollectionConfig = {
  slug: 'templates',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'price', 'isActive', 'order'],
    description: 'Kelola template website. CRUD lengkap: Tambah, Lihat, Edit, Hapus.',
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
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nama Template',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      label: 'URL Slug',
    },
    {
      name: 'category',
      type: 'text',
      required: true,
      label: 'Kategori',
      defaultValue: 'Company Profile',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      label: 'Harga (Rp)',
    },
    {
      name: 'oldPrice',
      type: 'number',
      label: 'Harga Coret / Lama (Opsional)',
      min: 0,
    },
    {
      name: 'buyers',
      type: 'number',
      defaultValue: 0,
      label: 'Jumlah Pembeli',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'pages',
      type: 'number',
      required: true,
      label: 'Jumlah Halaman',
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags / Label (misal: Minimalis, Premium)',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'preview',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Gambar Preview Template (Opsional)',
      admin: {
        description: 'Upload screenshot template. Jika kosong, gradient warna akan digunakan.',
      },
    },
    {
      name: 'previewGradient',
      type: 'text',
      label: 'Gradient Warna Preview',
      defaultValue: 'from-blue-600 to-indigo-700',
      admin: {
        description: 'Tailwind gradient classes untuk preview kartu. Contoh: from-blue-600 to-indigo-700',
      },
    },
    {
      name: 'accentColor',
      type: 'text',
      label: 'Warna Aksen (Tailwind class, misal bg-blue-500)',
      defaultValue: 'bg-blue-500',
    },
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Teks Opsional (misal: "Bestseller")',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Daftar Fitur Template',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'waText',
      type: 'text',
      label: 'Teks Pesan WhatsApp',
      admin: {
        description: 'Teks otomatis saat menghubungi via WA (Gunakan format URL encode).',
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
      label: 'Aktifkan Template',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
