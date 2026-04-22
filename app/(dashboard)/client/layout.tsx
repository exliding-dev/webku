import Link from 'next/link';
import Script from 'next/script';
import { createClient } from '@/lib/supabase/server';
import LogoutButton from '@/components/auth/logout-button';

export default async function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const userName = user?.user_metadata?.name
    || user?.user_metadata?.full_name
    || user?.email?.split('@')[0]
    || 'Klien';

  const userEmail = user?.email || '';
  const avatarUrl = user?.user_metadata?.avatar_url
    || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=0d6efd&color=fff&size=128`;

  // Member since
  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
    : 'Baru bergabung';

  return (
    <div className="layout-fixed sidebar-expand-lg bg-body-tertiary">
      <div className="app-wrapper">

        {/* ── TOP NAVBAR ─────────────────────────────────────── */}
        <nav className="app-header navbar navbar-expand bg-body shadow-sm">
          <div className="container-fluid">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" data-lte-toggle="sidebar" href="#" role="button">
                  <i className="bi bi-list fs-5"></i>
                </a>
              </li>
              <li className="nav-item d-none d-md-block">
                <Link href="/" className="nav-link text-muted">
                  <i className="bi bi-arrow-left me-1"></i>
                  Kembali ke Website
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto align-items-center gap-1">
              {/* Fullscreen toggle */}
              <li className="nav-item">
                <a className="nav-link" href="#" data-lte-toggle="fullscreen" title="Fullscreen">
                  <i className="data-lte-icon bi bi-arrows-fullscreen"></i>
                </a>
              </li>

              {/* User dropdown */}
              <li className="nav-item dropdown user-menu">
                <a href="#" className="nav-link dropdown-toggle d-flex align-items-center gap-2" data-bs-toggle="dropdown">
                  <img
                    src={avatarUrl}
                    className="user-image rounded-circle shadow-sm"
                    alt={userName}
                    style={{ width: 32, height: 32, objectFit: 'cover' }}
                  />
                  <span className="d-none d-md-inline fw-semibold" style={{ fontSize: 14 }}>
                    {userName}
                  </span>
                </a>
                <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-end shadow">
                  {/* User header */}
                  <li className="user-header text-bg-primary py-3 text-center">
                    <img
                      src={avatarUrl}
                      className="rounded-circle shadow-sm mb-2"
                      alt={userName}
                      style={{ width: 72, height: 72, objectFit: 'cover', border: '3px solid rgba(255,255,255,0.3)' }}
                    />
                    <p className="mb-0 fw-bold">{userName}</p>
                    <small className="opacity-75">{userEmail}</small>
                  </li>
                  {/* User body */}
                  <li>
                    <div className="px-3 py-2 d-flex justify-content-between align-items-center" style={{ fontSize: 13, color: '#6c757d' }}>
                      <span><i className="bi bi-calendar me-1"></i>Member sejak</span>
                      <span className="fw-semibold text-dark">{memberSince}</span>
                    </div>
                  </li>
                  <li><hr className="dropdown-divider my-1" /></li>
                  {/* Footer */}
                  <li className="user-footer d-flex justify-content-between px-2 py-2">
                    <Link href="/client/settings" className="btn btn-sm btn-outline-secondary">
                      <i className="bi bi-person me-1"></i>Profil
                    </Link>
                    <LogoutButton className="btn btn-sm btn-danger">
                      <i className="bi bi-power me-1"></i>Keluar
                    </LogoutButton>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>

        {/* ── SIDEBAR ──────────────────────────────────────────── */}
        <aside className="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
          <div className="sidebar-brand">
            <Link href="/" className="brand-link d-flex align-items-center px-3 py-3">
              <span className="brand-text fw-bold fs-5">
                Ex<span className="fw-light">liding</span>
                <span className="badge bg-primary ms-2" style={{ fontSize: 10, verticalAlign: 'middle' }}>Client</span>
              </span>
            </Link>
          </div>

          {/* Sidebar user panel */}
          <div className="sidebar-user-panel px-3 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="d-flex align-items-center gap-2">
              <img
                src={avatarUrl}
                className="rounded-circle"
                alt={userName}
                style={{ width: 36, height: 36, objectFit: 'cover', border: '2px solid rgba(255,255,255,0.2)' }}
              />
              <div style={{ overflow: 'hidden' }}>
                <div className="fw-semibold text-white" style={{ fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {userName}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {userEmail}
                </div>
              </div>
            </div>
          </div>

          <div className="sidebar-wrapper">
            <nav className="mt-2">
              <p className="nav-header" style={{ fontSize: 10, letterSpacing: 1, opacity: 0.5, paddingLeft: 16, marginBottom: 4 }}>
                NAVIGASI
              </p>
              <ul className="nav sidebar-menu flex-column" data-lte-toggle="treeview" role="menu" data-accordion="false">
                <li className="nav-item">
                  <Link href="/client" className="nav-link">
                    <i className="nav-icon bi bi-speedometer2"></i>
                    <p>Dashboard</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/client/templates" className="nav-link">
                    <i className="nav-icon bi bi-box-seam"></i>
                    <p>Template Saya</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/client/settings" className="nav-link">
                    <i className="nav-icon bi bi-gear"></i>
                    <p>Pengaturan</p>
                  </Link>
                </li>
              </ul>

              <p className="nav-header mt-3" style={{ fontSize: 10, letterSpacing: 1, opacity: 0.5, paddingLeft: 16, marginBottom: 4 }}>
                LAINNYA
              </p>
              <ul className="nav sidebar-menu flex-column" role="menu">
                <li className="nav-item">
                  <Link href="/kontak" className="nav-link">
                    <i className="nav-icon bi bi-headset"></i>
                    <p>Hubungi Kami</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <div className="nav-link text-danger" style={{ cursor: 'pointer' }}>
                    <i className="nav-icon bi bi-power"></i>
                    <p>
                      <LogoutButton className="text-danger fw-semibold" style={{}}>
                        Logout
                      </LogoutButton>
                    </p>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        {/* ── MAIN CONTENT ───────────────────────────────────── */}
        <main className="app-main">
          {children}
        </main>

        {/* ── FOOTER ─────────────────────────────────────────── */}
        <footer className="app-footer">
          <div className="float-end d-none d-sm-inline text-muted" style={{ fontSize: 13 }}>
            Exliding Creative Studio
          </div>
          <strong style={{ fontSize: 13 }}>
            Copyright &copy; {new Date().getFullYear()}&nbsp;
            <Link href="/" className="text-decoration-none">www.exliding.my.id</Link>.
          </strong>
          &nbsp;<span className="text-muted" style={{ fontSize: 13 }}>All rights reserved.</span>
        </footer>
      </div>

      <Script src="https://cdn.jsdelivr.net/npm/overlayscrollbars@2.3.0/browser/overlayscrollbars.browser.es6.min.js" strategy="lazyOnload" />
      <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" strategy="lazyOnload" />
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" strategy="lazyOnload" />
      <Script src="https://cdn.jsdelivr.net/npm/admin-lte@4.0.0-rc4/dist/js/adminlte.min.js" strategy="lazyOnload" />
    </div>
  );
}
