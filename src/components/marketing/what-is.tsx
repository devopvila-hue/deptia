"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CompanyOrb } from "@/components/visualizations/company-orb";
import { copy } from "@/config/site";

// QUÉ ES — qué hace, en lenguaje de empresario.
export function WhatIs() {
  return (
    <section className="border-b border-border bg-surface-soft/20">
      <Container width="wide" className="py-20 sm:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>{copy.whatIs.eyebrow}</Eyebrow>
            <h2 className="mt-5 text-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.025em] text-balance text-foreground">
              {copy.whatIs.title}
            </h2>
            <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-muted">
              {copy.whatIs.subtitle}
            </p>

            <ul className="mt-8 space-y-4">
              {copy.whatIs.bullets.map((bullet, i) => (
                <motion.li
                  key={bullet}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-[1rem] leading-relaxed text-foreground/90">
                    {bullet}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl border border-border bg-gradient-to-b from-[#0f110f] to-[#080908] p-6 sm:p-8">
              <div className="absolute inset-x-6 top-0 flex items-center justify-between border-b border-border/60 pb-2">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
                  Tu empresa
                </span>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-success">
                  Operativa
                </span>
              </div>
              <div className="pt-8">
                <CompanyOrb />
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}