"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { adminRegisterAction, AdminAuthState } from "@/lib/actions/admin-auth.actions"

const initialState: AdminAuthState = {}

function getPasswordStrength(password: string) {
  if (!password) return { score: 0, label: "", color: "" }
  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  if (score <= 1) return { score: 1, label: "Lemah", color: "#ef4444" }
  if (score <= 2) return { score: 2, label: "Cukup", color: "#f59e0b" }
  if (score <= 3) return { score: 3, label: "Bagus", color: "#22c55e" }
  return { score: 4, label: "Kuat!", color: "#10b981" }
}

function AdminRegisterForm() {
  const [state, action, isPending] = useActionState(adminRegisterAction, initialState)
  const nameRef = useRef<HTMLInputElement>(null)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [mounted, setMounted] = useState(false)

  const strength = getPasswordStrength(password)
  const passwordsMatch = password === confirmPassword
  const confirmTouched = confirmPassword.length > 0

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => nameRef.current?.focus(), 400)
    return () => clearTimeout(timer)
  }, [])

  const inputStyle = {
    width: "100%", padding: "0.9rem 1rem 0.9rem 2.75rem", background: "#1a1a1a", border: "3px solid #333", color: "#fff", fontSize: "1rem", fontWeight: 600, outline: "none", boxSizing: "border-box" as const, transition: "border-color 0.2s"
  }

  const labelStyle = {
    fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#dc2626", fontFamily: "monospace", display: "block", marginBottom: "0.5rem"
  }

  return (
    <main style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "1.5rem", overflow: "hidden", backgroundColor: "#0a0a0a" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(to right, rgba(220,38,38,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(220,38,38,0.06) 1px, transparent 1px)", backgroundSize: "40px 40px", zIndex: 0, pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", top: 24, left: 24, width: 60, height: 60, border: "3px solid rgba(220,38,38,0.3)", borderRight: "none", borderBottom: "none", zIndex: 0, pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", bottom: 24, right: 24, width: 60, height: 60, border: "3px solid rgba(220,38,38,0.3)", borderLeft: "none", borderTop: "none", zIndex: 0, pointerEvents: "none" }} />

      <div className={mounted ? "auth-animate-in" : "auth-pre-animate"} style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 480, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {state.success ? (
          <div style={{ background: "#111", border: "4px solid #22c55e", boxShadow: "12px 12px 0px 0px #22c55e", padding: "2.5rem 2rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1.25rem" }}>
            <div style={{ width: 80, height: 80, background: "#22c55e", border: "4px solid #4ade80", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem" }}>✅</div>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "1.5rem", fontWeight: 900, textTransform: "uppercase" as const, color: "#22c55e", margin: 0 }}>PENDAFTARAN BERHASIL!</h1>
            <p style={{ color: "#ccc", fontSize: "0.9rem", lineHeight: 1.5 }}>
              Akun Anda telah dibuat dan menunggu <strong style={{ color: "#f59e0b" }}>persetujuan super-admin</strong> sebelum bisa mengakses dashboard.
            </p>
            <Link href="/admin/login" style={{ display: "block", width: "100%", padding: "0.9rem", background: "#dc2626", color: "#fff", textAlign: "center", textDecoration: "none", fontWeight: 800, textTransform: "uppercase" as const, letterSpacing: "0.1em", border: "3px solid #ef4444", boxShadow: "4px 4px 0px 0px #ef4444" }}>
              ← KEMBALI KE LOGIN
            </Link>
          </div>
        ) : (
          <>
            <div style={{ background: "rgba(220,38,38,0.12)", border: "2px solid #dc2626", padding: "0.6rem 1rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <span>🔐</span>
              <span style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#ef4444", fontFamily: "monospace" }}>
                ADMIN REGISTRATION — Menunggu persetujuan super-admin
              </span>
            </div>

            <div style={{ background: "#111", border: "4px solid #dc2626", boxShadow: "12px 12px 0px 0px #dc2626", overflow: "hidden" }}>
              <div style={{ background: "#dc2626", padding: "1rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", fontFamily: "Syne, sans-serif", fontWeight: 900, fontSize: "1.25rem", letterSpacing: "-0.05em" }}>
                  <span style={{ background: "#0a0a0a", color: "#dc2626", padding: "0.2rem 0.4rem", marginRight: "-2px" }}>EX</span>
                  <span style={{ background: "#fff", color: "#0a0a0a", padding: "0.2rem 0.5rem" }}>LIDING</span>
                </Link>
                <span style={{ fontSize: "0.63rem", fontWeight: 800, fontFamily: "monospace", letterSpacing: "0.1em", background: "rgba(0,0,0,0.3)", color: "#fff", padding: "0.3rem 0.7rem", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 99 }}>
                  DAFTAR ADMIN
                </span>
              </div>

              <div style={{ padding: "2rem" }}>
                <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "2rem", fontWeight: 900, textTransform: "uppercase" as const, marginBottom: "0.25rem", color: "#fff", lineHeight: 1.1 }}>DAFTAR ADMIN</h1>
                <p style={{ fontSize: "0.88rem", color: "#777", marginBottom: "2rem", fontWeight: 500, lineHeight: 1.5, margin: "0 0 2rem" }}>
                  Buat akun admin baru dengan email dan password.
                </p>

                {state.error && (
                  <div role="alert" style={{ display: "flex", gap: "0.75rem", padding: "1rem", marginBottom: "1.5rem", border: "3px solid #dc2626", borderLeft: "6px solid #dc2626", background: "rgba(220,38,38,0.1)", boxShadow: "4px 4px 0px 0px #dc2626", fontSize: "0.88rem", fontWeight: 600, color: "#fca5a5" }}>
                    <span style={{ fontWeight: 900, fontSize: "1.1rem", flexShrink: 0 }}>!</span>
                    <span>{state.error}</span>
                  </div>
                )}

                <form action={action} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div className="auth-stagger-1">
                    <label htmlFor="admin-reg-name" style={labelStyle}>NAMA LENGKAP</label>
                    <div style={{ position: "relative" }}>
                      <input ref={nameRef} id="admin-reg-name" name="name" type="text" placeholder="Nama lengkap Anda" autoComplete="name" required disabled={isPending} style={inputStyle} onFocus={(e) => e.target.style.borderColor = "#dc2626"} onBlur={(e) => e.target.style.borderColor = "#333"} />
                      <span style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "#dc2626", fontSize: "1rem" }}>👤</span>
                    </div>
                  </div>

                  <div className="auth-stagger-2">
                    <label htmlFor="admin-reg-email" style={labelStyle}>EMAIL ADMIN</label>
                    <div style={{ position: "relative" }}>
                      <input id="admin-reg-email" name="email" type="email" placeholder="admin@exliding.com" autoComplete="email" required disabled={isPending} style={inputStyle} onFocus={(e) => e.target.style.borderColor = "#dc2626"} onBlur={(e) => e.target.style.borderColor = "#333"} />
                      <span style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "#dc2626", fontSize: "1rem" }}>@</span>
                    </div>
                  </div>

                  <div className="auth-stagger-3">
                    <label htmlFor="admin-reg-password" style={labelStyle}>PASSWORD BARU</label>
                    <div style={{ position: "relative" }}>
                      <input id="admin-reg-password" name="password" type={showPassword ? "text" : "password"} placeholder="Min. 8 karakter" autoComplete="new-password" required disabled={isPending} value={password} onChange={(e) => setPassword(e.target.value)} style={{...inputStyle, paddingRight: "3rem"}} onFocus={(e) => e.target.style.borderColor = "#dc2626"} onBlur={(e) => e.target.style.borderColor = "#333"} />
                      <span style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "#dc2626", fontSize: "1rem" }}>🔒</span>
                      <button type="button" onClick={() => setShowPassword(!showPassword)} tabIndex={-1} style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#888" }}>{showPassword ? "🙈" : "👁"}</button>
                    </div>
                    {password.length > 0 && (
                      <div style={{ display: "flex", gap: "4px", marginTop: "0.5rem" }}>
                        {[1, 2, 3, 4].map((l) => (
                          <div key={l} style={{ flex: 1, height: 4, background: l <= strength.score ? strength.color : "#333" }} />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="auth-stagger-4">
                    <label htmlFor="admin-reg-confirm" style={labelStyle}>ULANGI PASSWORD</label>
                    <div style={{ position: "relative" }}>
                      <input id="admin-reg-confirm" name="confirmPassword" type={showConfirm ? "text" : "password"} placeholder="Ulangi password baru" autoComplete="new-password" required disabled={isPending} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{...inputStyle, paddingRight: "3rem", borderColor: confirmTouched && !passwordsMatch ? "#ef4444" : "#333"}} onFocus={(e) => e.target.style.borderColor = "#dc2626"} onBlur={(e) => e.target.style.borderColor = confirmTouched && !passwordsMatch ? "#ef4444" : "#333"} />
                      <span style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "#dc2626", fontSize: "1rem" }}>✔</span>
                      <button type="button" onClick={() => setShowConfirm(!showConfirm)} tabIndex={-1} style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#888" }}>{showConfirm ? "🙈" : "👁"}</button>
                    </div>
                  </div>

                  <button id="admin-register-btn" type="submit" disabled={isPending} className="auth-stagger-5" style={{ padding: "1rem 1.5rem", background: isPending ? "#1f1f1f" : "#dc2626", color: isPending ? "#555" : "#fff", border: `3px solid ${isPending ? "#333" : "#ef4444"}`, boxShadow: isPending ? "none" : "4px 4px 0px 0px #ef4444", fontSize: "1rem", fontWeight: 800, textTransform: "uppercase" as const, letterSpacing: "0.1em", cursor: isPending ? "not-allowed" : "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {isPending ? "MENDAFTARKAN..." : "DAFTAR SEBAGAI ADMIN →"}
                  </button>
                </form>

                <div className="auth-stagger-5" style={{ marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: "2px solid #1e1e1e", textAlign: "center" }}>
                  <Link href="/admin/login" style={{ fontSize: "0.88rem", color: "#666", textDecoration: "none", fontWeight: 600 }} onMouseEnter={(e) => e.currentTarget.style.color = "#dc2626"} onMouseLeave={(e) => e.currentTarget.style.color = "#666"}>
                    ← Sudah punya akun? <strong style={{ color: "#dc2626" }}>Login sekarang</strong>
                  </Link>
                </div>
              </div>
            </div>
            <p style={{ textAlign: "center", fontSize: "0.72rem", color: "#333", fontFamily: "monospace", letterSpacing: "0.05em" }}> © {new Date().getFullYear()} Exliding — Admin Portal v1.0 </p>
          </>
        )}
      </div>
    </main>
  )
}

export default function AdminRegisterPage() {
  return (
    <Suspense>
      <AdminRegisterForm />
    </Suspense>
  )
}
