import type { Metadata } from "next";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { CompanyRow } from "@/types/supabase";

export const metadata: Metadata = {
  title: "Empresas",
  description: "Listado de empresas cliente.",
};

export default async function AdminCompanies() {
  let companies: CompanyRow[] = [];
  let error: string | null = null;
  // Usamos server client (anon + RLS): super_admin pasa la policy,
  // pero al no haber credenciales aún, fallback elegante.
  const supabase = await getSupabaseServerClient();
  if (supabase) {
    const { data, error: err } = await supabase
      .from("companies")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100)
      .returns<CompanyRow[]>();
    companies = data ?? [];
    error = err?.message ?? null;
  }

  return (
    <div className="space-y-8">
      <div>
        <Eyebrow index="A1">Empresas</Eyebrow>
        <h2 className="mt-4 font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.1] tracking-[-0.02em] text-foreground">
          Listado y alta de empresas.
        </h2>
      </div>
      {error ? (
        <div className="rounded-xl border border-warning/40 bg-warning/10 p-4 text-[0.875rem] text-foreground">
          {error}
        </div>
      ) : companies.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-[#0c0e0a] p-6 text-[0.875rem] text-muted">
          Aún no hay empresas registradas. Cuando se conecte Supabase aparecerán aquí.
        </div>
      ) : (
        <ul className="space-y-2">
          {companies.map((c) => (
            <li
              key={c.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-border bg-[#0c0e0a] p-4"
            >
              <div>
                <p className="text-[1rem] font-medium text-foreground">{c.name}</p>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">
                  /{c.slug} · {c.status}
                </p>
              </div>
              <span className="font-mono text-[0.7rem] text-muted">
                {new Date(c.created_at).toLocaleDateString("es-ES")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
