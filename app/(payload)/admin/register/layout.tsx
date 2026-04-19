import type { Metadata } from "next"
import "../../../globals.css"

export const metadata: Metadata = {
  title: "Admin Registration | Exliding CMS",
  description: "Daftar sebagai admin Exliding — akses menunggu persetujuan",
  robots: { index: false, follow: false },
}

export default function AdminRegisterLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
