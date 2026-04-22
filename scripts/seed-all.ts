/**
 * Seed Script: Insert ALL data (Services, Products, Portfolios, Templates)
 * into Payload CMS via the /api/seed-all endpoint.
 *
 * REQUIRES: dev server running → npm run dev
 *
 * Usage:
 *   npm run seed:all
 * OR
 *   npx tsx scripts/seed-all.ts
 */

import 'dotenv/config'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const SECRET = process.env.ADMIN_SECRET_KEY || ''

async function seedAll() {
  console.log('')
  console.log('╔══════════════════════════════════════════════════╗')
  console.log('║  🌱 Payload CMS — Seed Semua Data               ║')
  console.log('║  Services, Products, Portfolios, Templates      ║')
  console.log('╚══════════════════════════════════════════════════╝')
  console.log(`\n  Server : ${SITE_URL}`)
  console.log('')

  const url = `${SITE_URL}/api/seed-all`

  try {
    // 1. Check status first
    console.log('📋 Mengecek status collections...')
    const statusRes = await fetch(`${url}?key=${SECRET}`)
    if (statusRes.ok) {
      const status = await statusRes.json()
      if (status.collections) {
        console.log('   Current data:')
        Object.entries(status.collections).forEach(([key, count]) => {
          console.log(`   - ${key}: ${count} items`)
        })
      }
    } else {
      const errData = await statusRes.json().catch(() => ({}))
      console.warn(`   ⚠️  Status check failed: ${errData.error || statusRes.status}`)
    }

    // 2. Run seed
    console.log('\n🔧 Seeding semua data ke Payload CMS...')
    console.log('   (Ini mungkin membutuhkan beberapa detik...)\n')

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-seed-secret': SECRET,
      },
    })

    const data = await res.json()

    if (!res.ok) {
      console.error(`\n❌ Error ${res.status}:`, data.error || JSON.stringify(data))
      process.exit(1)
    }

    // 3. Display results
    console.log(`\n${data.message}`)
    console.log('')

    if (data.results) {
      for (const [collection, items] of Object.entries(data.results)) {
        console.log(`  📦 ${collection}:`)
        ;(items as any[]).forEach((r: any) => {
          const icon = r.action === 'created' ? '✨' : r.action === 'updated' ? '♻️ ' : '❌'
          console.log(`     ${icon} ${r.slug}: ${r.action}`)
        })
        console.log('')
      }
    }

    console.log('╔══════════════════════════════════════════════════╗')
    console.log('║  ✅ Selesai! Cek hasilnya di:                   ║')
    console.log('║                                                  ║')
    console.log('║  🔧 Admin:    /admin                             ║')
    console.log('║  🏠 Beranda:  / (services & portfolio)           ║')
    console.log('║  📦 Paket:    /paket (monthly packages)         ║')
    console.log('║  🎨 Template: /template                         ║')
    console.log('╚══════════════════════════════════════════════════╝')
    console.log('')
  } catch (err: any) {
    if (
      err.code === 'ECONNREFUSED' ||
      err.cause?.code === 'ECONNREFUSED' ||
      err.message?.includes('fetch failed')
    ) {
      console.error('\n❌ Server tidak berjalan!')
      console.error('   1. Jalankan: npm run dev')
      console.error('   2. Tunggu sampai server siap')
      console.error('   3. Jalankan lagi: npm run seed:all')
    } else {
      console.error('\n❌ Error:', err.message || err)
    }
    process.exit(1)
  }
}

seedAll()
