"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import type { FAQItem } from "@/lib/faqs";

// ─── Animation Variants ──────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, rotate: -1 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: "spring" as const, stiffness: 400, damping: 18 },
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function FAQClient({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-24 bg-brutal-bg brutal-border-b relative overflow-hidden"
    >
      {/* Decorative brutalist background elements */}
      <div className="absolute top-12 left-12 w-24 h-24 bg-primary brutal-border brutal-shadow-sm rotate-12 z-0" />
      <div className="absolute bottom-12 right-12 w-32 h-32 bg-brutal-accent brutal-border rounded-full brutal-shadow-lg z-0" />
      <div className="absolute top-1/3 left-1/4 w-12 h-24 bg-foreground brutal-border -rotate-[15deg] z-0 hidden lg:block" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 p-8 bg-white dark:bg-brutal-bg brutal-border brutal-shadow-sm -rotate-1"
        >
          <span className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 text-xs font-black uppercase tracking-widest bg-primary text-primary-foreground brutal-border rotate-2">
            <HelpCircle className="w-3.5 h-3.5" />
            FAQ
          </span>

          <h2 className="text-4xl md:text-5xl font-display font-black text-foreground uppercase tracking-tight drop-shadow-[2px_2px_0_var(--brutal-border)]">
            Pertanyaan{" "}
            <span className="bg-brutal-accent px-2 text-brutal-border brutal-border inline-block rotate-1">
              Umum
            </span>
          </h2>
          <p className="mt-4 text-lg font-bold text-foreground bg-white dark:bg-brutal-bg p-2 brutal-border inline-block -rotate-1 max-w-xl mx-auto">
            Temukan jawaban untuk pertanyaan yang sering ditanyakan tentang
            layanan kami.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-4"
        >
          {items.map((faq, index) => (
            <motion.div
              key={faq.id}
              variants={itemVariants}
              className="brutal-border bg-white dark:bg-brutal-bg overflow-hidden"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full flex items-center justify-between p-5 sm:p-6 text-left transition-all duration-200 group ${
                  openIndex === index
                    ? "bg-primary text-primary-foreground"
                    : "bg-white dark:bg-brutal-bg text-foreground hover:bg-brutal-accent hover:text-brutal-border"
                }`}
              >
                <span className="flex items-center gap-3 sm:gap-4">
                  <span
                    className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 brutal-border flex items-center justify-center font-black text-sm ${
                      openIndex === index
                        ? "bg-white text-foreground"
                        : "bg-foreground text-background"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-black text-sm sm:text-base uppercase tracking-wide">
                    {faq.question}
                  </span>
                </span>
                <span
                  className={`flex-shrink-0 w-8 h-8 brutal-border flex items-center justify-center transition-all duration-200 ${
                    openIndex === index
                      ? "bg-white text-foreground rotate-0"
                      : "bg-brutal-accent text-brutal-border -rotate-6 group-hover:rotate-0"
                  }`}
                >
                  {openIndex === index ? (
                    <Minus className="w-4 h-4" strokeWidth={3} />
                  ) : (
                    <Plus className="w-4 h-4" strokeWidth={3} />
                  )}
                </span>
              </button>

              {/* Answer */}
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
                      opacity: { duration: 0.2, delay: 0.1 },
                    }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 sm:p-6 brutal-border-t bg-brutal-bg/50">
                      <p className="text-sm sm:text-base font-bold leading-relaxed text-foreground">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA below FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-lg font-black uppercase tracking-wide text-foreground mb-4">
            Masih punya pertanyaan?
          </p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_CONTACT_PHONE}?text=Halo%20saya%20ingin%20bertanya%20tentang%20layanan%20Exliding`}
            target="_blank"
            rel="noopener noreferrer"
            className="brutal-btn inline-flex items-center gap-2 text-lg"
          >
            Tanya Langsung via WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
