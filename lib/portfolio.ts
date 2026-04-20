import fs from "fs";
import path from "path";

const PORTFOLIO_DIR = path.join(process.cwd(), "content/portfolio");

export interface PortfolioItem {
  id: number;
  title: string;
  slug?: string;
  category: string;
  categoryLabel: string;
  image: string;
  link: string;
  description: string;
  tags: string[];
  color: string;
  featured: boolean;
  order: number;
}

// ─── Fetch from Payload CMS ────────────────────────────────────────────────
async function getPayloadPortfolioItems(): Promise<PortfolioItem[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/portfolios?limit=100&where[isActive][equals]=true&sort=order`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    const data = await res.json();

    if (!data.docs || !Array.isArray(data.docs)) return [];

    return data.docs.map((doc: Record<string, unknown>, index: number) => ({
      id: (doc.id as number) || index + 1000,
      title: (doc.title as string) || "",
      slug: (doc.slug as string) || "",
      category: (doc.category as string) || "company",
      categoryLabel: (doc.categoryLabel as string) || "",
      image: typeof doc.image === "object" && doc.image !== null ? (doc.image as any).url : (doc.image as string) || "",
      link: (doc.link as string) || "",
      description: (doc.description as string) || "",
      tags: Array.isArray(doc.tags)
        ? (doc.tags as Array<{ tag: string }>).map((t) => t.tag)
        : [],
      color: (doc.color as string) || "from-blue-600 to-indigo-700",
      featured: Boolean(doc.featured),
      order: (doc.order as number) || 0,
    }));
  } catch {
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
    return JSON.parse(raw) as PortfolioItem;
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
  return merged.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
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
