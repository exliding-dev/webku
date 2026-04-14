"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Tag, BookOpen, Newspaper } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface BlogPostPreview {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  thumbnail: string;
  tags: string[];
  author: string;
}

// ─── Animation Variants ──────────────────────────────────────────────────────

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const brutalSlideUp = {
  hidden: { opacity: 0, y: 60, rotate: 2 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: "spring" as const, stiffness: 400, damping: 20 },
  },
};

const brutalDrop = {
  hidden: { opacity: 0, y: -40, rotate: -4 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: "spring" as const, stiffness: 500, damping: 20 },
  },
};

// ─── Utils ───────────────────────────────────────────────────────────────────

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Card accent colors that rotate
const CARD_ACCENTS = [
  "bg-primary",
  "bg-brutal-accent",
  "bg-foreground",
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Blog({ posts }: { posts: BlogPostPreview[] }) {
  return (
    <section
      id="blog"
      className="relative bg-brutal-bg brutal-border-b py-20 md:py-28 overflow-hidden"
    >
      {/* Grid Texture */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--brutal-border) 1px, transparent 1px),
                            linear-gradient(90deg, var(--brutal-border) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Decorative shapes */}
      <div className="absolute -top-6 right-20 w-24 h-24 bg-brutal-accent brutal-border rotate-12 opacity-60 hidden md:block" />
      <div className="absolute bottom-10 -left-6 w-16 h-32 bg-primary brutal-border -rotate-6 opacity-40 hidden md:block" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <motion.div variants={brutalDrop} className="mb-6 inline-block">
            <span className="inline-flex items-center gap-2 bg-brutal-accent text-brutal-border brutal-border px-4 py-2 font-black tracking-widest uppercase brutal-shadow-sm">
              <Newspaper className="w-4 h-4" />
              Blog & Artikel
            </span>
          </motion.div>

          <motion.h2
            variants={brutalDrop}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-foreground mb-4"
          >
            Tips & Insight{" "}
            <span className="bg-primary text-primary-foreground px-2 pb-1 inline-block -rotate-1 brutal-border">
              Digital
            </span>
          </motion.h2>

          <motion.p
            variants={brutalDrop}
            className="mx-auto max-w-2xl text-lg font-bold text-foreground/70"
          >
            Baca artikel terbaru seputar web development, SEO, dan digital
            marketing untuk bisnis Anda.
          </motion.p>
        </motion.div>

        {/* Blog Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              variants={brutalSlideUp}
              className="group"
            >
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
                      {post.tags.slice(0, 2).map((tag) => (
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
                    <h3 className="font-display text-xl md:text-2xl font-black uppercase tracking-tight text-foreground mb-3 group-hover:text-primary transition-colors leading-tight">
                      {post.title}
                    </h3>

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
                        <ArrowRight className="w-4 h-4" strokeWidth={3} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
          className="mt-12 text-center"
        >
          <Link
            href="/blog"
            className="brutal-btn inline-flex items-center gap-2 text-lg"
          >
            <BookOpen className="w-5 h-5" />
            Lihat Semua Artikel
            <ArrowRight className="w-5 h-5" strokeWidth={3} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
