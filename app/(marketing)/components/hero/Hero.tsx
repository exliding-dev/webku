'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  motion,
  useMotionValue,
  useTransform,
  useInView,
  useSpring,
} from 'framer-motion'
import { ArrowRight, CheckCircle, Zap, Shield, Smartphone } from 'lucide-react'
import { ThreeDMarquee } from '@/components/ui/3d-marquee'

// ─── Animated Counter ────────────────────────────────────────────────────────

function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const numericPart = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0
  const prefix = value.startsWith('<') ? '< ' : ''

  const motionVal = useMotionValue(0)
  const springVal = useSpring(motionVal, { stiffness: 80, damping: 20, duration: 1.5 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (isInView) motionVal.set(numericPart)
  }, [isInView, numericPart, motionVal])

  useEffect(() => {
    const unsub = springVal.on('change', (v) => setDisplay(Math.round(v)))
    return unsub
  }, [springVal])

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  )
}

// ─── Animation Variants ──────────────────────────────────────────────────────

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

const brutalDrop = {
  hidden: { opacity: 0, y: -40, rotate: -4 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: 'spring' as const, stiffness: 500, damping: 20 },
  },
}

const brutalScale = {
  hidden: { opacity: 0, scale: 0.8, rotate: 4 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: 'spring' as const, stiffness: 400, damping: 15 },
  },
}

const pillStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}

