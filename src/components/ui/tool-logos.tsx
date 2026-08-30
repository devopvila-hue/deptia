import type { SVGProps } from "react";

/**
 * Marcas reales de las herramientas conectadas.
 *
 * Cada logo es SVG inline, tamaño fijo `size` (default 14) y hereda
 * `currentColor` salvo cuando la marca tiene un color propio oficial
 * (Supabase verde, Gmail rojo, Google Drive multicolor). El resto se
 * pinta en blanco para encajar en el tema oscuro del diagrama.
 *
 * Si añades una herramienta nueva, crea un componente nuevo aquí en vez
 * de meter un PNG en /public: los SVG escalan sin pérdida, son tintables
 * y pesan menos de 1 KB.
 */

type LogoProps = SVGProps<SVGSVGElement> & { size?: number };

function svgBase(size: number) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
    focusable: false,
  } as const;
}

export function GitHubLogo({ size = 14, ...rest }: LogoProps) {
  return (
    <svg {...svgBase(size)} fill="currentColor" {...rest}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.687-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.594 1.028 2.687 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
      />
    </svg>
  );
}

export function VercelLogo({ size = 14, ...rest }: LogoProps) {
  return (
    <svg {...svgBase(size)} fill="currentColor" {...rest}>
      <path d="M12 2 22 20H2L12 2Z" />
    </svg>
  );
}

export function SupabaseLogo({ size = 14, ...rest }: LogoProps) {
  return (
    <svg {...svgBase(size)} {...rest}>
      <path
        d="M13.65 22h-2.4c-.4 0-.74-.3-.82-.7L8.97 14H4.5a1 1 0 0 1-.86-1.5l7.62-10.2c.5-.66 1.5-.16 1.36.66L11.85 8h5.13c.7 0 1.16.7.93 1.36l-2.96 8.4c-.13.4-.5.66-.92.66Z"
        fill="#3ECF8E"
      />
    </svg>
  );
}

export function RailwayLogo({ size = 14, ...rest }: LogoProps) {
  return (
    <svg {...svgBase(size)} fill="currentColor" {...rest}>
      <path d="M3 3h18l-2.4 7.2L21 21H3l2.4-10.8L3 3Zm5.4 6h7.2l.6-2.4H8.4l-.6 2.4Zm.6 2.4-.6 2.4h7.2l.6-2.4H9Z" />
    </svg>
  );
}

export function GmailLogo({ size = 14, ...rest }: LogoProps) {
  return (
    <svg {...svgBase(size)} {...rest}>
      <path
        d="M22 6.4v11.2A2.4 2.4 0 0 1 19.6 20H15v-7.2l-3 2.4-3-2.4V20H4.4A2.4 2.4 0 0 1 2 17.6V6.4A2.4 2.4 0 0 1 4.4 4h15.2A2.4 2.4 0 0 1 22 6.4Z"
        fill="#EA4335"
        opacity="0.95"
      />
      <path d="M15 12.8V20h-2v-4.4l-1-0.8 1-0.8V20h2v-7.2l-3-2.4-3 2.4V20H7v-7.2l5-4 5 4Z" fill="#fff" />
      <path
        d="M22 6.4V8l-7 4.8L8 8V6.4l7 4.8 7-4.8Z"
        fill="#fff"
      />
    </svg>
  );
}

export function GoogleDriveLogo({ size = 14, ...rest }: LogoProps) {
  return (
    <svg {...svgBase(size)} {...rest}>
      <path d="M8.4 4 3 13l2.7 4.7 5.4-9.4L8.4 4Z" fill="#4285F4" />
      <path d="m15.6 4-2.7 4.3 5.4 9.4L21 13 15.6 4Z" fill="#34A853" />
      <path d="m3 13 2.7 4.7h12.6L21 13l-2.7-4.7-2.7 4.7H8.4L5.7 13H3Z" fill="#FBBC04" />
      <path d="M8.4 17.7h7.2L21 13l-2.7-4.7-5.4 9.4Z" fill="#EA4335" opacity="0.0" />
    </svg>
  );
}

export type ToolSlug =
  | "github"
  | "vercel"
  | "supabase"
  | "railway"
  | "gmail"
  | "google-drive";

const REGISTRY: Record<ToolSlug, (props: LogoProps) => JSX.Element> = {
  github: GitHubLogo,
  vercel: VercelLogo,
  supabase: SupabaseLogo,
  railway: RailwayLogo,
  gmail: GmailLogo,
  "google-drive": GoogleDriveLogo,
};

export function ToolLogo({ slug, ...rest }: LogoProps & { slug: ToolSlug }) {
  const Component = REGISTRY[slug];
  return <Component {...rest} />;
}
