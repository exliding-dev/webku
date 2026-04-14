import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="login-page w-100 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#e9ecef' }}>
      <div className="login-box">
        <div className="login-logo text-center mb-4">
          <Link href="/" className="text-decoration-none">
            <b className="fs-1">Exliding</b> <span className="fs-3">Client</span>
          </Link>
        </div>
        <div className="card card-outline card-primary">
          <div className="card-body login-card-body">
            <p className="login-box-msg text-center mb-3">Log in untuk akses template Anda</p>
            
            <form action="/client" method="get">
              <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="Email" required />
                <div className="input-group-text"><span className="bi bi-envelope"></span></div>
              </div>
              <div className="input-group mb-3">
                <input type="password" className="form-control" placeholder="Password" required />
                <div className="input-group-text"><span className="bi bi-lock-fill"></span></div>
              </div>
              <div className="row mt-4 mb-3">
                <div className="col-8">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                      Ingat Saya
                    </label>
                  </div>
                </div>
                <div className="col-4">
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">Masuk</button>
                  </div>
                </div>
              </div>
            </form>
            
            <p className="mb-1">
              <a href="#" className="text-decoration-none">Lupa password?</a>
            </p>
            <p className="mb-0">
              <Link href="/register" className="text-center text-decoration-none">Belum punya akun? Daftar sekarang</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
