import Link from 'next/link';

export default function ClientDashboardPage() {
  const dummyTemplates = [
    {
      id: 1,
      name: "Toko Online Spesial",
      type: "E-Commerce",
      date: "01 Nov 2023",
      status: "Aktif",
      url: "https://toko-baju.exliding.my.id",
      downloadUrl: "/downloads/toko-online-spesial.zip",
      fileSize: "12.4 MB",
      version: "v2.1.0",
    },
    {
      id: 2,
      name: "Company Profile Premium",
      type: "Corporate",
      date: "15 Jan 2024",
      status: "Maintenance",
      url: "https://corps.exliding.my.id",
      downloadUrl: "/downloads/company-profile-premium.zip",
      fileSize: "8.7 MB",
      version: "v1.3.2",
    },
    {
      id: 3,
      name: "Undangan Digital Wedding",
      type: "Undangan",
      date: "20 Apr 2024",
      status: "Berakhir",
      url: "https://wedding.exliding.my.id",
      downloadUrl: "/downloads/undangan-digital-wedding.zip",
      fileSize: "5.2 MB",
      version: "v1.0.0",
    },
  ];

  return (
    <>
      <div className="app-content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <h3 className="mb-0">Dashboard Area Klien</h3>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-end">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Dashboard
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="app-content">
        <div className="container-fluid">
          {/* Info Boxes */}
          <div className="row">
            <div className="col-12 col-sm-6 col-md-3">
              <div className="info-box">
                <span className="info-box-icon text-bg-primary shadow-sm">
                  <i className="bi bi-box-seam"></i>
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Total Template</span>
                  <span className="info-box-number">3</span>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <div className="info-box">
                <span className="info-box-icon text-bg-success shadow-sm">
                  <i className="bi bi-check-circle"></i>
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Web Aktif</span>
                  <span className="info-box-number">1</span>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <div className="info-box">
                <span className="info-box-icon text-bg-info shadow-sm">
                  <i className="bi bi-download"></i>
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Total Download</span>
                  <span className="info-box-number">7</span>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <div className="info-box">
                <span className="info-box-icon text-bg-warning shadow-sm">
                  <i className="bi bi-arrow-repeat"></i>
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Update Tersedia</span>
                  <span className="info-box-number">1</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabel Template */}
          <div className="row mt-4">
            <div className="col-md-12">
              <div className="card mb-4 bg-white">
                <div className="card-header border-bottom-0">
                  <h3 className="card-title">
                    <i className="bi bi-box-seam me-2"></i>
                    Daftar Template yang Dibeli
                  </h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-lte-toggle="card-collapse"
                    >
                      <i
                        data-lte-icon="expand"
                        className="bi bi-plus-lg"
                      ></i>
                      <i
                        data-lte-icon="collapse"
                        className="bi bi-dash-lg"
                      ></i>
                    </button>
                  </div>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>ID</th>
                          <th>Nama Template / Projek</th>
                          <th>Kategori</th>
                          <th>Tanggal Pembelian</th>
                          <th>Versi</th>
                          <th>Status</th>
                          <th className="text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dummyTemplates.map((tpl) => (
                          <tr key={tpl.id}>
                            <td>
                              #{tpl.id.toString().padStart(4, "0")}
                            </td>
                            <td>
                              <strong>{tpl.name}</strong>
                              <br />
                              <small className="text-muted">
                                {tpl.fileSize}
                              </small>
                            </td>
                            <td>{tpl.type}</td>
                            <td>{tpl.date}</td>
                            <td>
                              <span className="badge text-bg-secondary">
                                {tpl.version}
                              </span>
                            </td>
                            <td>
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
                            </td>
                            <td className="text-center">
                              <div className="btn-group" role="group">
                                <a
                                  href={tpl.downloadUrl}
                                  download
                                  className="btn btn-sm btn-primary"
                                  title="Download Template"
                                >
                                  <i className="bi bi-download me-1"></i>{" "}
                                  Download
                                </a>
                                <a
                                  href={tpl.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="btn btn-sm btn-outline-primary"
                                  title="Lihat Preview Web"
                                >
                                  <i className="bi bi-box-arrow-up-right me-1"></i>{" "}
                                  Preview
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card-footer clearfix">
                  <Link
                    href="/client/templates"
                    className="btn btn-sm btn-primary float-end"
                  >
                    Lihat Semua Template
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
