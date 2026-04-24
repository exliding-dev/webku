import { getPayload } from "payload";
import configPromise from "@payload-config";

export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar?: string;
  initials: string;
  accent: string;
  order: number;
}

// ─── Static Fallback Data ──────────────────────────────────────────────────
const STATIC_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    name: "Budi Santoso",
    role: "Pemilik Toko Online",
    quote: "Website yang dibuat sangat profesional dan loading-nya super cepat. Penjualan online saya naik 3x lipat sejak pakai jasa Exliding!",
    rating: 5,
    initials: "BS",
    accent: "bg-primary",
    order: 1,
  },
  {
    id: 2,
    name: "Sari Dewi",
    role: "Owner Klinik Kecantikan",
    quote: "Desainnya modern dan responsif di semua device. Tim support-nya juga sangat responsif dan membantu. Highly recommended!",
    rating: 5,
    initials: "SD",
    accent: "bg-brutal-accent",
    order: 2,
  },
  {
    id: 3,
    name: "Andi Prasetyo",
    role: "Direktur CV Maju Bersama",
    quote: "Dari konsultasi sampai website jadi, prosesnya cepat dan transparan. Website company profile kami sekarang jadi kebanggaan perusahaan.",
    rating: 5,
    initials: "AP",
    accent: "bg-primary",
    order: 3,
  },
  {
    id: 4,
    name: "Rina Wati",
    role: "Pemilik Restoran",
    quote: "Dulu pelanggan susah cari info menu dan lokasi kami. Sekarang dengan website baru, reservasi online meningkat drastis!",
    rating: 5,
    initials: "RW",
    accent: "bg-brutal-accent",
    order: 4,
  },
  {
    id: 5,
    name: "Hendra Wijaya",
    role: "CEO Startup Tech",
    quote: "Kualitas website setara agency besar tapi harganya sangat terjangkau. SEO-nya juga mantap, traffic organik naik signifikan.",
    rating: 5,
    initials: "HW",
    accent: "bg-primary",
    order: 5,
  },
  {
    id: 6,
    name: "Maya Sari",
    role: "Freelance Designer",
    quote: "Portfolio website yang dibuat benar-benar mencerminkan brand saya. Banyak klien baru datang setelah melihat website saya!",
    rating: 5,
    initials: "MS",
    accent: "bg-brutal-accent",
    order: 6,
  },
];

// ─── Fetch from Payload CMS ───────────────────────────────────────────────
async function getPayloadTestimonials(): Promise<TestimonialItem[]> {
  try {
    const payload = await getPayload({ config: configPromise });

    const data = await payload.find({
      collection: "testimonials",
      where: { isActive: { equals: true } },
      sort: "order",
      limit: 100,
    });

    if (!data.docs || !Array.isArray(data.docs) || data.docs.length === 0) {
      return [];
    }

    return data.docs.map((doc: any, index: number) => {
      // Generate initials from name if not provided
      const initials = doc.initials || doc.name
        .split(" ")
        .map((w: string) => w[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

      // Resolve avatar URL
      let avatar: string | undefined;
      if (typeof doc.avatar === "object" && doc.avatar !== null && doc.avatar.url) {
        const rawUrl = doc.avatar.url;
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
        const knownPrefixes = [siteUrl, "https://www.exliding.my.id", "http://localhost:3000"];
        avatar = rawUrl;
        for (const prefix of knownPrefixes) {
          if (rawUrl.startsWith(prefix)) {
            avatar = rawUrl.replace(prefix, "");
            break;
          }
        }
      }

      return {
        id: doc.id || index + 1,
        name: doc.name || "",
        role: doc.role || "",
        quote: doc.quote || "",
        rating: doc.rating || 5,
        avatar,
        initials,
        accent: doc.accent || "bg-primary",
        order: doc.order || 0,
      };
    });
  } catch (error) {
    console.warn("Error fetching testimonials from Payload", error);
    return [];
  }
}

// ─── Public API ────────────────────────────────────────────────────────────

export async function getAllTestimonialsAsync(): Promise<TestimonialItem[]> {
  const cmsItems = await getPayloadTestimonials();

  // CMS data takes priority; fall back to static data if CMS is empty
  if (cmsItems.length > 0) {
    return cmsItems.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  }

  return STATIC_TESTIMONIALS;
}

export function getAllTestimonials(): TestimonialItem[] {
  return STATIC_TESTIMONIALS;
}
