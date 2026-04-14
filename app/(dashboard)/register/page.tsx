import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="register-page w-100 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#e9ecef' }}>
      <div className="register-box">
        <div className="register-logo text-center mb-4">
          <Link href="/" className="text-decoration-none">
            <b className="fs-1">Exliding</b> <span className="fs-3">Client</span>
          </Link>
        </div>
        <div className="card card-outline card-primary">
          <div className="card-body register-card-body">
            <p className="login-box-msg text-center mb-3">Daftar sebagai Klien Baru</p>

            <form action="/login" method="get">
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Nama Lengkap" required />
                <div className="input-group-text"><span className="bi bi-person"></span></div>
              </div>
              <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="Email" required />
                <div className="input-group-text"><span className="bi bi-envelope"></span></div>
              </div>
              <div className="input-group mb-3">
                <input type="password" className="form-control" placeholder="Password" required />
                <div className="input-group-text"><span className="bi bi-lock-fill"></span></div>
              </div>
              <div className="input-group mb-3">
                <input type="password" className="form-control" placeholder="Ketik Ulang Password" required />
                <div className="input-group-text"><span className="bi bi-lock-fill"></span></div>
              </div>
              <div className="row mt-4 mb-3">
                <div className="col-8">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="agreeTerms" required />
                    <label className="form-check-label" htmlFor="agreeTerms">
                      Saya setuju dengan <a href="#">Syarat & Ketentuan</a>
                    </label>
                  </div>
                </div>
                <div className="col-4">
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">Daftar</button>
                  </div>
                </div>
              </div>
            </form>

            <p className="mb-0 text-center">
              <Link href="/login" className="text-center text-decoration-none">Sudah punya akun? Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
