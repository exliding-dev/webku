"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Suspense } from "react"
import { adminForgotPasswordAction, AdminAuthState } from "@/lib/actions/admin-auth.actions"

const initialState: AdminAuthState = {}

function ForgotPasswordForm() {
  const [state, action, isPending] = useActionState(adminForgotPasswordAction, initialState)
  const emailRef = useRef<HTMLInputElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => emailRef.current?.focus(), 400)
    return () => clearTimeout(timer)
  }, [])

  const inputStyle = {
    width: "100%",
    padding: "0.9rem 1rem 0.9rem 2.75rem",
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
      {/* Corner brackets */}
      <div aria-hidden="true" style={{ position: "absolute", top: 24, left: 24, width: 60, height: 60, border: "3px solid rgba(220,38,38,0.3)", borderRight: "none", borderBottom: "none", zIndex: 0, pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", bottom: 24, right: 24, width: 60, height: 60, border: "3px solid rgba(220,38,38,0.3)", borderLeft: "none", borderTop: "none", zIndex: 0, pointerEvents: "none" }} />

      <div
        className={mounted ? "auth-animate-in" : "auth-pre-animate"}
        style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 460, display: "flex", flexDirection: "column", gap: "1.25rem" }}
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
            {/* Animated envelope icon */}
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
              📧
            </div>
            <div>
              <h1
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontSize: "1.6rem",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  color: "#22c55e",
                  margin: "0 0 0.75rem",
                }}
              >
                CEK EMAIL ANDA!
              </h1>
              <p style={{ color: "#aaa", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
                Link reset password telah dikirim ke{" "}
                <strong style={{ color: "#fff" }}>email Anda</strong>. Periksa juga
                folder <strong style={{ color: "#f59e0b" }}>Spam/Junk</strong>.
              </p>
            </div>

            <div
              style={{
                width: "100%",
                padding: "1rem",
                background: "rgba(34,197,94,0.08)",
                border: "2px solid rgba(34,197,94,0.3)",
                fontSize: "0.8rem",
                color: "#86efac",
                fontFamily: "monospace",
                lineHeight: 1.6,
              }}
            >
              ℹ️ Link aktif selama <strong>1 jam</strong>. Jika tidak menerima email,
              coba kirim ulang di bawah.
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", width: "100%" }}>
              <Link
                href="/admin/reset-password"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "0.75rem",
                  background: "transparent",
                  color: "#aaa",
                  textAlign: "center",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  border: "2px solid #333",
                  boxSizing: "border-box",
                  transition: "all 0.15s",
                }}
              >
                ↩ Kirim ulang email
              </Link>
              <Link
                href="/admin/login"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "0.75rem",
                  background: "#dc2626",
                  color: "#fff",
                  textAlign: "center",
                  textDecoration: "none",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  border: "3px solid #ef4444",
                  boxShadow: "4px 4px 0px 0px #ef4444",
                  boxSizing: "border-box",
                }}
              >
                ← Kembali ke Login
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* ── FORM STATE ── */}
            {/* Warning badge */}
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
              <span
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#ef4444",
                  fontFamily: "monospace",
                }}
              >
                RESET PASSWORD — Admin Portal
              </span>
            </div>

            {/* Card */}
            <div
              style={{
                background: "#111",
                border: "4px solid #dc2626",
                boxShadow: "12px 12px 0px 0px #dc2626",
                overflow: "hidden",
              }}
            >
              {/* Header bar */}
              <div
                style={{
                  background: "#dc2626",
                  padding: "1rem 1.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Link
                  href="/"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 900,
                    fontSize: "1.25rem",
                    letterSpacing: "-0.05em",
                  }}
                >
                  <span style={{ background: "#0a0a0a", color: "#dc2626", padding: "0.2rem 0.4rem", marginRight: "-2px" }}>EX</span>
                  <span style={{ background: "#fff", color: "#0a0a0a", padding: "0.2rem 0.5rem" }}>LIDING</span>
                </Link>
                <span
                  style={{
                    fontSize: "0.63rem",
                    fontWeight: 800,
                    fontFamily: "monospace",
                    letterSpacing: "0.1em",
                    background: "rgba(0,0,0,0.3)",
                    color: "#fff",
                    padding: "0.3rem 0.7rem",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 99,
                  }}
                >
                  LUPA PASSWORD
                </span>
              </div>

              {/* Form body */}
              <div style={{ padding: "2rem" }}>
                {/* Lock icon */}
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
                  🔐
                </div>

                <h1
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontSize: "2rem",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    marginBottom: "0.25rem",
                    color: "#fff",
                    lineHeight: 1.1,
                  }}
                >
                  LUPA PASSWORD?
                </h1>
                <p style={{ fontSize: "0.88rem", color: "#777", marginBottom: "2rem", fontWeight: 500, lineHeight: 1.6 }}>
                  Masukkan email admin Anda. Kami akan mengirimkan link untuk membuat password baru.
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

                {/* Form */}
                <form action={action} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div className="auth-stagger-1">
                    <label htmlFor="forgot-email" style={labelStyle}>
                      EMAIL ADMIN
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        ref={emailRef}
                        id="forgot-email"
                        name="email"
                        type="email"
                        placeholder="admin@exliding.com"
                        autoComplete="email"
                        required
                        disabled={isPending}
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = "#dc2626")}
                        onBlur={(e) => (e.target.style.borderColor = "#333")}
                      />
                      <span
                        aria-hidden="true"
                        style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "#dc2626", fontSize: "1.1rem" }}
                      >
                        @
                      </span>
                    </div>
                  </div>

                  <button
                    id="forgot-password-btn"
                    type="submit"
                    disabled={isPending}
                    className="auth-stagger-2"
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
                        MENGIRIM EMAIL...
                      </>
                    ) : (
                      "KIRIM LINK RESET →"
                    )}
                  </button>
                </form>

                {/* Bottom link */}
                <div
                  className="auth-stagger-3"
                  style={{
                    marginTop: "1.5rem",
                    paddingTop: "1.25rem",
                    borderTop: "2px solid #1e1e1e",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.6rem",
                    alignItems: "center",
                  }}
                >
                  <Link
                    href="/admin/login"
                    style={{ fontSize: "0.88rem", color: "#666", textDecoration: "none", fontWeight: 600, transition: "color 0.15s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#dc2626")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
                  >
                    ← Ingat password? <strong style={{ color: "#dc2626" }}>Login sekarang</strong>
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

export default function AdminForgotPasswordPage() {
  return (
    <Suspense>
      <ForgotPasswordForm />
    </Suspense>
  )
}
