"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Layers, Code2, Star, Briefcase } from "lucide-react";
import type { PortfolioItem } from "@/lib/portfolio";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  company: <Briefcase className="w-3 h-3" />,
  custom: <Code2 className="w-3 h-3" />,
  ecommerce: <Star className="w-3 h-3" />,
  landing: <Layers className="w-3 h-3" />,
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function RelatedPortfolios({
  portfolios,
}: {
  portfolios: PortfolioItem[];
}) {
  if (!portfolios || portfolios.length === 0) return null;

  return (
    <section className="my-12 md:my-16">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-widest bg-primary text-primary-foreground brutal-border -rotate-1">
            <Layers className="w-3.5 h-3.5" />
            Portfolio Terkait
          </span>
        </div>

        <h2 className="font-display text-2xl md:text-3xl font-black uppercase tracking-tight text-foreground mb-3">
          Proyek{" "}
          <span className="bg-brutal-accent px-2 pb-1 inline-block brutal-border rotate-1">
            Unggulan
          </span>{" "}
          Kami
        </h2>

        <p className="text-sm md:text-base font-bold text-foreground/60 max-w-2xl">
          Lihat hasil kerja nyata kami yang relevan dengan topik artikel ini.
          Setiap proyek dibuat dengan standar kualitas tinggi.
        </p>
      </motion.div>

      {/* Portfolio Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className={`grid gap-6 ${
          portfolios.length === 1
            ? "grid-cols-1 max-w-lg"
            : portfolios.length === 2
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {portfolios.map((item) => (
          <motion.div
            key={item.id}
            variants={cardVariants}
            className="group relative bg-white dark:bg-brutal-bg brutal-border overflow-hidden hover:shadow-[6px_6px_0_0_#111] dark:hover:shadow-[6px_6px_0_0_#e0e0e0] transition-all duration-200 hover:-translate-y-1"
          >
            {/* Image */}
            <div className="relative w-full h-48 overflow-hidden brutal-border-b">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

              {/* Category badge */}
              <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-1 font-black text-[10px] uppercase tracking-wider bg-yellow-400 text-black brutal-border shadow-[2px_2px_0_#111]">
                {CATEGORY_ICONS[item.category] || (
                  <Layers className="w-3 h-3" />
                )}
                {item.categoryLabel}
              </span>

              {/* Hover visit link */}
              {item.link && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground brutal-border brutal-shadow-sm font-bold uppercase tracking-wider text-sm hover:bg-brutal-accent hover:text-brutal-border transition-colors duration-200"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Lihat Website
                  </a>
                </div>
              )}
            </div>

            {/* Card body */}
            <div className="p-5">
              <h3 className="text-lg md:text-xl font-display font-black text-foreground uppercase tracking-tight mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-1">
                {item.title}
              </h3>
              <p className="text-sm font-medium text-foreground/70 leading-relaxed mb-4 line-clamp-2">
                {item.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] font-bold bg-white dark:bg-brutal-bg text-foreground brutal-border uppercase tracking-widest shadow-[1px_1px_0_#111] dark:shadow-[1px_1px_0_#e0e0e0]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