const pillItem = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring' as const, stiffness: 600, damping: 25 },
  },
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  // Mouse parallax for the glow
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const glowX = useTransform(mouseX, [-1, 1], [-40, 40])
  const glowY = useTransform(mouseY, [-1, 1], [-40, 40])
  const springGlowX = useSpring(glowX, { stiffness: 60, damping: 30 })
  const springGlowY = useSpring(glowY, { stiffness: 60, damping: 30 })

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1
      mouseX.set(x)
      mouseY.set(y)
    }
    const el = sectionRef.current
    el?.addEventListener('mousemove', handleMouse)
    return () => el?.removeEventListener('mousemove', handleMouse)
  }, [mouseX, mouseY])

  const images = [
    '/assets/hero1.png',
    '/assets/hero2.jpg',
    '/assets/hero3.jpg',
    '/assets/hero4.png',
    '/assets/hero1.png',
    '/assets/hero2.jpg',
    '/assets/hero3.jpg',
    '/assets/hero4.png',
    '/assets/hero2.jpg',
    '/assets/hero3.jpg',
    '/assets/hero4.png',
    '/assets/hero1.png',
    '/assets/hero3.jpg',
    '/assets/hero4.png',
    '/assets/hero1.png',
    '/assets/hero2.jpg',
  ]

  const stats = [
    { value: '50', suffix: '+', label: 'Proyek selesai' },
    { value: '98', suffix: '%', label: 'Klien puas' },
    { value: '<3', suffix: 's', label: 'Load time' },
  ]

  return (
    <>
      <section
        ref={sectionRef}
        id="home"
        className="hero-root relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-brutal-bg brutal-border-b"
      >
        {/* Stark Geometric Shapes with Parallax */}
        <motion.div style={{ x: springGlowX, y: springGlowY }} className="absolute top-20 left-10 w-32 h-32 bg-primary brutal-border brutal-shadow-sm rotate-[-6deg] z-0" />
        <motion.div style={{ x: useTransform(springGlowX, v => -v), y: springGlowY }} className="absolute bottom-40 right-10 w-48 h-48 bg-brutal-accent brutal-border rounded-full brutal-shadow-lg scale-110 z-0" />
        <motion.div style={{ x: springGlowX, y: useTransform(springGlowY, v => -v) }} className="absolute top-1/2 -left-10 w-20 h-40 bg-foreground brutal-border rotate-[12deg] z-0" />

        {/* Dense Grid Texture overlay */}
        <div
          className="absolute inset-0 z-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--brutal-border) 2px, transparent 2px),
                              linear-gradient(90deg, var(--brutal-border) 2px, transparent 2px)`,
            backgroundSize: '40px 40px',
          }}
        />



        {/* ── CONTENT ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pt-24 pb-32 md:pb-28 lg:pb-16 text-center lg:px-10"
        >

          {/* Badge */}
          <motion.div variants={brutalDrop} whileHover={{ rotate: 2, scale: 1.05 }} className="mb-6 md:mb-8 relative transition-transform cursor-pointer">
            <span className="inline-flex items-center gap-2 bg-brutal-accent text-brutal-border brutal-border px-3 py-1.5 md:px-4 md:py-2 font-black text-xs md:text-sm tracking-wider md:tracking-widest uppercase brutal-shadow-[4px_4px_0_0_#111]">
              <span className="h-2 w-2 bg-brutal-border" />
              Jasa Pembuatan Website · Klaten
            </span>
          </motion.div>



          {/* Headline */}
          <motion.h1
            variants={brutalDrop}
            className="font-display mb-4 md:mb-6 max-w-4xl text-[clamp(2.1rem,8vw,5.5rem)] font-black leading-[1.1] md:leading-[1] tracking-tighter text-foreground uppercase drop-shadow-[4px_4px_0_var(--brutal-border)] dark:drop-shadow-[4px_4px_0_#e0e0e0] group"
          >
            Website yang{' '}
            <span className="bg-primary text-primary-foreground px-2 pb-2 inline-block -rotate-2 brutal-border">Menjual</span>
            ,<br />
            Bukan Sekadar Tampil
          </motion.h1>

          {/* Sub-headline */}
          <motion.p variants={brutalDrop} whileHover={{ rotate: 1, scale: 1.02 }} className="mb-8 max-w-xl text-base md:text-xl font-bold leading-relaxed text-foreground p-3 md:p-4 bg-white dark:bg-brutal-bg brutal-border brutal-shadow-sm -rotate-1 cursor-default">
            Kami bangun website cepat, aman, dan SEO-friendly — sehingga bisnis Anda di{' '}
            <span className="text-primary underline decoration-4 underline-offset-4">Klaten &amp; sekitarnya</span>{' '}
            lebih mudah ditemukan dan dipercaya pelanggan.
          </motion.p>

          {/* Feature pills */}
          <motion.div
            variants={pillStagger}
            initial="hidden"
            animate="show"
            className="mb-12 flex flex-wrap justify-center gap-3"
          >
            {[
              { icon: <Zap size={14} />, label: 'Loading super cepat' },
              { icon: <Smartphone size={14} />, label: 'Mobile responsive' },
              { icon: <Shield size={14} />, label: 'Keamanan terjamin' },
              { icon: <CheckCircle size={14} />, label: 'Support after launch' },
            ].map(({ icon, label }) => (
              <motion.div
                key={label}
                variants={pillItem}
                whileHover={{
                  x: 4,
                  y: 4,
                  boxShadow: '0px 0px 0px 0px #111',
                }}
                whileTap={{ x: 8, y: 8, boxShadow: '0px 0px 0px 0px #111' }}
                className="flex cursor-default items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 font-black tracking-normal md:tracking-wide bg-brutal-bg text-foreground brutal-border brutal-shadow-sm uppercase text-xs md:text-sm object-cover"
              >
                <span className="text-primary">{icon}</span>
                {label}
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={brutalDrop} className="flex flex-col items-center gap-6 sm:flex-row mt-6">
            <Link
              href="/kontak"
              className="brutal-btn flex items-center gap-2 text-lg"
            >
              <span>Konsultasi Gratis</span> <ArrowRight size={20} strokeWidth={4} />
            </Link>
            <Link
              href="#portfolio"
              className="px-6 py-3 font-black uppercase tracking-wider text-foreground bg-white dark:bg-brutal-bg brutal-border brutal-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-brutal-border hover:text-white dark:hover:text-brutal-bg transition-all text-lg"
            >
              Lihat Portfolio
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={brutalDrop}
            className="mt-16 flex flex-wrap items-center justify-center gap-3"
          >
            {stats.map(({ value, suffix, label }, i) => (
              <React.Fragment key={value + suffix}>
                <motion.div
                  variants={brutalScale}
                  whileHover={{ x: 4, y: 4, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="bg-primary text-primary-foreground brutal-border brutal-shadow-sm px-5 py-4 md:px-8 md:py-6 text-center rotate-1 hover:shadow-none cursor-default w-[46%] md:w-auto"
                >
                  <div className="font-display mb-1 text-3xl md:text-4xl font-black">
                    <AnimatedCounter value={value} suffix={suffix} />
                  </div>
                  <div className="text-[10px] md:text-xs font-black tracking-wider md:tracking-widest uppercase text-primary-foreground/80">
                    {label}
                  </div>
                </motion.div>
              </React.Fragment>
            ))}
          </motion.div>
        </motion.div>


      </section>
    </>
  )
}
