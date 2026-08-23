"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { MemberPattern } from "@/components/visualizations/member-pattern";
import { AGENT_ICONS } from "@/components/ui/icon";
import type { Department } from "@/types/department";
import type { Locale } from "@/i18n/config";
import { localePrefixPath } from "@/i18n/locale-path";
import { track } from "@/lib/analytics";

export function DepartmentGrid({
  department,
  locale,
}: {
  department: Department;
  locale: Locale;
}) {
  const t = useTranslations("departamentos");
  // t("dept.marketing.name") → resuelve via dynamic key
  const name = t(`dept.${department.slug}.name`);
  const shortName = t(`dept.${department.slug}.shortName`);
  const promise = t(`dept.${department.slug}.promise`);
  const category = t(`dept.${department.slug}.category`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -2 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-[#0f110f] to-[#080908] p-6 transition-colors hover:border-foreground/30 sm:p-8"
    >
      <div className="flex items-start justify-between border-b border-border/60 pb-4">
        <span
          className="font-mono text-[0.65rem] uppercase tracking-[0.18em]"
          style={{ color: department.color.base }}
        >
          {category} · 0{department.ordering}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-success/40 bg-success/10 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-success">
          <span className="h-1 w-1 rounded-full bg-success" />
          {t("card.available")}
        </span>
      </div>

      <h3 className="mt-6 font-display text-[1.75rem] leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[2rem]">
        {name}
      </h3>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted text-pretty">
        {promise}
      </p>

      {/* Métricas: en ES se muestran desde data (ES source-of-truth).
          En EN las labels/values del data file aún no están traducidas; para
          preservar ZERO-MIXED, las métricas se ocultan en /en/departamentos. */}
      {locale === "es" && (
        <div className="mt-6 grid grid-cols-3 gap-2">
          {department.metrics.map((m, i) => (
            <div key={`${m.label}-${i}`} className="rounded-md border border-border/60 bg-surface-soft/40 p-2.5">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
                {m.label}
              </p>
              <p className="mt-1 text-[0.875rem] font-medium text-foreground">{m.value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 grid grid-cols-6 gap-2">
        {department.members.map((m) => (
          <MemberPattern
            key={m.id}
            member={m}
            size="sm"
            color={department.color.base}
            icon={AGENT_ICONS[department.slug]}
          />
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-5">
        <div>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">{t("card.since")}</p>
          <p className="mt-0.5 font-display text-[1.25rem] tracking-[-0.02em] text-foreground">
            {department.priceFrom}€ <span className="text-[0.875rem] text-muted">{t("card.perMonth")}</span>
          </p>
        </div>
        <Link
          href={localePrefixPath(locale, `/departamentos/${department.slug}`)}
          onClick={() => track("department_viewed", { department: department.slug })}
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-soft/60 px-3 py-2 text-[0.8125rem] font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-surface-soft"
        >
          {t("card.enter")}
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}