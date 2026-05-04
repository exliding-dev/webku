import { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import PaketClient from "./PaketClient";

export const metadata: Metadata = {
  title: "Paket & Harga Jasa Pembuatan Website",
  description:
    "Lihat paket dan harga jasa pembuatan website dari Exliding. Mulai dari website UMKM, company profile, toko online hingga landing page. Harga terjangkau, kualitas profesional di Klaten & Jawa Tengah.",
  keywords: [
    "harga jasa pembuatan website",
    "paket website murah",
    "harga bikin website",
    "paket website UMKM",
    "harga website company profile",
    "paket website toko online",
    "harga jasa web Klaten",
  ],
  alternates: {
    canonical: "/paket",
  },
  openGraph: {
    title: "Paket & Harga Jasa Pembuatan Website | Exliding",
    description:
      "Pilih paket pembuatan website yang sesuai kebutuhan bisnis Anda. Harga terjangkau, kualitas profesional.",
    url: "/paket",
  },
};

// Render at request time so Payload CMS data is fetched at runtime,
// not during build when the DB may be unreachable.
export const dynamic = "force-dynamic";

export default async function PaketPage() {
  const plans = await getAllProducts();
  return <PaketClient plans={plans} />;
}
