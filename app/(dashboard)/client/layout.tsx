import Link from 'next/link';
import Script from 'next/script';

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="layout-fixed sidebar-expand-lg bg-body-tertiary">
      <div className="app-wrapper">
        <nav className="app-header navbar navbar-expand bg-body">
          <div className="container-fluid">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" data-lte-toggle="sidebar" href="#" role="button">
                  <i className="bi bi-list"></i>
                </a>
              </li>
              <li className="nav-item d-none d-md-block">
                <Link href="/" className="nav-link">Kembali ke Web</Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#" data-lte-toggle="fullscreen">
                  <i className="data-lte-icon bi bi-arrows-fullscreen"></i>
                </a>
              </li>
              <li className="nav-item dropdown user-menu">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                  <img src="https://ui-avatars.com/api/?name=User&background=random" className="user-image rounded-circle shadow" alt="User Image" />
                  <span className="d-none d-md-inline">Klien Exliding</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
                  <li className="user-header text-bg-primary">
                    <img src="https://ui-avatars.com/api/?name=User&background=random" className="rounded-circle shadow" alt="User Image" />
                    <p>
                      Klien Exliding
                      <small>Member sejak Nov. 2023</small>
                    </p>
                  </li>
                  <li className="user-footer">
                    <a href="#" className="btn btn-default btn-flat">Profile</a>
                    <Link href="/login" className="btn btn-default btn-flat float-end">Sign out</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>

        <aside className="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
          <div className="sidebar-brand">
            <Link href="/" className="brand-link">
              <span className="brand-text fw-bold fs-4">Exliding <span className="fw-light">Client</span></span>
            </Link>
          </div>
          <div className="sidebar-wrapper">
            <nav className="mt-2">
              <ul className="nav sidebar-menu flex-column" data-lte-toggle="treeview" role="menu" data-accordion="false">
                <li className="nav-item">
                  <Link href="/client" className="nav-link active">
                    <i className="nav-icon bi bi-speedometer"></i>
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
                <li className="nav-item mt-4">
                  <Link href="/login" className="nav-link text-danger">
                    <i className="nav-icon bi bi-power"></i>
                    <p>Logout</p>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        <main className="app-main">
          {children}
        </main>

        <footer className="app-footer">
          <div className="float-end d-none d-sm-inline">Exliding Studio</div>
          <strong>
            Copyright &copy; 2024&nbsp;
            <Link href="/" className="text-decoration-none">Exliding.my.id</Link>.
          </strong>
          &nbsp;All rights reserved.
        </footer>
      </div>

      <Script src="https://cdn.jsdelivr.net/npm/overlayscrollbars@2.3.0/browser/overlayscrollbars.browser.es6.min.js" strategy="lazyOnload" />
      <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" strategy="lazyOnload" />
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" strategy="lazyOnload" />
      <Script src="https://cdn.jsdelivr.net/npm/admin-lte@4.0.0-rc4/dist/js/adminlte.min.js" strategy="lazyOnload" />
    </div>
  );
}
