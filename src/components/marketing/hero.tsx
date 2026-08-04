"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Play, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CompanyOrb } from "@/components/visualizations/company-orb";
import { track } from "@/lib/analytics";
import { copy } from "@/config/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern-fine opacity-40 mask-radial-fade" aria-hidden />
      {/* Glow */}
      <div
        className="absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(ellipse, rgba(216,255,98,0.10) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      <Container width="wide" className="relative pb-16 pt-24 sm:pb-24 sm:pt-32 lg:pt-36">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Text */}
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
              className="mt-6 text-display text-[clamp(2.5rem,5.6vw,4.75rem)] leading-[1.0] tracking-[-0.03em] text-balance text-foreground"
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
                href="/como-funciona"
                variant="secondary"
                size="lg"
                onClick={() => track("secondary_hero_cta_clicked")}
                leftIcon={<Play className="h-3.5 w-3.5 fill-current" />}
              >
                {copy.hero.secondaryCta}
              </Button>
            </motion.div>

            {/* Micro-confianza — línea que cubre objeciones rápidas */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted"
            >
              <span className="inline-flex items-center gap-1.5">
                <Shield className="h-3 w-3" /> Instancia privada
              </span>
              <span className="h-1 w-1 rounded-full bg-border-strong" aria-hidden />
              <span>Configuración guiada</span>
              <span className="h-1 w-1 rounded-full bg-border-strong" aria-hidden />
              <span>Cancela cuando quieras</span>
            </motion.p>

            {/* Prueba social honesta — placeholder editable */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-7 flex items-center gap-3 rounded-lg border border-border/60 bg-surface-soft/40 px-4 py-3"
            >
              <div className="flex -space-x-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-background bg-foreground/10 text-[0.65rem] font-medium text-foreground/80">
                  EM
                </span>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-background bg-foreground/15 text-[0.65rem] font-medium text-foreground/80">
                  ST
                </span>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-background bg-foreground/20 text-[0.65rem] font-medium text-foreground/80">
                  +
                </span>
              </div>
              <p className="text-[0.8125rem] text-foreground/85 text-pretty">
                {copy.hero.socialProof}
              </p>
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:col-span-5"
          >
            <div className="relative rounded-2xl border border-border bg-gradient-to-b from-[#0f110f] to-[#080908] p-4 sm:p-6">
              <div className="absolute inset-x-4 top-0 flex items-center justify-between border-b border-border/60 pb-2">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
                    Atlas · sala de control
                  </span>
                </div>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-foreground/70">
                  En vivo
                </span>
              </div>
              <div className="pt-8">
                <CompanyOrb />
              </div>
            </div>

            {/* Floating chip */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-4 left-4 hidden items-center gap-2 rounded-lg border border-border bg-[#0c0e0a] px-3 py-2 shadow-2xl sm:flex"
            >
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-foreground">
                3 departamentos · 1 aprobación
              </span>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
