import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Services Seed Endpoint
 *
 * POST /api/seed-services
 *   Header: x-seed-secret: <ADMIN_SECRET_KEY>
 *   → Upsert 3 Paket Utama (Starter, Pro, Bisnis) ke collection services
 *
 * GET /api/seed-services?key=<ADMIN_SECRET_KEY>
 *   → Cek status services yang sudah ada
 *
 * ⚠️  Disable di production: set DISABLE_SEED_ENDPOINT=true di .env
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

const PAKET_UTAMA = [
  {
    slug: 'starter',
    name: 'Paket Starter',
    price: 'Rp 1.000.000',
    period: '/sekali bayar',
    tagline: 'Paket Pemula Terbaik',
    features: [
      { feature: 'Gratis Domain .com atau .net selama 1 tahun' },
      { feature: 'Hosting RAM 1 GB & Storage 2 GB' },
      { feature: 'Free SSL untuk keamanan' },
      { feature: 'Backup Harian' },
      { feature: 'Desain Premium & Responsif' },
      { feature: '2 Artikel SEO-ready' },
      { feature: 'Setup Protection' },
      { feature: '1 Halaman (utama + tambahan)' },
    ],
    renewal: 'Rp600.000',
    notes: 'Tidak termasuk cPanel',
    cta: 'Pesan Sekarang',
    popular: false,
    waText: 'Halo%20saya%20tertarik%20Paket%20Starter',
    order: 1,
    isActive: true,
    hasDiscount: false,
  },
  {
    slug: 'pro',
    name: 'Paket Pro',
    price: 'Rp 1.500.000',
    period: '/sekali bayar',
    tagline: 'Paling populer untuk UMKM & bisnis lokal',
    features: [
      { feature: 'Gratis Domain .com atau .net selama 1 tahun' },
      { feature: 'Hosting SSD RAM 3 GB & Storage 5 GB' },
      { feature: 'Free SSL untuk keamanan' },
      { feature: 'Backup Harian' },
      { feature: 'Desain Premium & Responsif' },
      { feature: '4 Artikel SEO-ready' },
      { feature: 'Setup Protection' },
      { feature: '7 Halaman fleksibel' },
      { feature: 'free 1 tahun elementor pro' },
    ],
    renewal: 'Rp850.000',
    notes: 'Tidak termasuk cPanel',
    cta: 'Pesan Sekarang',
    popular: true,
    waText: 'Halo%20saya%20tertarik%20Paket%20Pro',
    order: 2,
    isActive: true,
    hasDiscount: false,
  },
  {
    slug: 'bisnis',
    name: 'Paket Bisnis',
    price: 'Rp 3.000.000',
    period: '/sekali bayar',
    tagline: 'Untuk bisnis yang siap scale up',
    features: [
      { feature: 'Gratis Domain .com atau .net selama 1 tahun' },
      { feature: 'Hosting SSD RAM 6 GB & Unlimited Storage' },
      { feature: 'Termasuk H Panel' },
      { feature: 'Free SSL untuk keamanan' },
      { feature: 'Backup Harian' },
      { feature: 'Desain Premium & Responsif' },
      { feature: 'free 2 tahun elementor pro' },
      { feature: '10 Halaman fleksibel' },
      { feature: '6 Artikel SEO-ready' },
      { feature: 'Setup Protection' },
    ],
    renewal: 'Rp1.500.000',
    notes: null,
    cta: 'Pesan Sekarang',
    popular: false,
    waText: 'Halo%20saya%20tertarik%20Paket%20Bisnis',
    order: 3,
    isActive: true,
    hasDiscount: false,
  },
]

// ─── GET: Status check ────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  if (SEED_ENDPOINT_DISABLED) {
    return NextResponse.json({ error: 'Seed endpoint disabled.' }, { status: 403 })
  }
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized — Secret key tidak valid.' }, { status: 401 })
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const data = await payload.find({ collection: 'services', limit: 20, sort: 'order' })

    return NextResponse.json({
      status: 'ok',
      totalServices: data.totalDocs,
      services: data.docs.map((s: any) => ({
        slug: s.slug,
        name: s.name,
        price: s.price,
        period: s.period,
        popular: s.popular,
        isActive: s.isActive,
        renewal: s.renewal,
        notes: s.notes,
      })),
      hint: data.totalDocs === 0
        ? 'Belum ada services. POST ke endpoint ini untuk seed.'
        : `${data.totalDocs} service ditemukan.`,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 })
  }
}

// ─── POST: Upsert all Paket Utama ────────────────────────────────────────────
export async function POST(req: NextRequest) {
  if (SEED_ENDPOINT_DISABLED) {
    return NextResponse.json({ error: 'Seed endpoint disabled.' }, { status: 403 })
  }
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized — Secret key tidak valid.' }, { status: 401 })
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const results: { slug: string; action: string }[] = []

    for (const service of PAKET_UTAMA) {
      const existing = await payload.find({
        collection: 'services',
        where: { slug: { equals: service.slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        const id = (existing.docs[0] as any).id
        await payload.update({ collection: 'services', id, data: service })
        results.push({ slug: service.slug, action: 'updated' })
      } else {
        await payload.create({ collection: 'services', data: service })
        results.push({ slug: service.slug, action: 'created' })
      }
    }

    return NextResponse.json({
      success: true,
      message: `✅ ${results.length} paket berhasil diseed ke Payload CMS!`,
      results,
    })
  } catch (error: any) {
    console.error('[seed-services] Error:', error)
    return NextResponse.json(
      { error: error.message || 'Server error saat seed services.' },
      { status: 500 }
    )
  }
}
