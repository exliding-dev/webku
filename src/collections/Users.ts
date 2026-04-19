import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'role', 'status'],
    description: 'Admin users yang dapat mengakses Payload CMS dashboard.',
  },
  auth: true,
  fields: [
    // Email dan Password ditambahkan otomatis oleh Payload Auth
    {
      name: 'name',
      type: 'text',
      label: 'Nama Lengkap',
    },
    {
      name: 'role',
      type: 'select',
      label: 'Role',
      options: [
        { label: '⚙️ Admin', value: 'admin' },
        { label: '👤 User', value: 'user' },
      ],
      defaultValue: 'user',
      required: true,
      admin: {
        description: 'Hanya admin yang dapat mengakses dashboard Payload CMS.',
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status Akun',
      options: [
        { label: '⏳ Pending (Menunggu Persetujuan)', value: 'pending' },
        { label: '✅ Approved (Disetujui)', value: 'approved' },
        { label: '🔴 Suspended (Dinonaktifkan)', value: 'suspended' },
      ],
      defaultValue: 'pending',
      required: true,
      admin: {
        description: 'Akun harus di-approve agar bisa login ke admin dashboard.',
        position: 'sidebar',
      },
    },
    {
      name: 'supabaseId',
      type: 'text',
      label: 'Supabase User ID',
      admin: {
        description: 'ID user dari Supabase Auth (otomatis terisi saat registrasi).',
        position: 'sidebar',
        readOnly: true,
      },
    },
  ],
}
