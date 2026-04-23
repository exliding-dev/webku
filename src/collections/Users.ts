import type { CollectionConfig, Access } from 'payload'

// ─── ACCESS CONTROLS ──────────────────────────────────────────────────────────

/** Hanya admin yang bisa melihat & mengelola semua user */
const isAdmin: Access = ({ req: { user } }) => {
  if (!user) return false
  return (user as any).role === 'admin'
}

/** Admin bisa lihat semua; user biasa hanya bisa lihat dirinya sendiri */
const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false
  if ((user as any).role === 'admin') return true
  return {
    id: { equals: user.id },
  }
}

/** Hanya admin yang bisa update role & status user lain */
const isAdminOrSelfUpdate: Access = ({ req: { user } }) => {
  if (!user) return false
  if ((user as any).role === 'admin') return true
  return {
    id: { equals: user.id },
  }
}

// ─── USERS COLLECTION ─────────────────────────────────────────────────────────
// Koleksi ini digunakan KHUSUS untuk admin Payload CMS.
// Client users yang login via website menggunakan Supabase Auth.
export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'role', 'status', 'createdAt'],
    description: 'Manajemen akun yang dapat mengakses Payload CMS dashboard.',
    group: 'Admin & Akses',
  },
  auth: {
    tokenExpiration: 7200, // 2 jam
    maxLoginAttempts: 5,
    lockTime: 600 * 1000, // 10 menit
    useAPIKey: false,
  },
  access: {
    read: isAdminOrSelf,
    create: () => true, // Bisa registrasi (diblokir di level role/status)
    update: isAdminOrSelfUpdate,
    delete: isAdmin,
    admin: ({ req: { user } }) => {
      // Hanya role admin + status approved yang bisa masuk ke CMS panel
      if (!user) return false
      const u = user as any
      return u.role === 'admin' && u.status === 'approved'
    },
    unlock: isAdmin,
  },
  fields: [
    // Email dan Hash Password ditambahkan otomatis oleh Payload Auth
    {
      name: 'name',
      type: 'text',
      label: 'Nama Lengkap',
      required: false,
    },
    {
      name: 'role',
      type: 'select',
      label: 'Role',
      options: [
        { label: '⚙️ Admin — Akses penuh ke CMS dashboard', value: 'admin' },
        { label: '👤 User — Tidak bisa akses CMS (hanya data)', value: 'user' },
      ],
      defaultValue: 'user',
      required: true,
      admin: {
        description:
          'Admin: akses penuh ke Payload CMS. User: hanya bisa melihat data dari sisi client.',
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status Akun',
      options: [
        { label: '⏳ Pending — Menunggu persetujuan admin', value: 'pending' },
        { label: '✅ Approved — Aktif dan bisa login', value: 'approved' },
        { label: '🔴 Suspended — Dinonaktifkan', value: 'suspended' },
      ],
      defaultValue: 'pending',
      required: true,
      admin: {
        description:
          'Akun harus di-approve terlebih dahulu agar bisa login ke admin dashboard.',
        position: 'sidebar',
      },
    },
    {
      name: 'supabaseId',
      type: 'text',
      label: 'Supabase User ID',
      admin: {
        description: 'ID user dari Supabase Auth. Otomatis terisi saat registrasi.',
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'inviteToken',
      type: 'text',
      label: 'Invite Token',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'inviteTokenExpiry',
      type: 'date',
      label: 'Invite Token Expiry',
      admin: {
        hidden: true,
      },
    },
  ],
  hooks: {
    beforeLogin: [
      async ({ user }) => {
        const u = user as any
        // Blokir login ke CMS jika bukan admin atau belum approved
        if (u.role !== 'admin') {
          throw new Error(
            `Akses ditolak: Role "${u.role || 'tidak ada'}" tidak dapat mengakses CMS. Hubungi super-admin untuk upgrade role.`
          )
        }
        if (u.status === 'pending') {
          throw new Error(
            'Akun Anda masih menunggu persetujuan super-admin. Harap bersabar.'
          )
        }
        if (u.status === 'suspended') {
          throw new Error(
            'Akun Anda telah dinonaktifkan. Hubungi super-admin.'
          )
        }
        if (u.status !== 'approved') {
          throw new Error(
            `Status akun "${u.status}" tidak valid. Hubungi super-admin.`
          )
        }
        return user
      },
    ],
  },
}
