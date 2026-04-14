import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import {
  ArrowLeft,
  Calendar,
  Tag,
  User,
  ArrowRight,
} from "lucide-react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Generate static params
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Artikel Tidak Ditemukan" };
  return {
    title: `${post.title} — Exliding Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  // Get related posts (excluding current)
  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-brutal-bg pt-24 pb-16">
        {/* Grid Texture */}
        <div
          className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--brutal-border) 1px, transparent 1px),
                              linear-gradient(90deg, var(--brutal-border) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        <article className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wider text-foreground/60 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Blog
          </Link>

          {/* Article Header */}
          <header className="mb-10">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 bg-brutal-accent/30 text-foreground px-3 py-1 text-xs font-black uppercase tracking-wider brutal-border"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-foreground/60 pb-6 border-b-4 border-brutal-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary brutal-border flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(post.date)}
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose-brutal mb-16">
            <MDXRemote source={post.content} />
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="border-t-4 border-brutal-border pt-10">
              <h2 className="font-display text-2xl md:text-3xl font-black uppercase tracking-tight text-foreground mb-8">
                Artikel{" "}
                <span className="bg-brutal-accent px-2 pb-1 inline-block brutal-border">
                  Lainnya
                </span>
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group block"
                  >
                    <div className="brutal-card p-5 md:p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {related.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-black uppercase tracking-wider text-foreground/50"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-display text-lg font-black uppercase tracking-tight text-foreground mb-2 group-hover:text-primary transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-sm text-foreground/60 line-clamp-2 mb-4">
                        {related.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm font-black uppercase text-primary group-hover:translate-x-1 transition-transform">
                        Baca <ArrowRight className="w-4 h-4" strokeWidth={3} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
