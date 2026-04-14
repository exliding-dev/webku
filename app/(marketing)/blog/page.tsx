import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Calendar, Tag, ArrowRight, ArrowLeft, Newspaper } from "lucide-react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const CARD_ACCENTS = ["bg-primary", "bg-brutal-accent", "bg-foreground"];

export const metadata = {
  title: "Blog & Artikel — Exliding",
  description:
    "Baca artikel terbaru seputar web development, SEO, dan digital marketing untuk bisnis Anda.",
};

export default function BlogListPage() {
  const posts = getAllPosts();

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

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-12 md:mb-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wider text-foreground/60 hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Beranda
            </Link>

            <div className="mb-6 inline-block ml-4">
              <span className="inline-flex items-center gap-2 bg-brutal-accent text-brutal-border brutal-border px-4 py-2 font-black tracking-widest uppercase brutal-shadow-sm">
                <Newspaper className="w-4 h-4" />
                Blog
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-foreground mb-4">
              Semua{" "}
              <span className="bg-primary text-primary-foreground px-2 pb-1 inline-block -rotate-1 brutal-border">
                Artikel
              </span>
            </h1>

            <p className="max-w-2xl text-lg font-bold text-foreground/70">
              Tips, insight, dan panduan seputar web development, SEO, dan
              digital marketing untuk membantu bisnis Anda bertumbuh.
            </p>
          </div>

          {/* Articles Grid */}
          {posts.length === 0 ? (
            <div className="brutal-card p-12 text-center">
              <p className="text-xl font-bold text-foreground/50">
                Belum ada artikel. Segera hadir!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <article key={post.slug} className="group">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="brutal-card p-0 overflow-hidden h-full flex flex-col">
                      {/* Card Top Accent Bar */}
                      <div
                        className={`h-3 md:h-4 ${CARD_ACCENTS[i % CARD_ACCENTS.length]}`}
                      />

                      {/* Card Content */}
                      <div className="p-5 md:p-6 flex-1 flex flex-col">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 bg-brutal-accent/30 text-foreground px-2 py-0.5 text-xs font-black uppercase tracking-wider brutal-border"
                            >
                              <Tag className="w-3 h-3" />
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Title */}
                        <h2 className="font-display text-xl md:text-2xl font-black uppercase tracking-tight text-foreground mb-3 group-hover:text-primary transition-colors leading-tight">
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-sm font-medium text-foreground/60 mb-6 line-clamp-3 flex-1">
                          {post.excerpt}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t-2 border-brutal-border">
                          <div className="flex items-center gap-2 text-xs font-bold text-foreground/50">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(post.date)}
                          </div>

                          <span className="inline-flex items-center gap-1 text-sm font-black uppercase tracking-wider text-primary group-hover:translate-x-1 transition-transform">
                            Baca
                            <ArrowRight
                              className="w-4 h-4"
                              strokeWidth={3}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
