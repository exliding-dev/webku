'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'

function SetPasswordForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token') || ''

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [validating, setValidating] = useState(true)
  const [tokenError, setTokenError] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Validate token on mount
  useEffect(() => {
    if (!token) {
      setTokenError('Token tidak ditemukan. Pastikan link yang Anda gunakan benar.')
      setValidating(false)
      return
    }

    fetch(`/api/admin-set-password?token=${encodeURIComponent(token)}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.valid) {
          setTokenError(data.error || 'Token tidak valid.')
        } else {
          setEmail(data.email || '')
        }
        setValidating(false)
      })
      .catch(() => {
        setTokenError('Gagal memvalidasi token.')
        setValidating(false)
      })
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('Password minimal 8 karakter.')
      return
    }
    if (password !== confirm) {
      setError('Konfirmasi password tidak cocok.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/admin-set-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Gagal mengatur password.')
      } else {
        setSuccess(true)
        setTimeout(() => router.push('/admin/login'), 2000)
      }
    } catch {
      setError('Terjadi kesalahan. Coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  /* ─── Styles ─────────────────────────────────────────────────────────────── */
  const styles: Record<string, React.CSSProperties> = {
    root: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #0f0f0f 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: "'Segoe UI', Arial, sans-serif",
    },
    card: {
      background: '#1a1a1a',
      border: '1px solid #2a2a2a',
      borderRadius: '20px',
      padding: '48px 40px',
      width: '100%',
      maxWidth: '440px',
      boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
    },
    logo: {
      textAlign: 'center',
      marginBottom: '32px',
    },
    logoText: {
      fontSize: '28px',
      fontWeight: 900,
      background: 'linear-gradient(135deg, #818cf8, #a78bfa)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      letterSpacing: '-0.5px',
    },
    title: {
      color: '#ffffff',
      fontSize: '22px',
      fontWeight: 700,
      textAlign: 'center',
      margin: '0 0 8px',
    },
    subtitle: {
      color: '#71717a',
      fontSize: '14px',
      textAlign: 'center',
      margin: '0 0 32px',
    },
    emailBadge: {
      background: 'rgba(129, 140, 248, 0.1)',
      border: '1px solid rgba(129, 140, 248, 0.3)',
      borderRadius: '8px',
      padding: '10px 16px',
      color: '#818cf8',
      fontSize: '14px',
      textAlign: 'center',
      marginBottom: '24px',
      wordBreak: 'break-all',
    },
    label: {
      display: 'block',
      color: '#a1a1aa',
      fontSize: '13px',
      fontWeight: 600,
      marginBottom: '8px',
      letterSpacing: '0.3px',
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      background: '#0f0f0f',
      border: '1px solid #2a2a2a',
      borderRadius: '10px',
      color: '#ffffff',
      fontSize: '15px',
      boxSizing: 'border-box',
      outline: 'none',
      marginBottom: '20px',
      transition: 'border-color 0.2s',
    },
    btn: {
      width: '100%',
      padding: '14px',
      background: 'linear-gradient(135deg, #1e40af, #7c3aed)',
      color: '#ffffff',
      border: 'none',
      borderRadius: '10px',
      fontSize: '16px',
      fontWeight: 700,
      cursor: 'pointer',
      marginTop: '8px',
    },
    errorBox: {
      background: 'rgba(239, 68, 68, 0.1)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      borderRadius: '8px',
      padding: '12px 16px',
      color: '#fca5a5',
      fontSize: '13px',
      marginBottom: '16px',
    },
    successBox: {
      background: 'rgba(34, 197, 94, 0.1)',
      border: '1px solid rgba(34, 197, 94, 0.3)',
      borderRadius: '8px',
      padding: '16px',
      color: '#86efac',
      fontSize: '14px',
      textAlign: 'center',
    },
  }

  if (validating) {
    return (
      <div style={styles.root}>
        <div style={styles.card}>
          <div style={{ ...styles.logo }}>
            <div style={styles.logoText}>⚡ Exliding</div>
          </div>
          <p style={{ color: '#71717a', textAlign: 'center' }}>Memvalidasi link undangan…</p>
        </div>
      </div>
    )
  }

  if (tokenError) {
    return (
      <div style={styles.root}>
        <div style={styles.card}>
          <div style={styles.logo}>
            <div style={styles.logoText}>⚡ Exliding</div>
          </div>
          <div style={{ ...styles.errorBox, marginBottom: 0, textAlign: 'center' }}>
            <div style={{ fontSize: '20px', marginBottom: '8px' }}>❌</div>
            {tokenError}
          </div>
          <p style={{ color: '#52525b', fontSize: '13px', textAlign: 'center', marginTop: '20px' }}>
            Hubungi administrator jika Anda membutuhkan link baru.
          </p>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div style={styles.root}>
        <div style={styles.card}>
          <div style={styles.logo}>
            <div style={styles.logoText}>⚡ Exliding</div>
          </div>
          <div style={{ ...styles.successBox }}>
            <div style={{ fontSize: '28px', marginBottom: '12px' }}>🎉</div>
            <strong>Password berhasil diatur!</strong>
            <p style={{ margin: '8px 0 0', fontSize: '13px', color: '#4ade80' }}>
              Mengalihkan ke halaman login…
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.root}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <div style={styles.logoText}>⚡ Exliding</div>
        </div>

        <h1 style={styles.title}>Atur Password Admin</h1>
        <p style={styles.subtitle}>Buat password untuk akun admin Anda</p>

        {email && <div style={styles.emailBadge}>📧 {email}</div>}

        <form onSubmit={handleSubmit}>
          {error && <div style={styles.errorBox}>{error}</div>}

          <label style={styles.label}>Password Baru</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimal 8 karakter"
            required
            style={styles.input}
          />

          <label style={styles.label}>Konfirmasi Password</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Ulangi password"
            required
            style={styles.input}
          />

          <button type="submit" disabled={loading} style={styles.btn}>
            {loading ? 'Menyimpan…' : '🔐 Simpan Password & Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function SetPasswordPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: '#0f0f0f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#71717a' }}>Loading…</p>
      </div>
    }>
      <SetPasswordForm />
    </Suspense>
  )
}
