"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Layers, Code2, ArrowRight, Star } from "lucide-react";
import type { PortfolioItem } from "@/lib/portfolio";

// ─── Category Config ─────────────────────────────────────────────────────────

const CATEGORY_CONFIG = [
  { id: "all", label: "Semua", icon: <Layers className="w-4 h-4" /> },
  { id: "company", label: "Company Profile", icon: <Star className="w-4 h-4" /> },
  { id: "custom", label: "Custom App", icon: <Code2 className="w-4 h-4" /> },
];

const STATS = [
  { value: "50+", label: "Website Diluncurkan" },
  { value: "98%", label: "Klien Puas" },
  { value: "4.9★", label: "Rating Rata-rata" },
  { value: "24/7", label: "Support Aktif" },
];

// ─── Animation Variants ──────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.96,
    transition: { duration: 0.25 },
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function PortfolioClient({ items }: { items: PortfolioItem[] }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? items
      : items.filter((p) => p.category === activeCategory);

  return (
    <section
      id="portfolio"
      className="relative py-28 bg-brutal-bg brutal-border-b overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-24 h-24 bg-primary brutal-border brutal-shadow-sm rotate-6" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-brutal-accent brutal-border rounded-full brutal-shadow-lg scale-110" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 p-8 bg-white dark:bg-brutal-bg brutal-border brutal-shadow-sm rotate-1 mx-auto max-w-4xl"
        >
          <span className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 text-xs font-black uppercase tracking-widest bg-primary text-primary-foreground brutal-border -rotate-2">
            <Layers className="w-3.5 h-3.5" />
            Portfolio Kami
          </span>

          <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter text-foreground uppercase drop-shadow-[2px_2px_0_var(--brutal-border)] mb-5">
            Hasil Kerja <span className="bg-brutal-accent px-2 text-brutal-border brutal-border inline-block rotate-1">Nyata</span>, Bukan Sekadar Klaim
          </h2>

          <p className="text-base md:text-lg font-bold text-foreground bg-white dark:bg-brutal-bg p-2 brutal-border inline-block -rotate-1 max-w-2xl mx-auto">
            Kami telah membantu puluhan bisnis — dari UMKM lokal hingga perusahaan — tampil profesional di internet. Ini sebagian hasilnya.
          </p>
        </motion.div>

        {/* ── Filter Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {CATEGORY_CONFIG.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`inline-flex items-center gap-1.5 md:gap-2 px-3 py-2 md:px-6 md:py-3 font-black text-xs md:text-base tracking-wider md:tracking-widest uppercase transition-all duration-200 brutal-border ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground brutal-shadow-sm -translate-y-1"
                  : "bg-white text-foreground hover:bg-brutal-accent hover:shadow-[4px_4px_0_0_#111] dark:hover:shadow-[4px_4px_0_0_#e0e0e0] hover:-translate-y-1"
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* ── Portfolio Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                className="group relative bg-white dark:bg-brutal-bg brutal-border hover:shadow-[8px_8px_0_0_#111] dark:hover:shadow-[8px_8px_0_0_#e0e0e0] transition-all duration-200 hover:-translate-y-2 hover:-translate-x-1"
              >
                {/* Image */}
                <div className="relative w-full h-56 overflow-hidden brutal-border-b">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient overlay — brutalist sharp */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                  {/* Category badge */}
                  <span className="absolute top-4 left-4 px-2 py-1 md:px-3 md:py-1 font-black text-[10px] md:text-xs uppercase tracking-wider bg-yellow-400 text-black brutal-border shadow-[2px_2px_0_#111]">
                    {item.categoryLabel}
                  </span>

                  {/* Hover overlay with action */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground brutal-border brutal-shadow-sm font-bold uppercase tracking-wider hover:bg-brutal-accent hover:text-brutal-border transition-colors duration-200"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Lihat Website
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 px-5 py-3 bg-foreground text-background brutal-border brutal-shadow-sm font-bold uppercase tracking-wider">
                        <ExternalLink className="w-4 h-4" />
                        Lihat Detail
                      </span>
                    )}
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <h3 className="text-2xl font-display font-black text-foreground uppercase tracking-tight mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium text-foreground/80 leading-relaxed mb-6 line-clamp-3">
                    {item.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-[10px] md:text-xs font-bold bg-white dark:bg-brutal-bg text-foreground brutal-border uppercase tracking-wider md:tracking-widest shadow-[2px_2px_0_#111] dark:shadow-[2px_2px_0_#e0e0e0]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 text-center"
        >
          <Link
            href="/kontak"
            className="brutal-btn inline-flex items-center gap-2.5 text-lg"
          >
            Mulai Project Website Anda
            <ArrowRight className="w-6 h-6" strokeWidth={3} />
          </Link>
          <p className="mt-6 text-sm font-bold uppercase tracking-widest text-foreground bg-brutal-accent px-4 py-2 brutal-border inline-block rotate-1 absolute -ml-32 mt-12 z-10 hidden md:inline-block">
            Konsultasi gratis • Tanpa biaya tersembunyi
          </p>
        </motion.div>

        {/* ── Stats Row ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className={`relative text-center p-6 bg-white dark:bg-brutal-bg brutal-border overflow-hidden hover:shadow-[4px_4px_0_0_#111] dark:hover:shadow-[4px_4px_0_0_#e0e0e0] hover:-translate-y-1 transition-all duration-200 ${i % 2 === 0 ? "rotate-1 hover:rotate-0" : "-rotate-1 hover:rotate-0"}`}
            >
              <div className="absolute inset-0 bg-brutal-accent opacity-0 hover:opacity-100 transition-opacity duration-200 z-0" />
              <div className="relative z-10">
                <span className="block text-4xl font-display font-black text-foreground mb-1">
                  {stat.value}
                </span>
                <span className="text-[10px] md:text-xs font-black uppercase tracking-wider md:tracking-widest text-foreground/80">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
