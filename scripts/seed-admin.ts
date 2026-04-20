/**
 * Seed Script: Create/Reset First Admin User
 *
 * REQUIRES: dev server running → npm run dev
 *
 * Usage:
 *   npm run seed:admin
 * OR
 *   npx tsx scripts/seed-admin.ts [email] [password] [name]
 *
 * Examples:
 *   npx tsx scripts/seed-admin.ts
 *   npx tsx scripts/seed-admin.ts myadmin@email.com MyPass123! "My Name"
 *   npx tsx scripts/seed-admin.ts myadmin@email.com MyPass123! "My Name" reset
 */

import 'dotenv/config'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const SECRET = process.env.ADMIN_SECRET_KEY || 'exliding-admin-2024'

// ─── Parse CLI args ────────────────────────────────────────────────────────────
const [, , argEmail, argPassword, argName, argReset] = process.argv
const forceReset = argReset === 'reset'

const config = {
  email: argEmail || 'admin@exliding.com',
  password: argPassword || 'Admin@Exliding2024!',
  name: argName || 'Super Admin',
  forceReset,
}
// ──────────────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n╔═══════════════════════════════════════╗')
  console.log('║  🚀 Payload CMS — Admin Seed Script   ║')
  console.log('╚═══════════════════════════════════════╝')
  console.log(`\n  Server : ${SITE_URL}`)
  console.log(`  Email  : ${config.email}`)
  console.log(`  Name   : ${config.name}`)
  console.log(`  Reset  : ${forceReset ? 'YES (hapus + buat ulang)' : 'NO (upgrade jika perlu)'}`)
  console.log('')

  const url = `${SITE_URL}/api/seed-admin`

  try {
    // Check status first
    console.log('📋 Mengecek status Payload users...')
    const statusRes = await fetch(`${url}?key=${SECRET}`)
    if (statusRes.ok) {
      const status = await statusRes.json()
      if (status.totalUsers !== undefined) {
        console.log(`   Total users : ${status.totalUsers}`)
        console.log(`   Total admins: ${status.admins?.length || 0}`)
        if (status.admins?.length > 0) {
          console.log(`   Admins:`)
          status.admins.forEach((a: any) =>
            console.log(`     - ${a.email} [${a.role}/${a.status}]`)
          )
        }
      }
    }

    console.log('\n🔧 Membuat/memperbarui admin...')
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-seed-secret': SECRET,
      },
      body: JSON.stringify(config),
    })

    const data = await res.json()

    if (!res.ok) {
      console.error(`\n❌ Error ${res.status}:`, data.error || JSON.stringify(data))
      process.exit(1)
    }

    console.log(`\n${data.message}`)
    if (data.warning) console.log(`⚠️  ${data.warning}`)
    if (data.note) console.log(`ℹ️  ${data.note}`)

    console.log('\n╔═══════════════════════════════════════╗')
    console.log('║  ✅ Selesai! Login di /admin/login     ║')
    console.log('╚═══════════════════════════════════════╝')
    console.log(`  Email   : ${config.email}`)
    console.log(`  Password: (yang Anda set)`)
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
      console.error('   3. Jalankan lagi: npm run seed:admin')
    } else {
      console.error('\n❌ Error:', err.message || err)
    }
    process.exit(1)
  }
}

main()
