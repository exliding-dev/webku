"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

// ─── REGISTER ────────────────────────────────────────────────────────────────

export type RegisterState = {
  error?: string
  success?: string
}

export async function registerAction(
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  // Validasi
  if (!name || !email || !password || !confirmPassword) {
    return { error: "Semua field harus diisi." }
  }
  if (password.length < 8) {
    return { error: "Password minimal 8 karakter." }
  }
  if (password !== confirmPassword) {
    return { error: "Password dan konfirmasi password tidak cocok." }
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { error: "Format email tidak valid." }
  }

  try {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase().trim(),
      password,
      options: {
        data: {
          name: name.trim(),
        },
      },
    })

    if (error) {
      // Handle specific Supabase error messages
      if (error.message.includes("already registered")) {
        return { error: "Email sudah terdaftar. Jika Anda sebelumnya mendaftar via Google, silakan Masuk dengan Google." }
      }
      return { error: error.message }
    }

    // Check if email confirmation is required
    if (data.user && !data.session) {
      return {
        success: "Akun berhasil dibuat! Silakan cek email Anda untuk verifikasi.",
      }
    }

    return { success: "Akun berhasil dibuat! Silakan login sekarang." }
  } catch (error) {
    console.error("Register error:", error)
    return { error: "Terjadi kesalahan. Coba lagi nanti." }
  }
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────

export type LoginState = {
  error?: string
}

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email dan password harus diisi." }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: email.toLowerCase().trim(),
    password,
  })

  if (error) {
    if (error.message.includes("Invalid login credentials")) {
      return { error: "Email/password salah, atau akun terdaftar via Google. Coba Masuk dengan Google jika Anda pernah menggunakannya." }
    }
    if (error.message.includes("Email not confirmed")) {
      return { error: "Email belum diverifikasi. Silakan cek inbox Anda." }
    }
    return { error: "Terjadi kesalahan saat login." }
  }

  redirect("/client")
}

// ─── LOGOUT ──────────────────────────────────────────────────────────────────

export async function logoutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/login")
}

// ─── FORGOT PASSWORD ─────────────────────────────────────────────────────────

export type ForgotPasswordState = {
  error?: string
  success?: string
}

export async function forgotPasswordAction(
  _prevState: ForgotPasswordState,
  formData: FormData
): Promise<ForgotPasswordState> {
  const email = formData.get("email") as string

  if (!email) {
    return { error: "Email harus diisi." }
  }

  try {
    const supabase = await createClient()

    const { error } = await supabase.auth.resetPasswordForEmail(
      email.toLowerCase().trim(),
      {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback?next=/reset-password`,
      }
    )

    if (error) {
      console.error("Forgot password error:", error)
      // Always return success for security (don't reveal if email exists)
      return {
        success: "Jika email terdaftar, link reset password telah dikirim ke email Anda.",
      }
    }

    return {
      success: "Jika email terdaftar, link reset password telah dikirim ke email Anda.",
    }
  } catch (error) {
    console.error("Forgot password error:", error)
    return { error: "Terjadi kesalahan. Coba lagi nanti." }
  }
}

// ─── RESET PASSWORD ───────────────────────────────────────────────────────────

export type ResetPasswordState = {
  error?: string
  success?: string
}

export async function resetPasswordAction(
  _prevState: ResetPasswordState,
  formData: FormData
): Promise<ResetPasswordState> {
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  if (!password || !confirmPassword) {
    return { error: "Semua field harus diisi." }
  }
  if (password.length < 8) {
    return { error: "Password minimal 8 karakter." }
  }
  if (password !== confirmPassword) {
    return { error: "Password dan konfirmasi tidak cocok." }
  }

  try {
    const supabase = await createClient()

    const { error } = await supabase.auth.updateUser({
      password,
    })

    if (error) {
      if (error.message.includes("should be different")) {
        return { error: "Password baru harus berbeda dari password lama." }
      }
      return { error: error.message }
    }

    return { success: "Password berhasil diubah! Silakan login." }
  } catch (error) {
    console.error("Reset password error:", error)
    return { error: "Terjadi kesalahan. Coba lagi nanti." }
  }
}
