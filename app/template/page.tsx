"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Code2,
  Download,
  Eye,
  Globe,
  Heart,
  MessageCircle,
  Rocket,
  Search,
  Shield,
  ShoppingCart,
  Sparkles,
  Star,
  Timer,
  Zap,
  BadgeCheck,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

// ─── Animations ───────────────────────────────────────────────────────────────

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const brutalDrop = {
  hidden: { opacity: 0, y: -40, rotate: -3 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: "spring" as const, stiffness: 500, damping: 20 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, rotate: -2 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: "spring" as const, stiffness: 400, damping: 15 },
  },
};

const pillItem = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 600, damping: 25 },
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const WA_BASE = `https://wa.me/${process.env.NEXT_PUBLIC_CONTACT_PHONE}`;

const CATEGORIES = ["Semua", "Bisnis", "Toko Online", "Portfolio", "Restoran", "Wedding", "SaaS", "WordPress", "Next.js", "Laravel", "Bootstrap", "HTML5"];

type Template = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  buyers: number;
  pages: number;
  tags: string[];
  preview: string;
  accentColor: string;
  badge?: string;
  features: string[];
  waText: string;
};

const TEMPLATES: Template[] = [
  {
    id: 1,
    name: "BizPro Corporate",
    category: "Bisnis",
    price: 299000,
    oldPrice: 499000,
    buyers: 128,
    pages: 7,
    tags: ["Next.js", "SEO Ready", "Dark Mode"],
    preview: "from-slate-900 via-blue-900 to-slate-800",
    accentColor: "bg-blue-500",
    badge: "Terlaris",
    features: ["7 Halaman", "Animasi Smooth", "Mobile Perfect", "SEO Optimal", "Dark & Light Mode", "Free Revisi 1x"],
    waText: "Halo%20saya%20ingin%20beli%20template%20BizPro%20Corporate",
  },
  {
    id: 2,
    name: "ShopMax Store",
    category: "Toko Online",
    price: 399000,
    oldPrice: 699000,
    buyers: 94,
    pages: 10,
    tags: ["Next.js", "Keranjang", "Dashboard"],
    preview: "from-emerald-900 via-teal-800 to-cyan-900",
    accentColor: "bg-emerald-500",
    badge: "Baru",
    features: ["10 Halaman", "Keranjang Belanja", "Filter Produk", "Halaman Checkout", "Admin Dashboard", "Free Revisi 1x"],
    waText: "Halo%20saya%20ingin%20beli%20template%20ShopMax%20Store",
  },
  {
    id: 3,
    name: "CreativePort",
    category: "Portfolio",
    price: 199000,
    oldPrice: 349000,
    buyers: 211,
    pages: 5,
    tags: ["React", "Animasi", "Minimal"],
    preview: "from-violet-900 via-purple-800 to-fuchsia-900",
    accentColor: "bg-violet-500",
    badge: "Populer",
    features: ["5 Halaman", "Animasi Framer Motion", "Gallery Grid", "Blog Section", "Contact Form", "Free Revisi 1x"],
    waText: "Halo%20saya%20ingin%20beli%20template%20CreativePort",
  },
  {
    id: 4,
    name: "FoodieResto",
    category: "Restoran",
    price: 249000,
    oldPrice: 399000,
    buyers: 76,
    pages: 6,
    tags: ["Next.js", "Menu Online", "Reservasi"],
    preview: "from-orange-900 via-red-800 to-rose-900",
    accentColor: "bg-orange-500",
    features: ["6 Halaman", "Menu Interaktif", "Sistem Reservasi", "Gallery Foto", "Map Lokasi", "Free Revisi 1x"],
    waText: "Halo%20saya%20ingin%20beli%20template%20FoodieResto",
  },
  {
    id: 5,
    name: "LoveStory Wedding",
    category: "Wedding",
    price: 249000,
    oldPrice: 449000,
    buyers: 163,
    pages: 4,
    tags: ["Next.js", "RSVP", "Countdown"],
    preview: "from-rose-900 via-pink-800 to-red-900",
    accentColor: "bg-rose-500",
    badge: "Romantis",
    features: ["4 Halaman", "Countdown Timer", "Form RSVP Online", "Gallery Foto", "Google Maps", "Free Revisi 1x"],
    waText: "Halo%20saya%20ingin%20beli%20template%20LoveStory%20Wedding",
  },
  { id: 6, name: "LaunchKit SaaS", category: "SaaS", price: 499000, oldPrice: 899000, buyers: 52, pages: 8, tags: ["Next.js", "Dark Mode", "Pricing"], preview: "from-indigo-900 via-blue-800 to-violet-900", accentColor: "bg-indigo-500", badge: "Premium", features: ["8 Halaman", "Pricing Table", "Feature Showcase", "Testimonial Carousel", "Blog & Docs", "Free Revisi 1x"], waText: "Halo%20saya%20ingin%20beli%20template%20LaunchKit%20SaaS" },
  { id: 7, name: "WP Business Pro", category: "WordPress", price: 199000, oldPrice: 349000, buyers: 317, pages: 8, tags: ["WordPress", "Elementor", "WooCommerce"], preview: "from-sky-900 via-blue-800 to-cyan-800", accentColor: "bg-sky-500", badge: "Terlaris", features: ["8 Halaman Siap Pakai", "Drag & Drop Elementor", "WooCommerce Ready", "Blog Terintegrasi", "Contact Form 7", "Free Revisi 1x"], waText: "Halo%20saya%20ingin%20beli%20template%20WP%20Business%20Pro" },
  { id: 8, name: "ElementorShop", category: "WordPress", price: 249000, oldPrice: 449000, buyers: 189, pages: 10, tags: ["Elementor", "WooCommerce", "Filter"], preview: "from-teal-900 via-emerald-800 to-green-900", accentColor: "bg-teal-500", badge: "Populer", features: ["10 Halaman Toko", "Elementor Pro Widget", "Filter & Search Produk", "Cart & Checkout", "AJAX Loading", "Free Revisi 1x"], waText: "Halo%20saya%20ingin%20beli%20template%20ElementorShop" },
  { id: 9, name: "NextBiz Landing", category: "Next.js", price: 349000, oldPrice: 599000, buyers: 143, pages: 6, tags: ["Next.js 14", "TypeScript", "Tailwind"], preview: "from-slate-900 via-zinc-800 to-neutral-900", accentColor: "bg-slate-500", badge: "Baru", features: ["App Router Next.js 14", "TypeScript + Tailwind", "SEO & OG Tags", "Dark Mode Toggle", "Framer Motion Animasi", "Free Revisi 1x"], waText: "Halo%20saya%20ingin%20beli%20template%20NextBiz%20Landing" },
  { id: 10, name: "NextEcom Store", category: "Next.js", price: 499000, oldPrice: 799000, buyers: 78, pages: 12, tags: ["Next.js 14", "Prisma", "Stripe"], preview: "from-violet-900 via-indigo-800 to-blue-900", accentColor: "bg-violet-500", badge: "Premium", features: ["Full Stack Next.js", "Database Prisma/MySQL", "Integrasi Midtrans", "Admin Dashboard", "Auth Login Register", "Free Revisi 1x"], waText: "Halo%20saya%20ingin%20beli%20template%20NextEcom%20Store" },
  { id: 11, name: "LaraAdmin CMS", category: "Laravel", price: 499000, oldPrice: 899000, buyers: 96, pages: 15, tags: ["Laravel 11", "Livewire", "Tailwind"], preview: "from-red-900 via-rose-800 to-pink-900", accentColor: "bg-red-500", badge: "Full Stack", features: ["Laravel 11 + Livewire", "CMS Admin Panel", "CRUD Lengkap", "Auth Breeze/Jetstream", "MySQL + Eloquent ORM", "Free Revisi 1x"], waText: "Halo%20saya%20ingin%20beli%20template%20LaraAdmin%20CMS" },
  { id: 12, name: "LaraShop Toko", category: "Laravel", price: 599000, oldPrice: 999000, buyers: 54, pages: 12, tags: ["Laravel 11", "Midtrans", "Filament"], preview: "from-orange-900 via-amber-800 to-yellow-900", accentColor: "bg-orange-500", badge: "Best Value", features: ["Laravel 11 Full CRUD", "Payment Midtrans/Xendit", "Admin Panel Filament", "Multi Kategori Produk", "Order Management", "Free Revisi 1x"], waText: "Halo%20saya%20ingin%20beli%20template%20LaraShop%20Toko" },
  { id: 13, name: "BootBiz Corporate", category: "Bootstrap", price: 149000, oldPrice: 299000, buyers: 402, pages: 7, tags: ["Bootstrap 5", "SCSS", "jQuery"], preview: "from-purple-900 via-violet-800 to-indigo-900", accentColor: "bg-purple-500", badge: "Hemat", features: ["Bootstrap 5 Terbaru", "SCSS Variables", "jQuery Animasi", "7 Halaman Lengkap", "Cross-browser Compatible", "Free Revisi 1x"], waText: "Halo%20saya%20ingin%20beli%20template%20BootBiz%20Corporate" },
  { id: 14, name: "BootStore Shop", category: "Bootstrap", price: 199000, oldPrice: 349000, buyers: 231, pages: 9, tags: ["Bootstrap 5", "Vanilla JS", "CSS3"], preview: "from-cyan-900 via-sky-800 to-blue-900", accentColor: "bg-cyan-500", badge: "Populer", features: ["Bootstrap 5 Grid System", "Product Hover Effects", "Cart Interaktif JS", "Checkout Form", "Responsive Design", "Free Revisi 1x"], waText: "Halo%20saya%20ingin%20beli%20template%20BootStore%20Shop" },
  { id: 15, name: "HTML5 Landing Pro", category: "HTML5", price: 99000, oldPrice: 199000, buyers: 548, pages: 1, tags: ["HTML5", "CSS3", "Vanilla JS"], preview: "from-green-900 via-emerald-800 to-lime-900", accentColor: "bg-green-500", badge: "Murah", features: ["Pure HTML5 + CSS3", "Vanilla JS Animasi", "AOS Scroll Effect", "Tanpa Framework", "Hosting di Mana Saja", "Free Revisi 1x"], waText: "Halo%20saya%20ingin%20beli%20template%20HTML5%20Landing%20Pro" },
  { id: 16, name: "HTML5 Multi Page", category: "HTML5", price: 149000, oldPrice: 249000, buyers: 376, pages: 5, tags: ["HTML5", "CSS3", "GSAP"], preview: "from-lime-900 via-green-800 to-teal-900", accentColor: "bg-lime-600", features: ["5 Halaman HTML5", "GSAP Animasi Smooth", "CSS Grid & Flexbox", "Tidak Butuh Backend", "Hosting Manapun Gratis", "Free Revisi 1x"], waText: "Halo%20saya%20ingin%20beli%20template%20HTML5%20Multi%20Page" },
];

