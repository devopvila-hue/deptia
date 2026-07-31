import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { LoginForm } from "@/components/forms/login-form";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Acceder",
  description: "Accede al panel de tu empresa en DEPT.IA.",
};

export default function AccessPage() {
  return (
    <section className="relative">
      <div className="absolute inset-0 grid-pattern-fine opacity-30 mask-radial-fade" aria-hidden />
      <Container width="narrow" className="relative grid min-h-[80vh] place-items-center py-20">
        <div className="w-full max-w-md">
          <div className="text-center">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
              Acceso
            </p>
            <h1 className="mt-3 font-display text-[1.75rem] tracking-[-0.02em] text-foreground">
              Entra a tu panel
            </h1>
            <p className="mt-2 text-[0.875rem] text-muted">
              Introduce tus credenciales para acceder a tu instancia.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-gradient-to-b from-[#0f110f] to-[#080908] p-6 sm:p-8">
            <LoginForm />
          </div>

          <p className="mt-6 text-center text-[0.8125rem] text-muted">
            ¿Aún no tienes cuenta?{" "}
            <Link href="/registro" className="text-foreground hover:text-accent">
              Crea tu equipo
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
