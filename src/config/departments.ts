// DEPARTIFY official department catalog — single source of truth.
//
// The Portal (opencloud-client), the Marketing site (this repo),
// the Marketplace, the Pricing page, the video scripts and every
// other surface must consume this list. The Portal mirrors the
// same 15 entries in `design-system/departments.ts`; when this
// file changes, mirror the change there in the same release.
//
// Sprint 3 commit: list grows from 8 to 15 (single source of truth).
export const DEPARTIFY_DEPARTMENTS = [
  'Executive Office',
  'Platform Assistant',
  'Growth',
  'Sales',
  'Marketing',
  'Content',
  'SEO',
  'Analytics',
  'Finance',
  'Operations',
  'Logistics',
  'Support',
  'People',
  'Legal',
  'Governance & Risk',
] as const;

export type DepartmentName = (typeof DEPARTIFY_DEPARTMENTS)[number];

/**
 * Stable ordering used by the Marketing site (Departamentos page,
 * hero ticker, Pricing, CTAs). Lower index = higher priority.
 * The Portal uses the same order in the Mega menu.
 */
export const DEPARTMENT_PRIORITY: Record<DepartmentName, number> = {
  'Executive Office': 0,
  'Platform Assistant': 1,
  Growth: 2,
  Sales: 3,
  Marketing: 4,
  Content: 5,
  SEO: 6,
  Analytics: 7,
  Finance: 8,
  Operations: 9,
  Logistics: 10,
  Support: 11,
  People: 12,
  Legal: 13,
  'Governance & Risk': 14,
};

/** Department slugs used in URLs (lowercase, kebab-case). */
export const departmentSlug = (name: DepartmentName): string =>
  name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
