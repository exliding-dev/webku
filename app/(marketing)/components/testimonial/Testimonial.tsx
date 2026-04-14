"use client";

import { motion } from "framer-motion";
import { Star, Quote, MessageSquare } from "lucide-react";

// ─── Animation Variants ──────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotate: -2 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: "spring" as const, stiffness: 350, damping: 18 },
  },
};

// ─── Data ────────────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    name: "Budi Santoso",
    role: "Pemilik Toko Online",
    quote:
      "Website yang dibuat sangat profesional dan loading-nya super cepat. Penjualan online saya naik 3x lipat sejak pakai jasa Exliding!",
    rating: 5,
    initials: "BS",
    accent: "bg-primary",
  },
  {
    name: "Sari Dewi",
    role: "Owner Klinik Kecantikan",
    quote:
      "Desainnya modern dan responsif di semua device. Tim support-nya juga sangat responsif dan membantu. Highly recommended!",
    rating: 5,
    initials: "SD",
    accent: "bg-brutal-accent",
  },
  {
    name: "Andi Prasetyo",
    role: "Direktur CV Maju Bersama",
    quote:
      "Dari konsultasi sampai website jadi, prosesnya cepat dan transparan. Website company profile kami sekarang jadi kebanggaan perusahaan.",
    rating: 5,
    initials: "AP",
    accent: "bg-primary",
  },
  {
    name: "Rina Wati",
    role: "Pemilik Restoran",
    quote:
      "Dulu pelanggan susah cari info menu dan lokasi kami. Sekarang dengan website baru, reservasi online meningkat drastis!",
    rating: 5,
    initials: "RW",
    accent: "bg-brutal-accent",
  },
  {
    name: "Hendra Wijaya",
    role: "CEO Startup Tech",
    quote:
      "Kualitas website setara agency besar tapi harganya sangat terjangkau. SEO-nya juga mantap, traffic organik naik signifikan.",
    rating: 5,
    initials: "HW",
    accent: "bg-primary",
  },
  {
    name: "Maya Sari",
    role: "Freelance Designer",
    quote:
      "Portfolio website yang dibuat benar-benar mencerminkan brand saya. Banyak klien baru datang setelah melihat website saya!",
    rating: 5,
    initials: "MS",
    accent: "bg-brutal-accent",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Testimonial() {
  return (
    <section
      id="testimonial"
      className="py-24 bg-brutal-bg brutal-border-b relative overflow-hidden"
    >
      {/* Decorative brutalist background elements */}
      <div className="absolute top-16 right-16 w-28 h-28 bg-brutal-accent brutal-border brutal-shadow-sm -rotate-12 z-0" />
      <div className="absolute bottom-16 left-16 w-36 h-36 bg-primary brutal-border rounded-full brutal-shadow-lg z-0" />
      <div className="absolute top-1/2 right-1/3 w-16 h-32 bg-foreground brutal-border rotate-[20deg] z-0 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 p-8 bg-white dark:bg-brutal-bg brutal-border brutal-shadow-sm rotate-1"
        >
          <span className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 text-xs font-black uppercase tracking-widest bg-primary text-primary-foreground brutal-border -rotate-2">
            <MessageSquare className="w-3.5 h-3.5" />
            Apa Kata Mereka
          </span>

          <h2 className="text-4xl md:text-5xl font-display font-black text-foreground uppercase tracking-tight drop-shadow-[2px_2px_0_var(--brutal-border)]">
            Testimoni{" "}
            <span className="bg-brutal-accent px-2 text-brutal-border brutal-border inline-block -rotate-1">
              Klien
            </span>
          </h2>
          <p className="mt-4 text-lg font-bold text-foreground bg-white dark:bg-brutal-bg p-2 brutal-border inline-block rotate-1 max-w-xl mx-auto">
            Kepuasan klien adalah prioritas utama kami. Lihat apa yang mereka
            katakan tentang layanan kami.
          </p>
        </motion.div>

        {/* Testimonial Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                x: 4,
                y: 4,
                rotate: 0,
                boxShadow: "0px 0px 0px 0px #111",
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 12,
                },
              }}
              className={`relative bg-white dark:bg-brutal-bg brutal-border brutal-shadow p-6 cursor-default ${
                index % 2 === 0 ? "rotate-1" : "-rotate-1"
              } hover:rotate-0 transition-transform duration-200`}
            >
              {/* Quote icon */}
              <div className="absolute -top-4 -right-3">
                <div className="bg-foreground text-background brutal-border p-2 rotate-12">
                  <Quote className="w-5 h-5" />
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-brutal-accent text-brutal-border"
                    strokeWidth={2}
                  />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-sm font-bold leading-relaxed text-foreground mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 brutal-border-t">
                <div
                  className={`w-12 h-12 ${testimonial.accent} brutal-border flex items-center justify-center font-black text-sm uppercase tracking-wider ${
                    testimonial.accent === "bg-primary"
                      ? "text-primary-foreground"
                      : "text-brutal-border"
                  }`}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-black text-sm uppercase tracking-wide text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs font-bold text-foreground/70 uppercase tracking-wider">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
