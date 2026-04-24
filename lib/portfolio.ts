import fs from "fs";
import path from "path";

const PORTFOLIO_DIR = path.join(/*turbopackIgnore: true*/ process.cwd(), "content/portfolio");

export interface GalleryImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  slug?: string;
  category: string;
  categoryLabel: string;
  image: string;
  gallery: GalleryImage[];
  link: string;
  description: string;
  tags: string[];
  color: string;
  featured: boolean;
  order: number;
}

import { getPayload } from "payload";
import configPromise from "@payload-config";

// ─── Fetch from Payload CMS ────────────────────────────────────────────────
async function getPayloadPortfolioItems(): Promise<PortfolioItem[]> {
  try {
    const payload = await getPayload({ config: configPromise });

    const data = await payload.find({
      collection: "portfolios",
      where: {
        isActive: {
          equals: true,
        },
      },
      sort: "order",
      limit: 100,
    });

    if (!data.docs || !Array.isArray(data.docs)) return [];

    return data.docs.map((doc: any, index: number) => {
      // Helper to resolve image URLs
      const resolveUrl = (rawUrl: string): string => {
        if (!rawUrl) return "";
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
        const knownPrefixes = [siteUrl, "https://www.exliding.my.id", "http://localhost:3000"];
        for (const prefix of knownPrefixes) {
          if (rawUrl.startsWith(prefix)) {
            return rawUrl.replace(prefix, "");
          }
        }
        return rawUrl;
      };

      const coverUrl = typeof doc.image === "object" && doc.image !== null ? doc.image.url : doc.image || "";

      // Extract gallery images
      const gallery: GalleryImage[] = Array.isArray(doc.gallery)
        ? doc.gallery.map((g: any) => ({
            url: resolveUrl(typeof g.image === "object" && g.image !== null ? g.image.url : g.image || ""),
            alt: typeof g.image === "object" && g.image !== null ? g.image.alt || doc.title : doc.title,
            caption: g.caption || undefined,
          }))
        : [];

      return {
        id: doc.id || index + 1000,
        title: doc.title || "",
        slug: doc.slug || "",
        category: doc.category || "company",
        categoryLabel: doc.categoryLabel || "",
        image: resolveUrl(coverUrl),
        gallery,
        link: doc.link || "",
        description: doc.description || "",
        tags: Array.isArray(doc.tags)
          ? doc.tags.map((t: any) => t.tag)
          : [],
        color: doc.color || "from-blue-600 to-indigo-700",
        featured: Boolean(doc.featured),
        order: doc.order || 0,
      };
    });
  } catch (error) {
    console.warn("Error fetching portfolios from Payload", error);
    return [];
  }
}

// ─── Fetch from static JSON files (fallback) ──────────────────────────────
function getStaticPortfolioItems(): PortfolioItem[] {
  if (!fs.existsSync(PORTFOLIO_DIR)) return [];

  const files = fs
    .readdirSync(PORTFOLIO_DIR)
    .filter((f) => f.endsWith(".json"));

  const items = files.map((filename) => {
    const filePath = path.join(PORTFOLIO_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as Omit<PortfolioItem, 'gallery'> & { gallery?: GalleryImage[] };
  });

  return items.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

// ─── Public API ────────────────────────────────────────────────────────────

export async function getAllPortfolioItemsAsync(): Promise<PortfolioItem[]> {
  const cmsItems = await getPayloadPortfolioItems();
  const staticItems = getStaticPortfolioItems();

  // CMS items take priority; merge by matching title to avoid duplicates
  const cmsTitles = new Set(cmsItems.map((i) => i.title.toLowerCase()));
  const uniqueStatic = staticItems.filter(
    (i) => !cmsTitles.has(i.title.toLowerCase())
  );

  const merged = [...cmsItems, ...uniqueStatic];
  return merged
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
    .map((item, index) => ({ ...item, id: index + 1 }));
}

// Synchronous fallback for existing static-only usage (backward compat)
export function getAllPortfolioItems(): PortfolioItem[] {
  return getStaticPortfolioItems();
}

export function getFeaturedPortfolio(count: number = 4): PortfolioItem[] {
  return getAllPortfolioItems()
    .filter((item) => item.featured)
    .slice(0, count);
}

export async function getFeaturedPortfolioAsync(count: number = 4): Promise<PortfolioItem[]> {
  const items = await getAllPortfolioItemsAsync();
  return items.filter((item) => item.featured).slice(0, count);
}

export function getPortfolioByCategory(category: string): PortfolioItem[] {
  return getAllPortfolioItems().filter((item) => item.category === category);
}

export function getAllPortfolioCategories(): string[] {
  const items = getAllPortfolioItems();
  const cats = new Set(items.map((i) => i.category));
  return Array.from(cats).sort();
}
