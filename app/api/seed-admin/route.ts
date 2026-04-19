import { getPayload } from "payload"
import configPromise from "@payload-config"
import { NextRequest, NextResponse } from "next/server"

/**
 * Seed endpoint untuk membuat super-admin pertama.
 * Panggil: GET /api/seed-admin?key=<ADMIN_SECRET_KEY>
 *
 * PERINGATAN: Hapus atau disable route ini setelah produksi!
 */
export async function GET(req: NextRequest) {
  // Proteksi dengan secret key
  const secretKey = req.nextUrl.searchParams.get("key")
  if (!secretKey || secretKey !== process.env.ADMIN_SECRET_KEY) {
    return NextResponse.json(
      { error: "Unauthorized — Secret key tidak valid." },
      { status: 401 }
    )
  }

  try {
    const payload = await getPayload({ config: configPromise })

    // Cek apakah admin sudah ada
    const existing = await payload.find({
      collection: "users",
      where: { role: { equals: "admin" } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      return NextResponse.json({
        message: "Super-admin sudah ada. Tidak ada yang dibuat.",
        existingAdmin: existing.docs[0].email,
      })
    }

    // Buat super-admin pertama
    const admin = await payload.create({
      collection: "users",
      data: {
        name: "Super Admin",
        email: "admin@exliding.com",
        password: "Admin@Exliding2024!",
        role: "admin",
        status: "approved",
        supabaseId: "",
      },
    })

    return NextResponse.json({
      success: true,
      message: "✅ Super-admin berhasil dibuat!",
      email: admin.email,
      tempPassword: "Admin@Exliding2024!",
      important: "⚠️ SEGERA ganti password setelah login pertama! Jangan biarkan password default ini aktif.",
    })
  } catch (error: any) {
    console.error("Seed admin error:", error)
    return NextResponse.json(
      { error: error.message || "Terjadi kesalahan saat membuat admin." },
      { status: 500 }
    )
  }
}
