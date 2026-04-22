import fs from "fs";
import path from "path";
import { getPayload } from "payload";
import configPromise from "@payload-config";

const TEMPLATES_DIR = path.join(/*turbopackIgnore: true*/ process.cwd(), "content/templates");

export interface Template {
  id: number | string;
  slug?: string;
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

export function getStaticTemplates(): Template[] {
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

export async function getAllTemplatesAsync(): Promise<Template[]> {
  try {
    const payload = await getPayload({ config: configPromise });

    const data = await payload.find({
      collection: "templates",
      where: {
        isActive: {
          equals: true,
        },
      },
      sort: "order",
      limit: 100,
    });

    if (data.docs && data.docs.length > 0) {
      return data.docs.map((doc: any, index: number) => {
        // Determine preview: prefer previewGradient (CSS class), fall back to upload URL
        let preview = doc.previewGradient || "from-blue-600 to-indigo-700";
        if (!doc.previewGradient && doc.preview) {
          // If there's an uploaded image but no gradient, use the gradient default
          // (The frontend renders preview as CSS gradient classes)
          preview = "from-blue-600 to-indigo-700";
        }

        return {
          id: doc.id || index,
          slug: doc.slug,
          name: doc.name,
          category: doc.category,
          price: doc.price,
          oldPrice: doc.oldPrice || 0,
          buyers: doc.buyers || 0,
          pages: doc.pages || 0,
          tags: doc.tags ? doc.tags.map((t: any) => t.tag) : [],
          preview,
          accentColor: doc.accentColor || "bg-blue-500",
          badge: doc.badge || null,
          features: doc.features ? doc.features.map((f: any) => f.feature) : [],
          waText: doc.waText || "",
          order: doc.order || 0,
        };
      });
    }
  } catch (error) {
    console.warn("Payload CMS Templates belum terisi, fallback ke local data", error);
  }

  return getStaticTemplates();
}

export function getAllTemplates(): Template[] {
  return getStaticTemplates();
}

export async function getTemplatesByCategoryAsync(category: string): Promise<Template[]> {
  return (await getAllTemplatesAsync()).filter((t) => t.category === category);
}

export async function getAllTemplateCategoriesAsync(): Promise<string[]> {
  const templates = await getAllTemplatesAsync();
  const cats = new Set(templates.map((t) => t.category));
  return Array.from(cats).sort();
}

export async function searchTemplatesAsync(query: string): Promise<Template[]> {
  const q = query.toLowerCase();
  return (await getAllTemplatesAsync()).filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q))
  );
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
