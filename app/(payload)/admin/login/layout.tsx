import type { Metadata } from "next"
import "../../../globals.css"

export const metadata: Metadata = {
  title: "Admin Login | Exliding CMS",
  description: "Akses terbatas — Login ke Exliding Admin Portal",
  robots: { index: false, follow: false },
}

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
