import fs from "fs";
import path from "path";

const PORTFOLIO_DIR = path.join(process.cwd(), "content/portfolio");

export interface PortfolioItem {
  id: number;
  title: string;
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

export function getAllPortfolioItems(): PortfolioItem[] {
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

export function getFeaturedPortfolio(count: number = 4): PortfolioItem[] {
  return getAllPortfolioItems()
    .filter((item) => item.featured)
    .slice(0, count);
}

export function getPortfolioByCategory(category: string): PortfolioItem[] {
  return getAllPortfolioItems().filter((item) => item.category === category);
}

export function getAllPortfolioCategories(): string[] {
  const items = getAllPortfolioItems();
  const cats = new Set(items.map((i) => i.category));
  return Array.from(cats).sort();
}
