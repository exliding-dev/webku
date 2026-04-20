import type { Product } from "./products";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export const ONE_TIME_SERVICES: Product[] = [
  {
    id: "starter",
    name: "Paket Starter",
    price: "Rp 1.000.000",
    period: "/sekali bayar",
    tagline: "Paket Pemula Terbaik",
    features: [
      "Gratis Domain .com atau .net selama 1 tahun",
      "Hosting RAM 1 GB & Storage 2 GB",
      "Free SSL untuk keamanan",
      "Backup Harian",
      "Desain Premium & Responsif",
      "2 Artikel SEO-ready",
      "Setup Protection",
      "1 Halaman (utama + tambahan)",
    ],
    renewal: "Rp600.000",
    notes: "Tidak termasuk cPanel",
    cta: "Pesan Sekarang",
    popular: false,
    waText: "Halo%20saya%20tertarik%20Paket%20Starter",
    order: 1,
  },
  {
    id: "pro",
    name: "Paket Pro",
    price: "Rp 1.500.000",
    period: "/sekali bayar",
    tagline: "Paling populer untuk UMKM & bisnis lokal",
    features: [
      "Gratis Domain .com atau .net selama 1 tahun",
      "Hosting SSD RAM 3 GB & Storage 5 GB",
      "Free SSL untuk keamanan",
      "Backup Harian",
      "Desain Premium & Responsif",
      "4 Artikel SEO-ready",
      "Setup Protection",
      "7 Halaman fleksibel",
      "free 1 tahun elementor pro",
    ],
    renewal: "Rp850.000",
    notes: "Tidak termasuk cPanel",
    cta: "Pesan Sekarang",
    popular: true,
    waText: "Halo%20saya%20tertarik%20Paket%20Pro",
    order: 2,
  },
  {
    id: "bisnis",
    name: "Paket Bisnis",
    price: "Rp 3.000.000",
    period: "/sekali bayar",
    tagline: "Untuk bisnis yang siap scale up",
    features: [
      "Gratis Domain .com atau .net selama 1 tahun",
      "Hosting SSD RAM 6 GB & Unlimited Storage",
      "Termasuk H Panel",
      "Free SSL untuk keamanan",
      "Backup Harian",
      "Desain Premium & Responsif",
      "free 2 tahun elementor pro",
      "10 Halaman fleksibel",
      "6 Artikel SEO-ready",
      "Setup Protection",
    ],
    renewal: "Rp1.500.000",
    notes: undefined,
    cta: "Pesan Sekarang",
    popular: false,
    waText: "Halo%20saya%20tertarik%20Paket%20Bisnis",
    order: 3,
  },
];

export async function getServices(): Promise<Product[]> {
  try {
    const payload = await getPayload({ config: configPromise });

    // Ambil data layanan dari Payload CMS
    const data = await payload.find({
      collection: "services",
      where: {
        isActive: {
          equals: true,
        },
      },
      sort: "order",
    });

    if (data.docs && data.docs.length > 0) {
      return data.docs.map((doc: any) => ({
        id: doc.slug,
        name: doc.name,
        price: doc.price,
        period: doc.period,
        tagline: doc.tagline,
        // Map features dari struktur array ke array string
        features: doc.features
          ? doc.features.map((f: any) => f.feature)
          : [],
        renewal: doc.renewal || null,
        notes: doc.notes || null,
        cta: doc.cta,
        popular: doc.popular || false,
        waText: doc.waText || "",
        order: doc.order || 0,
        hasDiscount: doc.hasDiscount || false,
        discount: doc.discount || undefined,
      }));
    }
  } catch (error) {
    console.warn(
      "Payload CMS Services belum terisi, fallback ke local data",
      error
    );
  }

  // Jika CMS kosong, kembalikan paket sekali bayar
  return ONE_TIME_SERVICES;
}
