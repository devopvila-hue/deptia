"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/ui/brand-mark";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { DepartmentsDropdown } from "@/components/layout/departments-dropdown";
import { departments } from "@/data/departments";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import { localePrefixPath } from "@/i18n/locale-path";

function BrandLink({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <Link
      href={localePrefixPath("es", "/")}
      className={cn(
        "group relative inline-flex items-center font-display text-foreground",
        compact ? "h-7" : "h-8",
        className
      )}
      aria-label="Departify — Inicio"
    >
      <BrandMark className={compact ? "h-7" : "h-8"} />
    </Link>
  );
}

export function Header({ locale }: { locale: Locale }) {
  const tChrome = useTranslations("chrome");
  const tNav = useTranslations("nav");
  const tSignIn = tChrome("signIn");
  const tCreate = tChrome("createTeam");
  const tOpenMenu = tChrome("openMenu");
  const tMenuLabel = tChrome("menuLabel");
  const tHeaderAria = tChrome("headerAria");
  const mainItems = tNav.raw("main") as { label: string; description: string; href: string }[];
  const mobileItems = tNav.raw("mobileExtra") as { label: string; description: string; href: string }[];

  const scrollY = useScrollPosition();
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const [menuOpen, setMenuOpen] = useState(false);
  const compact = scrollY > 24;

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (menuOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ paddingTop: compact ? 10 : 18, paddingBottom: compact ? 10 : 18 }}
        transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
        className={cn(
          "sticky top-0 z-40 w-full",
          "border-b backdrop-blur-md transition-colors",
          compact ? "border-border/80 bg-background/80" : "border-transparent bg-background/40"
        )}
      >
        <div className="container-wide flex items-center justify-between gap-6">
          <BrandLink compact={compact} />

          <nav aria-label={tHeaderAria} className="hidden items-center gap-1 lg:flex">
            <DepartmentsDropdown locale={locale} />
            {mainItems
              .filter((item) => item.href !== "/departamentos")
              .map((item) => (
                <Link
                  key={item.href}
                  href={localePrefixPath(locale, item.href)}
                  className="rounded-md px-3 py-1.5 text-[0.9375rem] text-muted transition-colors hover:bg-surface-soft/60 hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <LocaleSwitcher currentLocale={locale} />
            <Button
              href="https://app.departify.app/login"
              variant="ghost"
              size="sm"
              className="h-9 px-3 text-[0.875rem]"
            >
              {tSignIn}
            </Button>
            <Button
              href="https://app.departify.app/signup"
              variant="primary"
              size="sm"
              className="h-9 px-4 text-[0.875rem]"
              rightIcon={<ArrowUpRight className="h-3.5 w-3.5" />}
            >
              {tCreate}
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-surface-soft/50 px-3 text-[0.875rem] font-medium text-foreground lg:hidden"
            aria-label={tOpenMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className="flex flex-col gap-[3px]" aria-hidden>
              <span className="block h-px w-4 bg-foreground" />
              <span className="block h-px w-4 bg-foreground" />
            </span>
            <span>{tMenuLabel}</span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <MobileMenu
            onClose={() => setMenuOpen(false)}
            isMobile={isMobile}
            locale={locale}
            mainItems={mainItems}
            mobileItems={mobileItems}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function MobileMenu({
  onClose,
  isMobile,
  locale,
  mainItems,
  mobileItems,
}: {
  onClose: () => void;
  isMobile: boolean;
  locale: Locale;
  mainItems: { label: string; description: string; href: string }[];
  mobileItems: { label: string; description: string; href: string }[];
}) {
  const tChrome = useTranslations("chrome");
  const tBrand = useTranslations("brand");
  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label={tChrome("mobileMenuAria")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex flex-col bg-background/96 backdrop-blur-xl lg:hidden"
    >
      <div className="container-wide flex items-center justify-between py-5">
        <BrandLink compact />
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-surface-soft/60 px-3 text-[0.875rem] text-foreground"
          aria-label={tChrome("closeMenu")}
        >
          <X className="h-4 w-4" />
          {tChrome("closeMenu")}
        </button>
      </div>

      <div className="container-wide flex-1 overflow-y-auto pb-12 pt-4">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
          <div>
            <p className="mb-4 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
              {tChrome("mobileSectionNav")}
            </p>
            <ul className="space-y-2">
              {[...mainItems, ...mobileItems].map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.04, duration: 0.35 }}
                >
                  <Link
                    href={localePrefixPath(locale, item.href)}
                    onClick={onClose}
                    className="group flex items-baseline justify-between gap-4 border-b border-border/60 py-4"
                  >
                    <div>
                      <span className="text-[1.5rem] font-medium tracking-[-0.02em] text-foreground sm:text-[1.75rem]">
                        {item.label}
                      </span>
                      {item.description && (
                        <span className="mt-1 block text-[0.875rem] text-muted">{item.description}</span>
                      )}
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <p className="mb-4 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
                {tChrome("mobileSectionDepts")}
              </p>
              <DepartmentsListMobile locale={locale} />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.35 }}
              className="rounded-xl border border-border bg-gradient-to-b from-surface-soft/60 to-surface p-5"
            >
              <p className="text-[0.875rem] text-muted">{tChrome("mobileInstanceHint")}</p>
              <div className="mt-4 flex flex-col gap-2">
                <Button
                  href="https://app.departify.app/signup"
                  onClick={onClose}
                  variant="primary"
                  size="md"
                  rightIcon={<ArrowUpRight className="h-4 w-4" />}
                >
                  {tChrome("mobileCreate")}
                </Button>
                <Button href="https://app.departify.app/login" onClick={onClose} variant="ghost" size="md">
                  {tChrome("mobileSignIn")}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container-wide flex items-center justify-between border-t border-border py-5 text-[0.75rem] text-muted">
        <span>
          {tBrand("name")} — {tBrand("tagline")}
        </span>
        <span className="font-mono uppercase tracking-[0.14em]">{tChrome("mobileVersion")}</span>
      </div>
    </motion.div>
  );
}

function DepartmentsListMobile({ locale }: { locale: Locale }) {
  const tChrome = useTranslations("chrome");
  const tDepts = useTranslations("departamentos");
  return (
    <ul className="grid grid-cols-1 gap-2">
      {departments.map((d, i) => (
        <motion.li
          key={d.slug}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 + i * 0.04, duration: 0.35 }}
        >
          <Link
            href={localePrefixPath(locale, `/departamentos/${d.slug}`)}
            className="flex items-center justify-between gap-3 rounded-md border border-border bg-surface-soft/40 px-4 py-3 text-[0.9375rem] text-foreground transition-colors hover:bg-surface-soft"
          >
            <div className="min-w-0">
              <span className="block truncate">{tDepts(`dept.${d.slug}.shortName`)}</span>
              <span className="block truncate text-[0.75rem] text-muted">
                {tDepts(`dept.${d.slug}.tagline`)}
              </span>
            </div>
            <span className="shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
              {tChrome("mobileAvailableBadge")}
            </span>
          </Link>
        </motion.li>
      ))}
      <li>
        <Link
          href={localePrefixPath(locale, "/departamentos")}
          className="flex items-center justify-between rounded-md border border-dashed border-border px-4 py-3 text-[0.875rem] text-foreground/80 transition-colors hover:bg-surface-soft/40"
        >
          <span>{tChrome("mobileSeeAll")}</span>
          <ArrowUpRight className="h-4 w-4 text-muted" />
        </Link>
      </li>
    </ul>
  );
}
