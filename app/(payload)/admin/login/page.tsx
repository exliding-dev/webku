"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { adminLoginAction, AdminAuthState } from "@/lib/actions/admin-auth.actions"

const initialState: AdminAuthState = {}

function AdminLoginForm() {
  const [state, action, isPending] = useActionState(adminLoginAction, initialState)
  const emailRef = useRef<HTMLInputElement>(null)
  const [mounted, setMounted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const searchParams = useSearchParams()
  const errorCode = searchParams.get("error")
  const urlError = errorCode === "session_expired" ? "Sesi berakhir. Silakan login kembali." : null

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => emailRef.current?.focus(), 400)
    return () => clearTimeout(timer)
  }, [])

  const activeError = state.error || urlError

  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        overflow: "hidden",
        backgroundColor: "#0a0a0a",
      }}
    >
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(to right, rgba(220,38,38,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(220,38,38,0.07) 1px, transparent 1px)", backgroundSize: "40px 40px", zIndex: 0, pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", top: 24, left: 24, width: 60, height: 60, border: "3px solid rgba(220,38,38,0.35)", borderRight: "none", borderBottom: "none", zIndex: 0, pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", bottom: 24, right: 24, width: 60, height: 60, border: "3px solid rgba(220,38,38,0.35)", borderLeft: "none", borderTop: "none", zIndex: 0, pointerEvents: "none" }} />

      <div
        className={mounted ? "auth-animate-in" : "auth-pre-animate"}
        style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 460, display: "flex", flexDirection: "column", gap: "1.25rem" }}
      >
        <div style={{ background: "rgba(220,38,38,0.12)", border: "2px solid #dc2626", padding: "0.6rem 1rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span style={{ fontSize: "1rem" }}>⚠️</span>
          <span style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#ef4444", fontFamily: "monospace" }}>
            AREA TERBATAS — Hanya untuk personel yang berwenang
          </span>
        </div>

        <div style={{ background: "#111", border: "4px solid #dc2626", boxShadow: "12px 12px 0px 0px #dc2626", overflow: "hidden" }}>
          <div style={{ background: "#dc2626", padding: "1rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", fontFamily: "Syne, sans-serif", fontWeight: 900, fontSize: "1.25rem", letterSpacing: "-0.05em" }}>
              <span style={{ background: "#0a0a0a", color: "#dc2626", padding: "0.2rem 0.4rem", marginRight: "-2px" }}>EX</span>
              <span style={{ background: "#fff", color: "#0a0a0a", padding: "0.2rem 0.5rem" }}>LIDING</span>
            </Link>
            <span style={{ fontSize: "0.63rem", fontWeight: 800, fontFamily: "monospace", letterSpacing: "0.1em", background: "rgba(0,0,0,0.3)", color: "#fff", padding: "0.3rem 0.7rem", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 99 }}>
              ADMIN PORTAL
            </span>
          </div>

          <div style={{ padding: "2rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 60, height: 60, background: "#dc2626", border: "3px solid #ef4444", boxShadow: "4px 4px 0px 0px #ef4444", fontSize: "1.5rem", borderRadius: "50%", marginBottom: "1.5rem" }}>
              🛡️
            </div>

            <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "2.25rem", fontWeight: 900, textTransform: "uppercase" as const, marginBottom: "0.25rem", color: "#fff", lineHeight: 1.1 }}>
              ADMIN LOGIN
            </h1>
            <p style={{ fontSize: "0.88rem", color: "#777", marginBottom: "1.75rem", fontWeight: 500, lineHeight: 1.5, margin: "0 0 1.75rem" }}>
              Masukkan kredensial admin Anda. Akses hanya untuk akun yang telah disetujui.
            </p>

            {activeError && (
              <div role="alert" style={{ display: "flex", gap: "0.75rem", padding: "1rem", marginBottom: "1.5rem", border: "3px solid #dc2626", borderLeft: "6px solid #dc2626", background: "rgba(220,38,38,0.1)", boxShadow: "4px 4px 0px 0px #dc2626", fontSize: "0.88rem", fontWeight: 600, color: "#fca5a5", animation: "alertSlideIn 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
                <span style={{ fontWeight: 900, fontSize: "1.1rem", flexShrink: 0 }}>!</span>
                <span>{activeError}</span>
              </div>
            )}

            <form action={action} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div className="auth-stagger-1" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label htmlFor="admin-email" style={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#dc2626", fontFamily: "monospace" }}> EMAIL ADMIN </label>
                <div style={{ position: "relative" }}>
                  <input
                    ref={emailRef} id="admin-email" name="email" type="email" placeholder="admin@exliding.com" autoComplete="email" required disabled={isPending}
                    style={{ width: "100%", padding: "0.9rem 1rem 0.9rem 2.75rem", background: "#1a1a1a", border: "3px solid #333", color: "#fff", fontSize: "1rem", fontWeight: 600, outline: "none", boxSizing: "border-box" as const, transition: "border-color 0.2s" }}
                    onFocus={(e) => (e.target.style.borderColor = "#dc2626")} onBlur={(e) => (e.target.style.borderColor = "#333")}
                  />
                  <span aria-hidden="true" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "#dc2626", fontSize: "1.1rem" }}>@</span>
                </div>
              </div>

              <div className="auth-stagger-2" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label htmlFor="admin-password" style={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#dc2626", fontFamily: "monospace" }}> PASSWORD </label>
                <div style={{ position: "relative" }}>
                  <input
                    id="admin-password" name="password" type={showPassword ? "text" : "password"} placeholder="••••••••" autoComplete="current-password" required disabled={isPending}
                    style={{ width: "100%", padding: "0.9rem 3rem 0.9rem 2.75rem", background: "#1a1a1a", border: "3px solid #333", color: "#fff", fontSize: "1rem", fontWeight: 600, outline: "none", boxSizing: "border-box" as const, transition: "border-color 0.2s" }}
                    onFocus={(e) => (e.target.style.borderColor = "#dc2626")} onBlur={(e) => (e.target.style.borderColor = "#333")}
                  />
                  <span aria-hidden="true" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "#dc2626", fontSize: "1.1rem" }}>🔒</span>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} tabIndex={-1} style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#888" }}>
                    {showPassword ? "🙈" : "👁"}
                  </button>
                </div>
              </div>

              <button
                id="admin-login-btn"
                type="submit"
                disabled={isPending}
                className="auth-stagger-3"
                style={{ padding: "1rem 1.5rem", background: isPending ? "#1f1f1f" : "#dc2626", color: isPending ? "#555" : "#fff", border: `3px solid ${isPending ? "#333" : "#ef4444"}`, boxShadow: isPending ? "none" : "4px 4px 0px 0px #ef4444", fontSize: "1rem", fontWeight: 800, textTransform: "uppercase" as const, letterSpacing: "0.1em", cursor: isPending ? "not-allowed" : "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
              >
                {isPending ? "MEMERIKSA..." : "MASUK KE ADMIN PORTAL →"}
              </button>
            </form>

            <div className="auth-stagger-4" style={{ marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: "2px solid #1e1e1e", display: "flex", flexDirection: "column", gap: "0.75rem", alignItems: "center" }}>
              <Link href="/admin/reset-password" style={{ fontSize: "0.88rem", color: "#666", textDecoration: "none", fontWeight: 600, transition: "color 0.15s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#f59e0b")} onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}>
                🔑 <strong style={{ color: "#f59e0b" }}>Lupa Password?</strong> Klik di sini
              </Link>
              <Link href="/admin/register" style={{ fontSize: "0.88rem", color: "#666", textDecoration: "none", fontWeight: 600, transition: "color 0.15s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#dc2626")} onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}>
                Belum punya akun admin? <strong style={{ color: "#dc2626" }}>Daftar sekarang</strong>
              </Link>
            </div>
          </div>
        </div>

        <p style={{ textAlign: "center", fontSize: "0.72rem", color: "#333", fontFamily: "monospace", letterSpacing: "0.05em" }}> © {new Date().getFullYear()} Exliding — Admin Portal v1.0 </p>
      </div>

      <style>{`
        @keyframes alertSlideIn { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </main>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <AdminLoginForm />
    </Suspense>
  )
}
