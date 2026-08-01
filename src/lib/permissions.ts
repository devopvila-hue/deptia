/**
 * Catálogo de permisos granulares y helper para comprobar autorización.
 *
 * Los permisos se almacenan en `roles.permissions` (text[]). Mantener este
 * catálogo en TypeScript permite:
 *  - Errores en build si el rol referencia un permiso inexistente.
 *  - Type-safety en `can(role, permission)`.
 *  - Documentación viva en formato de union literal.
 *
 * Convenciones:
 *  - `*.manage` — crear, editar, eliminar.
 *  - `*.read`   — solo lectura.
 *  - `*.execute` — disparar acciones irreversibles.
 */

export type Permission =
  // Empresas
  | "companies.read"
  | "companies.manage"
  | "companies.delete"
  // Usuarios / miembros
  | "members.read"
  | "members.invite"
  | "members.manage"
  | "members.deactivate"
  // Departamentos
  | "departments.read"
  | "departments.manage"
  | "departments.publish"
  | "departments.toggle_for_company"
  // Contenido de landings
  | "department_content.read"
  | "department_content.manage"
  | "department_content.publish"
  // Planes / suscripciones
  | "plans.read"
  | "plans.manage"
  | "subscriptions.read"
  | "subscriptions.manage"
  // Auditoría
  | "audit.read"
  // Permiso sintético (validado en backend, no se concede por UI)
  | "*";

export const ALL_PERMISSIONS: Permission[] = [
  "companies.read",
  "companies.manage",
  "companies.delete",
  "members.read",
  "members.invite",
  "members.manage",
  "members.deactivate",
  "departments.read",
  "departments.manage",
  "departments.publish",
  "departments.toggle_for_company",
  "department_content.read",
  "department_content.manage",
  "department_content.publish",
  "plans.read",
  "plans.manage",
  "subscriptions.read",
  "subscriptions.manage",
  "audit.read",
];

/** Permisos por defecto asignados a cada rol. */
export const ROLE_PERMISSIONS: Record<
  "super_admin" | "company_owner" | "company_admin" | "department_manager" | "member" | "viewer",
  Permission[]
> = {
  super_admin: ["*"],
  company_owner: [
    "companies.read",
    "companies.manage",
    "members.read",
    "members.invite",
    "members.manage",
    "members.deactivate",
    "departments.read",
    "departments.toggle_for_company",
    "department_content.read",
    "plans.read",
    "subscriptions.read",
    "subscriptions.manage",
    "audit.read",
  ],
  company_admin: [
    "companies.read",
    "members.read",
    "members.invite",
    "members.manage",
    "members.deactivate",
    "departments.read",
    "departments.toggle_for_company",
    "department_content.read",
    "plans.read",
    "subscriptions.read",
  ],
  department_manager: [
    "companies.read",
    "members.read",
    "departments.read",
    "departments.toggle_for_company",
    "department_content.read",
    "department_content.manage",
    "plans.read",
    "subscriptions.read",
  ],
  member: [
    "companies.read",
    "members.read",
    "departments.read",
    "department_content.read",
  ],
  viewer: ["companies.read", "departments.read", "department_content.read"],
};

export function permissionsForRole(
  role: keyof typeof ROLE_PERMISSIONS
): Permission[] {
  return ROLE_PERMISSIONS[role] ?? [];
}

export function hasPermission(
  granted: string[] | null | undefined,
  required: Permission
): boolean {
  if (!granted) return false;
  if (granted.includes("*")) return true;
  return granted.includes(required);
}

export function can(
  granted: string[] | null | undefined,
  required: Permission
): boolean {
  return hasPermission(granted, required);
}
