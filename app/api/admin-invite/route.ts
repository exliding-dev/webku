import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { sendAdminInviteEmail } from '@/lib/email'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

function checkAuth(req: NextRequest): boolean {
  const secret = req.headers.get('x-seed-secret') || ''
  const expectedSecret = process.env.ADMIN_SECRET_KEY || ''
  return secret === expectedSecret && secret !== ''
}

// POST /api/admin-invite — Invite a new admin by email
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  let body: { email?: string; name?: string; invitedBy?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Body JSON tidak valid.' }, { status: 400 })
  }

  const { email, name, invitedBy } = body

  if (!email) {
    return NextResponse.json({ error: 'Field "email" diperlukan.' }, { status: 400 })
  }

  try {
    const payload = await getPayload({ config: configPromise })

    // Check if email already exists
    const existing = await payload.find({
      collection: 'users',
      where: { email: { equals: email } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      return NextResponse.json(
        { error: `Email "${email}" sudah terdaftar sebagai admin.` },
        { status: 409 }
      )
    }

    // Generate secure invite token
    const rawToken = randomBytes(32).toString('hex')
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Create user with no password yet (placeholder)
    const tempPassword = randomBytes(32).toString('hex') // random unguessable temp password
    const newUser = await payload.create({
      collection: 'users',
      data: {
        email,
        name: name || '',
        password: tempPassword,
        role: 'admin',
        status: 'pending',
        inviteToken: rawToken,
        inviteTokenExpiry: tokenExpiry.toISOString(),
        supabaseId: '',
      },
    })

    // Send invite email
    const inviteUrl = `${SITE_URL}/admin/set-password?token=${rawToken}`
    const emailResult = await sendAdminInviteEmail(email, inviteUrl, invitedBy)

    if (!emailResult.success) {
      console.error('[admin-invite] Email failed to send:', emailResult.error)
      // Don't fail the whole request — user is created, admin can share the link manually
    }

    return NextResponse.json({
      success: true,
      message: `✅ Undangan admin berhasil dikirim ke "${email}".`,
      userId: newUser.id,
      emailSent: emailResult.success,
      // Return invite URL in dev so admin can share it manually
      ...(process.env.NODE_ENV === 'development' ? { inviteUrl } : {}),
    })
  } catch (error: any) {
    console.error('[admin-invite] Error:', error)
    return NextResponse.json(
      { error: error.message || 'Server error.' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin-invite — Remove an admin
export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  let body: { email?: string; id?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Body JSON tidak valid.' }, { status: 400 })
  }

  const { email, id } = body
  if (!email && !id) {
    return NextResponse.json({ error: 'Field "email" atau "id" diperlukan.' }, { status: 400 })
  }

  try {
    const payload = await getPayload({ config: configPromise })

    let targetId = id
    if (!targetId && email) {
      const found = await payload.find({
        collection: 'users',
        where: { email: { equals: email } },
        limit: 1,
      })
      if (found.docs.length === 0) {
        return NextResponse.json({ error: `User "${email}" tidak ditemukan.` }, { status: 404 })
      }
      targetId = (found.docs[0] as any).id
    }

    await payload.delete({ collection: 'users', id: targetId! })

    return NextResponse.json({
      success: true,
      message: `🗑️ Admin berhasil dihapus.`,
    })
  } catch (error: any) {
    console.error('[admin-invite] Delete error:', error)
    return NextResponse.json(
      { error: error.message || 'Server error.' },
      { status: 500 }
    )
  }
}
