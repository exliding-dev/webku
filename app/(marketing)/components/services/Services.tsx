"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

// ─── Animation Variants ──────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
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

import type { Product } from "@/lib/products";

// ─── Component ───────────────────────────────────────────────────────────────

export default function Services({ plans }: { plans: Product[] }) {
  const defaultActionUrl = `https://wa.me/${process.env.NEXT_PUBLIC_CONTACT_PHONE}?text=Halo%20saya%20tertarik`;

  return (
    <section id="layanan" className="py-24 bg-brutal-bg brutal-border-b relative overflow-hidden">
      {/* Decorative brutalist background elements */}
      <div className="absolute top-10 right-10 w-24 h-24 bg-brutal-accent brutal-border brutal-shadow-sm rotate-12 z-0" />
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-primary brutal-border rounded-full brutal-shadow-lg scale-110 z-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header — animated */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 md:mb-16 p-5 md:p-8 bg-white dark:bg-brutal-bg brutal-border brutal-shadow-sm -rotate-1"
        >
          <h2 className="text-3xl md:text-5xl font-display font-black text-foreground uppercase tracking-tight drop-shadow-[2px_2px_0_var(--brutal-border)]">
            Layanan & Pricing
          </h2>
          <p className="mt-4 text-base md:text-lg font-bold text-foreground bg-brutal-accent px-3 py-1.5 md:px-4 md:py-2 brutal-border inline-block rotate-1">
            Pilih paket pembuatan website yang sesuai dengan kebutuhan bisnis Anda.
          </p>
        </motion.div>

        {/* Cards Grid — staggered scroll reveal */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
        >
          {plans.map((plan, index) => (
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
                    <Badge className="bg-primary text-primary-foreground brutal-border py-1 px-4 text-xs font-black uppercase tracking-wider brutal-shadow-[2px_2px_0_0_#111] rounded-none hover:bg-primary">
                      Paling Laris
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4 brutal-border-b">
                  <CardTitle className="text-2xl font-display font-black uppercase tracking-wide">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4 flex flex-col items-center justify-center">
                    <span className="text-2xl md:text-3xl font-black bg-white text-foreground px-3 py-2 md:px-4 md:py-2 brutal-border brutal-shadow-sm -rotate-2">
                      {plan.price}
                    </span>
                    <span className="text-sm font-bold uppercase tracking-wider mt-4 px-2 py-1 bg-foreground text-background brutal-border inline-block rotate-1">
                      {plan.period}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="flex-grow pt-6">
                  {/* Feature list — staggered entry */}
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
                        <span className="text-[13px] md:text-sm font-medium">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </motion.ul>

                  <div className="mt-6 pt-4 brutal-border-t space-y-2">
                    {/* Renewal pricing */}
                    {plan.renewal && (
                      <div className="flex items-center gap-2 px-3 py-2 bg-foreground/5 brutal-border">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-primary">
                          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
                        </svg>
                        <span className="text-xs font-bold uppercase tracking-wide">
                          Perpanjangan: <span className="text-primary">{plan.renewal}</span>
                        </span>
                      </div>
                    )}
                    {/* Disclaimer notes */}
                    {plan.notes && (
                      <p className="text-[11px] text-center font-semibold tracking-wide text-muted-foreground italic opacity-80">
                        * {plan.notes}
                      </p>
                    )}
                    {/* Tagline */}
                    {plan.tagline && (
                      <p className="text-xs text-center font-bold tracking-wider uppercase bg-white text-foreground px-2 py-1 brutal-border inline-block rotate-1 mx-auto block mb-1">
                        {plan.tagline}
                      </p>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="pt-4 pb-8 relative z-20">
                  <motion.div
                    whileTap={{ scale: 0.97 }}
                    className="w-full"
                  >
                    <Button
                      asChild
                      className={`w-full h-14 brutal-border bg-foreground text-background font-black uppercase tracking-widest text-lg hover:shadow-none transition-all duration-200 ${
                        plan.popular
                          ? "hover:bg-primary hover:text-primary-foreground brutal-shadow-[4px_4px_0_0_#111] hover:translate-x-[4px] hover:translate-y-[4px]"
                          : "hover:bg-brutal-accent hover:text-brutal-border brutal-shadow-[4px_4px_0_0_#111] hover:translate-x-[4px] hover:translate-y-[4px]"
                      }`}
                    >
                      <a href={plan.waText ? `https://wa.me/${process.env.NEXT_PUBLIC_CONTACT_PHONE}?text=${plan.waText}` : defaultActionUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full h-full">
                        <span className="relative z-10 flex items-center gap-2 transition-transform duration-300">
                          {plan.cta || "Pesan Sekarang"}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"
                          >
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </span>
                      </a>
                    </Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
