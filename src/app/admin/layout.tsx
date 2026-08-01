import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { resolveSession, sessionCan } from "@/lib/access";
import { Container } from "@/components/ui/container";
import { brand } from "@/config/brand";

/**
 * Layout del panel de administración.
 *
 * Acceso restringido a `super_admin`. Si el rol no coincide,
 * redirige a /panel. Esto se evalúa server-side (no depende
 * solo de UI) — la política RLS es la segunda línea de defensa.
 */
export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await resolveSession();

  if (!session.user.id) {
    redirect("/acceso?next=/admin");
  }

  const isSuper = sessionCan(session, "*") || session.role === "super_admin";
  if (!isSuper) {
    redirect("/panel");
  }

  return (
    <div className="relative min-h-[calc(100dvh-8rem)] border-t border-border">
      <Container width="wide" className="py-12 sm:py-16">
        <header className="mb-10 flex flex-col gap-3 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
              {brand.name} · Administración
            </p>
            <h1 className="mt-2 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] tracking-[-0.02em] text-foreground">
              Consola interna
            </h1>
            <p className="mt-2 text-[0.9375rem] text-muted">
              Acceso restringido a <span className="font-mono uppercase tracking-[0.14em]">super_admin</span>.
              Toda acción queda registrada en <code>audit_log</code>.
            </p>
          </div>
          <a
            href="/panel"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface-soft/60 px-3 py-2 text-[0.8125rem] text-foreground transition-colors hover:border-foreground/30 hover:bg-surface-soft"
          >
            Volver al panel de empresa
          </a>
        </header>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <nav aria-label="Navegación interna" className="space-y-1">
              <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                Administración
              </p>
              {[
                { href: "/admin", label: "Resumen" },
                { href: "/admin/empresas", label: "Empresas" },
                { href: "/admin/departamentos", label: "Departamentos" },
                { href: "/admin/planes", label: "Planes" },
                { href: "/admin/audit", label: "Auditoría" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block rounded-md border border-transparent px-3 py-2 text-[0.875rem] text-muted transition-colors hover:border-border hover:bg-surface-soft/40 hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>
          <section className="lg:col-span-9">{children}</section>
        </div>
      </Container>
    </div>
  );
}
