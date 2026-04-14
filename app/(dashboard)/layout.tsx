import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import 'overlayscrollbars/styles/overlayscrollbars.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'admin-lte/dist/css/adminlte.min.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Client Dashboard | Exliding',
  description: 'Manage your purchased templates',
};

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-body-tertiary antialiased`}>
        {children}
      </body>
    </html>
  );
}
