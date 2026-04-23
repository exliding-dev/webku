import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

// POST /api/admin-set-password — Set password from invite token
export async function POST(req: NextRequest) {
  let body: { token?: string; password?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Body JSON tidak valid.' }, { status: 400 })
  }

  const { token, password } = body

  if (!token || !password) {
    return NextResponse.json({ error: 'Field "token" dan "password" diperlukan.' }, { status: 400 })
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: 'Password minimal 8 karakter.' },
      { status: 400 }
    )
  }

  try {
    const payload = await getPayload({ config: configPromise })

    // Find user by invite token
    const found = await payload.find({
      collection: 'users',
      where: { inviteToken: { equals: token } },
      limit: 1,
    })

    if (found.docs.length === 0) {
      return NextResponse.json(
        { error: 'Token tidak valid atau sudah digunakan.' },
        { status: 404 }
      )
    }

    const user = found.docs[0] as any

    // Check token expiry
    if (user.inviteTokenExpiry && new Date(user.inviteTokenExpiry) < new Date()) {
      return NextResponse.json(
        { error: 'Link undangan sudah kadaluarsa. Minta admin untuk mengirim ulang undangan.' },
        { status: 410 }
      )
    }

    // Update: set password + approve + clear token
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        password,
        status: 'approved',
        inviteToken: '',
        inviteTokenExpiry: null,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Password berhasil diatur. Silakan login ke /admin.',
    })
  } catch (error: any) {
    console.error('[admin-set-password] Error:', error)
    return NextResponse.json(
      { error: error.message || 'Server error.' },
      { status: 500 }
    )
  }
}

// GET /api/admin-set-password?token=xxx — Validate token only (for page pre-check)
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')

  if (!token) {
    return NextResponse.json({ valid: false, error: 'Token tidak ada.' }, { status: 400 })
  }

  try {
    const payload = await getPayload({ config: configPromise })

    const found = await payload.find({
      collection: 'users',
      where: { inviteToken: { equals: token } },
      limit: 1,
    })

    if (found.docs.length === 0) {
      return NextResponse.json({ valid: false, error: 'Token tidak valid.' })
    }

    const user = found.docs[0] as any
    if (user.inviteTokenExpiry && new Date(user.inviteTokenExpiry) < new Date()) {
      return NextResponse.json({ valid: false, error: 'Token sudah kadaluarsa.' })
    }

    return NextResponse.json({ valid: true, email: user.email })
  } catch (error: any) {
    return NextResponse.json({ valid: false, error: error.message }, { status: 500 })
  }
}
