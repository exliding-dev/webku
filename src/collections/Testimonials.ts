import type { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'

const isAdminOrPublicRead = ({ req: { user } }: any) => {
  if (user) return true
  return { isActive: { equals: true } }
}

const isAdmin = ({ req: { user } }: any) => Boolean(user)

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'rating', 'isActive', 'order'],
    description: 'Kelola testimoni klien. CRUD lengkap: Tambah, Lihat, Edit, Hapus.',
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
        revalidatePath('/', 'layout')
        return doc
      }
    ],
    afterDelete: [
      ({ doc }) => {
        revalidatePath('/', 'layout')
        return doc
      }
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nama Klien',
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      label: 'Jabatan / Perusahaan',
      admin: {
        description: 'Contoh: Pemilik Toko Online, CEO PT Maju',
      },
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      label: 'Isi Testimoni',
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      defaultValue: 5,
      label: 'Rating (1-5 Bintang)',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Klien (Opsional)',
      admin: {
        description: 'Upload foto klien. Jika kosong, akan menggunakan inisial nama.',
      },
    },
    {
      name: 'initials',
      type: 'text',
      label: 'Inisial (Otomatis)',
      admin: {
        description: 'Inisial untuk avatar fallback. Contoh: BS, SD. Akan digenerate otomatis jika kosong.',
        position: 'sidebar',
      },
    },
    {
      name: 'accent',
      type: 'select',
      label: 'Warna Aksen',
      options: [
        { label: 'Primary (Biru)', value: 'bg-primary' },
        { label: 'Accent (Kuning)', value: 'bg-brutal-accent' },
      ],
      defaultValue: 'bg-primary',
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
      label: 'Aktifkan Testimoni',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
