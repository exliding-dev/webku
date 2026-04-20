"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { adminResetPasswordAction, AdminAuthState } from "@/lib/actions/admin-auth.actions"

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

function ResetPasswordConfirmForm() {
  const [state, action, isPending] = useActionState(adminResetPasswordAction, initialState)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [mounted, setMounted] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const searchParams = useSearchParams()
  const token = searchParams.get("token") || ""

  const strength = getPasswordStrength(password)
  const passwordsMatch = password === confirmPassword
  const confirmTouched = confirmPassword.length > 0

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => passwordRef.current?.focus(), 400)
    return () => clearTimeout(timer)
  }, [])

  const inputStyle = {
    width: "100%",
    padding: "0.9rem 3.25rem 0.9rem 2.75rem",
    background: "#1a1a1a",
    border: "3px solid #333",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: 600,
    outline: "none",
    boxSizing: "border-box" as const,
    transition: "border-color 0.2s",
  }

  const labelStyle = {
    fontSize: "0.72rem",
    fontWeight: 800,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "#dc2626",
    fontFamily: "monospace",
    display: "block",
    marginBottom: "0.5rem",
  }

  // Invalid / missing token
  if (!token) {
    return (
      <main
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
          backgroundColor: "#0a0a0a",
        }}
      >
        <div
          style={{
            background: "#111",
            border: "4px solid #dc2626",
            boxShadow: "12px 12px 0px 0px #dc2626",
            padding: "2.5rem 2rem",
            maxWidth: 460,
            width: "100%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "3rem" }}>⛔</div>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "1.5rem", fontWeight: 900, color: "#ef4444", textTransform: "uppercase", margin: 0 }}>
            LINK TIDAK VALID
          </h1>
          <p style={{ color: "#888", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
            Token reset password tidak ditemukan atau sudah kadaluarsa. Minta link reset baru.
          </p>
          <Link
            href="/admin/reset-password"
            style={{
              display: "block",
              width: "100%",
              padding: "0.9rem",
              background: "#dc2626",
              color: "#fff",
              textAlign: "center",
              textDecoration: "none",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              border: "3px solid #ef4444",
              boxShadow: "4px 4px 0px 0px #ef4444",
              boxSizing: "border-box",
            }}
          >
            MINTA LINK BARU →
          </Link>
        </div>
      </main>
    )
  }

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
      {/* Background grid */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(220,38,38,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(220,38,38,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div aria-hidden="true" style={{ position: "absolute", top: 24, left: 24, width: 60, height: 60, border: "3px solid rgba(220,38,38,0.3)", borderRight: "none", borderBottom: "none", zIndex: 0, pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", bottom: 24, right: 24, width: 60, height: 60, border: "3px solid rgba(220,38,38,0.3)", borderLeft: "none", borderTop: "none", zIndex: 0, pointerEvents: "none" }} />

      <div
        className={mounted ? "auth-animate-in" : "auth-pre-animate"}
        style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 480, display: "flex", flexDirection: "column", gap: "1.25rem" }}
      >
        {/* ── SUCCESS STATE ── */}
        {state.success ? (
          <div
            style={{
              background: "#111",
              border: "4px solid #22c55e",
              boxShadow: "12px 12px 0px 0px #22c55e",
              padding: "2.5rem 2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "1.5rem",
            }}
          >
            <div
              style={{
                width: 90,
                height: 90,
                background: "linear-gradient(135deg, #16a34a, #22c55e)",
                border: "4px solid #4ade80",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2.5rem",
                animation: "successPop 0.5s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              ✅
            </div>
            <div>
              <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "1.6rem", fontWeight: 900, textTransform: "uppercase", color: "#22c55e", margin: "0 0 0.75rem" }}>
                PASSWORD DIPERBARUI!
              </h1>
              <p style={{ color: "#aaa", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
                Password admin Anda berhasil diperbarui. Silakan login dengan password baru Anda.
              </p>
            </div>
            <Link
              href="/admin/login"
              style={{
                display: "block",
                width: "100%",
                padding: "1rem",
                background: "#dc2626",
                color: "#fff",
                textAlign: "center",
                textDecoration: "none",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                border: "3px solid #ef4444",
                boxShadow: "4px 4px 0px 0px #ef4444",
                boxSizing: "border-box",
              }}
            >
              LOGIN SEKARANG →
            </Link>
          </div>
        ) : (
          <>
            {/* Badge */}
            <div
              style={{
                background: "rgba(220,38,38,0.12)",
                border: "2px solid #dc2626",
                padding: "0.6rem 1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
              }}
            >
              <span>🔑</span>
              <span style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#ef4444", fontFamily: "monospace" }}>
                BUAT PASSWORD BARU — Admin Portal
              </span>
            </div>

            {/* Card */}
            <div style={{ background: "#111", border: "4px solid #dc2626", boxShadow: "12px 12px 0px 0px #dc2626", overflow: "hidden" }}>
              {/* Header */}
              <div style={{ background: "#dc2626", padding: "1rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Link
                  href="/"
                  style={{ display: "flex", alignItems: "center", textDecoration: "none", fontFamily: "Syne, sans-serif", fontWeight: 900, fontSize: "1.25rem", letterSpacing: "-0.05em" }}
                >
                  <span style={{ background: "#0a0a0a", color: "#dc2626", padding: "0.2rem 0.4rem", marginRight: "-2px" }}>EX</span>
                  <span style={{ background: "#fff", color: "#0a0a0a", padding: "0.2rem 0.5rem" }}>LIDING</span>
                </Link>
                <span style={{ fontSize: "0.63rem", fontWeight: 800, fontFamily: "monospace", letterSpacing: "0.1em", background: "rgba(0,0,0,0.3)", color: "#fff", padding: "0.3rem 0.7rem", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 99 }}>
                  PASSWORD BARU
                </span>
              </div>

              {/* Body */}
              <div style={{ padding: "2rem" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 60,
                    height: 60,
                    background: "#1a1a1a",
                    border: "3px solid #dc2626",
                    boxShadow: "4px 4px 0px 0px #dc2626",
                    fontSize: "1.5rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  🔒
                </div>

                <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "2rem", fontWeight: 900, textTransform: "uppercase", marginBottom: "0.25rem", color: "#fff", lineHeight: 1.1 }}>
                  PASSWORD BARU
                </h1>
                <p style={{ fontSize: "0.88rem", color: "#777", marginBottom: "2rem", fontWeight: 500, lineHeight: 1.6 }}>
                  Masukkan password baru Anda. Gunakan minimal 8 karakter dengan kombinasi huruf, angka, dan simbol.
                </p>

                {/* Error alert */}
                {state.error && (
                  <div
                    role="alert"
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      padding: "1rem",
                      marginBottom: "1.5rem",
                      border: "3px solid #dc2626",
                      borderLeft: "6px solid #dc2626",
                      background: "rgba(220,38,38,0.1)",
                      boxShadow: "4px 4px 0px 0px #dc2626",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      color: "#fca5a5",
                      animation: "alertSlideIn 0.4s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  >
                    <span style={{ fontWeight: 900, fontSize: "1.1rem", flexShrink: 0 }}>!</span>
                    <span>{state.error}</span>
                  </div>
                )}

                {/* Hidden token */}
                <form action={action} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <input type="hidden" name="token" value={token} />

                  {/* New password */}
                  <div className="auth-stagger-1">
                    <label htmlFor="reset-password" style={labelStyle}>PASSWORD BARU</label>
                    <div style={{ position: "relative" }}>
                      <input
                        ref={passwordRef}
                        id="reset-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Min. 8 karakter"
                        autoComplete="new-password"
                        required
                        disabled={isPending}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = "#dc2626")}
                        onBlur={(e) => (e.target.style.borderColor = "#333")}
                      />
                      <span aria-hidden="true" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "#dc2626", fontSize: "1.1rem" }}>🔒</span>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                        style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#888" }}
                      >
                        {showPassword ? "🙈" : "👁"}
                      </button>
                    </div>
                    {/* Strength bar */}
                    {password.length > 0 && (
                      <div style={{ marginTop: "0.5rem" }}>
                        <div style={{ display: "flex", gap: 4, marginBottom: "0.3rem" }}>
                          {[1, 2, 3, 4].map((l) => (
                            <div
                              key={l}
                              style={{
                                flex: 1,
                                height: 4,
                                background: l <= strength.score ? strength.color : "#333",
                                transition: "background 0.3s",
                              }}
                            />
                          ))}
                        </div>
                        <span style={{ fontSize: "0.72rem", color: strength.color, fontFamily: "monospace", fontWeight: 700 }}>
                          {strength.label}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Confirm password */}
                  <div className="auth-stagger-2">
                    <label htmlFor="reset-confirm" style={labelStyle}>ULANGI PASSWORD BARU</label>
                    <div style={{ position: "relative" }}>
                      <input
                        id="reset-confirm"
                        name="confirmPassword"
                        type={showConfirm ? "text" : "password"}
                        placeholder="Ketik ulang password baru"
                        autoComplete="new-password"
                        required
                        disabled={isPending}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{
                          ...inputStyle,
                          borderColor: confirmTouched && !passwordsMatch ? "#ef4444" : "#333",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = confirmTouched && !passwordsMatch ? "#ef4444" : "#dc2626")}
                        onBlur={(e) => (e.target.style.borderColor = confirmTouched && !passwordsMatch ? "#ef4444" : "#333")}
                      />
                      <span aria-hidden="true" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "#dc2626", fontSize: "1.1rem" }}>✔</span>
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        tabIndex={-1}
                        style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#888" }}
                      >
                        {showConfirm ? "🙈" : "👁"}
                      </button>
                    </div>
                    {confirmTouched && !passwordsMatch && (
                      <p style={{ marginTop: "0.4rem", fontSize: "0.75rem", fontFamily: "monospace", color: "#ef4444", fontWeight: 700 }}>
                        ✗ Password tidak cocok
                      </p>
                    )}
                    {confirmTouched && passwordsMatch && confirmPassword.length > 0 && (
                      <p style={{ marginTop: "0.4rem", fontSize: "0.75rem", fontFamily: "monospace", color: "#22c55e", fontWeight: 700 }}>
                        ✓ Password cocok
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    id="reset-password-btn"
                    type="submit"
                    disabled={isPending || (confirmTouched && !passwordsMatch)}
                    className="auth-stagger-3"
                    style={{
                      padding: "1rem 1.5rem",
                      background: isPending ? "#1f1f1f" : "#dc2626",
                      color: isPending ? "#555" : "#fff",
                      border: `3px solid ${isPending ? "#333" : "#ef4444"}`,
                      boxShadow: isPending ? "none" : "4px 4px 0px 0px #ef4444",
                      fontSize: "1rem",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      cursor: isPending ? "not-allowed" : "pointer",
                      transition: "all 0.15s",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                    }}
                  >
                    {isPending ? (
                      <>
                        <span style={{ display: "inline-block", width: 16, height: 16, border: "3px solid #555", borderTopColor: "#888", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                        MEMPERBARUI...
                      </>
                    ) : (
                      "SIMPAN PASSWORD BARU →"
                    )}
                  </button>
                </form>

                <div
                  className="auth-stagger-4"
                  style={{ marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: "2px solid #1e1e1e", textAlign: "center" }}
                >
                  <Link
                    href="/admin/login"
                    style={{ fontSize: "0.88rem", color: "#666", textDecoration: "none", fontWeight: 600 }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#dc2626")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
                  >
                    ← Kembali ke <strong style={{ color: "#dc2626" }}>Login</strong>
                  </Link>
                </div>
              </div>
            </div>

            <p style={{ textAlign: "center", fontSize: "0.72rem", color: "#333", fontFamily: "monospace", letterSpacing: "0.05em" }}>
              © {new Date().getFullYear()} Exliding — Admin Portal v1.0
            </p>
          </>
        )}
      </div>

      <style>{`
        @keyframes alertSlideIn { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes successPop { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </main>
  )
}

export default function AdminResetPasswordConfirmPage() {
  return (
    <Suspense>
      <ResetPasswordConfirmForm />
    </Suspense>
  )
}
