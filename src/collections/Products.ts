import type { CollectionConfig } from 'payload'


const isAdminOrPublicRead = ({ req: { user } }: any) => {
  if (user) return true
  return { isActive: { equals: true } }
}

const isAdmin = ({ req: { user } }: any) => Boolean(user)

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'isActive', 'hasDiscount'],
    description: 'Kelola produk/paket bulanan. CRUD lengkap: Tambah, Lihat, Edit, Hapus.',
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
      label: 'Nama Produk',
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
      name: 'price',
      type: 'text',
      required: true,
      label: 'Harga (Contoh: Rp 149.000 atau Rp 1.500.000)',
    },
    {
      name: 'period',
      type: 'text',
      required: true,
      defaultValue: '/bulan',
      label: 'Periode Pembayaran (Contoh: /bulan, /tahun)',
    },
    {
      name: 'tagline',
      type: 'text',
      required: true,
      label: 'Tagline Singkat',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Daftar Fitur',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'cta',
      type: 'text',
      defaultValue: 'Mulai Sekarang',
      required: true,
      label: 'Teks Tombol CTA',
    },
    {
      name: 'popular',
      type: 'checkbox',
      defaultValue: false,
      label: 'Tandai sebagai Populer / Terlaris',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'waText',
      type: 'text',
      label: 'Teks Pesan WhatsApp',
      admin: {
        description: 'Teks yang otomatis dikirim via tombol WA. Gunakan format URL Encode (contoh: Halo%20saya%20tertarik)',
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
      label: 'Aktifkan Produk',
      admin: {
        position: 'sidebar',
      },
    },

    // --- GRUP DISKON ---
    {
      name: 'hasDiscount',
      type: 'checkbox',
      label: 'Aktifkan Diskon?',
      defaultValue: false,
    },
    {
      name: 'discount',
      type: 'group',
      label: 'Detail Diskon',
      admin: {
        condition: (data) => Boolean(data.hasDiscount),
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label Promo (Contoh: Promo Ramadhan)',
        },
        {
          name: 'percentage',
          type: 'number',
          label: 'Persen Diskon (0 - 100)',
          min: 0,
          max: 100,
        },
        {
          name: 'nominal',
          type: 'number',
          label: 'Atau Nominal Diskon (Rupiah)',
          min: 0,
          admin: {
            description: 'Gunakan Persen atau Nominal, jangan keduanya.',
          },
        },
        {
          name: 'activeUntil',
          type: 'date',
          label: 'Berlaku Hingga',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
      ],
    },
  ],
}
