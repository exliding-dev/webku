import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { PortfolioItem } from "./portfolio";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  thumbnail: string;
  tags: string[];
  author: string;
  content: string;
  isFromCMS?: boolean;
  relatedPortfolios?: PortfolioItem[];
}

// ─── Fetch from Payload CMS ────────────────────────────────────────────────

async function getPayloadBlogPosts(): Promise<BlogPost[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(
      `${baseUrl}/api/blog-posts?limit=100&where[isPublished][equals]=true&sort=-date&depth=1`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return [];

    const data = await res.json();

    if (!data.docs || !Array.isArray(data.docs)) return [];

    return data.docs.map((doc: Record<string, unknown>) => {
      // Extract related portfolios from the relationship field
      const relatedPortfolios: PortfolioItem[] = Array.isArray(doc.relatedPortfolios)
        ? (doc.relatedPortfolios as Array<Record<string, unknown>>)
            .filter((p) => p && typeof p === "object" && p.title)
            .map((p, index) => ({
              id: (p.id as number) || index + 2000,
              title: (p.title as string) || "",
              slug: (p.slug as string) || "",
              category: (p.category as string) || "company",
              categoryLabel: (p.categoryLabel as string) || "",
              image: (() => {
                const rawUrl = typeof p.image === "object" && p.image !== null ? (p.image as any).url : p.image || "";
                const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
                if (typeof rawUrl === "string" && rawUrl.startsWith(siteUrl)) {
                  return rawUrl.replace(siteUrl, "");
                }
                return rawUrl as string;
              })(),
              link: (p.link as string) || "",
              description: (p.description as string) || "",
              tags: Array.isArray(p.tags)
                ? (p.tags as Array<{ tag: string }>).map((t) => t.tag)
                : [],
              color: (p.color as string) || "from-blue-600 to-indigo-700",
              featured: Boolean(p.featured),
              order: (p.order as number) || 0,
            }))
        : [];

      // Serialize the rich text content to a basic string for rendering
      const richTextContent = doc.content;
      let contentString = "";
      if (richTextContent && typeof richTextContent === "object") {
        contentString = JSON.stringify(richTextContent);
      } else if (typeof richTextContent === "string") {
        contentString = richTextContent;
      }

      return {
        slug: (doc.slug as string) || "",
        title: (doc.title as string) || "",
        date: (doc.date as string) || "",
        excerpt: (doc.excerpt as string) || "",
        thumbnail: (doc.thumbnail as string) || "",
        tags: Array.isArray(doc.tags)
          ? (doc.tags as Array<{ tag: string }>).map((t) => t.tag)
          : [],
        author: (doc.author as string) || "Exliding",
        content: contentString,
        isFromCMS: true,
        relatedPortfolios,
      };
    });
  } catch {
    return [];
  }
}

async function getPayloadBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(
      `${baseUrl}/api/blog-posts?where[slug][equals]=${encodeURIComponent(slug)}&where[isPublished][equals]=true&depth=1&limit=1`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return null;

    const data = await res.json();

    if (!data.docs || !Array.isArray(data.docs) || data.docs.length === 0) return null;

    const doc = data.docs[0] as Record<string, unknown>;

    const relatedPortfolios: PortfolioItem[] = Array.isArray(doc.relatedPortfolios)
      ? (doc.relatedPortfolios as Array<Record<string, unknown>>)
          .filter((p) => p && typeof p === "object" && p.title)
          .map((p, index) => ({
            id: (p.id as number) || index + 2000,
            title: (p.title as string) || "",
            slug: (p.slug as string) || "",
            category: (p.category as string) || "company",
            categoryLabel: (p.categoryLabel as string) || "",
            image: (() => {
              const rawUrl = typeof p.image === "object" && p.image !== null ? (p.image as any).url : p.image || "";
              const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
              if (typeof rawUrl === "string" && rawUrl.startsWith(siteUrl)) {
                return rawUrl.replace(siteUrl, "");
              }
              return rawUrl as string;
            })(),
            link: (p.link as string) || "",
            description: (p.description as string) || "",
            tags: Array.isArray(p.tags)
              ? (p.tags as Array<{ tag: string }>).map((t) => t.tag)
              : [],
            color: (p.color as string) || "from-blue-600 to-indigo-700",
            featured: Boolean(p.featured),
            order: (p.order as number) || 0,
          }))
      : [];

    const richTextContent = doc.content;
    let contentString = "";
    if (richTextContent && typeof richTextContent === "object") {
      contentString = JSON.stringify(richTextContent);
    } else if (typeof richTextContent === "string") {
      contentString = richTextContent;
    }

    return {
      slug: (doc.slug as string) || "",
      title: (doc.title as string) || "",
      date: (doc.date as string) || "",
      excerpt: (doc.excerpt as string) || "",
      thumbnail: (doc.thumbnail as string) || "",
      tags: Array.isArray(doc.tags)
        ? (doc.tags as Array<{ tag: string }>).map((t) => t.tag)
        : [],
      author: (doc.author as string) || "Exliding",
      content: contentString,
      isFromCMS: true,
      relatedPortfolios,
    };
  } catch {
    return null;
  }
}

// ─── Static MDX fallback ──────────────────────────────────────────────────

function getStaticPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title || "",
      date: data.date || "",
      excerpt: data.excerpt || "",
      thumbnail: data.thumbnail || "",
      tags: data.tags || [],
      author: data.author || "Exliding",
      content,
      isFromCMS: false,
      relatedPortfolios: [],
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

function getStaticPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || "",
    date: data.date || "",
    excerpt: data.excerpt || "",
    thumbnail: data.thumbnail || "",
    tags: data.tags || [],
    author: data.author || "Exliding",
    content,
    isFromCMS: false,
    relatedPortfolios: [],
  };
}

// ─── Public API ────────────────────────────────────────────────────────────

// Synchronous (backward compat for static data only)
export function getAllPosts(): BlogPost[] {
  return getStaticPosts();
}

export function getPostBySlug(slug: string): BlogPost | null {
  return getStaticPostBySlug(slug);
}

export function getLatestPosts(count: number = 3): BlogPost[] {
  return getAllPosts().slice(0, count);
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

// Async (CMS + static merged)
export async function getAllPostsAsync(): Promise<BlogPost[]> {
  const cmsPosts = await getPayloadBlogPosts();
  const staticPosts = getStaticPosts();

  // CMS posts take priority; deduplicate by slug
  const cmsSlugs = new Set(cmsPosts.map((p) => p.slug));
  const uniqueStatic = staticPosts.filter((p) => !cmsSlugs.has(p.slug));

  const merged = [...cmsPosts, ...uniqueStatic];
  return merged.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlugAsync(slug: string): Promise<BlogPost | null> {
  // Try CMS first
  const cmsPost = await getPayloadBlogPostBySlug(slug);
  if (cmsPost) return cmsPost;

  // Fall back to static
  return getStaticPostBySlug(slug);
}

export async function getLatestPostsAsync(count: number = 3): Promise<BlogPost[]> {
  const posts = await getAllPostsAsync();
  return posts.slice(0, count);
}
