"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsApp() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const phoneNumber = process.env.NEXT_PUBLIC_CONTACT_PHONE || "6282126284693";
  const message = "Halo, saya tertarik dengan layanan pembuatan website.";
  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
      {/* Pop up message */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 20,
          delay: 1,
        }}
        className="pointer-events-auto bg-white dark:bg-brutal-bg brutal-border brutal-shadow-sm px-4 py-3 flex items-center gap-3 relative origin-bottom-right rotate-[-2deg] cursor-pointer"
        onClick={() => window.open(waLink, "_blank")}
        whileHover={{ rotate: 2, scale: 1.05 }}
      >
        <div className="absolute -bottom-[9px] right-8 w-4 h-4 bg-white dark:bg-brutal-bg border-b-2 border-r-2 border-primary transform rotate-45"></div>
        
        {/* Notification Dot */}
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 border-2 border-[#25D366] bg-[#25D366]"></span>
        </div>
        <p className="font-bold text-sm uppercase tracking-wider whitespace-nowrap">Mari Konsultasi</p>
      </motion.div>

      {/* WA Button */}
      <motion.a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, rotate: 90 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1, rotate: -5 }}
        whileTap={{ scale: 0.9, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="pointer-events-auto bg-[#25D366] text-white p-4 brutal-border brutal-shadow-md flex items-center justify-center relative group hover:bg-[#1fae52] transition-colors"
      >
        <FaWhatsapp size={36} />
      </motion.a>
    </div>
  );
}
