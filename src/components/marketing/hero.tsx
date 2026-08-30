"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Play, Shield } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ChatPreview } from "@/components/visualizations/chat-preview";
import { track } from "@/lib/analytics";
import { localePrefixPath } from "@/i18n/locale-path";
import type { Locale } from "@/i18n/config";

// Hero — composición above-the-fold.
// Decisiones:
//  - Sans redondeada (Geist) para el headline en vez de Fraunces: B2B SaaS
//    serio, sin "gritar" editorialmente. weight 600, tracking -0.025em, leading
//    1.05. "trabajan" en verde --accent como única unidad semántica iluminada.
//  - Spacing vertical compacto: mt-4 entre eyebrow/headline/copy, mt-6 antes
//    de los CTA, mt-4 entre CTA y microtext. Sin bloque "socialProof" (lo
//    movemos fuera del fold para no robar altura).
//  - Panel derecho reduce min-h-[460px] → min-h-[380px] para que la fila no
//    fuerce altura adicional.
export function Hero({ locale }: { locale: Locale }) {
  const t = useTranslations("home.hero");
  const tVis = useTranslations("home.visualization.chatPreview");
  // El título se renderiza como nodos para poder iluminar una palabra en
  // verde sin perder text-balance. La palabra iluminada viene del catálogo
  // (titleHighlight) para que EN y ES apunten a la misma unidad semántica
  // ("trabajan" / "work") — el verbo de acción.
  const titleHighlight = t("titleHighlight");
  const titleTokens = t("title").split(/(\s+)/);
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 grid-pattern-fine opacity-40 mask-radial-fade" aria-hidden />
      <div
        className="absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-60"
        style={{
          background: "radial-gradient(ellipse, rgba(216,255,98,0.10) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      <Container width="wide" className="relative pb-10 pt-10 sm:pb-14 sm:pt-12 lg:pb-16 lg:pt-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Eyebrow>{t("eyebrow")}</Eyebrow>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-4 max-w-[18ch] text-balance font-sans text-[clamp(2rem,4.2vw,3.5rem)] font-extrabold leading-[1.0] tracking-[-0.04em] text-foreground"
            >
              {titleTokens.map((tok, i) =>
                tok.trim() === titleHighlight ? (
                  <span key={i} className="text-accent">
                    {tok}
                  </span>
                ) : (
                  <span key={i}>{tok}</span>
                ),
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 max-w-xl text-[clamp(0.9375rem,1.15vw,1.0625rem)] leading-relaxed text-muted text-pretty"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <Button
                href="https://app.departify.app/signup"
                variant="primary"
                size="lg"
                onClick={() => track("hero_cta_clicked")}
                rightIcon={<ArrowUpRight className="h-4 w-4" />}
              >
                {t("primaryCta")}
              </Button>
              <Button
                href={localePrefixPath(locale, "/departamentos")}
                variant="secondary"
                size="lg"
                onClick={() => track("secondary_hero_cta_clicked")}
                leftIcon={<Play className="h-3.5 w-3.5 fill-current" />}
              >
                {t("secondaryCta")}
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted"
            >
              <span className="inline-flex items-center gap-1.5">
                <Shield className="h-3 w-3" /> {t("microtext")}
              </span>
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:col-span-5"
          >
            <div className="relative flex h-full min-h-[380px] flex-col overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-[#0f110f] to-[#080908] p-4 sm:p-5">
              <div className="mb-3 flex items-center justify-between border-b border-border/60 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
                    {tVis("statusBadge")}
                  </span>
                </div>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-foreground/70">
                  {tVis("statusClock")}
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
