import Link from 'next/link';

export default function TemplateSayaPage() {
  const templates = [
    {
      id: 1,
      name: "Toko Online Spesial",
      description: "Template e-commerce lengkap dengan keranjang belanja, checkout, dan integrasi pembayaran. Cocok untuk toko online fashion, elektronik, dan marketplace.",
      type: "E-Commerce",
      date: "01 Nov 2023",
      status: "Aktif",
      url: "https://toko-baju.exliding.my.id",
      downloadUrl: "/downloads/toko-online-spesial.zip",
      tutorialUrl: "https://www.youtube.com/watch?v=TUTORIAL_TOKO_ONLINE",
      fileSize: "12.4 MB",
      version: "v2.1.0",
      techStack: ["Next.js", "Tailwind CSS", "PostgreSQL"],
      thumbnail: "https://placehold.co/600x340/0d6efd/ffffff?text=Toko+Online",
      changelog: "Perbaikan bug checkout & update desain halaman produk",
    },
    {
      id: 2,
      name: "Company Profile Premium",
      description: "Template company profile modern dengan animasi smooth, halaman about, service, portfolio, dan kontak. SEO-optimized dan mobile friendly.",
      type: "Corporate",
      date: "15 Jan 2024",
      status: "Maintenance",
      url: "https://corps.exliding.my.id",
      downloadUrl: "/downloads/company-profile-premium.zip",
      tutorialUrl: "https://www.youtube.com/watch?v=TUTORIAL_COMPANY_PROFILE",
      fileSize: "8.7 MB",
      version: "v1.3.2",
      techStack: ["React", "Bootstrap 5", "Node.js"],
      thumbnail: "https://placehold.co/600x340/198754/ffffff?text=Company+Profile",
      changelog: "Maintenance rutin: update dependensi keamanan",
    },
    {
      id: 3,
      name: "Undangan Digital Wedding",
      description: "Undangan digital pernikahan elegan dengan RSVP, galeri foto, countdown, dan musik latar. Mendukung multi-bahasa dan custom domain.",
      type: "Undangan",
      date: "20 Apr 2024",
      status: "Berakhir",
      url: "https://wedding.exliding.my.id",
      downloadUrl: "/downloads/undangan-digital-wedding.zip",
      tutorialUrl: "https://www.youtube.com/watch?v=TUTORIAL_UNDANGAN_WEDDING",
      fileSize: "5.2 MB",
      version: "v1.0.0",
      techStack: ["HTML", "CSS", "JavaScript"],
      thumbnail: "https://placehold.co/600x340/dc3545/ffffff?text=Undangan+Wedding",
      changelog: "Rilis pertama",
    },
  ];

  return (
    <>
      <div className="app-content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <h3 className="mb-0">Template Saya</h3>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-end">
                <li className="breadcrumb-item">
                  <Link href="/client">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Template Saya
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="app-content">
        <div className="container-fluid">
          {/* Alert Info */}
          <div className="alert alert-info alert-dismissible fade show" role="alert">
            <i className="bi bi-info-circle me-2"></i>
            File template dapat diunduh dalam format <strong>.zip</strong>. Ekstrak file setelah mengunduh untuk mendapatkan source code lengkap beserta dokumentasi.
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>

          {/* Template Cards */}
          {templates.map((tpl) => (
            <div key={tpl.id} className="card mb-4 bg-white">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">
                  <i className="bi bi-box-seam me-2"></i>
                  {tpl.name}
                </h5>
                <span
                  className={`badge ${
                    tpl.status === "Aktif"
                      ? "text-bg-success"
                      : tpl.status === "Maintenance"
                      ? "text-bg-warning"
                      : "text-bg-danger"
                  }`}
                >
                  {tpl.status}
                </span>
              </div>
              <div className="card-body">
                <div className="row">
                  {/* Thumbnail */}
                  <div className="col-md-4 mb-3 mb-md-0">
                    <img
                      src={tpl.thumbnail}
                      alt={tpl.name}
                      className="img-fluid rounded shadow-sm"
                      style={{ width: "100%", objectFit: "cover" }}
                    />
                  </div>

                  {/* Detail Info */}
                  <div className="col-md-5">
                    <p className="text-muted">{tpl.description}</p>

                    <table className="table table-sm table-borderless mb-0">
                      <tbody>
                        <tr>
                          <td className="fw-bold text-nowrap" style={{ width: "140px" }}>
                            <i className="bi bi-tag me-1"></i> Kategori
                          </td>
                          <td>{tpl.type}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold text-nowrap">
                            <i className="bi bi-calendar-event me-1"></i> Dibeli
                          </td>
                          <td>{tpl.date}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold text-nowrap">
                            <i className="bi bi-code-slash me-1"></i> Versi
                          </td>
                          <td>
                            <span className="badge text-bg-secondary">{tpl.version}</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="fw-bold text-nowrap">
                            <i className="bi bi-hdd me-1"></i> Ukuran File
                          </td>
                          <td>{tpl.fileSize}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold text-nowrap">
                            <i className="bi bi-stack me-1"></i> Tech Stack
                          </td>
                          <td>
                            {tpl.techStack.map((tech) => (
                              <span key={tech} className="badge text-bg-light border me-1">
                                {tech}
                              </span>
                            ))}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Action Panel */}
                  <div className="col-md-3">
                    <div className="d-grid gap-2">
                      <a
                        href={tpl.downloadUrl}
                        download
                        className="btn btn-primary btn-lg"
                      >
                        <i className="bi bi-download me-2"></i>
                        Download .zip
                      </a>
                      <a
                        href={tpl.tutorialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-danger"
                      >
                        <i className="bi bi-play-circle me-2"></i>
                        Cara Pasang Template
                      </a>
                      <a
                        href={tpl.url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline-secondary"
                      >
                        <i className="bi bi-box-arrow-up-right me-2"></i>
                        Preview Web
                      </a>
                    </div>

                    <hr />

                    <div className="small text-muted">
                      <i className="bi bi-journal-text me-1"></i>
                      <strong>Changelog terbaru:</strong>
                      <p className="mt-1 mb-0">{tpl.changelog}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
