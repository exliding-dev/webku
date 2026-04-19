"use client";

import { motion } from "framer-motion";
import { CheckCircle, Code, LayoutTemplate, Briefcase } from "lucide-react";
import Image from "next/image";

export default function TentangPage() {
  const staggerContainer = {
    hidden: {},
    show: {transition: { staggerChildren: 0.1, delayChildren: 0.2 }}
  };

  const brutalDrop = {
    hidden: { opacity: 0, y: -20, rotate: -2 },
    show: {
      opacity: 1, y: 0, rotate: 0,
      transition: { type: "spring" as const, stiffness: 400, damping: 20 }
    }
  };

  return (
    <main className="min-h-screen relative overflow-x-hidden bg-brutal-bg text-foreground pt-32 pb-24">
      {/* ── TOP DECORATION ── */}
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--brutal-border) 2px, transparent 2px),
                            linear-gradient(90deg, var(--brutal-border) 2px, transparent 2px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
        
        {/* ── HEADER ── */}
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="mb-16">
          <motion.div variants={brutalDrop} className="inline-block mb-6">
            <span className="font-black tracking-widest uppercase bg-brutal-accent text-brutal-border px-4 py-2 brutal-border brutal-shadow-sm text-sm">
              Tentang Kami
            </span>
          </motion.div>
          <motion.h1 
            variants={brutalDrop}
            className="font-display text-[clamp(2.5rem,6vw,4rem)] font-black leading-[1.1] uppercase tracking-tighter drop-shadow-[4px_4px_0_var(--brutal-border)] dark:drop-shadow-[4px_4px_0_#e0e0e0] max-w-4xl"
          >
            Kami membangun <br/>
            <span className="bg-primary text-primary-foreground px-2 pb-2 inline-block -rotate-2 brutal-border mt-2">kehadiran digital</span><br/>
            yang bekerja.
          </motion.h1>
          <motion.p variants={brutalDrop} className="mt-8 max-w-3xl text-lg md:text-xl font-bold leading-relaxed bg-white dark:bg-brutal-bg brutal-border brutal-shadow-sm p-6 rotate-1 cursor-default">
            Exliding adalah agency dan platform template digital yang mengubah ide menjadi pengalaman web yang tak terlupakan.
          </motion.p>
        </motion.div>

        {/* ── MAIN CONTENT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mt-12">
          
          {/* ── LEFT: TEXT ── */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 400, damping: 20 }}
            className="bg-white dark:bg-brutal-bg brutal-border brutal-shadow-lg p-8 md:p-10 flex flex-col gap-6"
          >
            <p className="font-bold text-lg leading-relaxed">
              Di tengah dunia yang semakin terhubung secara digital, <span className="bg-brutal-accent text-brutal-border px-1 brutal-border">Exliding hadir sebagai mitra terpercaya</span> bagi bisnis dan individu yang ingin tampil profesional di ranah online. 
            </p>
            <div className="w-full h-1 bg-brutal-border my-2" />
            <p className="font-bold text-lg leading-relaxed">
              Kami bukan sekadar penyedia jasa — kami adalah tim yang percaya bahwa setiap website yang lahir dari tangan kami harus punya <span className="text-primary underline decoration-4 underline-offset-4">tujuan, karakter, dan dampak nyata.</span>
            </p>
          </motion.div>

          {/* ── RIGHT: LINI UTAMA ── */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 400, damping: 20 }}
            className="flex flex-col gap-8"
          >
            <div className="inline-block">
              <h2 className="font-display text-2xl font-black uppercase tracking-wider bg-primary text-primary-foreground px-4 py-2 brutal-border inline-block rotate-1">
                Dua Lini Utama Kami
              </h2>
            </div>

            <div className="flex flex-col gap-6">
              {/* Lini 1 */}
              <div className="brutal-card p-6 flex flex-col sm:flex-row items-start gap-4 bg-white dark:bg-brutal-bg hover:bg-brutal-accent hover:text-brutal-border transition-colors group cursor-default">
                <div className="p-4 brutal-border bg-brutal-bg text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors rotate-[-3deg]">
                  <Code size={32} strokeWidth={2.5}/>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-black uppercase tracking-widest text-xl mb-2">Website Kustom</h3>
                  <p className="font-bold opacity-90 leading-relaxed">
                    Jasa pembuatan website kustom yang dikerjakan dari nol sesuai kebutuhan unik setiap klien.
                  </p>
                </div>
              </div>

              {/* Lini 2 */}
              <div className="brutal-card p-6 flex flex-col sm:flex-row items-start gap-4 bg-white dark:bg-brutal-bg hover:bg-brutal-accent hover:text-brutal-border transition-colors group cursor-default">
                <div className="p-4 brutal-border bg-brutal-bg text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors rotate-[3deg]">
                  <LayoutTemplate size={32} strokeWidth={2.5}/>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-black uppercase tracking-widest text-xl mb-2">Template Digital</h3>
                  <p className="font-bold opacity-90 leading-relaxed">
                    Platform yang menyediakan koleksi desain siap pakai berkualitas tinggi — mulai dari landing page, portofolio, toko online, hingga dashboard modern.
                  </p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </main>
  );
}
