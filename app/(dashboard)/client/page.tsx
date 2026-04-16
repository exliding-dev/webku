import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function ClientDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const userName = user?.user_metadata?.name
    || user?.user_metadata?.full_name
    || user?.email?.split('@')[0]
    || 'Klien';

  // Greeting berdasarkan waktu
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Selamat pagi' :
    hour < 15 ? 'Selamat siang' :
    hour < 18 ? 'Selamat sore' :
    'Selamat malam';

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    : '-';

  const dummyTemplates = [
    {
      id: 1,
      name: "Toko Online Spesial",
      type: "E-Commerce",
      date: "01 Nov 2023",
      status: "Aktif",
      statusColor: "success",
      url: "https://toko-baju.exliding.my.id",
      downloadUrl: "/downloads/toko-online-spesial.zip",
      tutorialUrl: "https://www.youtube.com/watch?v=TUTORIAL_TOKO_ONLINE",
      fileSize: "12.4 MB",
      version: "v2.1.0",
      thumbnail: "🛍️",
    },
    {
      id: 2,
      name: "Company Profile Premium",
      type: "Corporate",
      date: "15 Jan 2024",
      status: "Maintenance",
      statusColor: "warning",
      url: "https://corps.exliding.my.id",
      downloadUrl: "/downloads/company-profile-premium.zip",
      tutorialUrl: "https://www.youtube.com/watch?v=TUTORIAL_COMPANY_PROFILE",
      fileSize: "8.7 MB",
      version: "v1.3.2",
      thumbnail: "🏢",
    },
    {
      id: 3,
      name: "Undangan Digital Wedding",
      type: "Undangan",
      date: "20 Apr 2024",
      status: "Berakhir",
      statusColor: "secondary",
      url: "https://wedding.exliding.my.id",
      downloadUrl: "/downloads/undangan-digital-wedding.zip",
      tutorialUrl: "https://www.youtube.com/watch?v=TUTORIAL_UNDANGAN_WEDDING",
      fileSize: "5.2 MB",
      version: "v1.0.0",
      thumbnail: "💍",
    },
  ];

  const totalTemplates = dummyTemplates.length;
  const activeTemplates = dummyTemplates.filter(t => t.status === 'Aktif').length;
  const totalDownloads = 7;
  const updatesAvailable = 1;

  return (
    <>
      {/* ── PAGE HEADER ─────────────────────────────────────── */}
      <div className="app-content-header">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-sm-6">
              <h3 className="mb-0">Dashboard</h3>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-end mb-0">
                <li className="breadcrumb-item">
                  <Link href="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="app-content">
        <div className="container-fluid">

          {/* ── GREETING BANNER ──────────────────────────────── */}
          <div
            className="card border-0 mb-4"
            style={{
              background: 'linear-gradient(135deg, #0d6efd 0%, #0a58ca 60%, #084298 100%)',
              borderRadius: 16,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Decorative circles */}
            <div style={{
              position: 'absolute', width: 200, height: 200,
              borderRadius: '50%', background: 'rgba(255,255,255,0.06)',
              top: -60, right: 80,
            }} />
            <div style={{
              position: 'absolute', width: 120, height: 120,
              borderRadius: '50%', background: 'rgba(255,255,255,0.06)',
              bottom: -30, right: 200,
            }} />

            <div className="card-body py-4 px-4 py-md-5 px-md-5 text-white">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <p className="mb-1 opacity-75" style={{ fontSize: 14 }}>
                    <i className="bi bi-person-check me-1"></i>
                    Client Portal — Exliding
                  </p>
                  <h2 className="fw-bold mb-2" style={{ fontSize: 'clamp(20px, 4vw, 30px)' }}>
                    {greeting}, {userName}! 👋
                  </h2>
                  <p className="opacity-75 mb-3" style={{ fontSize: 14, maxWidth: 480 }}>
                    Selamat datang di area klien Anda. Di sini Anda bisa mengelola template,
                    mengunduh file, dan melihat preview proyek Anda.
                  </p>
                  <div className="d-flex gap-2 flex-wrap">
                    <Link href="/client/templates" className="btn btn-light btn-sm fw-semibold px-3">
                      <i className="bi bi-box-seam me-1"></i>Lihat Template
                    </Link>
                    <Link href="/kontak" className="btn btn-outline-light btn-sm px-3">
                      <i className="bi bi-headset me-1"></i>Hubungi Kami
                    </Link>
                  </div>
                </div>
                <div className="col-md-4 d-none d-md-flex justify-content-end align-items-center">
                  <div className="text-end">
                    <div style={{ fontSize: 64 }}>📦</div>
                    <div style={{ fontSize: 12, opacity: 0.6 }}>Member sejak {memberSince}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── STATS CARDS ──────────────────────────────────── */}
          <div className="row g-3 mb-4">
            <div className="col-6 col-md-3">
              <div className="info-box shadow-sm h-100 mb-0" style={{ borderRadius: 12 }}>
                <span className="info-box-icon text-bg-primary shadow-sm" style={{ borderRadius: '10px 0 0 10px' }}>
                  <i className="bi bi-box-seam fs-4"></i>
                </span>
                <div className="info-box-content">
                  <span className="info-box-text text-muted" style={{ fontSize: 12 }}>Total Template</span>
                  <span className="info-box-number fw-bold fs-4">{totalTemplates}</span>
                  <span className="progress-description" style={{ fontSize: 11, color: '#6c757d' }}>template dibeli</span>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="info-box shadow-sm h-100 mb-0" style={{ borderRadius: 12 }}>
                <span className="info-box-icon text-bg-success shadow-sm" style={{ borderRadius: '10px 0 0 10px' }}>
                  <i className="bi bi-check-circle fs-4"></i>
                </span>
                <div className="info-box-content">
                  <span className="info-box-text text-muted" style={{ fontSize: 12 }}>Web Aktif</span>
                  <span className="info-box-number fw-bold fs-4">{activeTemplates}</span>
                  <span className="progress-description" style={{ fontSize: 11, color: '#6c757d' }}>sedang berjalan</span>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="info-box shadow-sm h-100 mb-0" style={{ borderRadius: 12 }}>
                <span className="info-box-icon text-bg-info shadow-sm" style={{ borderRadius: '10px 0 0 10px' }}>
                  <i className="bi bi-download fs-4"></i>
                </span>
                <div className="info-box-content">
                  <span className="info-box-text text-muted" style={{ fontSize: 12 }}>Total Download</span>
                  <span className="info-box-number fw-bold fs-4">{totalDownloads}</span>
                  <span className="progress-description" style={{ fontSize: 11, color: '#6c757d' }}>kali diunduh</span>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="info-box shadow-sm h-100 mb-0" style={{ borderRadius: 12 }}>
                <span className="info-box-icon text-bg-warning shadow-sm" style={{ borderRadius: '10px 0 0 10px' }}>
                  <i className="bi bi-arrow-repeat fs-4"></i>
                </span>
                <div className="info-box-content">
                  <span className="info-box-text text-muted" style={{ fontSize: 12 }}>Update Tersedia</span>
                  <span className="info-box-number fw-bold fs-4">{updatesAvailable}</span>
                  <span className="progress-description" style={{ fontSize: 11, color: '#6c757d' }}>perlu diperbarui</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── MAIN ROW ─────────────────────────────────────── */}
          <div className="row g-3">

            {/* Template Table */}
            <div className="col-lg-8">
              <div className="card shadow-sm border-0 h-100" style={{ borderRadius: 12 }}>
                <div className="card-header bg-white border-bottom d-flex align-items-center justify-content-between py-3" style={{ borderRadius: '12px 12px 0 0' }}>
                  <h6 className="mb-0 fw-bold">
                    <i className="bi bi-box-seam me-2 text-primary"></i>
                    Template yang Dibeli
                  </h6>
                  <Link href="/client/templates" className="btn btn-sm btn-outline-primary px-3" style={{ fontSize: 12 }}>
                    Lihat Semua
                  </Link>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table align-middle mb-0" style={{ fontSize: 14 }}>
                      <thead>
                        <tr style={{ background: '#f8f9fa' }}>
                          <th className="px-3 py-2 fw-semibold text-muted border-0" style={{ fontSize: 12 }}>TEMPLATE</th>
                          <th className="py-2 fw-semibold text-muted border-0" style={{ fontSize: 12 }}>KATEGORI</th>
                          <th className="py-2 fw-semibold text-muted border-0" style={{ fontSize: 12 }}>STATUS</th>
                          <th className="py-2 fw-semibold text-muted border-0 text-center" style={{ fontSize: 12 }}>AKSI</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dummyTemplates.map((tpl) => (
                          <tr key={tpl.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                            <td className="px-3 py-3">
                              <div className="d-flex align-items-center gap-2">
                                <div style={{
                                  width: 38, height: 38, borderRadius: 8,
                                  background: '#f0f4ff',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  fontSize: 20, flexShrink: 0,
                                }}>
                                  {tpl.thumbnail}
                                </div>
                                <div>
                                  <div className="fw-semibold" style={{ fontSize: 13 }}>{tpl.name}</div>
                                  <div className="text-muted" style={{ fontSize: 11 }}>
                                    {tpl.fileSize} · {tpl.version} · {tpl.date}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="badge rounded-pill bg-light text-dark border" style={{ fontSize: 11 }}>
                                {tpl.type}
                              </span>
                            </td>
                            <td>
                              <span className={`badge rounded-pill text-bg-${tpl.statusColor}`} style={{ fontSize: 11 }}>
                                {tpl.status}
                              </span>
                            </td>
                            <td className="text-center">
                              <div className="d-flex gap-1 justify-content-center">
                                <a
                                  href={tpl.downloadUrl}
                                  download
                                  className="btn btn-sm btn-primary px-2 py-1"
                                  title="Download"
                                  style={{ fontSize: 12 }}
                                >
                                  <i className="bi bi-download"></i>
                                </a>
                                <a
                                  href={tpl.tutorialUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="btn btn-sm btn-danger px-2 py-1"
                                  title="Tutorial"
                                  style={{ fontSize: 12 }}
                                >
                                  <i className="bi bi-play-circle"></i>
                                </a>
                                <a
                                  href={tpl.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="btn btn-sm btn-outline-secondary px-2 py-1"
                                  title="Preview"
                                  style={{ fontSize: 12 }}
                                >
                                  <i className="bi bi-box-arrow-up-right"></i>
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="col-lg-4 d-flex flex-column gap-3">

              {/* Account info card */}
              <div className="card shadow-sm border-0" style={{ borderRadius: 12 }}>
                <div className="card-header bg-white border-bottom py-3" style={{ borderRadius: '12px 12px 0 0' }}>
                  <h6 className="mb-0 fw-bold">
                    <i className="bi bi-person-circle me-2 text-primary"></i>
                    Akun Saya
                  </h6>
                </div>
                <div className="card-body py-3 px-3">
                  <div className="d-flex flex-column gap-2" style={{ fontSize: 13 }}>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Nama</span>
                      <span className="fw-semibold text-end" style={{ maxWidth: '60%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{userName}</span>
                    </div>
                    <hr className="my-1" />
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Email</span>
                      <span className="fw-semibold text-end" style={{ maxWidth: '60%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 12 }}>{user?.email}</span>
                    </div>
                    <hr className="my-1" />
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Bergabung</span>
                      <span className="fw-semibold">{memberSince}</span>
                    </div>
                    <hr className="my-1" />
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-muted">Provider</span>
                      <span className="badge rounded-pill text-bg-light border" style={{ fontSize: 11 }}>
                        {user?.app_metadata?.provider === 'google'
                          ? '🟢 Google'
                          : '📧 Email'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick actions card */}
              <div className="card shadow-sm border-0" style={{ borderRadius: 12 }}>
                <div className="card-header bg-white border-bottom py-3" style={{ borderRadius: '12px 12px 0 0' }}>
                  <h6 className="mb-0 fw-bold">
                    <i className="bi bi-lightning-charge me-2 text-warning"></i>
                    Aksi Cepat
                  </h6>
                </div>
                <div className="card-body py-2 px-3">
                  <div className="d-flex flex-column gap-1">
                    {[
                      { icon: 'bi-box-seam', label: 'Template Saya', href: '/client/templates', color: 'primary' },
                      { icon: 'bi-headset', label: 'Hubungi Support', href: '/kontak', color: 'info' },
                      { icon: 'bi-globe', label: 'Lihat Website', href: '/', color: 'success' },
                      { icon: 'bi-gear', label: 'Pengaturan Akun', href: '/client/settings', color: 'secondary' },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="d-flex align-items-center gap-2 px-3 py-2 rounded text-decoration-none dashboard-quick-link"
                      >
                        <span
                          style={{
                            width: 30, height: 30, borderRadius: 8, display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            background: `var(--bs-${item.color}-bg-subtle, #f0f4ff)`,
                          }}
                        >
                          <i className={`bi ${item.icon} text-${item.color}`} style={{ fontSize: 14 }}></i>
                        </span>
                        <span className="fw-medium">{item.label}</span>
                        <i className="bi bi-chevron-right ms-auto text-muted" style={{ fontSize: 11 }}></i>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
