"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/ui/brand-mark";
import { DepartmentsDropdown } from "@/components/layout/departments-dropdown";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { localePrefixPath } from "@/i18n/locale-path";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { content } from "./content";
import type { Locale } from "@/i18n/config";

export function PremiumHeader({ locale }: { locale: Locale }) {
  const c = content[locale];
  const pathname = usePathname();
  const cleanPath = pathname.replace(/^\/(en|es)(?=\/|$)/, "") || "/";
  const navigation = [
    {
      label: locale === "es" ? "Departamentos" : "Departments",
      href: "/departamentos",
    },
    {
      label: locale === "es" ? "Cómo funciona" : "How it works",
      href: "/como-funciona",
    },
    { label: locale === "es" ? "Precios" : "Pricing", href: "/precios" },
    { label: locale === "es" ? "Recursos" : "Resources", href: "/recursos" },
  ];
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (event.key === "Tab") {
        const links = nav.current?.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        );
        const first = links?.[0];
        const last = links?.[links.length - 1];
        if (event.shiftKey && document.activeElement === toggle.current) {
          event.preventDefault();
          last?.focus();
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          toggle.current?.focus();
        }
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          toggle.current?.focus();
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);
  return (
    <header className="p-header">
      <Link
        href={locale === "es" ? "/" : "/en"}
        className="p-wordmark"
        aria-label={locale === "es" ? "Departify — Inicio" : "Departify — Home"}
      >
        <BrandMark />
      </Link>
      <nav
        className="p-desktop-nav"
        aria-label={
          locale === "es" ? "Navegación principal" : "Main navigation"
        }
      >
        <DepartmentsDropdown locale={locale} />
        {navigation
          .filter((item) => item.href !== "/departamentos")
          .map((item) => (
            <a
              key={item.href}
              href={localePrefixPath(locale, item.href)}
              aria-current={
                cleanPath.startsWith(item.href) ? "page" : undefined
              }
            >
              {item.label}
            </a>
          ))}
      </nav>
      <div className="p-header-actions">
        <ThemeToggle locale={locale} />
        <a className="p-login" href="https://app.departify.app/login">
          {c.login}
        </a>
        <a
          className="p-button p-button-dark p-header-cta"
          href="https://app.departify.app/signup"
        >
          {c.start}
          <ArrowUpRight size={15} />
        </a>
        <button
          ref={toggle}
          type="button"
          className="p-menu-toggle"
          aria-label={
            open
              ? locale === "es"
                ? "Cerrar menú"
                : "Close menu"
              : locale === "es"
                ? "Abrir menú"
                : "Open menu"
          }
          aria-expanded={open}
          aria-controls="premium-mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          ref={nav}
          id="premium-mobile-nav"
          className="p-mobile-nav"
          aria-label={
            locale === "es" ? "Navegación móvil" : "Mobile navigation"
          }
        >
          <DepartmentsDropdown
            locale={locale}
            mobile
            onNavigate={() => setOpen(false)}
          />
          {navigation
            .filter((item) => item.href !== "/departamentos")
            .map((item) => (
              <a
                key={item.href}
                href={localePrefixPath(locale, item.href)}
                aria-current={
                  cleanPath.startsWith(item.href) ? "page" : undefined
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
                <ArrowUpRight size={20} />
              </a>
            ))}
          <a href="https://app.departify.app/login">
            {c.login}
            <ArrowUpRight size={20} />
          </a>
          <a href="https://app.departify.app/signup">
            {c.start}
            <ArrowUpRight size={20} />
          </a>
          <div className="site-language-setting">
            <span>{locale === "es" ? "Idioma" : "Language"}</span>
            <LocaleSwitcher currentLocale={locale} />
          </div>
        </nav>
      )}
    </header>
  );
}
