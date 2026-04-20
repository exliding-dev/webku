import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Admin Seed Endpoint
 * 
 * GET  /api/admin-seed?key=<ADMIN_SECRET_KEY>
 *   → Cek status, buat admin default jika belum ada
 * 
 * POST /api/admin-seed
 *   Body: { email, password, name, forceReset?: boolean }
 *   Header: x-seed-secret: <ADMIN_SECRET_KEY>
 *   → Buat atau reset admin dengan email & password kustom
 * 
 * DELETE /api/admin-seed
 *   Header: x-seed-secret: <ADMIN_SECRET_KEY>
 *   Body: { email: "user@to.delete" }
 *   → Hapus user dari Payload (untuk reset bersih)
 * 
 * ⚠️  Disable endpoint ini di production setelah setup selesai!
 *     Caranya: set DISABLE_SEED_ENDPOINT=true di .env
 */

const SEED_ENDPOINT_DISABLED = process.env.DISABLE_SEED_ENDPOINT === 'true'

function getSecretKey(): string {
  return process.env.ADMIN_SECRET_KEY || process.env.SEED_SECRET || ''
}

function checkAuth(req: NextRequest): boolean {
  const secretKey =
    req.nextUrl.searchParams.get('key') ??
    req.headers.get('x-seed-secret') ??
    ''
  return secretKey === getSecretKey() && secretKey !== ''
}

// ─── GET: Status check + create default admin ─────────────────────────────────
export async function GET(req: NextRequest) {
  if (SEED_ENDPOINT_DISABLED) {
    return NextResponse.json({ error: 'Seed endpoint disabled.' }, { status: 403 })
  }

  if (!checkAuth(req)) {
    return NextResponse.json(
      { error: 'Unauthorized — Secret key tidak valid.' },
      { status: 401 }
    )
  }

  try {
    const payload = await getPayload({ config: configPromise })

    const allUsers = await payload.find({
      collection: 'users',
      limit: 50,
      sort: '-createdAt',
    })

    const admins = allUsers.docs.filter((u: any) => u.role === 'admin')
    const pending = allUsers.docs.filter((u: any) => u.status === 'pending')

    return NextResponse.json({
      status: 'ok',
      totalUsers: allUsers.totalDocs,
      admins: admins.map((u: any) => ({
        id: u.id,
        email: u.email,
        name: u.name,
        role: u.role,
        status: u.status,
      })),
      pendingUsers: pending.map((u: any) => ({
        id: u.id,
        email: u.email,
        role: u.role,
      })),
      hint: admins.length === 0
        ? 'Belum ada admin. POST ke endpoint ini untuk membuat admin.'
        : 'Admin sudah ada. Login di /admin/login',
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    )
  }
}

// ─── POST: Create or reset admin ──────────────────────────────────────────────
export async function POST(req: NextRequest) {
  if (SEED_ENDPOINT_DISABLED) {
    return NextResponse.json({ error: 'Seed endpoint disabled.' }, { status: 403 })
  }

  if (!checkAuth(req)) {
    return NextResponse.json(
      { error: 'Unauthorized — Secret key tidak valid.' },
      { status: 401 }
    )
  }

  let body: { email?: string; password?: string; name?: string; forceReset?: boolean }
  try {
    body = await req.json()
  } catch {
    body = {}
  }

  const {
    email = 'admin@exliding.com',
    password = 'Admin@Exliding2024!',
    name = 'Super Admin',
    forceReset = false,
  } = body

  if (!email || !password) {
    return NextResponse.json(
      { error: 'email dan password diperlukan.' },
      { status: 400 }
    )
  }

  try {
    const payload = await getPayload({ config: configPromise })

    // Cek apakah user sudah ada
    const existing = await payload.find({
      collection: 'users',
      where: { email: { equals: email } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      const existingUser = existing.docs[0] as any

      if (!forceReset) {
        // Update role + status tanpa ubah password
        await payload.update({
          collection: 'users',
          id: existingUser.id,
          data: { role: 'admin', status: 'approved' },
        })
        return NextResponse.json({
          success: true,
          action: 'upgraded',
          message: `✅ User "${email}" diupgrade ke admin + approved.`,
          userId: existingUser.id,
          note: 'Password tidak diubah. Gunakan forceReset:true jika ingin reset password.',
        })
      }

      // forceReset = true: hapus dan buat ulang
      await payload.delete({ collection: 'users', id: existingUser.id })
    }

    // Buat user baru dengan role admin langsung
    const newAdmin = await payload.create({
      collection: 'users',
      data: {
        name,
        email,
        password,
        role: 'admin',
        status: 'approved',
        supabaseId: '',
      },
    })

    return NextResponse.json({
      success: true,
      action: existing.docs.length > 0 ? 'reset' : 'created',
      message: `✅ Admin "${email}" berhasil ${existing.docs.length > 0 ? 'direset' : 'dibuat'}!`,
      userId: newAdmin.id,
      warning: '⚠️ Segera ganti password setelah login pertama!',
    })
  } catch (error: any) {
    console.error('[seed-admin] Error:', error)
    return NextResponse.json(
      { error: error.message || 'Server error saat seed admin.' },
      { status: 500 }
    )
  }
}

// ─── DELETE: Remove a user from Payload ───────────────────────────────────────
export async function DELETE(req: NextRequest) {
  if (SEED_ENDPOINT_DISABLED) {
    return NextResponse.json({ error: 'Seed endpoint disabled.' }, { status: 403 })
  }

  if (!checkAuth(req)) {
    return NextResponse.json(
      { error: 'Unauthorized — Secret key tidak valid.' },
      { status: 401 }
    )
  }

  let body: { email?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Body JSON diperlukan: { email }' }, { status: 400 })
  }

  const { email } = body
  if (!email) {
    return NextResponse.json({ error: 'Field "email" diperlukan.' }, { status: 400 })
  }

  try {
    const payload = await getPayload({ config: configPromise })

    const found = await payload.find({
      collection: 'users',
      where: { email: { equals: email } },
      limit: 1,
    })

    if (found.docs.length === 0) {
      return NextResponse.json({
        success: false,
        message: `User "${email}" tidak ditemukan di Payload.`,
      })
    }

    const user = found.docs[0] as any
    await payload.delete({ collection: 'users', id: user.id })

    return NextResponse.json({
      success: true,
      message: `🗑️ User "${email}" berhasil dihapus dari Payload CMS.`,
      deletedId: user.id,
    })
  } catch (error: any) {
    console.error('[seed-admin] Delete error:', error)
    return NextResponse.json(
      { error: error.message || 'Server error.' },
      { status: 500 }
    )
  }
}
