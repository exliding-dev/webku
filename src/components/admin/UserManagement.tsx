'use client'

import React, { useState, useEffect, useCallback } from 'react'

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface AdminUser {
  id: string
  email: string
  name?: string
  status: 'pending' | 'approved' | 'suspended'
  createdAt: string
}

interface SupabaseUser {
  id: string
  email: string
  role: 'user' | 'admin'
}

/* ─── Helper: fetch with auth header ──────────────────────────────────────── */
const SECRET = process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY || ''

/* ─── Main Component ─────────────────────────────────────────────────────── */
const UserManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'admin' | 'user'>('admin')
  const [admins, setAdmins] = useState<AdminUser[]>([])
  const [users, setUsers] = useState<SupabaseUser[]>([])
  const [loadingAdmins, setLoadingAdmins] = useState(true)
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteName, setInviteName] = useState('')
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviting, setInviting] = useState(false)
  const [inviteResult, setInviteResult] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<AdminUser | null>(null)

  /* ── Fetch Admins from Payload ─────────────────────────────────────────── */
  const fetchAdmins = useCallback(async () => {
    setLoadingAdmins(true)
    try {
      const res = await fetch(`/api/seed-admin?key=${encodeURIComponent(SECRET)}`)
      if (!res.ok) throw new Error('Failed')
      const data = await res.json()
      // Combine admins + pending users that are admins
      const all: AdminUser[] = [
        ...(data.admins || []).map((a: any) => ({ ...a, status: a.status || 'approved' })),
        ...(data.pendingUsers || [])
          .filter((u: any) => u.role === 'admin')
          .map((u: any) => ({ ...u, status: 'pending' })),
      ]
      // Deduplicate by id
      const seen = new Set()
      setAdmins(all.filter((a) => { if (seen.has(a.id)) return false; seen.add(a.id); return true }))
    } catch {
      setAdmins([])
    } finally {
      setLoadingAdmins(false)
    }
  }, [])

  /* ── Fetch Users from Supabase profiles ────────────────────────────────── */
  const fetchUsers = useCallback(async () => {
    setLoadingUsers(true)
    try {
      const res = await fetch('/api/admin-users')
      if (!res.ok) throw new Error('Failed')
      const data = await res.json()
      setUsers(data.users || [])
    } catch {
      setUsers([])
    } finally {
      setLoadingUsers(false)
    }
  }, [])

  useEffect(() => {
    fetchAdmins()
    fetchUsers()
  }, [fetchAdmins, fetchUsers])

  /* ── Invite Admin ──────────────────────────────────────────────────────── */
  const handleInvite = async () => {
    if (!inviteEmail) return
    setInviting(true)
    setInviteResult(null)

    try {
      const res = await fetch('/api/admin-invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-seed-secret': SECRET,
        },
        body: JSON.stringify({ email: inviteEmail, name: inviteName }),
      })
      const data = await res.json()

      if (!res.ok) {
        setInviteResult({ type: 'error', msg: data.error || 'Gagal mengundang admin.' })
      } else {
        setInviteResult({ type: 'success', msg: data.message })
        setInviteEmail('')
        setInviteName('')
        fetchAdmins()
        setTimeout(() => {
          setShowInviteModal(false)
          setInviteResult(null)
        }, 2500)
      }
    } catch {
      setInviteResult({ type: 'error', msg: 'Terjadi kesalahan jaringan.' })
    } finally {
      setInviting(false)
    }
  }

  /* ── Delete Admin ──────────────────────────────────────────────────────── */
  const handleDelete = async (user: AdminUser) => {
    setDeletingId(user.id)
    setConfirmDelete(null)
    try {
      const res = await fetch('/api/admin-invite', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-seed-secret': SECRET,
        },
        body: JSON.stringify({ id: user.id }),
      })
      if (res.ok) {
        setAdmins((prev) => prev.filter((a) => a.id !== user.id))
      }
    } catch {
      // silent
    } finally {
      setDeletingId(null)
    }
  }

  /* ─── Styles ──────────────────────────────────────────────────────────── */
  const s: Record<string, React.CSSProperties> = {
    wrap: { padding: '32px', fontFamily: "'Segoe UI', Arial, sans-serif", color: '#e4e4e7' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' },
    title: { fontSize: '24px', fontWeight: 800, color: '#ffffff', margin: 0 },
    subtitle: { fontSize: '14px', color: '#71717a', margin: '4px 0 0' },
    tabs: { display: 'flex', gap: '4px', background: '#111', borderRadius: '10px', padding: '4px', marginBottom: '28px', width: 'fit-content' },
    inviteBtn: {
      display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
      background: 'linear-gradient(135deg,#1e40af,#7c3aed)', color: '#fff', border: 'none',
      borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer',
    },
    table: { width: '100%', borderCollapse: 'collapse' as const },
    th: { textAlign: 'left' as const, padding: '12px 16px', color: '#71717a', fontSize: '12px', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' as const, borderBottom: '1px solid #2a2a2a' },
    td: { padding: '14px 16px', borderBottom: '1px solid #1f1f1f', fontSize: '14px' },
    deleteBtn: { padding: '6px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '6px', color: '#f87171', fontSize: '13px', cursor: 'pointer', fontWeight: 600 },
    empty: { textAlign: 'center' as const, color: '#52525b', padding: '48px 0', fontSize: '15px' },
    overlay: { position: 'fixed' as const, inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' },
    modal: { background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '16px', padding: '36px', width: '100%', maxWidth: '420px' },
    modalTitle: { color: '#fff', fontSize: '20px', fontWeight: 700, margin: '0 0 8px' },
    modalSub: { color: '#71717a', fontSize: '14px', margin: '0 0 28px' },
    inputWrap: { marginBottom: '16px' },
    label: { display: 'block', color: '#a1a1aa', fontSize: '13px', fontWeight: 600, marginBottom: '8px' },
    input: { width: '100%', padding: '11px 14px', background: '#0f0f0f', border: '1px solid #2a2a2a', borderRadius: '8px', color: '#fff', fontSize: '14px', boxSizing: 'border-box' as const },
    modalActions: { display: 'flex', gap: '12px', marginTop: '24px' },
    cancelBtn: { flex: 1, padding: '11px', background: 'transparent', border: '1px solid #2a2a2a', borderRadius: '8px', color: '#a1a1aa', cursor: 'pointer', fontWeight: 600 },
    sendBtn: { flex: 1, padding: '11px', background: 'linear-gradient(135deg,#1e40af,#7c3aed)', border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer', fontWeight: 700 },
  }

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '8px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '14px', transition: 'all 0.2s',
    background: active ? 'linear-gradient(135deg,#1e40af,#7c3aed)' : 'transparent',
    color: active ? '#ffffff' : '#71717a',
  })

  const badgeStyle = (status: string): React.CSSProperties => ({
    display: 'inline-block', padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
    background: status === 'approved' ? 'rgba(34,197,94,0.15)' : status === 'pending' ? 'rgba(234,179,8,0.15)' : 'rgba(239,68,68,0.15)',
    color: status === 'approved' ? '#4ade80' : status === 'pending' ? '#fbbf24' : '#f87171',
  })

  const resultBoxStyle = (type: 'success' | 'error'): React.CSSProperties => ({
    borderRadius: '8px', padding: '12px 16px', marginBottom: '16px', fontSize: '13px',
    background: type === 'success' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
    border: `1px solid ${type === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
    color: type === 'success' ? '#86efac' : '#fca5a5',
  })

  /* ─── Render ─────────────────────────────────────────────────────────── */
  return (
    <div style={s.wrap}>
      {/* Header */}
      <div style={s.header}>
        <div>
          <h1 style={s.title}>👥 Manajemen User</h1>
          <p style={s.subtitle}>Kelola admin dan pantau pengguna terdaftar</p>
        </div>
        {activeTab === 'admin' && (
          <button style={s.inviteBtn} onClick={() => { setShowInviteModal(true); setInviteResult(null) }}>
            <span>+</span> Undang Admin
          </button>
        )}
      </div>

      {/* Tabs */}
      <div style={s.tabs}>
        <button style={tabStyle(activeTab === 'admin')} onClick={() => setActiveTab('admin')}>
          🛡️ Admin ({admins.length})
        </button>
        <button style={tabStyle(activeTab === 'user')} onClick={() => setActiveTab('user')}>
          👤 User ({users.length})
        </button>
      </div>

      {/* ── Admin Tab ─────────────────────────────────────────────────────── */}
      {activeTab === 'admin' && (
        <div style={{ background: '#1a1a1a', borderRadius: '12px', border: '1px solid #2a2a2a', overflow: 'hidden' }}>
          {loadingAdmins ? (
            <p style={s.empty}>Memuat data admin…</p>
          ) : admins.length === 0 ? (
            <p style={s.empty}>Belum ada admin terdaftar.</p>
          ) : (
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>Email</th>
                  <th style={s.th}>Nama</th>
                  <th style={s.th}>Status</th>
                  <th style={s.th}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.id}>
                    <td style={s.td}>{admin.email}</td>
                    <td style={{ ...s.td, color: '#71717a' }}>{admin.name || '-'}</td>
                    <td style={s.td}>
                      <span style={badgeStyle(admin.status)}>
                        {admin.status === 'approved' ? '✅ Aktif' : admin.status === 'pending' ? '⏳ Pending' : '🔴 Suspended'}
                      </span>
                    </td>
                    <td style={s.td}>
                      {confirmDelete?.id === admin.id ? (
                        <span style={{ fontSize: '13px' }}>
                          <span style={{ color: '#fbbf24', marginRight: '8px' }}>Hapus?</span>
                          <button
                            onClick={() => handleDelete(admin)}
                            disabled={deletingId === admin.id}
                            style={{ ...s.deleteBtn, marginRight: '6px' }}
                          >
                            {deletingId === admin.id ? '…' : 'Ya'}
                          </button>
                          <button onClick={() => setConfirmDelete(null)} style={{ ...s.deleteBtn, color: '#a1a1aa', borderColor: '#2a2a2a' }}>
                            Batal
                          </button>
                        </span>
                      ) : (
                        <button style={s.deleteBtn} onClick={() => setConfirmDelete(admin)}>
                          Hapus
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* ── User Tab ──────────────────────────────────────────────────────── */}
      {activeTab === 'user' && (
        <div style={{ background: '#1a1a1a', borderRadius: '12px', border: '1px solid #2a2a2a', overflow: 'hidden' }}>
          {loadingUsers ? (
            <p style={s.empty}>Memuat data user…</p>
          ) : users.length === 0 ? (
            <p style={s.empty}>Belum ada user terdaftar.</p>
          ) : (
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>Email</th>
                  <th style={s.th}>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td style={s.td}>{u.email}</td>
                    <td style={s.td}>
                      <span style={badgeStyle(u.role === 'admin' ? 'approved' : 'pending')}>
                        {u.role === 'admin' ? '🛡️ Admin' : '👤 User'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* ── Invite Modal ───────────────────────────────────────────────────── */}
      {showInviteModal && (
        <div style={s.overlay} onClick={(e) => { if (e.target === e.currentTarget) setShowInviteModal(false) }}>
          <div style={s.modal}>
            <h2 style={s.modalTitle}>✉️ Undang Admin Baru</h2>
            <p style={s.modalSub}>Calon admin akan menerima email berisi link untuk mengatur password.</p>

            {inviteResult && (
              <div style={resultBoxStyle(inviteResult.type)}>{inviteResult.msg}</div>
            )}

            <div style={s.inputWrap}>
              <label style={s.label}>Email *</label>
              <input
                type="email"
                placeholder="admin@domain.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                style={s.input}
              />
            </div>
            <div style={s.inputWrap}>
              <label style={s.label}>Nama (opsional)</label>
              <input
                type="text"
                placeholder="Nama Admin"
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
                style={s.input}
              />
            </div>

            <div style={s.modalActions}>
              <button style={s.cancelBtn} onClick={() => setShowInviteModal(false)}>Batal</button>
              <button style={s.sendBtn} onClick={handleInvite} disabled={inviting || !inviteEmail}>
                {inviting ? 'Mengirim…' : '📨 Kirim Undangan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserManagement
