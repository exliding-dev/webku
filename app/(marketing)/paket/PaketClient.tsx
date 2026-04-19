"use client";

import React, { useState, useEffect, useRef } from "react";
import type { Product } from "@/lib/products";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Gift,
  MessageCircle,
  Rocket,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
  Ban,
  Eye,
  AlertTriangle,
  Timer,
  HeartHandshake,
  Target,
  BadgeCheck,
  Quote,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

// ─── Animated Counter ────────────────────────────────────────────────────────

function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, {
    stiffness: 80,
    damping: 20,
    duration: 1.5,
  });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) motionVal.set(value);
  }, [isInView, value, motionVal]);

  useEffect(() => {
    const unsub = springVal.on("change", (v) => setDisplay(Math.round(v)));
    return unsub;
  }, [springVal]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

// ─── Animation Variants ──────────────────────────────────────────────────────

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
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

const brutalScale = {
  hidden: { opacity: 0, scale: 0.8, rotate: 4 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring" as const, stiffness: 400, damping: 15 },
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

const featureVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.2 } },
};

const featureItem = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 500, damping: 20 },
  },
};

const pillStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const pillItem = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 600, damping: 25 },
  },
};

// ─── Data ────────────────────────────────────────────────────────────────────

const WA_BASE = `https://wa.me/${process.env.NEXT_PUBLIC_CONTACT_PHONE}`;

const PAIN_POINTS = [
  {
    icon: <Ban className="w-6 h-6" />,
    title: "Biaya Jutaan di Awal",
    desc: "Agency minta Rp 3-10 juta sebelum mulai kerja. Belum termasuk perpanjangan tahunan.",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Proses Berbulan-bulan",
    desc: "Revisi bolak-balik tanpa kejelasan, website gak pernah selesai-selesai.",
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Desain Kuno & Lambat",
    desc: "Sudah bayar mahal, tapi website terlihat jadul dan loading lama.",
  },
  {
    icon: <AlertTriangle className="w-6 h-6" />,
    title: "Support Menghilang",
    desc: "Developer susah dihubungi setelah bayar. Error? Urusan sendiri.",
  },
];

const BENEFITS = [
  {
    icon: <Gift className="w-7 h-7" />,
    title: "Rp 0 Biaya Setup",
    desc: "Tidak ada biaya pembuatan di awal. Kami yang investasi, Anda tinggal bayar bulanan.",
  },
  {
    icon: <Timer className="w-7 h-7" />,
    title: "Jadi Dalam 3-7 Hari",
    desc: "Kami tidak butuh berminggu-minggu. Kirim bahan, website selesai dalam hitungan hari.",
  },
  {
    icon: <HeartHandshake className="w-7 h-7" />,
    title: "Support Selamanya",
    desc: "Selama berlangganan, Anda dapat support teknis tanpa batas. Error? Kami yang urus.",
  },
  {
    icon: <Shield className="w-7 h-7" />,
    title: "SSL & Backup Otomatis",
    desc: "Keamanan website dan backup harian sudah termasuk. Data Anda selalu aman.",
  },
  {
    icon: <Target className="w-7 h-7" />,
    title: "SEO & Analytics",
    desc: "Optimasi mesin pencari dan tracking performa agar bisnis Anda mudah ditemukan.",
  },
  {
    icon: <BadgeCheck className="w-7 h-7" />,
    title: "Bebas Cancel Kapan Saja",
    desc: "Tidak puas? Cancel kapan saja tanpa penalti. Domain & data tetap milik Anda.",
  },
];

// PLANS now passed as props — populated from content/products/*.json

const TESTIMONIALS = [
  {
    name: "Rina Wati",
    role: "Pemilik Toko Online",
    quote:
      "Dengan paket bulanan, saya gak perlu pusing biaya besar di awal. Website profesional + support luar biasa!",
    initials: "RW",
    accent: "bg-primary",
  },
  {
    name: "Andi Prasetyo",
    role: "CV Maju Bersama",
    quote:
      "Bayar bulanan terasa lebih ringan. Website company profile kami sekarang jadi kebanggaan perusahaan.",
    initials: "AP",
    accent: "bg-brutal-accent",
  },
  {
    name: "Maya Sari",
    role: "Freelance Designer",
    quote:
      "Banyak klien baru datang setelah punya website profesional. ROI-nya terasa banget!",
    initials: "MS",
    accent: "bg-primary",
  },
];

