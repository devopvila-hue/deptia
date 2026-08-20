import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { brand } from "@/config/brand";
import { Container } from "@/components/ui/container";

// Footer replicado del Portal (app.departify.app) — misma estructura,
// misma jerarquía, mismo responsive. Sin compartir código.
export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border bg-background">
      <Container width="wide" className="py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Columna izquierda: marca + descripción + CTA */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <div className="inline-grid h-7 w-7 grid-cols-2 grid-rows-2 gap-[2px]" aria-hidden>
                <span className="rounded-[2px] bg-accent" />
                <span className="rounded-[2px] border border-foreground/50" />
                <span className="rounded-[2px] border border-foreground/50" />
                <span className="rounded-[2px] bg-foreground" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-display text-[1.05rem] font-semibold tracking-[-0.02em] text-foreground">
                  {brand.name}
                </span>
                <span className="font-mono text-[0.55rem] font-medium uppercase tracking-[0.22em] opacity-55">
                  Business Operating System
                </span>
              </div>
            </div>

            <p className="mt-6 max-w-md font-display text-[1.5rem] leading-[1.15] tracking-[-0.02em] text-foreground text-pretty sm:text-[1.75rem]">
              {brand.name}. Business Operating System
            </p>
            <p className="mt-3 max-w-md text-[0.9375rem] text-muted text-pretty">
              {brand.description}
            </p>

            <div className="mt-8">
              <Link
                href="https://app.departify.app/signup"
                className="group inline-flex items-center gap-2 rounded-lg border border-accent/40 bg-accent-soft px-4 py-2.5 text-[0.875rem] font-medium text-foreground transition-colors hover:border-accent/70 hover:bg-accent/20"
              >
                Volver a departify.app →
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Columnas de navegación */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {/* Producto */}
            <div>
              <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
                Producto
              </h3>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <Link
                    href="/departamentos"
                    className="text-[0.9375rem] text-foreground/80 transition-colors hover:text-foreground"
                  >
                    Departamentos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/como-funciona"
                    className="text-[0.9375rem] text-foreground/80 transition-colors hover:text-foreground"
                  >
                    Cómo funciona
                  </Link>
                </li>
                <li>
                  <Link
                    href="/precios"
                    className="text-[0.9375rem] text-foreground/80 transition-colors hover:text-foreground"
                  >
                    Precios
                  </Link>
                </li>
                <li>
                  <Link
                    href="/recursos"
                    className="text-[0.9375rem] text-foreground/80 transition-colors hover:text-foreground"
                  >
                    Recursos
                  </Link>
                </li>
              </ul>
            </div>

            {/* Empresa */}
            <div>
              <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
                Empresa
              </h3>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <Link
                    href="/seguridad"
                    className="text-[0.9375rem] text-foreground/80 transition-colors hover:text-foreground"
                  >
                    Seguridad
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacidad"
                    className="text-[0.9375rem] text-foreground/80 transition-colors hover:text-foreground"
                  >
                    Privacidad
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terminos"
                    className="text-[0.9375rem] text-foreground/80 transition-colors hover:text-foreground"
                  >
                    Términos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="text-[0.9375rem] text-foreground/80 transition-colors hover:text-foreground"
                  >
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>

            {/* Ecosistema */}
            <div>
              <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
                Ecosistema
              </h3>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href="https://departify.app"
                    className="text-[0.9375rem] text-foreground/80 transition-colors hover:text-foreground"
                  >
                    departify.app
                  </a>
                </li>
                <li>
                  <a
                    href="https://app.departify.app"
                    className="text-[0.9375rem] text-foreground/80 transition-colors hover:text-foreground"
                  >
                    app.departify.app
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.departify.app"
                    className="text-[0.9375rem] text-foreground/80 transition-colors hover:text-foreground"
                  >
                    docs.departify.app
                  </a>
                </li>
                <li>
                  <a
                    href="https://api.departify.app"
                    className="text-[0.9375rem] text-foreground/80 transition-colors hover:text-foreground"
                  >
                    api.departify.app
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-[0.8125rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Departify</p>
          <p className="font-mono uppercase tracking-[0.14em]">Made in Spain</p>
        </div>
      </Container>
    </footer>
  );
}