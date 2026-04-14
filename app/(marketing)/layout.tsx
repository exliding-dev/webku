import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import FloatingWhatsApp from "./components/FloatingWhatsApp/FloatingWhatsApp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://exliding.my.id"),
  title: {
    default: "Exliding | Jasa Pembuatan Website Profesional & Murah di Klaten",
    template: "%s | Exliding",
  },
  description:
    "Jasa pembuatan website profesional, murah, dan cepat di Klaten. Cocok untuk UMKM, company profile, dan toko online. Optimasi SEO & mobile friendly.",
  keywords: [
    "Jasa Pembuatan Website Klaten",
    "Buat Website Murah",
    "Exliding",
    "Jasa Web Developer Klaten",
    "Bikin Web Toko Online",
    "Website Company Profile",
    "Jasa SEO Klaten",
    "Web Design Klaten",
    "Jasa Pembuatan Landing Page",
  ],
  authors: [{ name: "Exliding Team" }],
  creator: "Exliding",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://exliding.my.id",
    title: "Exliding | Jasa Pembuatan Website Profesional & Murah",
    description:
      "Jasa pembuatan website profesional, murah, dan cepat di Klaten. Cocok untuk UMKM, company profile, dan toko online.",
    siteName: "Exliding",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Exliding - Jasa Pembuatan Website",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Exliding | Jasa Pembuatan Website Profesional & Murah",
    description:
      "Jasa pembuatan website profesional, murah, dan cepat di Klaten. Cocok untuk UMKM, company profile, dan toko online.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon.ico" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