// ─── Tech Stacks ─────────────────────────────────────────────────────────────

const TECH_STACKS = [
  { id: "wordpress", name: "WordPress & Elementor", emoji: "🟦", color: "bg-sky-500", tagline: "Kelola website sendiri tanpa coding — drag, drop, selesai.", pitch: "Cocok untuk pemilik bisnis non-teknis. WordPress + Elementor memberi Anda kekuatan website profesional dengan kemudahan seperti menyusun presentasi.", pros: ["Kelola konten sendiri tanpa developer", "1.500+ plugin siap pakai", "WooCommerce untuk toko online", "Update artikel blog kapan saja", "Hosting murah mulai Rp 30rb/bln"], cons: ["Butuh update plugin rutin agar aman", "Lebih lambat vs Next.js jika tidak dioptimasi"], ideal: "UMKM, toko online skala kecil-menengah, blog bisnis, profil perusahaan", filter: "WordPress", price: "Mulai Rp 199.000" },
  { id: "nextjs", name: "Next.js", emoji: "⚡", color: "bg-slate-600", tagline: "Performa tertinggi. SEO terbaik. Pengalaman pengguna premium.", pitch: "Next.js adalah standar emas website modern. Digunakan oleh Vercel, TikTok, dan ribuan startup unicorn. Jika Anda serius soal bisnis digital, ini pilihannya.", pros: ["Loading tercepat (Server-Side Rendering)", "SEO optimal out-of-the-box", "Full-stack dalam satu codebase", "Deploy gratis ke Vercel", "TypeScript & ekosistem React terbesar"], cons: ["Butuh pengetahuan Node.js dasar", "Sedikit lebih kompleks untuk pemula"], ideal: "Startup, SaaS, landing page konversi tinggi, e-commerce premium", filter: "Next.js", price: "Mulai Rp 349.000" },
  { id: "laravel", name: "Laravel", emoji: "🔴", color: "bg-red-500", tagline: "Backend powerful. Logika bisnis kompleks. Skala tak terbatas.", pitch: "Laravel adalah framework PHP nomor satu di Indonesia. Untuk project yang butuh database, login user, sistem order, atau API — Laravel tidak ada tandingannya.", pros: ["ORM Eloquent sangat intuitif", "Auth bawaan (login, register, role)", "Cocok untuk sistem toko & CRM", "Komunitas Indonesia sangat besar", "Filament Admin Panel siap pakai"], cons: ["Butuh server PHP (bukan shared hosting biasa)", "Learning curve lebih tinggi dari WordPress"], ideal: "Sistem informasi, toko online kompleks, aplikasi internal perusahaan", filter: "Laravel", price: "Mulai Rp 499.000" },
  { id: "bootstrap", name: "Bootstrap 5", emoji: "🟣", color: "bg-purple-500", tagline: "Cepat dikembangkan. Konsisten di semua browser. Klasik terpercaya.", pitch: "Bootstrap adalah fondasi jutaan website di dunia. Grid system powerful, komponen siap pakai, dan kompatibilitas lintas browser menjadikannya pilihan aman untuk semua project.", pros: ["Komponen UI yang sangat lengkap", "Grid 12-kolom fleksibel", "Dukungan browser terluas", "Dokumentasi sangat lengkap", "Mudah dikustomisasi via SCSS"], cons: ["Tampilan default terlihat generik jika tidak dikustom", "Bundle size lebih besar vs Tailwind"], ideal: "Website company, dashboard sistem, project yang butuh konsistensi lintas browser", filter: "Bootstrap", price: "Mulai Rp 149.000" },
  { id: "html5", name: "HTML5 & CSS3", emoji: "🟠", color: "bg-orange-500", tagline: "Ringan. Universal. Hosting di mana saja. Zero dependencies.", pitch: "Tidak butuh framework, tidak butuh Node.js. Pure HTML5 + CSS3 bisa dihosting di mana saja — bahkan di GitHub Pages gratis. Solusi paling simpel untuk landing page profesional.", pros: ["Upload langsung ke hosting manapun", "Loading paling ringan", "Tidak ada dependency yang outdated", "Hosting bisa gratis (GitHub Pages)", "Mudah dipelajari siapapun"], cons: ["Tidak cocok untuk website dengan banyak halaman dinamis", "Manajemen konten manual"], ideal: "Landing page promosi, undangan digital, portofolio sederhana, website event", filter: "HTML5", price: "Mulai Rp 99.000" },
];

