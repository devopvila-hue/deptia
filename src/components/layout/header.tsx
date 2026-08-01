"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { brand } from "@/config/brand";
import { mainNavigation, mobileNavigation, departmentsNavigation } from "@/config/navigation";
import { DepartmentsDropdown } from "@/components/layout/departments-dropdown";
import { cn } from "@/lib/utils";

function BrandMark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "group relative inline-flex items-center gap-2.5 font-display text-[1.0625rem] tracking-[-0.01em] text-foreground",
        className
      )}
      aria-label={`${brand.name} — Inicio`}
    >
      <span className="relative inline-grid h-7 w-7 grid-cols-2 grid-rows-2 gap-[2px]" aria-hidden>
        <span className="rounded-[2px] bg-accent" />
        <span className="rounded-[2px] border border-foreground/50" />
        <span className="rounded-[2px] border border-foreground/50" />
        <span className="rounded-[2px] bg-foreground" />
      </span>
      <span className="font-semibold">
        {brand.name}
        <span className="text-muted/60">.</span>
      </span>
    </Link>
  );
}

export function Header() {
  const scrollY = useScrollPosition();
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const [menuOpen, setMenuOpen] = useState(false);
  const compact = scrollY > 24;

  // Lock body scroll when mobile menu is open
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

  // Close menu on route change / ESC
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
        animate={{
          paddingTop: compact ? 10 : 18,
          paddingBottom: compact ? 10 : 18,
        }}
        transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
        className={cn(
          "sticky top-0 z-40 w-full",
          "border-b backdrop-blur-md transition-colors",
          compact
            ? "border-border/80 bg-background/80"
            : "border-transparent bg-background/40"
        )}
      >
        <div className="container-wide flex items-center justify-between gap-6">
          <BrandMark />

          <nav
            aria-label="Principal"
            className="hidden items-center gap-1 lg:flex"
          >
            <DepartmentsDropdown />
            {mainNavigation
              .filter((item) => item.href !== "/departamentos")
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-1.5 text-[0.9375rem] text-muted transition-colors hover:bg-surface-soft/60 hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Button href="/acceso" variant="ghost" size="sm" className="h-9 px-3 text-[0.875rem]">
              Acceder
            </Button>
            <Button
              href="/registro"
              variant="primary"
              size="sm"
              className="h-9 px-4 text-[0.875rem]"
              rightIcon={<ArrowUpRight className="h-3.5 w-3.5" />}
            >
              Crear mi equipo
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-surface-soft/50 px-3 text-[0.875rem] font-medium text-foreground lg:hidden"
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className="flex flex-col gap-[3px]" aria-hidden>
              <span className="block h-px w-4 bg-foreground" />
              <span className="block h-px w-4 bg-foreground" />
            </span>
            <span>Menú</span>
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <MobileMenu
            onClose={() => setMenuOpen(false)}
            isMobile={isMobile}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function MobileMenu({ onClose, isMobile }: { onClose: () => void; isMobile: boolean }) {
  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menú principal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex flex-col bg-background/96 backdrop-blur-xl lg:hidden"
    >
      <div className="container-wide flex items-center justify-between py-5">
        <BrandMark />
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-surface-soft/60 px-3 text-[0.875rem] text-foreground"
          aria-label="Cerrar menú"
        >
          <X className="h-4 w-4" />
          Cerrar
        </button>
      </div>

      <div className="container-wide flex-1 overflow-y-auto pb-12 pt-4">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
          <div>
            <p className="mb-4 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
              Navegación
            </p>
            <ul className="space-y-2">
              {mobileNavigation.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.04, duration: 0.35 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="group flex items-baseline justify-between gap-4 border-b border-border/60 py-4"
                  >
                    <div>
                      <span className="text-[1.5rem] font-medium tracking-[-0.02em] text-foreground sm:text-[1.75rem]">
                        {item.label}
                      </span>
                      {item.description && (
                        <span className="mt-1 block text-[0.875rem] text-muted">
                          {item.description}
                        </span>
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
                Departamentos
              </p>
              <ul className="grid grid-cols-1 gap-2">
                {departmentsNavigation.map((d, i) => (
                  <motion.li
                    key={d.href}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.16 + i * 0.04, duration: 0.35 }}
                  >
                    <Link
                      href={d.href}
                      onClick={onClose}
                      className="flex items-center justify-between gap-3 rounded-md border border-border bg-surface-soft/40 px-4 py-3 text-[0.9375rem] text-foreground transition-colors hover:bg-surface-soft"
                    >
                      <div className="min-w-0">
                        <span className="block truncate">{d.label}</span>
                        {d.description && (
                          <span className="block truncate text-[0.75rem] text-muted">
                            {d.description}
                          </span>
                        )}
                      </div>
                      <span className="shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
                        Disponible
                      </span>
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16 + departmentsNavigation.length * 0.04, duration: 0.35 }}
                >
                  <Link
                    href="/departamentos"
                    onClick={onClose}
                    className="flex items-center justify-between rounded-md border border-dashed border-border px-4 py-3 text-[0.875rem] text-foreground/80 transition-colors hover:bg-surface-soft/40"
                  >
                    <span>Ver todos los departamentos</span>
                    <ArrowUpRight className="h-4 w-4 text-muted" />
                  </Link>
                </motion.li>
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.35 }}
              className="rounded-xl border border-border bg-gradient-to-b from-surface-soft/60 to-surface p-5"
            >
              <p className="text-[0.875rem] text-muted">
                Cada empresa dispone de una instancia privada, lista en menos de una hora.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <Button
                  href="/registro"
                  onClick={onClose}
                  variant="primary"
                  size="md"
                  rightIcon={<ArrowUpRight className="h-4 w-4" />}
                >
                  Crear mi equipo
                </Button>
                <Button href="/acceso" onClick={onClose} variant="ghost" size="md">
                  Ya tengo cuenta
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container-wide flex items-center justify-between border-t border-border py-5 text-[0.75rem] text-muted">
        <span>{brand.name} — {brand.tagline}</span>
        <span className="font-mono uppercase tracking-[0.14em]">v1 · ES</span>
      </div>
    </motion.div>
  );
}
