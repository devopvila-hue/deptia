import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { brand } from "@/config/brand";
import { footerNavigation } from "@/config/navigation";
import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border bg-background">
      <Container width="wide" className="py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="inline-grid h-7 w-7 grid-cols-2 grid-rows-2 gap-[2px]" aria-hidden>
              <span className="rounded-[2px] bg-accent" />
              <span className="rounded-[2px] border border-foreground/50" />
              <span className="rounded-[2px] border border-foreground/50" />
              <span className="rounded-[2px] bg-foreground" />
            </div>
            <p className="mt-6 max-w-md font-display text-[1.5rem] leading-[1.15] tracking-[-0.02em] text-foreground text-pretty sm:text-[1.75rem]">
              {brand.name}. {brand.tagline}
            </p>
            <p className="mt-3 max-w-md text-[0.9375rem] text-muted text-pretty">
              Equipos de IA especializados que conocen tu empresa, trabajan con tus herramientas
              y ejecutan tareas bajo tu control.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/registro"
                className="group inline-flex items-center gap-2 rounded-lg border border-accent/40 bg-accent-soft px-4 py-2.5 text-[0.875rem] font-medium text-foreground transition-colors hover:border-accent/70 hover:bg-accent/20"
              >
                Crear mi equipo
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-soft/40 px-4 py-2.5 text-[0.875rem] font-medium text-foreground transition-colors hover:border-foreground/30 hover:bg-surface-soft"
              >
                Hablar con el equipo
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {footerNavigation.map((group) => (
              <div key={group.title}>
                <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[0.9375rem] text-foreground/80 transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-[0.8125rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.legalName}. Todos los derechos reservados.
          </p>
          <p className="font-mono uppercase tracking-[0.14em]">
            Construido en {brand.country} · v1
          </p>
        </div>
      </Container>
    </footer>
  );
}
