import type { CollectionConfig } from 'payload'


const isAdminOrPublicRead = ({ req: { user } }: any) => {
  if (user) return true
  return { isPublished: { equals: true } }
}

const isAdmin = ({ req: { user } }: any) => Boolean(user)

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'isPublished', 'author'],
    description: 'Kelola artikel blog. CRUD lengkap: Tambah, Lihat, Edit, Hapus.',
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
      name: 'title',
      type: 'text',
      required: true,
      label: 'Judul Artikel',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        position: 'sidebar',
        description: 'Otomatis dari judul. Contoh: pentingnya-seo',
      },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      label: 'Tanggal Publikasi',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd/MM/yyyy',
        },
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      label: 'Ringkasan Singkat',
      admin: {
        description: 'Tampil di daftar blog dan meta description. Maksimal 200 karakter.',
      },
    },
    {
      name: 'thumbnail',
      type: 'text',
      label: 'Path Thumbnail',
      admin: {
        description: 'Path gambar relatif dari /public. Contoh: /blog/seo-penting.jpg',
      },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags / Kategori',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'author',
      type: 'text',
      defaultValue: 'Exliding',
      label: 'Penulis',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Konten Artikel',
    },

    // ─── RELATIONSHIP: Portfolio Produk ───────────────────────────────────
    {
      name: 'relatedPortfolios',
      type: 'relationship',
      relationTo: 'portfolios',
      hasMany: true,
      label: 'Portfolio Produk Terkait',
      admin: {
        description: 'Pilih portfolio/produk yang ingin ditampilkan di artikel ini. Akan muncul sebagai section khusus di halaman artikel.',
      },
    },

    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: false,
      label: 'Publikasikan Artikel',
      admin: {
        position: 'sidebar',
        description: 'Centang untuk menampilkan artikel di website.',
      },
    },
  ],
}
