"use client";
import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  ChevronDown,
  Megaphone,
  Search,
  Waypoints,
  AudioLines,
  FileText,
  Code2,
  Layers3,
} from "lucide-react";
import { content } from "@/components/marketing/premium/content";
import { localePrefixPath } from "@/i18n/locale-path";
import type { Locale } from "@/i18n/config";

export function DepartmentsDropdown({
  locale,
  mobile = false,
  onNavigate,
}: {
  locale: Locale;
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const focusFirst = useRef(false);
  const id = useId();
  const pathname = usePathname();
  const es = locale === "es";
  const c = content[locale];
  const icons = [
    Megaphone,
    Search,
    Waypoints,
    AudioLines,
    FileText,
    Code2,
    Layers3,
  ];
  function cancelTimer() {
    if (timer.current) clearTimeout(timer.current);
  }
  function close() {
    cancelTimer();
    setOpen(false);
  }
  function navigate() {
    close();
    onNavigate?.();
  }
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  useEffect(() => {
    if (!open) return;
    if (focusFirst.current) {
      panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
      focusFirst.current = false;
    }
    function outside(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);
  return (
    <div
      ref={root}
      className={`site-mega${mobile ? " site-mega-mobile" : ""}`}
      onPointerEnter={(event) => {
        if (mobile || event.pointerType !== "mouse") return;
        cancelTimer();
        setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (mobile || event.pointerType !== "mouse") return;
        cancelTimer();
        timer.current = setTimeout(() => {
          if (!root.current?.contains(document.activeElement)) setOpen(false);
        }, 160);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          close();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          event.stopPropagation();
          close();
          trigger.current?.focus();
        }
      }}
    >
      <button
        ref={trigger}
        className="site-mega-trigger"
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          cancelTimer();
          setOpen((value) => !value);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            if (open)
              panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
            else {
              focusFirst.current = true;
              setOpen(true);
            }
          }
        }}
      >
        {es ? "Departamentos" : "Departments"}
        <ChevronDown size={13} />
      </button>
      <div ref={panel} id={id} className="site-mega-panel" hidden={!open}>
        <div className="site-mega-intro">
          <span className="p-eyebrow">
            {es ? "TU PRÓXIMO EQUIPO" : "YOUR NEXT TEAM"}
          </span>
          <h2>
            {es ? "Siete especialidades." : "Seven specialties."}
            <br />
            <span>{es ? "Un mismo rumbo." : "One direction."}</span>
          </h2>
          <p>
            {es
              ? "Encuentra lo que tu empresa necesita. Dirección conecta el trabajo de todos."
              : "Find what your business needs. Direction connects everyone’s work."}
          </p>
          <Link
            href={localePrefixPath(locale, "/departamentos")}
            onClick={navigate}
          >
            {es ? "Ver todos los departamentos" : "Explore all departments"}
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="site-mega-grid">
          {c.departments.map((department, i) => {
            const Icon = icons[i] ?? Layers3;
            return (
              <Link
                key={department.slug}
                href={localePrefixPath(
                  locale,
                  department.slug === "direccion"
                    ? "/departamentos#direccion"
                    : `/departamentos/${department.slug}`,
                )}
                onClick={navigate}
                className={`site-mega-item${department.slug === "direccion" ? " site-mega-direction" : ""}`}
              >
                <span className={`site-mega-icon p-${department.color}`}>
                  <Icon size={19} strokeWidth={1.5} />
                </span>
                <span>
                  <strong>
                    {department.name}
                    {department.slug === "direccion" && (
                      <small>{es ? "INCLUIDA" : "INCLUDED"}</small>
                    )}
                  </strong>
                  <span>{department.description}</span>
                </span>
                <ArrowUpRight className="site-mega-arrow" size={15} />
              </Link>
            );
          })}
        </div>
        <div className="site-mega-bottom">
          <span>
            <Layers3 size={15} />
            {es
              ? "Contexto compartido. Permisos claros. Tú al mando."
              : "Shared context. Clear permissions. You in control."}
          </span>
          <Link
            href={localePrefixPath(locale, "/como-funciona")}
            onClick={navigate}
          >
            {es ? "Así trabajan juntos" : "How they work together"}
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