const BENEFITS = [

  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Kode Bersih & Terstruktur",
    desc: "Dibangun dengan Next.js / React + TypeScript. Mudah dikustomisasi oleh developer manapun.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Loading Super Cepat",
    desc: "Performa Lighthouse Score 90+. Calon pelanggan tidak perlu nunggu lama.",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "SEO Ready dari Awal",
    desc: "Meta tag, sitemap, semantic HTML sudah terpasang. Siap dirayapi Google.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Lisensi Komersial Penuh",
    desc: "Boleh dipakai untuk proyek klien. Tidak ada biaya tambahan, royalti, atau pembatasan.",
  },
];

const FAQ_DATA = [
  {
    q: "Apa yang saya dapatkan setelah beli?",
    a: "Anda mendapatkan source code lengkap (Next.js / React), dokumentasi instalasi, dan akses ke update template di masa depan. Semua dikirim via link download atau WhatsApp.",
  },
  {
    q: "Apakah bisa dipakai untuk proyek klien?",
    a: "Ya! Lisensi komersial sudah termasuk. Anda bebas menggunakan template untuk klien sebanyak yang Anda mau tanpa biaya tambahan.",
  },
  {
    q: "Apakah bisa request kustomisasi?",
    a: "Tentu! Kami menyediakan layanan kustomisasi terpisah. Hubungi kami via WhatsApp untuk konsultasi dan penawaran harga.",
  },
  {
    q: "Butuh skill apa untuk memasang template?",
    a: "Pengetahuan dasar Node.js sudah cukup. Kami sertakan panduan instalasi lengkap. Atau gunakan jasa pasang kami, mulai Rp 150.000.",
  },
  {
    q: "Apakah ada garansi uang kembali?",
    a: "Karena template adalah produk digital, kami tidak menyediakan refund. Namun kami memberikan free revisi 1x dan support teknis 14 hari setelah pembelian.",
  },
];

