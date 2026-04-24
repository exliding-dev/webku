import { getPayload } from "payload";
import configPromise from "@payload-config";

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  order: number;
}

// ─── Static Fallback Data ──────────────────────────────────────────────────
const STATIC_FAQS: FAQItem[] = [
  {
    id: 1,
    question: "Berapa lama waktu pengerjaan website?",
    answer: "Untuk paket Starter, pengerjaan memakan waktu 3–5 hari kerja. Paket Pro membutuhkan 5–7 hari kerja, sedangkan Paket Bisnis sekitar 7–14 hari kerja tergantung kompleksitas fitur yang diminta. Kami selalu berkomunikasi progres secara transparan.",
    category: "general",
    order: 1,
  },
  {
    id: 2,
    question: "Apakah saya bisa request desain custom?",
    answer: "Tentu saja! Semua paket kami menyediakan desain yang disesuaikan dengan identitas brand Anda. Kami akan berdiskusi tentang warna, layout, dan style yang Anda inginkan sebelum mulai mengerjakan.",
    category: "service",
    order: 2,
  },
  {
    id: 3,
    question: "Apakah website sudah termasuk domain dan hosting?",
    answer: "Ya, semua paket sudah termasuk domain (.com atau .net) gratis selama 1 tahun dan hosting dengan spesifikasi sesuai paket yang dipilih. Anda tidak perlu repot mengurus infrastruktur teknis.",
    category: "service",
    order: 3,
  },
  {
    id: 4,
    question: "Bagaimana dengan maintenance setelah website jadi?",
    answer: "Kami menyediakan support after-launch untuk semua paket. Jika ada update konten, perbaikan bug, atau pertanyaan teknis, tim kami siap membantu. Untuk maintenance rutin bulanan, tersedia paket terpisah dengan harga terjangkau.",
    category: "technical",
    order: 4,
  },
  {
    id: 5,
    question: "Apakah website-nya SEO-friendly?",
    answer: "Absolutly! Semua website yang kami buat sudah dioptimasi untuk SEO on-page, termasuk meta tags, struktur heading, sitemap, loading speed optimization, dan mobile responsiveness. Kami juga menyediakan artikel SEO-ready sesuai paket.",
    category: "technical",
    order: 5,
  },
  {
    id: 6,
    question: "Metode pembayaran apa saja yang tersedia?",
    answer: 'Kami menerima pembayaran melalui transfer bank (BCA, BRI, Mandiri, BNI), e-wallet (GoPay, OVO, Dana), dan juga bisa dengan sistem cicilan. Pembayaran dilakukan 50% di awal dan 50% setelah website selesai.',
    category: "payment",
    order: 6,
  },
];

// ─── Fetch from Payload CMS ───────────────────────────────────────────────
async function getPayloadFAQs(): Promise<FAQItem[]> {
  try {
    const payload = await getPayload({ config: configPromise });

    const data = await payload.find({
      collection: "faqs",
      where: { isActive: { equals: true } },
      sort: "order",
      limit: 100,
    });

    if (!data.docs || !Array.isArray(data.docs) || data.docs.length === 0) {
      return [];
    }

    return data.docs.map((doc: any, index: number) => ({
      id: doc.id || index + 1,
      question: doc.question || "",
      answer: doc.answer || "",
      category: doc.category || "general",
      order: doc.order || 0,
    }));
  } catch (error) {
    console.warn("Error fetching FAQs from Payload", error);
    return [];
  }
}

// ─── Public API ────────────────────────────────────────────────────────────

export async function getAllFAQsAsync(): Promise<FAQItem[]> {
  const cmsItems = await getPayloadFAQs();

  // CMS data takes priority; fall back to static data if CMS is empty
  if (cmsItems.length > 0) {
    return cmsItems.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  }

  return STATIC_FAQS;
}

export function getAllFAQs(): FAQItem[] {
  return STATIC_FAQS;
}
