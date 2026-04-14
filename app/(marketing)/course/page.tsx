"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Bell,
  CheckCircle,
} from "lucide-react";

// ─── Countdown  ──────────────────────────────────────────────────────────────
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) return setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

// ─── Course highlights ────────────────────────────────────────────────────────
const HIGHLIGHTS = [
  "Belajar bikin website real tanpa coding",
  "Kuasai WordPress & Elementor dari nol",
  "Komunitas & mentor aktif 24/7",
  "Tonton video sesuai ketersediaan waktu",
  "Sertifikat kelulusan digital",
  "Project pertama untuk portfolio siap tayang",
];

// ─── Component ───────────────────────────────────────────────────────────────
const LAUNCH_DATE = new Date("2025-05-01T00:00:00");

export default function CoursePage() {
  const { d, h, m, s } = useCountdown(LAUNCH_DATE);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <main className="relative min-h-screen bg-slate-950 text-white overflow-hidden flex flex-col items-center justify-center px-6 py-20">
      {/* ── Background glows ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-700/20 rounded-full blur-3xl" />
      </div>

      {/* ── Back link ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-8 left-8"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>
      </motion.div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* ── Badge ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-400 text-sm font-semibold">
            <BookOpen className="w-4 h-4" />
            Exliding Academy — Coming Soon
          </span>
        </motion.div>

        {/* ── Heading ── */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
        >
          Belajar Bikin Website{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            Profesional
          </span>{" "}
          — dari Nol
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-slate-400 mb-12 max-w-xl mx-auto"
        >
          Kursus online intensif dari tim Exliding. Mulai dari nol hingga live buka
          jasa pembuatan website dengan WordPress — dengan proyek nyata siap untuk portfolio.
        </motion.p>

        {/* ── Countdown ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4 mb-14"
        >
          {[
            { label: "Hari", value: d },
            { label: "Jam", value: h },
            { label: "Menit", value: m },
            { label: "Detik", value: s },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl px-5 py-4 min-w-[72px] backdrop-blur-sm"
            >
              <span className="text-3xl font-extrabold text-white tabular-nums">
                {String(value).padStart(2, "0")}
              </span>
              <span className="text-xs text-slate-500 mt-1 font-medium">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* ── Highlights ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-14 text-center"
        >
          {HIGHLIGHTS.map((text) => (
            <div
              key={text}
              className="flex items-center justify-center bg-white/5 border border-white/10 rounded-xl px-4 py-3"
            >
              <span className="text-sm text-slate-300 font-medium">{text}</span>
            </div>
          ))}
        </motion.div>

        {/* ── Notify form ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {submitted ? (
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-green-500/15 border border-green-500/30 rounded-2xl text-green-400 font-semibold">
              <CheckCircle className="w-5 h-5" />
              Terima kasih! Kami akan notifikasi saat kursus dibuka.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                placeholder="Masukkan email kamu..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-full shadow-lg shadow-blue-600/30 transition-all duration-300 hover:scale-105 text-sm whitespace-nowrap"
              >
                <Bell className="w-4 h-4" />
                Beritahu Saya
              </button>
            </form>
          )}
          <p className="mt-4 text-xs text-slate-600">
            Tanpa spam. Cukup satu notifikasi saat kursus resmi dibuka.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
