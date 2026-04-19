"use server"

import { createClient } from "@/lib/supabase/server"
import { getPayload } from "payload"
import configPromise from "@payload-config"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export type AdminAuthState = {
  error?: string
  success?: string
}

// ─── ADMIN REGISTER (Email + Password) ───────────────────────────────────────────────────
export async function adminRegisterAction(
  _prevState: AdminAuthState,
  formData: FormData
): Promise<AdminAuthState> {
  const name = (formData.get("name") as string)?.trim()
  const email = (formData.get("email") as string)?.toLowerCase().trim()
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  if (!name || !email || !password || !confirmPassword) {
    return { error: "Semua field harus diisi." }
  }

  if (password !== confirmPassword) {
    return { error: "Password dan konfirmasi tidak cocok." }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return { error: "Format email tidak valid." }

  try {
    const payload = await getPayload({ config: configPromise })

    const existingPayload = await payload.find({
      collection: "users",
      where: { email: { equals: email } },
      limit: 1,
    })

    if (existingPayload.docs.length > 0) {
      return { error: "Email sudah terdaftar." }
    }

    const supabase = await createClient()

    // 1. Register Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    })

    // Supabase returns an error if already registered but not confirmed in some cases,
    // or just signs them up if it's new.
    if (authError) {
      if (authError.message.includes("already registered")) {
        return { error: "Email sudah terdaftar di sistem Auth." }
      }
      console.error("Supabase error:", authError)
      return { error: authError.message }
    }

    const supabaseId = authData.user?.id || ""

    // 2. Buat Payload User (status pending, role user by default - superadmin will upgrade)
    await payload.create({
      collection: "users",
      data: {
        name,
        email,
        password, // Disinkronkan dengan Supabase
        role: "user",
        status: "pending",
        supabaseId,
      },
    })

    return {
      success: `🎉 Pendaftaran berhasil! Silakan periksa email Anda (${email}) untuk verifikasi. Akun Anda masih menunggu persetujuan super-admin.`,
    }
  } catch (error) {
    console.error("Admin register error:", error)
    return { error: "Terjadi kesalahan server saat registrasi. Coba lagi nanti." }
  }
}

// ─── ADMIN LOGIN (Email + Password) ──────────────────────────────────────────
export async function adminLoginAction(
  _prevState: AdminAuthState,
  formData: FormData
): Promise<AdminAuthState> {
  const email = (formData.get("email") as string)?.toLowerCase().trim()
  const password = formData.get("password") as string

  if (!email || !password) return { error: "Email dan password harus diisi." }

  try {
    const payload = await getPayload({ config: configPromise })

    // 1. Verifikasi email ada di Payload + cek role/status
    const found = await payload.find({
      collection: "users",
      where: { email: { equals: email } },
      limit: 1,
    })

    if (found.docs.length === 0) {
      return { error: "Email tidak terdaftar sebagai admin." }
    }

    const payloadUser = found.docs[0] as any

    // DEBUG: log exactly what Payload returns for this user
    console.log(`[AdminLogin] User found: email=${payloadUser.email}, role=${JSON.stringify(payloadUser.role)}, status=${JSON.stringify(payloadUser.status)}`)

    if (payloadUser.role !== "admin") {
      return { error: `Akun ini tidak memiliki hak akses admin. (role saat ini: "${payloadUser.role || 'tidak ada'}") — Pastikan role sudah diubah ke "admin" di Payload CMS dashboard.` }
    }
    if (payloadUser.status === "pending") {
      return {
        error: "Akun Anda masih menunggu persetujuan super-admin. Harap bersabar.",
      }
    }
    if (payloadUser.status === "suspended") {
      return { error: "Akun Anda telah dinonaktifkan. Hubungi super-admin." }
    }
    if (payloadUser.status !== "approved") {
      return { error: `Akun belum disetujui. (status saat ini: "${payloadUser.status || 'tidak ada'}") — Ubah status ke "approved" di Payload CMS dashboard.` }
    }

    // 2. Sinkron Login dengan Payload untuk dapatkan Payload Token
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    const payloadRes = await fetch(`${siteUrl}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    })

    const payloadData = await payloadRes.json()

    if (!payloadRes.ok || payloadData.errors) {
      return { error: "Email atau password tidak sesuai." }
    }

    // 3. Login manual ke Supabase untuk mendapatkan session Supabase 
    // jika ingin dashboard admin sync sessionnya (opsional, tapi bagus untuk storage dll)
    const supabase = await createClient()
    await supabase.auth.signInWithPassword({ email, password })

    if (payloadData.token) {
      const cookieStore = await cookies()
      cookieStore.set("payload-token", payloadData.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      })
    }
  } catch (error) {
    console.error("Admin login error:", error)
    return { error: "Terjadi kesalahan server. Coba lagi nanti." }
  }

  redirect("/admin")
}
