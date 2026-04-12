"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code2,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Youtube,
  MessageCircle,
  ArrowUpRight,
  Heart,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const LINKS_LAYANAN = [
  { label: "Paket Starter", href: "#layanan" },
  { label: "Paket Pro", href: "#layanan" },
  { label: "Paket Bisnis", href: "#layanan" },
  { label: "Paket Bulanan", href: "/paket" },
  { label: "Template Website", href: "/template" },
  { label: "Course", href: "/course", badge: "Coming Soon" },
];

const LINKS_NAVIGASI = [
  { label: "Beranda", href: "#home" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Promo", href: "#promo" },
  { label: "Kontak", href: "/kontak" },
];

const SOCIALS = [
  {
    label: "WhatsApp",
    href: `https://wa.me/${process.env.NEXT_PUBLIC_CONTACT_PHONE}`,
    icon: <MessageCircle className="w-5 h-5" />,
    color: "hover:text-green-400",
  },
  {
    label: "Instagram",
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/",
    icon: <Instagram className="w-5 h-5" />,
    color: "hover:text-pink-400",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/",
    icon: <Youtube className="w-5 h-5" />,
    color: "hover:text-red-400",
  },
  {
    label: "TikTok",
    href: process.env.NEXT_PUBLIC_TIKTOK_URL || "https://tiktok.com/",
    icon: <Youtube className="w-5 h-5" />, // Fallback icon, TikTok may not be in lucide-react by default
    color: "hover:text-black dark:hover:text-white",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-brutal-bg text-foreground overflow-hidden brutal-border-t">
      {/* ── Brutalist Geometric Accents ── */}
      <div className="absolute top-0 left-0 w-full h-8 bg-black dark:bg-[#e0e0e0] brutal-border-b bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMiIvPgo8L3N2Zz4=')]"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-10 mt-8">
        {/* ── Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Col 1: Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
              <div className="relative">
                <div className="relative bg-primary p-2.5 brutal-border brutal-shadow-sm group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-none transition-all">
                  <Code2 className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className={`text-2xl font-display font-black tracking-tight uppercase text-foreground`}>
                  Ex<span className="text-primary">liding</span>
                </span>
                <span className={`text-xs -mt-1 font-black tracking-wider uppercase bg-brutal-accent text-brutal-border px-1 inline-block -rotate-1`}>
                  SOLUSI DIGITAL
                </span>
              </div>
            </Link>

            <p className="text-sm font-bold text-foreground leading-relaxed mb-6 bg-white dark:bg-brutal-bg p-3 brutal-border rotate-1 inline-block">
              Jasa pembuatan website profesional untuk UMKM, perusahaan, dan startup.
              Cepat, SEO-friendly, dan harga terjangkau.
            </p>

            {/* Contact info */}
            <ul className="space-y-3 font-bold text-foreground">
              <li className="flex items-start gap-3 bg-white dark:bg-brutal-bg p-2 brutal-border -rotate-1 brutal-shadow-[2px_2px_0_#111]">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Klaten, Jawa Tengah, Indonesia</span>
              </li>
              <li className="flex items-center gap-3 bg-white dark:bg-brutal-bg p-2 brutal-border rotate-1 brutal-shadow-[2px_2px_0_#111]">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href={`https://wa.me/${process.env.NEXT_PUBLIC_CONTACT_PHONE}`} className="hover:text-primary transition-colors hover:underline decoration-4 underline-offset-4">
                  +62 {process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-3 bg-white dark:bg-brutal-bg p-2 brutal-border -rotate-1 brutal-shadow-[2px_2px_0_#111]">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`} className="hover:text-primary transition-colors hover:underline decoration-4 underline-offset-4">
                  {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Col 2: Layanan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.07 }}
          >
            <h3 className="text-foreground font-display font-black text-2xl mb-5 uppercase tracking-tighter bg-brutal-accent px-2 brutal-border inline-block rotate-2">
              Layanan
            </h3>
            <ul className="space-y-3">
              {LINKS_LAYANAN.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="inline-flex items-center gap-2 font-bold uppercase tracking-wider hover:text-primary transition-colors group text-foreground"
                  >
                    <ArrowUpRight className="w-4 h-4 text-brutal-border group-hover:text-primary transition-colors" strokeWidth={3} />
                    <span className="group-hover:translate-x-1 transition-transform">{l.label}</span>
                    {l.badge && (
                      <span className="px-2 py-0.5 mt-[-2px] text-[10px] font-black uppercase bg-primary text-primary-foreground brutal-border -rotate-2">
                        {l.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3: Navigasi */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.14 }}
          >
            <h3 className="text-foreground font-display font-black text-2xl mb-5 uppercase tracking-tighter bg-primary text-primary-foreground px-2 brutal-border inline-block -rotate-2">
              Navigasi
            </h3>
            <ul className="space-y-3">
              {LINKS_NAVIGASI.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="inline-flex items-center gap-2 font-bold uppercase tracking-wider hover:text-primary transition-colors group text-foreground"
                  >
                    <ArrowUpRight className="w-4 h-4 text-brutal-border group-hover:text-primary transition-colors" strokeWidth={3} />
                    <span className="group-hover:translate-x-1 transition-transform">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 4: CTA Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-foreground font-display font-black text-2xl mb-5 uppercase tracking-tighter underline decoration-4 underline-offset-4">
              Mulai Sekarang
            </h3>
            <div className="bg-white dark:bg-brutal-bg brutal-border p-5 brutal-shadow-[8px_8px_0_#111] dark:brutal-shadow-[8px_8px_0_#e0e0e0] group hover:-translate-y-1 transition-transform">
              <p className="font-bold text-foreground mb-4 leading-relaxed line-clamp-2">
                Konsultasi gratis — kami bantu cari solusi website terbaik untuk bisnis Anda.
              </p>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_CONTACT_PHONE}?text=Halo%20saya%20ingin%20konsultasi%20website`}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-btn inline-flex items-center gap-2 w-full justify-center text-sm px-4 py-3 bg-foreground text-background hover:bg-primary hover:text-primary-foreground border-transparent"
              >
                <MessageCircle className="w-5 h-5" />
                Chat via WhatsApp
              </a>
            </div>

            {/* Socials */}
            <div className="mt-6">
              <p className="text-sm font-black text-foreground mb-3 uppercase tracking-widest bg-yellow-400 text-black px-2 py-1 inline-block -rotate-2 brutal-border">
                Ikuti Kami
              </p>
              <div className="flex items-center gap-3 mt-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={`p-3 bg-white dark:bg-brutal-bg brutal-border brutal-shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-none hover:bg-brutal-accent group-hover:rotate-6 text-foreground`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <div className="w-full border-t-4 border-brutal-border mb-8 mt-10 border-black dark:border-[#e0e0e0]" />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-bold uppercase tracking-widest text-xs text-foreground">
          <p className="bg-white dark:bg-brutal-bg px-2 py-1 brutal-border">
            © {year} Exliding. Hak Cipta Dilindungi.
          </p>
          <p className="flex items-center gap-1.5 bg-brutal-accent px-2 py-1 brutal-border text-black">
            Made with <Heart className="w-4 h-4 text-red-600 fill-red-600" /> in Klaten
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-primary transition-colors hover:underline decoration-2 underline-offset-4">Kebijakan Privasi</Link>
            <span className="hidden sm:inline-block">/</span>
            <Link href="/terms" className="hover:text-primary transition-colors hover:underline decoration-2 underline-offset-4">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
