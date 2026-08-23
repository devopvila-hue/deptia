"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Play, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ChatPreview } from "@/components/visualizations/chat-preview";
import { track } from "@/lib/analytics";
import { copy } from "@/config/site";

// Hero: no vende. Cuenta cómo es la vida de Manolo.
// Y dice: "hay alguien que puede hacerlo por ti".
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 grid-pattern-fine opacity-40 mask-radial-fade" aria-hidden />
      <div
        className="absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(ellipse, rgba(216,255,98,0.10) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      <Container width="wide" className="relative pb-12 pt-20 sm:pb-20 sm:pt-28 lg:pt-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Eyebrow>{copy.hero.eyebrow}</Eyebrow>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-display text-[clamp(2.5rem,5.6vw,4.75rem)] leading-[1.05] tracking-[-0.03em] text-balance text-foreground"
            >
              {copy.hero.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-7 max-w-xl text-[clamp(1rem,1.4vw,1.1875rem)] leading-relaxed text-muted text-pretty"
            >
              {copy.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Button
                href="https://app.departify.app/signup"
                variant="primary"
                size="lg"
                onClick={() => track("hero_cta_clicked")}
                rightIcon={<ArrowUpRight className="h-4 w-4" />}
              >
                {copy.hero.primaryCta}
              </Button>
              <Button
                href="/departamentos"
                variant="secondary"
                size="lg"
                onClick={() => track("secondary_hero_cta_clicked")}
                leftIcon={<Play className="h-3.5 w-3.5 fill-current" />}
              >
                {copy.hero.secondaryCta}
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted"
            >
              <span className="inline-flex items-center gap-1.5">
                <Shield className="h-3 w-3" /> {copy.hero.microtext}
              </span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-3 text-[0.875rem] text-foreground/80 text-pretty"
            >
              {copy.hero.socialProof}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:col-span-5"
          >
            <div className="relative flex h-full min-h-[460px] flex-col overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-[#0f110f] to-[#080908] p-4 sm:p-5">
              {/* Status pill */}
              <div className="mb-3 flex items-center justify-between border-b border-border/60 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
                    Departamento activo
                  </span>
                </div>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-foreground/70">
                  24 / 7
                </span>
              </div>
              <ChatPreview className="min-h-0 flex-1" />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}