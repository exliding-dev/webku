"use client";

import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaRocket,
  FaCode,
  FaShieldAlt,
  FaBolt,
} from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { id: "home", label: "Beranda", icon: <FaRocket className="w-3.5 h-3.5" /> },
  { id: "layanan", label: "Layanan", icon: <FaCode className="w-3.5 h-3.5" /> },
  { id: "portfolio", label: "Portfolio", icon: <FaShieldAlt className="w-3.5 h-3.5" /> },
  { id: "harga", label: "Harga", icon: <FaBolt className="w-3.5 h-3.5" /> },
  { id: "paket-bulanan", label: "Paket Bulanan", icon: <HiOutlineSparkles className="w-3.5 h-3.5" /> },
  { id: "kontak", label: "Kontak", icon: <FaEnvelope className="w-3.5 h-3.5" /> },
];

const promoLink = { id: "promo", label: "Promo", badge: "HOT" };

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState("home");
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const scrollPosition = window.scrollY + 100;

      const allSections = [...navItems.map(item => item.id), promoLink.id];
      for (const section of allSections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
    closeMenu();
  };

  const NavItem = ({ item, isMobile = false }: { item: typeof navItems[0], isMobile?: boolean }) => {
    const isActive = currentSection === item.id;
    
    return (
      <motion.button
        whileHover={{ scale: 1.02, x: isMobile ? 5 : 0 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => scrollToSection(item.id)}
        className={`
          relative group flex items-center gap-2 text-sm font-bold transition-all duration-300
          ${isMobile 
            ? "w-full px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/30" 
            : "px-4 py-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-950/30"
          }
          ${isActive 
            ? "text-blue-600 dark:text-blue-400" 
            : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          }
        `}
      >
        <span className={`transition-transform duration-300 group-hover:rotate-3 ${isActive ? "text-blue-600" : "text-gray-400"}`}>
          {item.icon}
        </span>
        <span>{item.label}</span>
        {isActive && !isMobile && (
          <motion.span
            className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
            layoutId="activeSection"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </motion.button>
    );
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Top Contact Bar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px"
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center py-2.5 text-xs sm:text-sm">
            <div className="flex items-center space-x-4 sm:space-x-6">
              <motion.a
                whileHover={{ scale: 1.05, x: 2 }}
                href={`tel:+${process.env.NEXT_PUBLIC_CONTACT_PHONE}`}
                className="flex items-center gap-1.5 hover:text-blue-100 transition-colors group"
              >
                <FaPhoneAlt className="text-[0.7em] group-hover:rotate-12 transition-transform" />
                <span className="hidden sm:inline">+{process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY}</span>
                <span className="sm:hidden">+{process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY}</span>
              </motion.a>
              
              <motion.a
                whileHover={{ scale: 1.05, x: 2 }}
                href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                className="flex items-center gap-1.5 hover:text-blue-100 transition-colors group"
              >
                <FaEnvelope className="text-[0.7em] group-hover:rotate-12 transition-transform" />
                <span className="hidden lg:inline">{process.env.NEXT_PUBLIC_CONTACT_EMAIL}</span>
                <span className="lg:hidden">Email</span>
              </motion.a>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-1.5 text-blue-100">
                <FaClock className="text-[0.7em]" />
                <span>Senin - Sabtu: 08:00 - 17:00</span>
              </div>
              
              <motion.a
                whileHover={{ scale: 1.05 }}
                href={`https://wa.me/${process.env.NEXT_PUBLIC_CONTACT_PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold transition-all shadow-lg shadow-green-500/30"
              >
                <FaWhatsapp className="text-sm" />
                <span className="hidden sm:inline">Live Chat</span>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`
          transition-all duration-500
          ${isScrolled 
            ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-b border-gray-200/50 dark:border-gray-800/50" 
            : "bg-white dark:bg-slate-950"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onHoverStart={() => setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
            >
              <button
                onClick={() => scrollToSection("home")}
                className="flex items-center gap-3 group focus:outline-none"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-40 group-hover:opacity-60 transition duration-300" />
                  <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 p-2.5 rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <FaCode className="w-5 h-5 text-white" />
                  </div>
                </div>
                
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-2">
                    <span className="text-xl md:text-2xl font-extrabold tracking-tight">
                      <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                        Ex
                      </span>
                      <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                        liding
                      </span>
                    </span>
                    <motion.span 
                      animate={{ rotate: isHovering ? 360 : 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[8px] px-1.5 py-0.5 rounded-full font-semibold"
                    >
                      PRO
                    </motion.span>
                  </div>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 -mt-1">
                    Solusi Website Profesional
                  </span>
                </div>
              </button>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <NavItem key={item.id} item={item} />
              ))}
              
              {/* Promo Special Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection(promoLink.id)}
                className={`
                  relative ml-2 px-4 py-2 rounded-full font-medium text-sm
                  flex items-center gap-2 overflow-hidden group
                  ${currentSection === promoLink.id
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/30"
                    : "bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-950/30 dark:to-pink-950/30 text-orange-600 dark:text-orange-400 hover:shadow-lg hover:shadow-orange-500/20"
                  }
                `}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <HiOutlineSparkles className="w-4 h-4" />
                  Promo
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[8px] px-1 py-0.5 rounded-full animate-pulse">
                    HOT
                  </span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ zIndex: 0 }}
                />
              </motion.button>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                href={`https://wa.me/${process.env.NEXT_PUBLIC_CONTACT_PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-green-500/30 transition-all duration-300"
              >
                <FaWhatsapp className="text-lg" />
                <span>Konsultasi Gratis</span>
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <motion.a
                whileTap={{ scale: 0.9 }}
                href={`https://wa.me/${process.env.NEXT_PUBLIC_CONTACT_PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-green-500 text-white rounded-full shadow-lg shadow-green-500/30"
              >
                <FaWhatsapp className="w-5 h-5" />
              </motion.a>
              
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
              >
                {isMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-gray-800"
            >
              <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <NavItem key={item.id} item={item} isMobile={true} />
                  ))}
                  
                  {/* Mobile Promo */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => scrollToSection(promoLink.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-950/30 dark:to-pink-950/30 text-orange-600 dark:text-orange-400"
                  >
                    <HiOutlineSparkles className="w-5 h-5" />
                    <span className="font-medium">Promo Spesial</span>
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                      HOT
                    </span>
                  </motion.button>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`tel:+${process.env.NEXT_PUBLIC_CONTACT_PHONE}`}
                      className="flex items-center justify-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-100 transition-colors"
                    >
                      <FaPhoneAlt />
                      <span className="text-sm">Telepon</span>
                    </a>
                    <a
                      href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                      className="flex items-center justify-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-100 transition-colors"
                    >
                      <FaEnvelope />
                      <span className="text-sm">Email</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
};

export default Header;
