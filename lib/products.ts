import fs from "fs";
import path from "path";

const PRODUCTS_DIR = path.join(process.cwd(), "content/products");

export interface Product {
  id: string;
  name: string;
  price: string;
  period: string;
  tagline: string;
  features: string[];
  cta: string;
  popular: boolean;
  waText: string;
  order: number;
}

export function getAllProducts(): Product[] {
  if (!fs.existsSync(PRODUCTS_DIR)) return [];

  const files = fs
    .readdirSync(PRODUCTS_DIR)
    .filter((f) => f.endsWith(".json"));

  const products = files.map((filename) => {
    const filePath = path.join(PRODUCTS_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as Product;
  });

  return products.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getProductById(id: string): Product | null {
  const filePath = path.join(PRODUCTS_DIR, `${id}.json`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Product;
}
