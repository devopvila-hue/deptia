import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { resolveSession, sessionCan } from "@/lib/access";
import { Container } from "@/components/ui/container";
import { brand } from "@/config/brand";

/**
 * Layout del panel privado. Protege toda la sección: si no hay sesión,
 * redirige a /acceso. Si la hay, expone CompanyContext a los hijos
 * mediante `resolveSession()` centralizada.
 */
export default async function PanelLayout({ children }: { children: ReactNode }) {
  const session = await resolveSession();

  if (!session.user.id) {
    redirect("/acceso?next=/panel");
  }

  const isAdmin = sessionCan(session, "*") || session.role === "super_admin";

  return (
    <div className="relative min-h-[calc(100dvh-8rem)] border-t border-border">
      <Container width="wide" className="py-12 sm:py-16">
        <header className="mb-10 flex flex-col gap-3 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
              {brand.name} · Panel
            </p>
            <h1 className="mt-2 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] tracking-[-0.02em] text-foreground">
              {session.company?.name ?? "Tu espacio"}
            </h1>
            <p className="mt-2 text-[0.9375rem] text-muted">
              Hola, {session.profile?.full_name ?? session.user.email}. Rol:{" "}
              <span className="font-mono uppercase tracking-[0.14em]">
                {session.role ?? "sin asignar"}
              </span>
              .
            </p>
          </div>
          {isAdmin && (
            <a
              href="/admin"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface-soft/60 px-3 py-2 text-[0.8125rem] text-foreground transition-colors hover:border-foreground/30 hover:bg-surface-soft"
            >
              Ir al panel de administración
            </a>
          )}
        </header>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <nav aria-label="Navegación del panel" className="space-y-1">
              <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                Panel
              </p>
              {[
                { href: "/panel", label: "Resumen" },
                { href: "/panel/departamentos", label: "Departamentos" },
                { href: "/panel/miembros", label: "Miembros" },
                { href: "/panel/ajustes", label: "Ajustes" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block rounded-md border border-transparent px-3 py-2 text-[0.875rem] text-muted transition-colors hover:border-border hover:bg-surface-soft/40 hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
              {isAdmin && (
                <a
                  href="/admin"
                  className="mt-2 block rounded-md border border-border bg-surface-soft/60 px-3 py-2 text-[0.875rem] font-medium text-foreground transition-colors hover:border-foreground/30"
                >
                  Administración
                </a>
              )}
            </nav>
          </aside>
          <section className="lg:col-span-9">{children}</section>
        </div>
      </Container>
    </div>
  );
}