// ─── FAQ Component ─────────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      variants={cardVariants}
      className="bg-white dark:bg-brutal-bg brutal-border brutal-shadow-sm overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-5 text-left font-bold uppercase tracking-wide text-foreground hover:bg-brutal-accent hover:text-brutal-border transition-colors"
      >
        <span className="pr-4 text-sm">{q}</span>
        {open ? <ChevronUp className="w-5 h-5 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 flex-shrink-0" />}
      </button>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="brutal-border-t px-5 pb-5 pt-4 text-sm font-bold leading-relaxed text-foreground/80"
        >
          {a}
        </motion.div>
      )}
    </motion.div>
  );
}

// ─── Template Card ─────────────────────────────────────────────────────────────

function TemplateCard({ t }: { t: Template }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ x: 6, y: 6, transition: { type: "spring", stiffness: 400, damping: 12 } }}
      className="group flex flex-col h-full bg-white dark:bg-brutal-bg brutal-border brutal-shadow hover:shadow-none transition-all duration-200"
    >
      {/* ── Thumbnail ── */}
      <div className={`relative w-full h-44 bg-gradient-to-br ${t.preview} brutal-border-b overflow-hidden`}>
        {/* Browser chrome */}
        <div className="absolute top-0 left-0 right-0 flex items-center gap-1.5 bg-black/30 px-3 py-2 backdrop-blur-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <span className="ml-2 flex flex-1 items-center rounded bg-white/10 px-2 h-5 text-[9px] text-white/40">
            exliding.my.id
          </span>
        </div>

        {/* Name & skeleton UI */}
        <div className="mt-10 flex flex-col items-center px-6">
          <p className="font-display font-black text-white text-base uppercase tracking-widest drop-shadow-lg opacity-80">
            {t.name}
          </p>
          <div className="mt-3 grid w-full grid-cols-3 gap-1.5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`h-6 rounded-sm bg-white/${i % 2 === 0 ? "20" : "10"}`} />
            ))}
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
          <a
            href={`${WA_BASE}?text=${t.waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 brutal-border bg-white px-4 py-2 text-xs font-black uppercase tracking-wider text-foreground hover:bg-brutal-accent transition-colors"
          >
            <Eye className="w-3.5 h-3.5" /> Preview
          </a>
        </div>

        {/* Badge */}
        {t.badge && (
          <div className="absolute top-9 right-3">
            <span className={`${t.accentColor} inline-block -rotate-2 brutal-border px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white`}>
              {t.badge}
            </span>
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div className="flex flex-grow flex-col p-5">
        {/* Tags */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          <span className="brutal-border bg-brutal-bg dark:bg-black/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-foreground">
            {t.category}
          </span>
          {t.tags.map((tag) => (
            <span key={tag} className="brutal-border bg-white dark:bg-brutal-bg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-foreground/60">
              {tag}
            </span>
          ))}
        </div>

        {/* Name */}
        <h3 className="mb-2 font-display font-black text-xl uppercase tracking-tight text-foreground">
          {t.name}
        </h3>

        {/* Stars */}
        <div className="mb-4 flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-brutal-accent text-brutal-border" strokeWidth={2} />
            ))}
          </div>
          <span className="text-xs font-bold uppercase tracking-wide text-foreground/60">
            ({t.buyers} pembeli)
          </span>
        </div>

        {/* Features */}
        <ul className="mb-5 flex-grow space-y-1.5">
          {t.features.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center brutal-border bg-primary text-primary-foreground shadow-[1px_1px_0_#111]">
                <Check className="h-3 w-3" strokeWidth={4} />
              </span>
              <span className="text-xs font-bold uppercase tracking-wide text-foreground">{f}</span>
            </li>
          ))}
        </ul>

        {/* Price + CTA */}
        <div className="brutal-border-t pt-4">
          <div className="mb-3 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold tracking-wider text-foreground/40 line-through">
                Rp {t.oldPrice.toLocaleString("id-ID")}
              </p>
              <p className="font-display text-2xl font-black text-foreground">
                Rp {t.price.toLocaleString("id-ID")}
              </p>
            </div>
            <span className="-rotate-2 brutal-border bg-brutal-accent px-2 py-1 text-xs font-black uppercase text-brutal-border">
              Bayar Sekali
            </span>
          </div>
          <motion.div whileTap={{ scale: 0.97 }}>
            <Button
              asChild
              className="h-12 w-full rounded-none brutal-border bg-foreground font-black uppercase tracking-widest text-background text-sm brutal-shadow-sm hover:bg-brutal-accent hover:text-brutal-border hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all duration-200"
            >
              <a href={`${WA_BASE}?text=${t.waText}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                <ShoppingCart className="w-4 h-4" /> Beli Template
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TemplatePage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = TEMPLATES.filter((t) => {
    const matchCat = activeCategory === "Semua" || t.category === activeCategory;
    const matchSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <>
      <Header />

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-brutal-bg brutal-border-b">
        {/* Grid texture */}
        <div
          className="absolute inset-0 z-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--brutal-border) 2px, transparent 2px),
                              linear-gradient(90deg, var(--brutal-border) 2px, transparent 2px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-20 right-10 w-28 h-28 bg-brutal-accent brutal-border brutal-shadow-sm rotate-12 z-0 hidden md:block" />
        <div className="absolute bottom-16 left-10 w-32 h-32 bg-primary brutal-border rounded-full brutal-shadow-lg z-0 hidden md:block" />
        <div className="absolute top-1/2 -left-8 w-16 h-40 bg-foreground brutal-border rotate-[15deg] z-0 hidden lg:block" />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center"
        >
          {/* Badge */}
          <motion.div variants={brutalDrop} whileHover={{ rotate: 2, scale: 1.05 }} className="mb-8 cursor-pointer">
            <span className="inline-flex items-center gap-2 brutal-border brutal-shadow-sm bg-brutal-accent px-4 py-2 font-black uppercase tracking-widest text-brutal-border">
              <Tag className="w-4 h-4" />
              Template Website Premium — Bayar Sekali, Pakai Selamanya
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={brutalDrop}
            className="mb-6 font-display text-[clamp(2.4rem,6vw,5rem)] font-black uppercase leading-[1.05] tracking-tighter text-foreground drop-shadow-[4px_4px_0_var(--brutal-border)] dark:drop-shadow-[4px_4px_0_#e0e0e0]"
          >
            Website{" "}
            <span className="-rotate-2 brutal-border inline-block bg-primary px-2 pb-2 text-primary-foreground">
              Siap Pakai
            </span>
            ,{" "}
            <br />
            Harga{" "}
            <span className="rotate-1 brutal-border inline-block bg-brutal-accent px-2 pb-1 text-brutal-border">
              Terjangkau
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={brutalDrop}
            whileHover={{ rotate: 1, scale: 1.01 }}
            className="-rotate-1 brutal-border brutal-shadow-sm mb-10 max-w-2xl mx-auto cursor-default bg-white p-4 text-lg font-bold leading-relaxed text-foreground dark:bg-brutal-bg md:text-xl"
          >
            Jangan buang waktu dan uang buat website dari nol.{" "}
            <span className="text-primary underline decoration-4 underline-offset-4">
              Pilih template premium
            </span>{" "}
            kami, sesuaikan dengan brand Anda, dan langsung online dalam hitungan jam.
          </motion.p>

          {/* Feature pills */}
          <motion.div variants={stagger} className="mb-12 flex flex-wrap justify-center gap-3">
            {[
              { icon: <Code2 size={14} />, label: "Kode bersih" },
              { icon: <Zap size={14} />, label: "Loading cepat" },
              { icon: <Globe size={14} />, label: "SEO ready" },
              { icon: <BadgeCheck size={14} />, label: "Lisensi komersial" },
            ].map(({ icon, label }) => (
              <motion.div
                key={label}
                variants={pillItem}
                whileHover={{ x: 4, y: 4, boxShadow: "0 0 0 0 #111" }}
                className="flex cursor-default items-center gap-2 brutal-border brutal-shadow-sm bg-brutal-bg px-4 py-2 font-black uppercase tracking-wide text-foreground text-sm"
              >
                <span className="text-primary">{icon}</span>
                {label}
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div variants={brutalDrop} className="flex flex-wrap items-center justify-center gap-3">
            {[
              { num: "20+", label: "Template Tersedia" },
              { num: "700+", label: "Pembeli Puas" },
              { num: "4.9★", label: "Rating Rata-rata" },
            ].map(({ num, label }) => (
              <div
                key={label}
                className="cursor-default rotate-1 brutal-border brutal-shadow-sm bg-primary px-8 py-5 text-center text-primary-foreground hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              >
                <div className="font-display text-3xl font-black">{num}</div>
                <div className="mt-0.5 text-xs font-black uppercase tracking-widest text-primary-foreground/80">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          WHY TEMPLATE (Pain → Solution)
      ══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-brutal-bg py-24 brutal-border-b">
        <div className="absolute top-10 right-10 w-20 h-20 bg-primary brutal-border brutal-shadow-sm -rotate-6 z-0 hidden md:block" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rotate-1 brutal-border brutal-shadow-sm mx-auto mb-16 max-w-3xl bg-white p-8 text-center dark:bg-brutal-bg"
          >
            <span className="-rotate-2 brutal-border mb-5 inline-flex items-center gap-2 bg-foreground px-4 py-1.5 text-xs font-black uppercase tracking-widest text-background">
              <Rocket className="w-3.5 h-3.5" />
              Kenapa Harus Beli Template?
            </span>
            <h2 className="font-display text-3xl font-black uppercase tracking-tight text-foreground drop-shadow-[2px_2px_0_var(--brutal-border)] md:text-5xl">
              Hemat Waktu,{" "}
              <span className="-rotate-1 brutal-border inline-block bg-brutal-accent px-2 text-brutal-border">
                Hemat Biaya
              </span>
            </h2>
            <p className="mt-4 text-lg font-bold leading-relaxed text-foreground/80">
              Membuat website dari nol bisa butuh 2–4 minggu dan biaya puluhan juta. Dengan template kami, Anda bisa online dalam{" "}
              <strong>24 jam</strong>.
            </p>
          </motion.div>

          {/* Comparison */}
          <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="-rotate-1 brutal-border brutal-shadow bg-white p-6 dark:bg-brutal-bg"
            >
              <div className="mb-5 inline-block brutal-border bg-foreground px-4 py-2 text-sm font-black uppercase tracking-wider text-background">
                ❌ Tanpa Template
              </div>
              <ul className="space-y-3">
                {["Butuh 2–8 minggu pengerjaan", "Biaya desainer Rp 3–15 juta", "Revisi tak terbatas yang melelahkan", "Risiko gagal atau tidak sesuai", "Mulai dari nol = banyak bug"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-bold text-foreground/70">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center brutal-border bg-red-500 text-xs font-black text-white">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rotate-1 brutal-border brutal-shadow bg-brutal-accent p-6"
            >
              <div className="mb-5 inline-block brutal-border bg-foreground px-4 py-2 text-sm font-black uppercase tracking-wider text-background">
                ✅ Dengan Template Kami
              </div>
              <ul className="space-y-3">
                {["Online dalam 24 jam atau kurang", "Harga mulai Rp 199.000 saja", "Design profesional siap pakai", "Kode bersih, zero bug", "Support & dokumentasi lengkap"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-bold text-brutal-border">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center brutal-border bg-primary text-primary-foreground text-xs font-black">
                      <Check className="w-3 h-3" strokeWidth={4} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Benefits */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {BENEFITS.map((b, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ x: 4, y: 4, boxShadow: "0 0 0 0 #111" }}
                className={`brutal-border brutal-shadow cursor-default bg-white p-5 hover:shadow-none transition-all dark:bg-brutal-bg ${i % 2 === 0 ? "-rotate-1" : "rotate-1"} hover:rotate-0`}
              >
                <div className="mb-4 inline-block brutal-border bg-primary p-2.5 text-primary-foreground">{b.icon}</div>
                <h3 className="mb-2 font-display font-black text-base uppercase tracking-tight">{b.title}</h3>
                <p className="text-xs font-bold leading-relaxed text-foreground/70">{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CATALOG
      ══════════════════════════════════════ */}
      <section id="catalog" className="relative overflow-hidden bg-brutal-bg py-24 brutal-border-b">
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-brutal-accent brutal-border brutal-shadow-sm rotate-12 z-0 hidden md:block" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="-rotate-1 brutal-border brutal-shadow-sm mx-auto mb-12 max-w-3xl bg-white p-8 text-center dark:bg-brutal-bg"
          >
            <span className="rotate-2 brutal-border mb-5 inline-flex items-center gap-2 bg-brutal-accent px-4 py-1.5 text-xs font-black uppercase tracking-widest text-brutal-border">
              <Sparkles className="w-3.5 h-3.5" />
              Katalog Template
            </span>
            <h2 className="font-display text-3xl font-black uppercase tracking-tight text-foreground drop-shadow-[2px_2px_0_var(--brutal-border)] md:text-5xl">
              Pilih Template{" "}
              <span className="rotate-1 brutal-border inline-block bg-primary px-2 text-primary-foreground">
                Impian
              </span>{" "}
              Anda
            </h2>
          </motion.div>

          {/* Search + Filter bar */}
          <div className="mb-10 flex flex-col gap-4 sm:flex-row">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
              <input
                type="text"
                placeholder="Cari template..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full brutal-border brutal-shadow-sm bg-white pl-10 pr-4 py-3 font-bold uppercase tracking-wider text-foreground text-sm placeholder:text-foreground/40 focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none transition-all dark:bg-brutal-bg"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`brutal-border px-3 py-2 text-xs font-black uppercase tracking-widest transition-all duration-150 ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground brutal-shadow-sm translate-x-[2px] translate-y-[2px] shadow-none"
                      : "bg-white text-foreground brutal-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-brutal-accent hover:text-brutal-border dark:bg-brutal-bg"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filtered.length > 0 ? (
            <>
              <p className="mb-6 text-xs font-black uppercase tracking-widest text-foreground/50">
                Menampilkan {filtered.length} template
              </p>
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.05 }}
                className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.map((t) => (
                  <TemplateCard key={t.id} t={t} />
                ))}
              </motion.div>
            </>
          ) : (
            <div className="py-20 text-center">
              <div className="-rotate-1 brutal-border brutal-shadow-sm inline-block bg-white p-8 dark:bg-brutal-bg">
                <p className="mb-2 font-display font-black text-2xl uppercase text-foreground">Tidak Ditemukan</p>
                <p className="text-sm font-bold text-foreground/60">Coba kata kunci lain atau pilih kategori berbeda.</p>
              </div>
            </div>
          )}

          {/* Custom template banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rotate-1 brutal-border brutal-shadow-lg mt-16 bg-white p-8 text-center hover:rotate-0 transition-transform dark:bg-brutal-bg md:p-12"
          >
            <span className="-rotate-2 brutal-border mb-4 inline-flex items-center gap-2 bg-primary px-4 py-1.5 text-xs font-black uppercase tracking-widest text-primary-foreground">
              <Heart className="w-3.5 h-3.5" />
              Tidak Ada yang Cocok?
            </span>
            <h3 className="mb-4 font-display font-black text-3xl uppercase tracking-tight drop-shadow-[2px_2px_0_var(--brutal-border)]">
              Kami Buat Template{" "}
              <span className="rotate-1 brutal-border inline-block bg-brutal-accent px-2 text-brutal-border">
                Custom
              </span>{" "}
              Untuk Anda
            </h3>
            <p className="mx-auto mb-6 max-w-lg font-bold text-foreground/70">
              Ceritakan kebutuhan bisnis Anda. Kami rancang template unik yang 100% sesuai brand, mulai dari Rp 499.000.
            </p>
            <a
              href={`${WA_BASE}?text=Halo%20saya%20ingin%20pesan%20template%20custom`}
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-btn inline-flex items-center gap-2 text-lg"
            >
              <MessageCircle size={20} /> Pesan Template Custom
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TECH STACKS
      ══════════════════════════════════════ */}
      <section id="tech-stacks" className="relative overflow-hidden bg-brutal-bg py-24 brutal-border-b">
        <div className="absolute top-10 right-10 w-24 h-24 bg-primary brutal-border brutal-shadow-sm -rotate-12 z-0 hidden md:block" />
        <div className="absolute bottom-10 left-10 w-20 h-20 bg-brutal-accent brutal-border rotate-6 z-0 hidden md:block" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="-rotate-1 brutal-border brutal-shadow-sm mx-auto mb-16 max-w-3xl bg-white p-8 text-center dark:bg-brutal-bg"
          >
            <span className="rotate-2 brutal-border mb-5 inline-flex items-center gap-2 bg-foreground px-4 py-1.5 text-xs font-black uppercase tracking-widest text-background">
              <Code2 className="w-3.5 h-3.5" />
              Pilih Teknologi Anda
            </span>
            <h2 className="font-display text-3xl font-black uppercase tracking-tight text-foreground drop-shadow-[2px_2px_0_var(--brutal-border)] md:text-5xl">
              Mana{" "}
              <span className="-rotate-1 brutal-border inline-block bg-brutal-accent px-2 text-brutal-border">
                Tech Stack
              </span>{" "}
              yang Cocok?
            </h2>
            <p className="mt-4 font-bold text-foreground/70">
              Bingung pilih teknologi? Kami bantu. Setiap stack punya kelebihan masing-masing — pilih sesuai kebutuhan bisnis dan tim Anda.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3"
          >
            {TECH_STACKS.map((ts, i) => (
              <motion.div
                key={ts.id}
                variants={cardVariants}
                whileHover={{ x: 5, y: 5, transition: { type: "spring", stiffness: 400, damping: 12 } }}
                className={`brutal-border brutal-shadow bg-white dark:bg-brutal-bg flex flex-col hover:shadow-none transition-all ${i % 2 === 0 ? "rotate-1" : "-rotate-1"} hover:rotate-0`}
              >
                {/* Header strip */}
                <div className={`${ts.color} brutal-border-b px-5 py-4 flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{ts.emoji}</span>
                    <div>
                      <h3 className="font-display font-black text-lg uppercase tracking-tight text-white leading-none">
                        {ts.name}
                      </h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/80 mt-0.5">
                        {ts.price}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-grow flex-col p-5 gap-4">
                  {/* Tagline */}
                  <p className="font-black text-sm uppercase tracking-wide text-foreground brutal-border bg-brutal-bg dark:bg-black/10 px-3 py-2 -rotate-1">
                    {ts.tagline}
                  </p>

                  {/* Pitch */}
                  <p className="text-sm font-bold leading-relaxed text-foreground/70">
                    {ts.pitch}
                  </p>

                  {/* Pros */}
                  <div>
                    <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-foreground/50">✅ Keunggulan</p>
                    <ul className="space-y-1">
                      {ts.pros.map((p) => (
                        <li key={p} className="flex items-center gap-2 text-xs font-bold text-foreground">
                          <span className="h-3.5 w-3.5 flex-shrink-0 brutal-border bg-primary text-primary-foreground flex items-center justify-center">
                            <Check className="h-2.5 w-2.5" strokeWidth={4} />
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cons */}
                  <div>
                    <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-foreground/50">⚠️ Pertimbangan</p>
                    <ul className="space-y-1">
                      {ts.cons.map((c) => (
                        <li key={c} className="text-xs font-bold text-foreground/60">• {c}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Ideal for */}
                  <div className="brutal-border bg-brutal-accent/20 dark:bg-brutal-accent/10 px-3 py-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-foreground/50 mb-1">🎯 Cocok Untuk</p>
                    <p className="text-xs font-bold text-foreground">{ts.ideal}</p>
                  </div>

                  {/* CTA */}
                  <Button
                    asChild
                    className="mt-auto h-11 w-full rounded-none brutal-border bg-foreground font-black uppercase tracking-widest text-background text-xs brutal-shadow-sm hover:bg-brutal-accent hover:text-brutal-border hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all"
                  >
                    <button
                      onClick={() => {
                        (document.getElementById("catalog") as HTMLElement)?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Lihat Template {ts.name} →
                    </button>
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-brutal-bg py-24 brutal-border-b">
        <div className="absolute top-10 left-10 w-20 h-20 bg-brutal-accent brutal-border rotate-6 z-0 hidden md:block" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="-rotate-1 brutal-border brutal-shadow-sm mx-auto mb-16 max-w-3xl bg-white p-8 text-center dark:bg-brutal-bg"
          >
            <h2 className="font-display text-3xl font-black uppercase tracking-tight text-foreground drop-shadow-[2px_2px_0_var(--brutal-border)] md:text-5xl">
              Cara Mudah{" "}
              <span className="rotate-1 brutal-border inline-block bg-brutal-accent px-2 text-brutal-border">
                Beli & Pakai
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {[
              { step: "01", icon: <Search className="w-7 h-7" />, title: "Pilih Template", desc: "Browse katalog dan temukan template yang sesuai bisnis Anda." },
              { step: "02", icon: <MessageCircle className="w-7 h-7" />, title: "Hubungi via WA", desc: "Chat kami di WhatsApp. Konfirmasi pilihan dan lakukan pembayaran." },
              { step: "03", icon: <Download className="w-7 h-7" />, title: "Terima Source Code", desc: "File langsung dikirim ke WhatsApp Anda beserta panduan instalasi." },
              { step: "04", icon: <Rocket className="w-7 h-7" />, title: "Langsung Online", desc: "Pasang di hosting Anda dan website siap dalam 24 jam." },
            ].map((s, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ x: 4, y: 4, boxShadow: "0 0 0 0 #111" }}
                className={`brutal-border brutal-shadow cursor-default bg-white p-6 hover:shadow-none transition-all dark:bg-brutal-bg ${i % 2 === 0 ? "rotate-1" : "-rotate-1"} hover:rotate-0`}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-display text-4xl font-black leading-none text-brutal-accent dark:text-brutal-accent">
                    {s.step}
                  </span>
                  <div className="brutal-border bg-primary p-2 text-primary-foreground">{s.icon}</div>
                </div>
                <h3 className="mb-2 font-display font-black text-lg uppercase tracking-tight">{s.title}</h3>
                <p className="text-sm font-bold leading-relaxed text-foreground/70">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FAQ
      ══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-brutal-bg py-24 brutal-border-b">
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rotate-1 brutal-border brutal-shadow-sm mb-12 bg-white p-8 text-center dark:bg-brutal-bg"
          >
            <h2 className="font-display text-3xl font-black uppercase tracking-tight text-foreground drop-shadow-[2px_2px_0_var(--brutal-border)] md:text-4xl">
              Pertanyaan{" "}
              <span className="-rotate-1 brutal-border inline-block bg-brutal-accent px-2 text-brutal-border">
                Sering Ditanyakan
              </span>
            </h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-4">
            {FAQ_DATA.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-brutal-bg py-24">
        <div
          className="absolute inset-0 z-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--brutal-border) 2px, transparent 2px),
                              linear-gradient(90deg, var(--brutal-border) 2px, transparent 2px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-10 right-10 w-28 h-28 bg-primary brutal-border rotate-6 z-0 hidden md:block" />
        <div className="absolute bottom-10 left-10 w-36 h-36 bg-brutal-accent brutal-border rounded-full brutal-shadow-lg z-0 hidden md:block" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center"
        >
          <div className="rotate-1 brutal-border brutal-shadow-lg bg-white p-10 hover:rotate-0 transition-transform dark:bg-brutal-bg md:p-16">
            <span className="-rotate-2 brutal-border mb-6 inline-flex items-center gap-2 bg-foreground px-4 py-1.5 text-xs font-black uppercase tracking-widest text-background">
              <Timer className="w-3.5 h-3.5" />
              Jangan Tunda Lagi
            </span>

            <h2 className="mb-6 font-display text-3xl font-black uppercase tracking-tight text-foreground drop-shadow-[2px_2px_0_var(--brutal-border)] md:text-5xl">
              Website Siap,{" "}
              <span className="-rotate-1 brutal-border mt-1 inline-block bg-brutal-accent px-3 text-brutal-border">
                Bisnis Jalan
              </span>
            </h2>

            <p className="mx-auto mb-8 max-w-2xl text-lg font-bold leading-relaxed text-foreground/80">
              Setiap hari tanpa website = peluang yang hilang. Kompetitor Anda sudah online.{" "}
              <strong className="text-foreground">Giliran Anda sekarang.</strong>
            </p>

            <div className="-rotate-1 brutal-border mb-8 inline-block bg-brutal-accent p-4">
              <p className="text-sm font-black uppercase tracking-wider text-brutal-border">
                🎁 Beli hari ini → Gratis Panduan SEO On-Page untuk Bisnis Lokal
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="#catalog" className="brutal-btn inline-flex items-center gap-2 text-lg">
                <ShoppingCart size={20} /> Lihat Semua Template
              </a>
              <a
                href={`${WA_BASE}?text=Halo%20saya%20ingin%20tanya%20template%20website`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 brutal-border brutal-shadow-sm bg-white px-6 py-3 text-lg font-black uppercase tracking-wider text-foreground hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-foreground hover:text-background transition-all dark:bg-brutal-bg"
              >
                <MessageCircle size={20} /> Tanya via WhatsApp
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-bold uppercase tracking-widest text-foreground/40">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-primary" /> Bayar Sekali</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-primary" /> Lisensi Komersial</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-primary" /> Support 14 Hari</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-primary" /> Kode Milik Anda</span>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}
