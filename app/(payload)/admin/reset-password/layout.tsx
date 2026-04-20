import type { Metadata } from "next"
import "../../../globals.css"

export const metadata: Metadata = {
  title: "Reset Password Admin | Exliding CMS",
  description: "Reset password akun admin Exliding CMS",
  robots: { index: false, follow: false },
}

export default function AdminResetPasswordLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
