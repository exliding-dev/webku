"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Code2, Zap, Globe, Moon, Sun,
  ChevronDown, BookOpen, Rocket, LayoutDashboard, ShoppingBag,
} from "lucide-react";

const LAYANAN_SUBMENU = [
  {
    name: "Layanan Kami",
    href: "/#layanan",
    icon: <LayoutDashboard className="w-4 h-4" />,
    desc: "Jasa pembuatan website profesional",
    internal: true,
  },
  {
    name: "Paket Bulanan",
    href: "/paket",
    icon: <Rocket className="w-4 h-4" />,
    desc: "Website premium, bayar bulanan",
    internal: false,
  },
  {
    name: "Template Website",
    href: "/template",
    icon: <ShoppingBag className="w-4 h-4" />,
    desc: "Template siap pakai, bayar sekali",
    internal: false,
  },
  {
    name: "Course",
    href: "/course",
    icon: <BookOpen className="w-4 h-4" />,
    desc: "Belajar bikin website dari nol",
    badge: "Coming Soon",
    internal: false,
  },
];

const simpleNavItems = [
  { name: "Beranda", href: "/#home", icon: <Globe className="w-4 h-4" /> },
  { name: "Portfolio", href: "/#portfolio", icon: <Code2 className="w-4 h-4" /> },
  { name: "Blog", href: "/blog", icon: <BookOpen className="w-4 h-4" /> },
  { name: "Kontak", href: "/kontak", icon: <Globe className="w-4 h-4" /> },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [layananOpen, setLayananOpen] = useState(false);
  const [mobileLayananOpen, setMobileLayananOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLayananOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navBase = "text-foreground hover:bg-brutal-accent hover:text-brutal-border brutal-border bg-transparent";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed z-50 w-full transition-all duration-300 bg-brutal-bg brutal-border-b"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="group flex items-center space-x-3">
            <div className="relative">
              <div className="relative bg-primary p-2.5 brutal-border brutal-shadow-sm transition-all group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-none">
                <Code2 className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold uppercase tracking-tight text-foreground">
                Ex<span className="text-primary">liding</span>
              </span>
              <span className="-mt-1 text-xs font-bold tracking-wider text-foreground/70">
                SOLUSI DIGITAL
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center space-x-1 md:flex">
            <Link href="/#home" className={`px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${navBase}`}>
              Beranda
            </Link>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLayananOpen((v) => !v)}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${navBase}`}
              >
                Layanan
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${layananOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {layananOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 top-full mt-2 w-64 overflow-hidden bg-brutal-bg brutal-border brutal-shadow-lg"
                  >
                    {LAYANAN_SUBMENU.map((item) => (
                      <div key={item.name}>
                        <Link
                          href={item.href}
                          onClick={() => setLayananOpen(false)}
                          className="group flex items-start gap-3 border-b-2 border-brutal-border px-4 py-3.5 transition-colors hover:bg-brutal-accent hover:text-brutal-border last:border-b-0"
                        >
                          <span className="mt-0.5 text-primary group-hover:text-brutal-border">{item.icon}</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-bold uppercase tracking-wide text-foreground group-hover:text-brutal-border">
                                {item.name}
                              </p>
                              {item.badge && (
                                <span className="inline-block bg-primary px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-primary-foreground brutal-border">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs font-medium text-foreground/70 group-hover:text-brutal-border/80">{item.desc}</p>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {simpleNavItems.slice(1).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${navBase}`}
              >
                {item.name}
              </Link>
            ))}


            <Link href="/kontak" className="ml-4 brutal-btn">
              Konsultasi Gratis
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-primary p-2.5 text-primary-foreground transition-all brutal-border brutal-shadow-[2px_2px_0_#111] hover:-shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <motion.div
         initial={false}
         animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
         transition={{ duration: 0.3 }}
         className="overflow-hidden border-t-4 border-brutal-border bg-brutal-bg md:hidden"
       >
        <div className="space-y-1.5 px-4 py-4">
          <Link href="/#home" onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wide text-foreground transition-all brutal-border hover:bg-brutal-accent hover:text-brutal-border">
            <Globe className="h-4 w-4" /> Beranda
          </Link>

          <div>
            <button
              onClick={() => setMobileLayananOpen((v) => !v)}
              className="flex w-full items-center justify-between px-4 py-3 text-sm font-bold uppercase tracking-wide text-foreground transition-all brutal-border hover:bg-brutal-accent hover:text-brutal-border"
            >
              <div className="flex items-center gap-3">
                <Zap className="h-4 w-4" /> Layanan
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileLayananOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {mobileLayananOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-2 space-y-2 overflow-hidden pl-4 brutal-border-l"
                >
                  {LAYANAN_SUBMENU.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => { setIsOpen(false); setMobileLayananOpen(false); }}
                      className="flex items-center gap-2 px-3 py-2.5 text-sm font-bold uppercase tracking-wide text-foreground transition-all brutal-border hover:bg-brutal-accent hover:text-brutal-border"
                    >
                      <span className="">{item.icon}</span>
                      {item.name}
                      {item.badge && (
                        <span className="ml-auto inline-block bg-primary px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-primary-foreground brutal-border">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/#portfolio" onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wide text-foreground transition-all brutal-border hover:bg-brutal-accent hover:text-brutal-border">
            <Code2 className="h-4 w-4" /> Portfolio
          </Link>
          <Link href="/blog" onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wide text-foreground transition-all brutal-border hover:bg-brutal-accent hover:text-brutal-border">
            <BookOpen className="h-4 w-4" /> Blog
          </Link>
          <Link href="/kontak" onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wide text-foreground transition-all brutal-border hover:bg-brutal-accent hover:text-brutal-border">
            <Globe className="h-4 w-4" /> Kontak
          </Link>

          <div className="pt-4">
            <Link
              href="/kontak"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center brutal-btn"
            >
              Konsultasi Gratis
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}
