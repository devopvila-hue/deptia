"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ArrowUpRight } from "lucide-react";

type AvailableDept = {
  name: string;
  slug: string;
  description: string;
  lead?: string;
};

export function Recommendation() {
  const t = useTranslations("home.recommendation");
  const available = t.raw("available") as AvailableDept[];
  const comingSoon = t.raw("comingSoon") as string[];
  return (
    <section className="border-b border-border bg-surface-soft/20">
      <Container width="wide" className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="mt-5 text-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.025em] text-balance text-foreground">
            {t("title")}
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted text-pretty">
            {t("subtitle")}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {available.map((dept, i) => (
            <motion.div
              key={dept.slug}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <Link
                href={`/departamentos/${dept.slug}`}
                className="group flex h-full flex-col gap-2 rounded-lg border border-border bg-background p-4 transition-colors hover:border-foreground/30"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display text-[1rem] text-foreground">
                    {dept.name}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-success/40 bg-success/10 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-success">
                    <span className="h-1 w-1 rounded-full bg-success" />
                    {t("availableBadge")}
                  </span>
                </div>
                <p className="text-[0.8125rem] leading-relaxed text-muted text-pretty">
                  {dept.description}
                </p>
                <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                  {dept.lead ? (
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
                      {dept.lead}
                    </p>
                  ) : (
                    <span />
                  )}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                    strokeWidth={1.8}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {comingSoon.length > 0 ? (
          <div className="mx-auto mt-12 max-w-2xl">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
              {t("comingSoonBadge")}
            </p>
            <motion.ul
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 flex flex-wrap gap-2"
            >
              {comingSoon.map((dept) => (
                <li
                  key={dept}
                  className="rounded-md border border-dashed border-border bg-surface-soft/30 px-3 py-1.5 font-display text-[0.875rem] text-muted"
                >
                  {dept}
                </li>
              ))}
            </motion.ul>
          </div>
        ) : null}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-10 max-w-2xl text-center text-[1rem] leading-relaxed text-muted text-pretty"
        >
          {t("footnote")}
        </motion.p>
      </Container>
    </section>
  );
}
