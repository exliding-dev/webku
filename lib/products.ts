import fs from "fs";
import path from "path";
import { getPayload } from "payload";
import configPromise from "@payload-config";

const PRODUCTS_DIR = path.join(process.cwd(), "content/products");

export interface Product {
  id: string;
  name: string;
  price: string | number; // Bisa string dari JSON misal "Rp 10.000", atau number dari Payload
  period: string;
  tagline: string;
  features: string[] | any;
  cta: string;
  popular: boolean;
  waText: string;
  order: number;
  // Diskon support untuk payload
  hasDiscount?: boolean;
  discount?: {
    label?: string | null;
    percentage?: number | null;
    nominal?: number | null;
    activeUntil?: string | null;
  };
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const payload = await getPayload({ config: configPromise });
    
    // Ambil data produk yang aktif dari Payload
    const data = await payload.find({
      collection: "products",
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
        // Map features dari struktur array block ke array string
        features: doc.features ? doc.features.map((f: any) => f.feature) : [],
        cta: doc.cta,
        popular: doc.popular || false,
        waText: doc.waText || '',
        order: doc.order || 0,
        hasDiscount: doc.hasDiscount || false,
        discount: doc.discount || undefined,
      }));
    }
  } catch (error) {
    console.warn("Payload CMS belum terisi, fallback ke lokal file JSON", error);
  }

  // Fallback membaca local JSON jika Payload kosong
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

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const payload = await getPayload({ config: configPromise });
    
    // Ambil produk berdasarkan custom "slug" field
    const data = await payload.find({
      collection: "products",
      where: {
        slug: {
          equals: id,
        },
      },
    });

    if (data.docs && data.docs.length > 0) {
      const doc = data.docs[0] as any;
      return {
        id: doc.slug,
        name: doc.name,
        price: doc.price,
        period: doc.period,
        tagline: doc.tagline,
        features: doc.features ? doc.features.map((f: any) => f.feature) : [],
        cta: doc.cta,
        popular: doc.popular || false,
        waText: doc.waText || '',
        order: doc.order || 0,
        hasDiscount: doc.hasDiscount || false,
        discount: doc.discount || undefined,
      };
    }
  } catch (error) {
    console.warn("Error GET Payload, fallback to JSON", error);
  }

  // Fallback lokal JSON
  const filePath = path.join(PRODUCTS_DIR, `${id}.json`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Product;
}
