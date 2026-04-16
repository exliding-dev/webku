"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { forgotPasswordAction, ForgotPasswordState } from "@/lib/actions/auth.actions"

const initialState: ForgotPasswordState = {}

export default function ForgotPasswordPage() {
  const [state, action, isPending] = useActionState(forgotPasswordAction, initialState)
  const emailRef = useRef<HTMLInputElement>(null)
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

      {/* Corners */}
      <div className="auth-corner auth-corner-tl" aria-hidden="true" />
      <div className="auth-corner auth-corner-br" aria-hidden="true" />

      <div className={`auth-wrapper ${mounted ? "auth-animate-in" : "auth-pre-animate"}`}>
        <div className="auth-card">
          {/* Header */}
          <div className="auth-card-header">
            <Link href="/" className="auth-logo">
              <span className="auth-logo-ex">EX</span>
              <span className="auth-logo-liding">LIDING</span>
            </Link>
            <div className="auth-badge">RECOVERY</div>
          </div>

          <div className="auth-card-body">
            {/* Success State */}
            {state.success ? (
              <div className="auth-success-full">
                <div className="auth-success-icon-lg" aria-hidden="true">
                  <span className="auth-success-check">✉</span>
                </div>
                <h1 className="auth-title" style={{ textAlign: "center" }}>EMAIL TERKIRIM!</h1>
                <div className="auth-success-box">
                  <p className="auth-success-msg">{state.success}</p>
                  <div className="auth-info-steps">
                    <div className="auth-info-step">
                      <span className="auth-info-step-num">1</span>
                      <span>Buka kotak masuk email Anda</span>
                    </div>
                    <div className="auth-info-step">
                      <span className="auth-info-step-num">2</span>
                      <span>Klik link reset password</span>
                    </div>
                    <div className="auth-info-step">
                      <span className="auth-info-step-num">3</span>
                      <span>Buat password baru</span>
                    </div>
                  </div>
                  <p className="auth-success-hint">
                    💡 Tidak menerima email? Periksa folder spam. Link kedaluwarsa dalam 1 jam.
                  </p>
                </div>
                <Link href="/login" className="auth-btn" style={{ textAlign: "center", width: "100%" }}>
                  ← KEMBALI KE LOGIN
                </Link>
              </div>
            ) : (
              <>
                {/* Icon */}
                <div className="auth-icon-box" aria-hidden="true">
                  <span>🔑</span>
                </div>

                <h1 className="auth-title">LUPA PASSWORD</h1>
                <p className="auth-subtitle">
                  Masukkan email terdaftar Anda. Kami akan mengirimkan link untuk membuat password baru.
                </p>

                {/* Error message */}
                {state.error && (
                  <div className="auth-alert auth-alert-error" role="alert">
                    <span className="auth-alert-icon">✕</span>
                    <div>
                      <strong style={{ display: "block", marginBottom: "2px" }}>Gagal mengirim</strong>
                      <span>{state.error}</span>
                    </div>
                  </div>
                )}

                <form action={action} className="auth-form" noValidate>
                  {/* Email field */}
                  <div className="auth-field auth-stagger-1">
                    <label htmlFor="forgot-email" className="auth-label">
                      EMAIL TERDAFTAR
                    </label>
                    <div className="auth-input-wrapper">
                      <input
                        ref={emailRef}
                        id="forgot-email"
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

                  {/* Submit */}
                  <button
                    id="forgot-password-submit-btn"
                    type="submit"
                    className="auth-btn auth-stagger-2"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <span className="auth-btn-loading">
                        <span className="auth-spinner" />
                        MENGIRIM...
                      </span>
                    ) : (
                      "KIRIM LINK RESET →"
                    )}
                  </button>
                </form>

                {/* Links */}
                <div className="auth-links auth-stagger-3">
                  <Link href="/login" className="auth-link">
                    ← Kembali ke Login
                  </Link>
                  <div className="auth-divider" />
                  <Link href="/register" className="auth-link">
                    Belum punya akun? <strong>Daftar</strong>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        <p className="auth-footer-note">
          © {new Date().getFullYear()} Exliding — Creative Studio
        </p>
      </div>
    </main>
  )
}
