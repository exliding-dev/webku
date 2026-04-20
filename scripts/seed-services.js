/**
 * Seed Script: Insert Paket Utama (Starter, Pro, Bisnis) ke Payload CMS
 *
 * REQUIRES: dev server running → npm run dev
 *
 * Usage:
 *   npm run seed:services
 * OR
 *   node scripts/seed-services.js
 */

import 'dotenv/config'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const SECRET = process.env.ADMIN_SECRET_KEY || ''

async function seedServices() {
  console.log('\n╔══════════════════════════════════════════╗')
  console.log('║  🌱 Payload CMS — Seed Paket Utama      ║')
  console.log('╚══════════════════════════════════════════╝')
  console.log(`\n  Server : ${SITE_URL}`)
  console.log('')

  const url = `${SITE_URL}/api/seed-services`

  try {
    // Check status first
    console.log('📋 Mengecek status services...')
    const statusRes = await fetch(`${url}?key=${SECRET}`)
    if (statusRes.ok) {
      const status = await statusRes.json()
      console.log(`   Total services saat ini: ${status.totalServices ?? '?'}`)
      if (status.services?.length > 0) {
        status.services.forEach((s) => console.log(`   - ${s.name} (${s.price})`))
      }
    }

    console.log('\n🔧 Menyeed Paket Starter, Pro, Bisnis...')
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

    console.log(`\n${data.message}`)
    if (data.results) {
      data.results.forEach((r) => console.log(`  • ${r.slug}: ${r.action}`))
    }

    console.log('\n╔══════════════════════════════════════════╗')
    console.log('║  ✅ Selesai! Cek di /admin → Services   ║')
    console.log('╚══════════════════════════════════════════╝\n')
  } catch (err) {
    if (
      err.code === 'ECONNREFUSED' ||
      err.cause?.code === 'ECONNREFUSED' ||
      err.message?.includes('fetch failed')
    ) {
      console.error('\n❌ Server tidak berjalan!')
      console.error('   1. Jalankan: npm run dev')
      console.error('   2. Tunggu sampai server siap')
      console.error('   3. Jalankan lagi: npm run seed:services')
    } else {
      console.error('\n❌ Error:', err.message || err)
    }
    process.exit(1)
  }
}

seedServices()