const COMPARISON = [
  { feature: "Biaya Awal", old: "Rp 3-10 juta", monthly: "Rp 0" },
  { feature: "Biaya Bulanan", old: "Rp 500rb-1jt/thn", monthly: "Mulai Rp 149rb/bln" },
  { feature: "Support", old: "Terbatas / Berbayar", monthly: "Included Selamanya" },
  { feature: "Update & Maintenance", old: "Bayar Ekstra", monthly: "Gratis" },
  { feature: "SSL & Keamanan", old: "Kadang Bayar", monthly: "Gratis" },
  { feature: "Cancel?", old: "Uang Hangus", monthly: "Bebas Cancel" },
];

const FAQ_DATA = [
  {
    q: "Apakah ada kontrak jangka panjang?",
    a: "Tidak ada! Anda bisa cancel kapan saja. Tanpa penalti, tanpa ribet.",
  },
  {
    q: "Bagaimana jika saya ingin cancel?",
    a: "Cukup hubungi kami 7 hari sebelum periode berikutnya. Data dan domain tetap milik Anda.",
  },
  {
    q: "Apakah domain & website jadi milik saya?",
    a: "Ya, 100%! Domain terdaftar atas nama Anda. Jika berhenti berlangganan, tetap bisa digunakan.",
  },
  {
    q: "Berapa lama website jadi?",
    a: "Rata-rata 3-7 hari kerja setelah semua bahan kami terima. Paket Starter bisa 2 hari!",
  },
  {
    q: "Sudah termasuk hosting dan domain?",
    a: "Ya! Semua paket include hosting SSD, free domain .com 1 tahun, dan SSL gratis.",
  },
  {
    q: "Bisakah upgrade paket di tengah jalan?",
    a: "Tentu! Upgrade kapan saja, selisih biaya prorata. Downgrade efektif periode berikutnya.",
  },
];

