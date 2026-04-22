"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Mail, MessageSquare, Clock, CheckCircle, Send } from "lucide-react";

export default function KontakPage() {
  const [form, setForm] = useState({ nama: "", bisnis: "", email: "", pesan: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

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
              Hubungi Kami
            </span>
          </motion.div>
          <motion.h1 
            variants={brutalDrop}
            className="font-display text-[clamp(2.5rem,6vw,5rem)] font-black leading-[1.1] uppercase tracking-tighter drop-shadow-[4px_4px_0_var(--brutal-border)] dark:drop-shadow-[4px_4px_0_#e0e0e0] max-w-4xl"
          >
            Mari Bicarakan <br/>
            <span className="bg-primary text-primary-foreground px-2 pb-2 inline-block -rotate-2 brutal-border mt-2">Proyek Anda</span>
          </motion.h1>
          <motion.p variants={brutalDrop} className="mt-8 max-w-xl text-lg md:text-xl font-bold leading-relaxed bg-white dark:bg-brutal-bg brutal-border brutal-shadow-sm p-4 rotate-1 cursor-default">
            Ceritakan kebutuhan Anda — kami akan respons dalam <span className="text-primary underline decoration-4 underline-offset-4">1×24 jam</span> dengan estimasi harga dan timeline tanpa biaya konsultasi.
          </motion.p>
        </motion.div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-start">
          
          {/* ── LEFT: FORM ── */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 400, damping: 20 }}
            className="bg-white dark:bg-brutal-bg brutal-border brutal-shadow-lg p-6 md:p-10"
          >
            {submitted ? (
               <div className="flex flex-col items-start gap-6 py-12">
                 <div className="w-16 h-16 bg-primary brutal-border brutal-shadow-sm flex items-center justify-center rotate-[-4deg]">
                   <CheckCircle size={32} className="text-primary-foreground" />
                 </div>
                 <div>
                   <h2 className="font-display text-3xl font-black uppercase mb-4">Pesan Terkirim!</h2>
                   <p className="text-lg font-bold">
                     Terima kasih, <span className="text-primary">{form.nama}</span>. Tim kami akan menghubungi Anda di <span className="bg-brutal-accent px-1 brutal-border text-brutal-border">{form.email}</span> segera.
                   </p>
                 </div>
                 <button 
                   onClick={() => { setSubmitted(false); setForm({ nama: "", bisnis: "", email: "", pesan: "" }); }}
                   className="brutal-btn mt-4"
                 >
                   Kirim Pesan Lain
                 </button>
               </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="font-black uppercase tracking-wider text-sm">Nama Lengkap</label>
                    <input 
                      name="nama" value={form.nama} onChange={handleChange} required
                      placeholder="Budi Santoso"
                      className="bg-brutal-bg brutal-border p-3 text-foreground font-bold outline-none focus:bg-white focus:brutal-shadow-sm transition-all placeholder:text-foreground/40"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-black uppercase tracking-wider text-sm">Nama Bisnis</label>
                    <input 
                      name="bisnis" value={form.bisnis} onChange={handleChange}
                      placeholder="Toko Maju Jaya"
                      className="bg-brutal-bg brutal-border p-3 text-foreground font-bold outline-none focus:bg-white focus:brutal-shadow-sm transition-all placeholder:text-foreground/40"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-black uppercase tracking-wider text-sm">Email Aktif</label>
                  <input 
                    type="email" name="email" value={form.email} onChange={handleChange} required
                    placeholder="budi@email.com"
                    className="bg-brutal-bg brutal-border p-3 text-foreground font-bold outline-none focus:bg-white focus:brutal-shadow-sm transition-all placeholder:text-foreground/40"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-black uppercase tracking-wider text-sm">Ceritakan Kebutuhan Anda</label>
                  <textarea 
                    name="pesan" rows={5} value={form.pesan} onChange={handleChange} required
                    placeholder="Saya butuh website company profile untuk usaha..."
                    className="bg-brutal-bg brutal-border p-3 text-foreground font-bold outline-none focus:bg-white focus:brutal-shadow-sm transition-all resize-none placeholder:text-foreground/40"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <label className="font-black uppercase tracking-wider text-sm">Jenis Layanan</label>
                  <div className="flex flex-wrap gap-3">
                    {["Company Profile", "Toko Online", "Landing Page", "Blog / Portal", "Custom Web App"].map((s) => (
                      <label key={s} className="cursor-pointer flex items-center gap-2 bg-brutal-bg px-4 py-2 brutal-border font-bold hover:bg-brutal-accent hover:text-brutal-border hover:brutal-shadow-sm transition-all select-none group">
                        <input type="checkbox" className="w-4 h-4 accent-primary brutal-border cursor-pointer" />
                        <span className="text-sm uppercase tracking-wide">{s}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <button type="submit" disabled={loading} className="brutal-btn flex items-center gap-2">
                    {loading ? "Mengirim..." : (
                      <>Kirim Pesan <Send size={18} strokeWidth={3} /></>
                    )}
                  </button>
                  <span className="font-bold text-sm text-foreground/60 hidden sm:inline-block">Gratis, tanpa komitmen</span>
                </div>
              </form>
            )}
          </motion.div>

          {/* ── RIGHT: INFO ── */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 400, damping: 20 }}
            className="flex flex-col gap-6"
          >
            {[
              { icon: <MessageSquare size={20} strokeWidth={3}/>, title: "WhatsApp", value: `+62 ${process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY || "812 3456 7890"}`, sub: "Respon cepat jam kerja", href: `https://wa.me/${process.env.NEXT_PUBLIC_CONTACT_PHONE || ""}` },
              { icon: <Mail size={20} strokeWidth={3}/>, title: "Email", value: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@exliding.my.id", sub: "Untuk brief & dokumen", href: `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@exliding.my.id"}` },
              { icon: <MapPin size={20} strokeWidth={3}/>, title: "Lokasi", value: "Klaten, Jawa Tengah", sub: "Bisa meeting langsung" },
              { icon: <Clock size={20} strokeWidth={3}/>, title: "Jam Operasional", value: "Sen – Sab, 09.00 – 18.00", sub: "WIB" },
            ].map((item, idx) => (
              <a 
                key={item.title} 
                href={item.href || "#"}
                onClick={item.href ? undefined : e => e.preventDefault()}
                className={`brutal-card p-5 flex items-start gap-4 ${item.href ? 'hover:bg-brutal-accent hover:text-brutal-border group' : 'cursor-default'}`}
              >
                <div className={`p-3 brutal-border bg-brutal-bg text-foreground ${item.href ? 'group-hover:bg-primary group-hover:text-primary-foreground' : ''} transition-colors rotate-[-3deg]`}>
                  {item.icon}
                </div>
                <div className="flex flex-col">
                  <span className="font-black uppercase tracking-widest text-xs opacity-70 mb-1">{item.title}</span>
                  <span className="font-bold text-lg leading-tight mb-1">{item.value}</span>
                  <span className="font-bold text-sm opacity-80">{item.sub}</span>
                </div>
              </a>
            ))}

            {/* FAQ Teaser */}
            <div className="bg-primary text-primary-foreground brutal-border brutal-shadow-sm p-6 mt-4 relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-brutal-accent brutal-border rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10">
                <h3 className="font-display font-black text-xl uppercase mb-3">Berapa biaya buat website?</h3>
                <p className="font-bold mb-4 opacity-90 leading-relaxed">
                  Mulai dari <span className="bg-brutal-accent text-brutal-border px-1 brutal-border">Rp 1,5 juta</span> untuk landing page hingga Rp 8 juta+ untuk toko online lengkap.
                </p>
                <a href="/#promo" className="inline-flex items-center gap-2 font-black uppercase text-sm border-b-2 border-primary-foreground pb-1 hover:text-brutal-accent hover:border-brutal-accent transition-colors">
                  Lihat Paket Harga <ArrowRight size={16} strokeWidth={3}/>
                </a>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </main>
  );
}