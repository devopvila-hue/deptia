import { cn } from "@/lib/utils";

/**
 * Icon System v1.0
 * - 24px canvas, 2px safe zone, 2px stroke, 2px corner radii
 * - Rounded line caps, geometric / Swiss minimal
 * - currentColor by default, optional accent overlay
 *
 * Coding convention: [DOMAIN]-[##]
 *   MKT-01 Marketing · SLS-02 Sales · CNT-03 Content
 *   OPS-04 Operations · SUP-05 Support · OPT-06 SEO
 *   ADM-07 Admin · PPL-08 People · LOG-09 Logistics
 */

export type IconCode =
  | "MKT-01"
  | "SLS-02"
  | "CNT-03"
  | "OPS-04"
  | "SUP-05"
  | "OPT-06"
  | "ADM-07"
  | "PPL-08"
  | "LOG-09"
  | "GRW-10"
  | "ANL-11"
  | "FIN-12"
  | "LGL-13"
  | "GOV-14";

type IconProps = {
  code: IconCode;
  className?: string;
  strokeWidth?: number;
};

const PATHS: Record<IconCode, JSX.Element> = {
  // MKT-01 — Marketing · megaphone
  "MKT-01": (
    <>
      <path d="M4 11v2a1 1 0 0 0 1 1h2l8 5V5L7 10H5a1 1 0 0 0-1 1z" />
      <path d="M18 9a4 4 0 0 1 0 6" />
      <path d="M11 15v3a2 2 0 0 0 4 0" />
    </>
  ),
  // SLS-02 — Sales · funnel
  "SLS-02": (
    <>
      <path d="M4 5h16l-5 8v5l-6 3v-8z" />
      <line x1="9" y1="13" x2="15" y2="13" />
    </>
  ),
  // CNT-03 — Content · document with lines
  "CNT-03": (
    <>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6z" />
      <path d="M14 3v6h6" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="13" y2="17" />
    </>
  ),
  // OPS-04 — Operations · sliders
  "OPS-04": (
    <>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
      <circle cx="9" cy="6" r="2" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" />
      <circle cx="9" cy="18" r="2" fill="currentColor" stroke="none" />
    </>
  ),
  // SUP-05 — Support · headset
  "SUP-05": (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="2" y="13" width="4" height="7" rx="1" />
      <rect x="18" y="13" width="4" height="7" rx="1" />
      <path d="M18 20v1a2 2 0 0 1-2 2h-3" />
    </>
  ),
  // OPT-06 — SEO · magnifier + chart spark
  "OPT-06": (
    <>
      <circle cx="11" cy="11" r="6" />
      <line x1="20" y1="20" x2="15.5" y2="15.5" />
      <path d="M8 11l2 2 4-4" />
    </>
  ),
  // ADM-07 — Admin · building with columns
  "ADM-07": (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <line x1="9" y1="9" x2="9" y2="9.01" />
      <line x1="15" y1="9" x2="15" y2="9.01" />
      <line x1="9" y1="13" x2="9" y2="13.01" />
      <line x1="15" y1="13" x2="15" y2="13.01" />
      <line x1="9" y1="17" x2="9" y2="17.01" />
      <line x1="15" y1="17" x2="15" y2="17.01" />
    </>
  ),
  // PPL-08 — People · two figures
  "PPL-08": (
    <>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M3 20v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1" />
      <path d="M15 20v-1a3 3 0 0 1 3-3h1a3 3 0 0 1 3 3v1" />
    </>
  ),
  // LOG-09 — Logistics · package / cargo
  "LOG-09": (
    <>
      <path d="M3 7l9-4 9 4-9 4-9-4z" />
      <path d="M3 7v10l9 4 9-4V7" />
      <line x1="12" y1="11" x2="12" y2="21" />
      <path d="M7.5 5l9 4" />
    </>
  ),
  // GRW-10 — Growth · rocket
  "GRW-10": (
    <>
      <path d="M5 13l-2 8 8-2" />
      <path d="M14 7l3-3 3 3-3 3" />
      <path d="M5 13c1-4 4-7 8-8 1 1 2 2 3 3-1 4-4 7-8 8a3 3 0 0 1-3-3z" />
      <circle cx="14" cy="10" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
  // ANL-11 — Analytics · bar chart
  "ANL-11": (
    <>
      <line x1="3" y1="20" x2="21" y2="20" />
      <rect x="5" y="12" width="3" height="8" />
      <rect x="10.5" y="8" width="3" height="12" />
      <rect x="16" y="4" width="3" height="16" />
    </>
  ),
  // FIN-12 — Finance · coins / trend up
  "FIN-12": (
    <>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M14 7h7v7" />
      <line x1="3" y1="21" x2="21" y2="21" />
    </>
  ),
  // LGL-13 — Legal · scale / gavel
  "LGL-13": (
    <>
      <path d="M12 3v18" />
      <path d="M5 7h14" />
      <path d="M5 7l-2 5a3 3 0 0 0 6 0z" />
      <path d="M19 7l-2 5a3 3 0 0 0 6 0z" />
      <path d="M8 21h8" />
    </>
  ),
  // GOV-14 — Governance · shield with checkmark
  "GOV-14": (
    <>
      <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
};

export function Icon({ code, className, strokeWidth = 2 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      {PATHS[code]}
    </svg>
  );
}

/** Department → icon code mapping */
export const AGENT_ICONS: Record<string, IconCode> = {
  marketing: "MKT-01",
  ventas: "SLS-02",
  contenido: "CNT-03",
  operaciones: "OPS-04",
  soporte: "SUP-05",
  atencion: "SUP-05",
  "atencion-cliente": "SUP-05",
  seo: "OPT-06",
  administracion: "ADM-07",
  rrhh: "PPL-08",
  logistica: "LOG-09",
  // Sprint 3 — 6 new departments to reach the 15-dept catalog.
  growth: "GRW-10",
  analitica: "ANL-11",
  finanzas: "FIN-12",
  legal: "LGL-13",
  gobierno: "GOV-14",
  // 'soporte' is already covered above; 'atencion-cliente' too.
};