// ─── FAQ Item ────────────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      variants={cardVariants}
      className="bg-white dark:bg-brutal-bg brutal-border brutal-shadow-sm overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full p-5 text-left font-bold uppercase tracking-wide text-foreground hover:bg-brutal-accent hover:text-brutal-border transition-colors"
      >
        <span className="text-sm pr-4">{q}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 flex-shrink-0" />
        )}
      </button>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="px-5 pb-5 text-sm font-bold text-foreground/80 leading-relaxed brutal-border-t pt-4"
        >
          {a}
        </motion.div>
      )}
    </motion.div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function PaketPage({ plans }: { plans: Product[] }) {
  return (
    <>
      <Header />

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 1: HERO
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center bg-brutal-bg brutal-border-b overflow-hidden">
        {/* Grid texture */}
        <div
          className="absolute inset-0 z-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--brutal-border) 2px, transparent 2px),
                              linear-gradient(90deg, var(--brutal-border) 2px, transparent 2px)`,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Geometric shapes */}
        <div className="absolute top-20 right-10 w-24 h-24 bg-brutal-accent brutal-border brutal-shadow-sm rotate-12 z-0 hidden md:block" />
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-primary brutal-border rounded-full brutal-shadow-lg z-0 hidden md:block" />
        <div className="absolute top-1/3 -left-8 w-16 h-40 bg-foreground brutal-border rotate-[15deg] z-0 hidden lg:block" />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center"
        >
          {/* Badge */}
          <motion.div variants={brutalDrop} whileHover={{ rotate: 2, scale: 1.05 }} className="mb-8 cursor-pointer">
            <span className="inline-flex items-center gap-2 bg-brutal-accent text-brutal-border brutal-border px-4 py-2 font-black tracking-widest uppercase brutal-shadow-sm">
              <Sparkles className="w-4 h-4" />
              Paket Website Bulanan — Tanpa Ribet
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={brutalDrop}
            className="font-display mb-6 max-w-4xl mx-auto text-[clamp(2.4rem,6vw,5rem)] font-black leading-[1.05] tracking-tighter text-foreground uppercase drop-shadow-[4px_4px_0_var(--brutal-border)] dark:drop-shadow-[4px_4px_0_#e0e0e0]"
          >
            Website Profesional,{" "}
            <span className="bg-primary text-primary-foreground px-2 pb-2 inline-block -rotate-2 brutal-border">
              Mulai Rp 149rb
            </span>
            <br />
            Per Bulan
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={brutalDrop}
            whileHover={{ rotate: 1, scale: 1.02 }}
            className="mb-10 max-w-xl mx-auto text-lg md:text-xl font-bold leading-relaxed text-foreground p-4 bg-white dark:bg-brutal-bg brutal-border brutal-shadow-sm -rotate-1 cursor-default"
          >
            Bisnis Anda{" "}
            <span className="text-primary underline decoration-4 underline-offset-4">
              layak tampil profesional
            </span>{" "}
            di dunia digital — tanpa bayar jutaan di awal. Cukup bayar bulanan, website premium langsung jadi.
          </motion.p>

          {/* Feature pills */}
          <motion.div
            variants={pillStagger}
            initial="hidden"
            animate="show"
            className="mb-12 flex flex-wrap justify-center gap-3"
          >
            {[
              { icon: <Zap size={14} />, label: "Loading < 3 detik" },
              { icon: <Smartphone size={14} />, label: "Mobile responsive" },
              { icon: <Shield size={14} />, label: "SSL & Security" },
              { icon: <TrendingUp size={14} />, label: "SEO optimized" },
            ].map(({ icon, label }) => (
              <motion.div
                key={label}
                variants={pillItem}
                whileHover={{ x: 4, y: 4, boxShadow: "0 0 0 0 #111" }}
                whileTap={{ x: 8, y: 8, boxShadow: "0 0 0 0 #111" }}
                className="flex cursor-default items-center gap-2 px-4 py-2 font-black tracking-wide bg-brutal-bg text-foreground brutal-border brutal-shadow-sm uppercase text-sm"
              >
                <span className="text-primary">{icon}</span>
                {label}
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={brutalDrop} className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
            <a
              href="#pricing"
              className="brutal-btn flex items-center gap-2 text-lg"
            >
              Lihat Harga Paket <ArrowRight size={20} strokeWidth={4} />
            </a>
            <a
              href={`${WA_BASE}?text=Halo%20saya%20ingin%20konsultasi%20paket%20bulanan`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 font-black uppercase tracking-wider text-foreground bg-white dark:bg-brutal-bg brutal-border brutal-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-brutal-border hover:text-white dark:hover:text-brutal-bg transition-all text-lg flex items-center gap-2"
            >
              <MessageCircle size={20} /> Konsultasi Gratis
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div variants={brutalDrop} className="mt-16 flex flex-wrap items-center justify-center gap-3">
            {[
              { val: 50, suffix: "+", label: "Klien aktif" },
              { val: 98, suffix: "%", label: "Kepuasan" },
              { val: 3, suffix: " hari", label: "Rata² jadi" },
            ].map(({ val, suffix, label }, i) => (
              <React.Fragment key={label}>
                <motion.div
                  variants={brutalScale}
                  whileHover={{ x: 4, y: 4, rotate: 0 }}
                  className="bg-primary text-primary-foreground brutal-border brutal-shadow-sm px-8 py-6 text-center rotate-1 hover:shadow-none cursor-default"
                >
                  <div className="font-display mb-1 text-4xl font-black">
                    <AnimatedCounter value={val} suffix={suffix} />
                  </div>
                  <div className="text-xs font-black tracking-widest uppercase text-primary-foreground/80">
                    {label}
                  </div>
                </motion.div>
              </React.Fragment>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 2: PAIN POINTS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-brutal-bg brutal-border-b relative overflow-hidden">
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-brutal-accent brutal-border rotate-12 z-0 hidden md:block" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16 p-8 bg-white dark:bg-brutal-bg brutal-border brutal-shadow-sm rotate-1"
          >
            <span className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 text-xs font-black uppercase tracking-widest bg-foreground text-background brutal-border -rotate-2">
              <AlertTriangle className="w-3.5 h-3.5" />
              Masalah Yang Sering Terjadi
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-foreground uppercase tracking-tight drop-shadow-[2px_2px_0_var(--brutal-border)]">
              Punya Website Harusnya{" "}
              <span className="bg-brutal-accent px-2 text-brutal-border brutal-border inline-block -rotate-1">
                Gak Semahal Ini
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {PAIN_POINTS.map((p, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{
                  x: 4,
                  y: 4,
                  boxShadow: "0 0 0 0 #111",
                  transition: { type: "spring", stiffness: 400, damping: 12 },
                }}
                className={`bg-white dark:bg-brutal-bg brutal-border brutal-shadow p-6 ${
                  i % 2 === 0 ? "rotate-1" : "-rotate-1"
                } hover:rotate-0 transition-transform cursor-default`}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-foreground text-background brutal-border p-3 flex-shrink-0">
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-black text-lg uppercase tracking-tight mb-2">
                      {p.title}
                    </h3>
                    <p className="text-sm font-bold text-foreground/70 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Transition copy */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-block bg-brutal-accent text-brutal-border brutal-border brutal-shadow-sm p-6 rotate-1 max-w-xl">
              <p className="font-black text-xl uppercase tracking-tight">
                💡 Bagaimana kalau ada cara yang{" "}
                <span className="underline decoration-4">lebih hemat</span>,{" "}
                <span className="underline decoration-4">lebih cepat</span>,
                dan{" "}
                <span className="underline decoration-4">tanpa risiko</span>?
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 3: SOLUTION — Benefits
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-brutal-bg brutal-border-b relative overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-brutal-accent brutal-border rotate-6 z-0 hidden md:block" />
        <div className="absolute bottom-10 right-10 w-36 h-36 bg-primary brutal-border rounded-full brutal-shadow-lg z-0 hidden md:block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16 p-8 bg-white dark:bg-brutal-bg brutal-border brutal-shadow-sm -rotate-1"
          >
            <span className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 text-xs font-black uppercase tracking-widest bg-primary text-primary-foreground brutal-border rotate-2">
              <Rocket className="w-3.5 h-3.5" />
              Solusi Kami
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-foreground uppercase tracking-tight drop-shadow-[2px_2px_0_var(--brutal-border)]">
              Website Premium,{" "}
              <span className="bg-brutal-accent px-2 text-brutal-border brutal-border inline-block rotate-1">
                Bayar Bulanan
              </span>
            </h2>
            <p className="mt-4 text-lg font-bold text-foreground bg-white dark:bg-brutal-bg p-2 brutal-border inline-block rotate-1 max-w-xl mx-auto">
              Seperti langganan Netflix — tapi untuk website bisnis Anda.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {BENEFITS.map((b, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{
                  x: 4,
                  y: 4,
                  boxShadow: "0 0 0 0 #111",
                  transition: { type: "spring", stiffness: 400, damping: 12 },
                }}
                className={`bg-white dark:bg-brutal-bg brutal-border brutal-shadow p-6 ${
                  i % 2 === 0 ? "-rotate-1" : "rotate-1"
                } hover:rotate-0 transition-transform cursor-default`}
              >
                <div className="bg-primary text-primary-foreground brutal-border p-3 inline-block mb-4">
                  {b.icon}
                </div>
                <h3 className="font-display font-black text-lg uppercase tracking-tight mb-2">
                  {b.title}
                </h3>
                <p className="text-sm font-bold text-foreground/70 leading-relaxed">
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 4: COMPARISON TABLE
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-brutal-bg brutal-border-b relative overflow-hidden">
        <div className="absolute top-16 left-16 w-20 h-20 bg-primary brutal-border brutal-shadow-sm rotate-[-8deg] z-0 hidden md:block" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12 p-8 bg-white dark:bg-brutal-bg brutal-border brutal-shadow-sm rotate-1"
          >
            <h2 className="text-4xl md:text-5xl font-display font-black text-foreground uppercase tracking-tight drop-shadow-[2px_2px_0_var(--brutal-border)]">
              Cara Lama vs{" "}
              <span className="bg-brutal-accent px-2 text-brutal-border brutal-border inline-block -rotate-1">
                Exliding
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-brutal-bg brutal-border brutal-shadow-lg overflow-hidden"
          >
            {/* Header */}
            <div className="grid grid-cols-3 bg-foreground text-background">
              <div className="p-4 font-black uppercase tracking-wider text-xs border-r-2 border-background/30">
                Fitur
              </div>
              <div className="p-4 font-black uppercase tracking-wider text-xs text-center border-r-2 border-background/30">
                Cara Tradisional
              </div>
              <div className="p-4 font-black uppercase tracking-wider text-xs text-center bg-primary text-primary-foreground">
                Exliding Bulanan ✓
              </div>
            </div>
            {/* Rows */}
            {COMPARISON.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 ${
                  i % 2 === 0
                    ? "bg-white dark:bg-brutal-bg"
                    : "bg-brutal-bg/50 dark:bg-brutal-bg/80"
                } border-b-2 border-brutal-border last:border-b-0`}
              >
                <div className="p-4 font-black text-sm uppercase tracking-wide border-r-2 border-brutal-border">
                  {row.feature}
                </div>
                <div className="p-4 text-sm font-bold text-center text-foreground/60 border-r-2 border-brutal-border line-through decoration-2">
                  {row.old}
                </div>
                <div className="p-4 text-sm font-black text-center text-primary bg-primary/5">
                  {row.monthly}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 5: PRICING CARDS
      ════════════════════════════════════════════════════════════════════ */}
      <section id="pricing" className="py-24 bg-brutal-bg brutal-border-b relative overflow-hidden">
        <div className="absolute top-10 right-10 w-24 h-24 bg-brutal-accent brutal-border brutal-shadow-sm rotate-12 z-0 hidden md:block" />
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-primary brutal-border rounded-full brutal-shadow-lg scale-110 z-0 hidden md:block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16 p-8 bg-white dark:bg-brutal-bg brutal-border brutal-shadow-sm -rotate-1"
          >
            <span className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 text-xs font-black uppercase tracking-widest bg-brutal-accent text-brutal-border brutal-border rotate-2">
              <Sparkles className="w-3.5 h-3.5" />
              Pilih Paket Anda
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-foreground uppercase tracking-tight drop-shadow-[2px_2px_0_var(--brutal-border)]">
              Investasi{" "}
              <span className="bg-primary text-primary-foreground px-2 brutal-border inline-block rotate-1">
                Kecil
              </span>
              , Hasil{" "}
              <span className="bg-brutal-accent text-brutal-border px-2 brutal-border inline-block -rotate-1">
                Besar
              </span>
            </h2>
            <p className="mt-4 text-lg font-bold text-foreground bg-white dark:bg-brutal-bg p-2 brutal-border inline-block rotate-1">
              Semua paket termasuk domain, hosting, SSL, dan support.
            </p>
          </motion.div>

          {/* Cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
          >
            {plans.map((plan, index) => {
              const link = `${WA_BASE}?text=${plan.waText}`;
              return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  x: 8,
                  y: 8,
                  rotate: 1,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
              >
                <Card
                  className={`relative flex flex-col h-full rounded-none overflow-visible ${
                    plan.popular
                      ? "brutal-border bg-brutal-accent text-brutal-border hover:shadow-[8px_8px_0px_0px_#111] dark:hover:shadow-[8px_8px_0px_0px_#e0e0e0] scale-105 z-10 brutal-shadow transition-all duration-200"
                      : "brutal-border bg-white dark:bg-brutal-bg hover:shadow-[8px_8px_0px_0px_#111] dark:hover:shadow-[8px_8px_0px_0px_#e0e0e0] z-0 brutal-shadow transition-all duration-200"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground brutal-border py-1 px-4 text-xs font-black uppercase tracking-wider brutal-shadow-sm rounded-none hover:bg-primary">
                        🔥 Paling Laris
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4 brutal-border-b">
                    <CardTitle className="text-2xl font-display font-black uppercase tracking-wide">
                      {plan.name}
                    </CardTitle>
                    <p className="text-xs font-bold uppercase tracking-wider mt-1 opacity-80">
                      {plan.tagline}
                    </p>
                    <div className="mt-4 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black bg-white text-foreground px-4 py-2 brutal-border brutal-shadow-sm -rotate-2">
                        {plan.price}
                      </span>
                      <span className="text-sm font-bold uppercase tracking-wider mt-4 px-2 py-1 bg-foreground text-background brutal-border inline-block rotate-1">
                        {plan.period}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-grow pt-6">
                    <motion.ul
                      variants={featureVariants}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="space-y-3"
                    >
                      {plan.features.map((feature: string, idx: number) => (
                        <motion.li
                          key={idx}
                          variants={featureItem}
                          className="flex items-start"
                        >
                          <span className="h-6 w-6 brutal-border bg-primary text-primary-foreground flex items-center justify-center shrink-0 mr-3 shadow-[2px_2px_0_#111]">
                            <Check className="h-4 w-4" strokeWidth={4} />
                          </span>
                          <span className="text-sm font-bold uppercase tracking-wide">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </CardContent>

                  <CardFooter className="pt-4 pb-8 relative z-20">
                    <motion.div whileTap={{ scale: 0.97 }} className="w-full">
                      <Button
                        asChild
                        className={`w-full h-14 brutal-border bg-foreground text-background font-black uppercase tracking-widest text-lg hover:shadow-none transition-all duration-200 ${
                          plan.popular
                            ? "hover:bg-primary hover:text-primary-foreground brutal-shadow-sm hover:translate-x-[4px] hover:translate-y-[4px]"
                            : "hover:bg-brutal-accent hover:text-brutal-border brutal-shadow-sm hover:translate-x-[4px] hover:translate-y-[4px]"
                        }`}
                      >
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-full h-full"
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            {plan.cta}
                            <ArrowRight size={18} strokeWidth={3} />
                          </span>
                        </a>
                      </Button>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>
              );
            })}
          </motion.div>

          {/* Guarantee */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-block bg-white dark:bg-brutal-bg brutal-border brutal-shadow-sm p-5 -rotate-1">
              <p className="font-black uppercase tracking-wide text-sm flex items-center gap-2 justify-center">
                <Shield className="w-5 h-5 text-primary" />
                Garansi 30 Hari Uang Kembali — Tidak Puas? Refund 100%
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 6: TESTIMONIALS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-brutal-bg brutal-border-b relative overflow-hidden">
        <div className="absolute top-16 right-16 w-28 h-28 bg-brutal-accent brutal-border brutal-shadow-sm -rotate-12 z-0 hidden md:block" />
        <div className="absolute bottom-16 left-16 w-36 h-36 bg-primary brutal-border rounded-full brutal-shadow-lg z-0 hidden md:block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16 p-8 bg-white dark:bg-brutal-bg brutal-border brutal-shadow-sm rotate-1"
          >
            <span className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 text-xs font-black uppercase tracking-widest bg-primary text-primary-foreground brutal-border -rotate-2">
              <MessageSquare className="w-3.5 h-3.5" />
              Kata Mereka
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-foreground uppercase tracking-tight drop-shadow-[2px_2px_0_var(--brutal-border)]">
              Dipercaya{" "}
              <span className="bg-brutal-accent px-2 text-brutal-border brutal-border inline-block -rotate-1">
                Pebisnis
              </span>{" "}
              Indonesia
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{
                  x: 4,
                  y: 4,
                  rotate: 0,
                  boxShadow: "0 0 0 0 #111",
                  transition: { type: "spring", stiffness: 400, damping: 12 },
                }}
                className={`relative bg-white dark:bg-brutal-bg brutal-border brutal-shadow p-6 cursor-default ${
                  i % 2 === 0 ? "rotate-1" : "-rotate-1"
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
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star
                      key={si}
                      className="w-5 h-5 fill-brutal-accent text-brutal-border"
                      strokeWidth={2}
                    />
                  ))}
                </div>

                <p className="text-sm font-bold leading-relaxed text-foreground mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 brutal-border-t">
                  <div
                    className={`w-12 h-12 ${t.accent} brutal-border flex items-center justify-center font-black text-sm uppercase tracking-wider ${
                      t.accent === "bg-primary"
                        ? "text-primary-foreground"
                        : "text-brutal-border"
                    }`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-black text-sm uppercase tracking-wide text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs font-bold text-foreground/70 uppercase tracking-wider">
                      {t.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 7: FAQ
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-brutal-bg brutal-border-b relative overflow-hidden">
        <div className="absolute top-10 right-10 w-20 h-20 bg-foreground brutal-border rotate-[20deg] z-0 hidden lg:block" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12 p-8 bg-white dark:bg-brutal-bg brutal-border brutal-shadow-sm -rotate-1"
          >
            <h2 className="text-4xl md:text-5xl font-display font-black text-foreground uppercase tracking-tight drop-shadow-[2px_2px_0_var(--brutal-border)]">
              Pertanyaan{" "}
              <span className="bg-brutal-accent px-2 text-brutal-border brutal-border inline-block rotate-1">
                Sering Ditanyakan
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {FAQ_DATA.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SECTION 8: FINAL CTA
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-brutal-bg relative overflow-hidden">
        {/* Grid texture */}
        <div
          className="absolute inset-0 z-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--brutal-border) 2px, transparent 2px),
                              linear-gradient(90deg, var(--brutal-border) 2px, transparent 2px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-10 left-10 w-28 h-28 bg-primary brutal-border rotate-6 z-0 hidden md:block" />
        <div className="absolute bottom-10 right-10 w-36 h-36 bg-brutal-accent brutal-border rounded-full brutal-shadow-lg z-0 hidden md:block" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
        >
          <div className="bg-white dark:bg-brutal-bg brutal-border brutal-shadow-lg p-10 md:p-16 rotate-1 hover:rotate-0 transition-transform">
            <span className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 text-xs font-black uppercase tracking-widest bg-foreground text-background brutal-border -rotate-2">
              <Timer className="w-3.5 h-3.5" />
              Jangan Tunda Lagi
            </span>

            <h2 className="text-3xl md:text-5xl font-display font-black text-foreground uppercase tracking-tight drop-shadow-[2px_2px_0_var(--brutal-border)] mb-6">
              Setiap Hari Tanpa Website =
              <br />
              <span className="bg-brutal-accent px-3 text-brutal-border brutal-border inline-block -rotate-1 mt-2">
                Pelanggan yang Hilang
              </span>
            </h2>

            <p className="text-lg font-bold text-foreground/80 leading-relaxed max-w-2xl mx-auto mb-8">
              Kompetitor Anda sudah online. Calon pelanggan mencari bisnis seperti milik Anda di Google setiap hari. Jika mereka menemukan kompetitor duluan, Anda kehilangan mereka —{" "}
              <strong className="text-foreground">selamanya</strong>.
            </p>

            <div className="bg-brutal-accent brutal-border p-4 mb-8 inline-block -rotate-1">
              <p className="font-black uppercase tracking-wider text-sm text-brutal-border">
                🎁 BONUS: Daftar hari ini → Gratis 2 Artikel SEO + Setup Google My Business
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`${WA_BASE}?text=Halo%20saya%20ingin%20mulai%20berlangganan%20paket%20website%20bulanan`}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-btn flex items-center gap-2 text-lg"
              >
                <MessageCircle size={20} /> Mulai Sekarang
              </a>
              <a
                href="#pricing"
                className="px-6 py-3 font-black uppercase tracking-wider text-foreground bg-white dark:bg-brutal-bg brutal-border brutal-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-foreground hover:text-background transition-all text-lg"
              >
                Lihat Paket ↑
              </a>
            </div>

            <p className="mt-8 text-xs font-bold uppercase tracking-widest text-foreground/50">
              ✦ Tanpa Kontrak ✦ Cancel Kapan Saja ✦ Garansi 30 Hari ✦ Domain Milik Anda
            </p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}
