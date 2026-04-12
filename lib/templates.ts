import fs from "fs";
import path from "path";

const TEMPLATES_DIR = path.join(process.cwd(), "content/templates");

export interface Template {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  buyers: number;
  pages: number;
  tags: string[];
  preview: string;
  accentColor: string;
  badge: string | null;
  features: string[];
  waText: string;
  order: number;
}

export function getAllTemplates(): Template[] {
  if (!fs.existsSync(TEMPLATES_DIR)) return [];

  const files = fs
    .readdirSync(TEMPLATES_DIR)
    .filter((f) => f.endsWith(".json"));

  const templates = files.map((filename) => {
    const filePath = path.join(TEMPLATES_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as Template;
  });

  return templates.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getTemplatesByCategory(category: string): Template[] {
  return getAllTemplates().filter((t) => t.category === category);
}

export function getAllTemplateCategories(): string[] {
  const templates = getAllTemplates();
  const cats = new Set(templates.map((t) => t.category));
  return Array.from(cats).sort();
}

export function searchTemplates(query: string): Template[] {
  const q = query.toLowerCase();
  return getAllTemplates().filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q))
  );
}
