"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ArrowUpRight, LayoutGrid } from "lucide-react";
import { departments, listPublicDepartments } from "@/data/departments";
import { Icon, AGENT_ICONS } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { localePrefixPath } from "@/i18n/locale-path";
import type { Locale } from "@/i18n/config";

const HOVER_TOLERANCE_MS = 120;

export function DepartmentsDropdown({ locale }: { locale: Locale }) {
  const tNav = useTranslations("nav");
  const tDepts = useTranslations("departamentos");
  const tChrome = useTranslations("chrome");

  const triggerLabel = tNav("main.0.label");
  const seeAllLabel = tChrome("dropdownSeeAll");
  const seeAllHint = tChrome("dropdownSeeAllHint");

  const [open, setOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuId = useId();
  const buttonId = useId();

  // Escape closes, outside click closes, focus management
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        const btn = document.getElementById(buttonId);
        btn?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (target && containerRef.current && !containerRef.current.contains(target)) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open, buttonId]);

  // Hover handlers with tolerance to avoid flicker
  const cancelClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };
  const scheduleOpen = () => {
    cancelClose();
    if (open) return;
    openTimeoutRef.current = setTimeout(() => {
      setOpen(true);
      openTimeoutRef.current = null;
    }, 60);
  };
  const scheduleClose = () => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    cancelClose();
    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false);
      closeTimeoutRef.current = null;
    }, HOVER_TOLERANCE_MS);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={scheduleOpen}
      onMouseLeave={scheduleClose}
    >
      <button
        id={buttonId}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((p) => !p)}
        onFocus={scheduleOpen}
        onBlur={(e) => {
          if (!containerRef.current?.contains(e.relatedTarget as Node | null)) {
            scheduleClose();
          }
        }}
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-[0.9375rem] transition-colors",
          "text-muted hover:bg-surface-soft/60 hover:text-foreground",
          open && "bg-surface-soft/60 text-foreground"
        )}
      >
        {triggerLabel}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            open && "rotate-180"
          )}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="menu"
            aria-labelledby={buttonId}
            initial={{ opacity: 0, y: -6, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.985 }}
            transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
            className="absolute left-0 top-full z-50 mt-2 w-[min(720px,calc(100vw-2rem))]"
          >
            <div
              className={cn(
                "overflow-hidden rounded-2xl border border-border bg-background-elevated shadow-[0_24px_64px_-24px_rgba(0,0,0,0.6)] backdrop-blur-xl backdrop-saturate-150",
                "ring-1 ring-inset ring-foreground/[0.08]"
              )}
            >
              <div
                className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
                aria-hidden
              />
              <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-2">
                {listPublicDepartments().map((d) => {
                  const iconCode = AGENT_ICONS[d.slug];
                  return (
                    <Link
                      key={d.slug}
                      href={localePrefixPath(locale, `/departamentos/${d.slug}`)}
                      role="menuitem"
                      tabIndex={0}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "group relative flex items-start gap-3 rounded-xl border border-transparent px-3 py-3 transition-all",
                        "hover:border-border hover:bg-surface-soft/40 focus-visible:border-border focus-visible:bg-surface-soft/40 focus-visible:outline-none"
                      )}
                    >
                      <span
                        className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-[#0c0e0a]"
                        style={{ color: d.color.base }}
                        aria-hidden
                      >
                        {iconCode ? (
                          <Icon code={iconCode} className="h-4 w-4" strokeWidth={2} />
                        ) : (
                          <DepartmentMark index={0} />
                        )}
                      </span>
                      <span className="flex-1">
                        <span className="flex items-center justify-between gap-2">
                          <span className="text-[0.9375rem] font-medium text-foreground">
                            {tDepts(`dept.${d.slug}.shortName`)}
                          </span>
                          <ArrowUpRight
                            className="h-3.5 w-3.5 text-muted opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100"
                            aria-hidden
                          />
                        </span>
                        <span className="mt-0.5 block text-[0.8125rem] leading-snug text-muted text-pretty">
                          {tDepts(`dept.${d.slug}.tagline`)}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
              <div className="border-t border-border/60 bg-surface-soft/80 px-4 py-3">
                <Link
                  href={localePrefixPath(locale, "/departamentos")}
                  role="menuitem"
                  tabIndex={0}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group inline-flex w-full items-center justify-between gap-2 rounded-lg px-2 py-2 text-[0.875rem]",
                    "text-foreground transition-colors hover:bg-surface-soft/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  )}
                >
                  <span className="inline-flex items-center gap-2">
                    <LayoutGrid className="h-3.5 w-3.5 text-accent" aria-hidden />
                    {seeAllLabel}
                  </span>
                  <span className="inline-flex items-center gap-2 text-muted">
                    <span className="hidden text-[0.75rem] sm:inline">{seeAllHint}</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DepartmentMark({ index }: { index: number }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
      <circle cx="12" cy="12" r={3 + (index % 4)} fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}
