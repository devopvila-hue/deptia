/**
 * Tipos del modelo de datos de Supabase para DEPT.IA.
 *
 * Convenciones:
 * - `id` siempre UUID v4 (`uuid` en Postgres, gen_random_uuid()).
 * - `created_at` / `updated_at` con default `now()`.
 * - Enums modelados como union TypeScript para mantener la coherencia.
 * - Los nombres de columna coinciden 1:1 con la migración SQL.
 *
 * Esta capa NO depende del cliente `@supabase/supabase-js` para poder
 * ser importada desde Server y Client Components sin arrastrar el SDK.
 */

export type UserRole =
  | "super_admin"
  | "company_owner"
  | "company_admin"
  | "department_manager"
  | "member"
  | "viewer";

export type CompanyStatus = "active" | "paused" | "churned";
export type DepartmentStatus = "draft" | "published" | "archived";
export type MembershipStatus = "invited" | "active" | "disabled";
export type PlanStatus = "active" | "archived";
export type SubscriptionStatus =
  | "trialing"
  | "active"
  | "past_due"
  | "canceled"
  | "incomplete"
  | "incomplete_expired"
  | "unpaid";

/** Tabla `profiles` — un registro por usuario autenticado. */
export interface ProfileRow {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  company_id: string | null;
  role: UserRole;
  status: MembershipStatus;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

/** Tabla `companies` — organización cliente. */
export interface CompanyRow {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  plan_id: string | null;
  status: CompanyStatus;
  created_at: string;
  updated_at: string;
}

/** Tabla `departments` — catálogo global administrable desde Supabase. */
export interface DepartmentRow {
  id: string;
  slug: string;
  name: string;
  short_name: string;
  tagline: string | null;
  short_description: string | null;
  full_description: string | null;
  icon: string | null;
  image_url: string | null;
  video_url: string | null;
  video_thumbnail_url: string | null;
  category: string | null;
  price_from: number | null;
  color_base: string | null;
  color_accent: string | null;
  status: DepartmentStatus;
  is_public: boolean;
  sort_order: number;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

/** Tabla `company_departments` — qué departamentos tiene cada empresa. */
export interface CompanyDepartmentRow {
  id: string;
  company_id: string;
  department_id: string;
  is_enabled: boolean;
  enabled_at: string | null;
  configuration: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

/** Tabla `company_members` — pertenencia empresa/usuario explícita. */
export interface CompanyMemberRow {
  id: string;
  company_id: string;
  user_id: string;
  role: UserRole;
  status: MembershipStatus;
  invited_by: string | null;
  created_at: string;
  updated_at: string;
}

/** Tabla `roles` — definición de rol + permisos granulares. */
export interface RoleRow {
  id: string;
  name: UserRole;
  description: string | null;
  permissions: string[];
  is_system: boolean;
  created_at: string;
}

/** Tabla `plans` — planes comercializables. */
export interface PlanRow {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price_monthly: number | null;
  price_yearly: number | null;
  currency: string;
  billing_interval: "monthly" | "yearly";
  features: string[];
  status: PlanStatus;
  created_at: string;
  updated_at: string;
}

/** Tabla `subscriptions` — suscripción por empresa. */
export interface SubscriptionRow {
  id: string;
  company_id: string;
  plan_id: string | null;
  status: SubscriptionStatus;
  current_period_start: string | null;
  current_period_end: string | null;
  provider: string | null;
  provider_subscription_id: string | null;
  created_at: string;
  updated_at: string;
}

/** Tabla `department_content` — contenido largo/landing por departamento y locale. */
export interface DepartmentContentRow {
  id: string;
  department_id: string;
  locale: string;
  hero: Record<string, unknown> | null;
  sections: Record<string, unknown>[] | null;
  capabilities: string[] | null;
  deliverables: string[] | null;
  problems: { title: string; description: string }[] | null;
  use_cases: { title: string; description: string }[] | null;
  benefits: string[] | null;
  faq: { question: string; answer: string }[] | null;
  cta: Record<string, unknown> | null;
  seo: Record<string, unknown> | null;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

/** Tabla `audit_log` — registro mínimo de operaciones sensibles. */
export interface AuditLogRow {
  id: string;
  company_id: string | null;
  actor_id: string | null;
  action: string;
  entity: string | null;
  entity_id: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

/** Resolucion derivada del usuario actual en una peticion. */
export interface ResolvedSession {
  user: {
    id: string;
    email: string;
  };
  profile: ProfileRow | null;
  company: CompanyRow | null;
  role: UserRole | null;
  enabledDepartments: DepartmentRow[];
  plan: PlanRow | null;
  subscription: SubscriptionRow | null;
  permissions: string[];
}
