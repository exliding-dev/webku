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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.exliding.my.id"),
  title: {
    default: "Exliding | Jasa Pembuatan Website Profesional & Murah di Klaten, Jawa Tengah",
    template: "%s | Exliding - Jasa Web Klaten",
  },
  description:
    "Jasa pembuatan website profesional, murah, dan cepat di Klaten & Jawa Tengah. Spesialis website UMKM, company profile, toko online, landing page. SEO friendly & mobile responsive. Mulai dari 500rb!",
  keywords: [
    // Brand
    "Exliding",
    "exliding.my.id",
    // Jasa utama
    "jasa pembuatan website",
    "jasa bikin website",
    "jasa buat website",
    "jasa web developer",
    "jasa web design",
    "jasa pembuatan website profesional",
    "jasa pembuatan website murah",
    // Geo - Klaten
    "jasa pembuatan website Klaten",
    "jasa web developer Klaten",
    "web design Klaten",
    "jasa SEO Klaten",
    "jasa digital marketing Klaten",
    // Geo - Jawa Tengah
    "jasa pembuatan website Jawa Tengah",
    "jasa pembuatan website Solo",
    "jasa pembuatan website Surakarta",
    "jasa pembuatan website Jogja",
    "jasa pembuatan website Yogyakarta",
    "jasa pembuatan website Semarang",
    "jasa pembuatan website Boyolali",
    "jasa pembuatan website Sukoharjo",
    "jasa pembuatan website Karanganyar",
    "jasa pembuatan website Wonogiri",
    // Tipe website
    "website company profile",
    "website toko online",
    "website UMKM",
    "website landing page",
    "website portfolio",
    "website sekolah",
    "website desa",
    "website katalog produk",
    "bikin website toko online",
    "bikin website usaha",
    // Long-tail
    "jasa pembuatan website murah berkualitas",
    "buat website bisnis online",
    "jasa pembuatan landing page",
    "jasa optimasi SEO website",
    "harga jasa pembuatan website",
    "paket pembuatan website",
    "template website Indonesia",
    "web developer freelance Indonesia",
  ],
  authors: [{ name: "Exliding Team", url: "https://www.exliding.my.id" }],
  creator: "Exliding",
  publisher: "Exliding",
  category: "technology",
  alternates: {
    canonical: "https://www.exliding.my.id",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://www.exliding.my.id",
    title: "Exliding | Jasa Pembuatan Website Profesional & Murah di Klaten",
    description:
      "Jasa pembuatan website profesional, murah, dan cepat di Klaten & Jawa Tengah. Spesialis website UMKM, company profile, toko online, landing page. SEO friendly & mobile responsive.",
    siteName: "Exliding",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Exliding - Jasa Pembuatan Website Profesional di Klaten, Jawa Tengah",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Exliding | Jasa Pembuatan Website Profesional & Murah",
    description:
      "Jasa pembuatan website profesional, murah, dan cepat di Klaten. Spesialis website UMKM, company profile, toko online. SEO friendly & mobile responsive.",
    images: ["/og-image.jpg"],
    creator: "@exliding",
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
  other: {
    // Geo targeting meta tags
    "geo.region": "ID-JT",
    "geo.placename": "Klaten, Jawa Tengah, Indonesia",
    "geo.position": "-7.7056;110.6042",
    "ICBM": "-7.7056, 110.6042",
    // Language targeting
    "content-language": "id",
    // Distribution
    "distribution": "Indonesia",
    "rating": "general",
    "revisit-after": "7 days",
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
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
        suppressHydrationWarning
      >
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
