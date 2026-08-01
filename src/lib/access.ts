/**
 * Capa de acceso central.
 *
 * Resuelve TODO lo que la app necesita saber sobre la petición actual en
 * una sola llamada: usuario, perfil, empresa, rol, departamentos
 * habilitados, plan y permisos. Mantener esta lógica centralizada
 * evita duplicación y fugas accidentales.
 *
 * Cada Server Component o Route Handler que requiera contexto debe
 * llamar a `resolveSession()`. La función NUNCA lanza errores; si
 * Supabase no está configurado, devuelve una sesión vacía.
 */
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { permissionsForRole, type Permission } from "@/lib/permissions";
import type {
  CompanyDepartmentRow,
  CompanyRow,
  DepartmentRow,
  PlanRow,
  ProfileRow,
  ResolvedSession,
  SubscriptionRow,
} from "@/types/supabase";

const EMPTY: ResolvedSession = {
  user: { id: "", email: "" },
  profile: null,
  company: null,
  role: null,
  enabledDepartments: [],
  plan: null,
  subscription: null,
  permissions: [],
};

export async function resolveSession(): Promise<ResolvedSession> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return EMPTY;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return EMPTY;

  // 1. Perfil del usuario (incluye company_id y role).
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle<ProfileRow>();

  if (!profile) {
    // El usuario existe en Auth pero aún no tiene profile (post-signup).
    return {
      user: { id: user.id, email: user.email ?? "" },
      profile: null,
      company: null,
      role: null,
      enabledDepartments: [],
      plan: null,
      subscription: null,
      permissions: [],
    };
  }

  const role = profile.role;

  // 2. Empresa y plan.
  let company: CompanyRow | null = null;
  let plan: PlanRow | null = null;
  if (profile.company_id) {
    const [{ data: c }, { data: p }] = await Promise.all([
      supabase
        .from("companies")
        .select("*")
        .eq("id", profile.company_id)
        .maybeSingle<CompanyRow>(),
      supabase
        .from("companies")
        .select("plan_id")
        .eq("id", profile.company_id)
        .maybeSingle<{ plan_id: string | null }>(),
    ]);
    company = c ?? null;
    if (p?.plan_id) {
      const { data: planRow } = await supabase
        .from("plans")
        .select("*")
        .eq("id", p.plan_id)
        .maybeSingle<PlanRow>();
      plan = planRow ?? null;
    }
  }

  // 3. Departamentos activados para esta empresa.
  let enabledDepartments: DepartmentRow[] = [];
  if (company) {
    const { data: cd } = await supabase
      .from("company_departments")
      .select("*")
      .eq("company_id", company.id)
      .eq("is_enabled", true)
      .returns<CompanyDepartmentRow[]>();

    if (cd && cd.length > 0) {
      const deptIds = cd.map((c) => c.department_id);
      const { data: departments } = await supabase
        .from("departments")
        .select("*")
        .in("id", deptIds)
        .eq("status", "published")
        .returns<DepartmentRow[]>();
      enabledDepartments = (departments ?? []).sort(
        (a, b) => a.sort_order - b.sort_order
      );
    }
  }

  // 4. Suscripción activa.
  let subscription: SubscriptionRow | null = null;
  if (company) {
    const { data: s } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("company_id", company.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle<SubscriptionRow>();
    subscription = s ?? null;
  }

  // 5. Permisos derivados del rol.
  const permissions = role ? permissionsForRole(role) : [];

  return {
    user: { id: user.id, email: user.email ?? "" },
    profile,
    company,
    role,
    enabledDepartments,
    plan,
    subscription,
    permissions: permissions as unknown as string[],
  };
}

/** Comprobación síncrona de permiso sobre una sesión ya resuelta. */
export function sessionCan(
  session: ResolvedSession,
  permission: Permission
): boolean {
  if (!session.role) return false;
  if (session.permissions.includes("*")) return true;
  return session.permissions.includes(permission);
}

/** Devuelve los slugs de los departamentos habilitados. */
export function enabledDepartmentSlugs(session: ResolvedSession): string[] {
  return session.enabledDepartments.map((d) => d.slug);
}
