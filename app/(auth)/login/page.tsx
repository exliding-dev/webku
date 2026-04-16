"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { loginAction, LoginState } from "@/lib/actions/auth.actions"
import GoogleAuthButton from "@/components/auth/google-auth-button"

const initialState: LoginState = {}

export default function LoginPage() {
  const [state, action, isPending] = useActionState(loginAction, initialState)
  const emailRef = useRef<HTMLInputElement>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => emailRef.current?.focus(), 400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="auth-root">
      {/* Background grid */}
      <div className="auth-grid-bg" aria-hidden="true" />

      {/* Floating accent shapes */}
      <div className="auth-shape auth-shape-1" aria-hidden="true" />
      <div className="auth-shape auth-shape-2" aria-hidden="true" />
      <div className="auth-shape auth-shape-3" aria-hidden="true" />

      {/* Decorative corner elements */}
      <div className="auth-corner auth-corner-tl" aria-hidden="true" />
      <div className="auth-corner auth-corner-br" aria-hidden="true" />

      <div className={`auth-wrapper ${mounted ? "auth-animate-in" : "auth-pre-animate"}`}>
        {/* Card */}
        <div className="auth-card">
          {/* Header */}
          <div className="auth-card-header">
            <Link href="/" className="auth-logo">
              <span className="auth-logo-ex">EX</span>
              <span className="auth-logo-liding">LIDING</span>
            </Link>
            <div className="auth-badge">CLIENT PORTAL</div>
          </div>

          <div className="auth-card-body">
            {/* Icon */}
            <div className="auth-icon-box" aria-hidden="true">
              <span>👋</span>
            </div>

            <h1 className="auth-title">MASUK</h1>
            <p className="auth-subtitle">
              Akses template &amp; project Anda di client portal
            </p>

            {/* Error message */}
            {state.error && (
              <div className="auth-alert auth-alert-error" role="alert">
                <span className="auth-alert-icon">✕</span>
                <div>
                  <strong style={{ display: "block", marginBottom: "2px" }}>Login gagal</strong>
                  <span>{state.error}</span>
                </div>
              </div>
            )}

            <form action={action} className="auth-form" noValidate>
              {/* Email field */}
              <div className="auth-field auth-stagger-1">
                <label htmlFor="login-email" className="auth-label">
                  EMAIL
                </label>
                <div className="auth-input-wrapper">
                  <input
                    ref={emailRef}
                    id="login-email"
                    name="email"
                    type="email"
                    className="auth-input"
                    placeholder="nama@email.com"
                    autoComplete="email"
                    required
                    disabled={isPending}
                  />
                  <span className="auth-input-icon" aria-hidden="true">@</span>
                </div>
              </div>

              {/* Password field */}
              <div className="auth-field auth-stagger-2">
                <div className="auth-label-row">
                  <label htmlFor="login-password" className="auth-label">
                    PASSWORD
                  </label>
                  <Link href="/forgot-password" className="auth-label-link" tabIndex={-1}>
                    Lupa password?
                  </Link>
                </div>
                <div className="auth-input-wrapper">
                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="auth-input"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    disabled={isPending}
                  />
                  <span className="auth-input-icon" aria-hidden="true">🔒</span>
                  <button
                    type="button"
                    className="auth-toggle-pw"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                    tabIndex={-1}
                  >
                    {showPassword ? "🙈" : "👁"}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                id="login-submit-btn"
                type="submit"
                className="auth-btn auth-stagger-3"
                disabled={isPending}
              >
                {isPending ? (
                  <span className="auth-btn-loading">
                    <span className="auth-spinner" />
                    MEMPROSES...
                  </span>
                ) : (
                  "MASUK →"
                )}
              </button>
            </form>

            <div className="auth-divider-text auth-stagger-3" style={{ textAlign: "center", margin: "20px 0", color: "#666", fontSize: "14px", position: "relative" }}>
              <span style={{ backgroundColor: "#fafafa", padding: "0 10px", position: "relative", zIndex: 1 }}>ATAU</span>
              <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", backgroundColor: "#e0e0e0", zIndex: 0 }} />
            </div>

            <GoogleAuthButton label="Masuk dengan Google" />

            {/* Links */}
            <div className="auth-links auth-stagger-4">
              <div className="auth-divider" />
              <Link href="/register" className="auth-link auth-link-cta">
                Belum punya akun? <strong>Daftar sekarang</strong>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="auth-footer-note">
          © {new Date().getFullYear()} Exliding — Creative Studio
        </p>
      </div>
    </main>
  )
}
