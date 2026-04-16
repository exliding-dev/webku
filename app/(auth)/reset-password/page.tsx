"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { resetPasswordAction, ResetPasswordState } from "@/lib/actions/auth.actions"

const initialState: ResetPasswordState = {}

function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  if (!password) return { score: 0, label: "", color: "" }

  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 1) return { score: 1, label: "Lemah", color: "#ff4444" }
  if (score <= 2) return { score: 2, label: "Cukup", color: "#ffaa00" }
  if (score <= 3) return { score: 3, label: "Bagus", color: "#44bb44" }
  return { score: 4, label: "Kuat!", color: "#00cc66" }
}

export default function ResetPasswordPage() {
  const [state, action, isPending] = useActionState(resetPasswordAction, initialState)
  const passwordRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [confirmTouched, setConfirmTouched] = useState(false)
  const [mounted, setMounted] = useState(false)

  const strength = getPasswordStrength(password)
  const passwordsMatch = password === confirmPassword
  const showMismatch = confirmTouched && confirmPassword.length > 0 && !passwordsMatch

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => passwordRef.current?.focus(), 400)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        router.push("/login")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [state.success, router])

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
            <div className="auth-badge">RESET</div>
          </div>

          <div className="auth-card-body">
            {/* Success message */}
            {state.success ? (
              <div className="auth-success-full">
                <div className="auth-success-icon-lg" aria-hidden="true">
                  <span className="auth-success-check">✓</span>
                </div>
                <h2 className="auth-title" style={{ textAlign: "center" }}>PASSWORD DIUBAH!</h2>
                <div className="auth-success-box">
                  <p className="auth-success-msg">{state.success}</p>
                  <p className="auth-success-hint">Mengalihkan ke halaman login...</p>
                  <div className="auth-redirect-bar">
                    <div className="auth-redirect-progress" />
                  </div>
                </div>
                <Link href="/login" className="auth-btn" style={{ textAlign: "center", width: "100%" }}>
                  LOGIN SEKARANG →
                </Link>
              </div>
            ) : (
              <>
                {/* Icon */}
                <div className="auth-icon-box" aria-hidden="true">
                  <span>🔐</span>
                </div>

                <h1 className="auth-title">RESET PASSWORD</h1>
                <p className="auth-subtitle">Masukkan password baru Anda di bawah ini.</p>

                {/* Error message */}
                {state.error && (
                  <div className="auth-alert auth-alert-error" role="alert">
                    <span className="auth-alert-icon">✕</span>
                    <div>
                      <strong style={{ display: "block", marginBottom: "2px" }}>Gagal reset</strong>
                      <span>{state.error}</span>
                    </div>
                  </div>
                )}

                <form action={action} className="auth-form" noValidate>
                  {/* Password field */}
                  <div className="auth-field auth-stagger-1">
                    <label htmlFor="reset-password" className="auth-label">
                      PASSWORD BARU
                    </label>
                    <div className="auth-input-wrapper">
                      <input
                        ref={passwordRef}
                        id="reset-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className="auth-input"
                        placeholder="Min. 8 karakter"
                        autoComplete="new-password"
                        required
                        disabled={isPending}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                    {/* Password strength indicator */}
                    {password.length > 0 && (
                      <div className="auth-pw-strength">
                        <div className="auth-pw-strength-bar">
                          {[1, 2, 3, 4].map((level) => (
                            <div
                              key={level}
                              className="auth-pw-strength-seg"
                              style={{
                                backgroundColor: level <= strength.score ? strength.color : "#ddd",
                              }}
                            />
                          ))}
                        </div>
                        <span className="auth-pw-strength-label" style={{ color: strength.color }}>
                          {strength.label}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password field */}
                  <div className="auth-field auth-stagger-2">
                    <label htmlFor="reset-confirm" className="auth-label">
                      ULANGI PASSWORD
                    </label>
                    <div className="auth-input-wrapper">
                      <input
                        id="reset-confirm"
                        name="confirmPassword"
                        type={showConfirm ? "text" : "password"}
                        className={`auth-input ${showMismatch ? "auth-input-error" : ""} ${confirmTouched && passwordsMatch && confirmPassword.length > 0 ? "auth-input-valid" : ""}`}
                        placeholder="Ulangi password baru"
                        autoComplete="new-password"
                        required
                        disabled={isPending}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onBlur={() => setConfirmTouched(true)}
                      />
                      <span className="auth-input-icon" aria-hidden="true">
                        {confirmTouched && confirmPassword.length > 0
                          ? passwordsMatch ? "✓" : "✕"
                          : "✔"
                        }
                      </span>
                      <button
                        type="button"
                        className="auth-toggle-pw"
                        onClick={() => setShowConfirm(!showConfirm)}
                        aria-label={showConfirm ? "Sembunyikan password" : "Tampilkan password"}
                        tabIndex={-1}
                      >
                        {showConfirm ? "🙈" : "👁"}
                      </button>
                    </div>
                    {showMismatch && (
                      <span className="auth-field-error">Password tidak cocok</span>
                    )}
                    {confirmTouched && passwordsMatch && confirmPassword.length > 0 && (
                      <span className="auth-field-success">Password cocok ✓</span>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    id="reset-password-submit-btn"
                    type="submit"
                    className="auth-btn auth-stagger-3"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <span className="auth-btn-loading">
                        <span className="auth-spinner" />
                        MENYIMPAN...
                      </span>
                    ) : (
                      "SIMPAN PASSWORD BARU →"
                    )}
                  </button>
                </form>

                {/* Links */}
                <div className="auth-links auth-stagger-4">
                  <Link href="/login" className="auth-link">
                    ← Kembali ke Login
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
