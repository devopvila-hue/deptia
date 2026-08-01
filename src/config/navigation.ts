import { departments } from "@/data/departments";
import type { IconCode } from "@/components/ui/icon";

export interface NavLink {
  href: string;
  label: string;
  description?: string;
  icon?: IconCode;
  color?: string;
}

export interface NavItemWithChildren extends NavLink {
  children?: never;
  isDepartmentsTrigger?: true;
}

export const mainNavigation: NavLink[] = [
  { href: "/departamentos", label: "Departamentos", description: "Equipos listos para tu empresa" },
  { href: "/como-funciona", label: "Cómo funciona", description: "Activación en minutos" },
  { href: "/seguridad", label: "Seguridad", description: "Instancia privada, control real" },
  { href: "/precios", label: "Precios", description: "Planes claros y previsibles" },
  { href: "/recursos", label: "Recursos", description: "Guías, casos y actualizaciones" },
];

export const mobileNavigation: NavLink[] = [
  ...mainNavigation,
  { href: "/demo", label: "Ver demo", description: "Panel en vivo" },
  { href: "/contacto", label: "Contacto", description: "Hablamos cuando quieras" },
];

export const departmentsNavigation: NavLink[] = departments.map((d) => ({
  href: `/departamentos/${d.slug}`,
  label: d.shortName,
  description: d.tagline,
  color: d.color.base,
}));

export const footerNavigation: { title: string; links: NavLink[] }[] = [
  {
    title: "Producto",
    links: [
      { href: "/departamentos", label: "Departamentos" },
      ...departmentsNavigation,
      { href: "/como-funciona", label: "Cómo funciona" },
      { href: "/precios", label: "Precios" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { href: "/seguridad", label: "Seguridad" },
      { href: "/demo", label: "Demostración" },
      { href: "/recursos", label: "Recursos" },
      { href: "/contacto", label: "Contacto" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacidad", label: "Privacidad" },
      { href: "/terminos", label: "Términos" },
      { href: "/cookies", label: "Cookies" },
    ],
  },
];
