/**
 * Layout mínimo para rutas fuera de `[locale]` (sin i18n).
 *
 * El root `src/app/layout.tsx` solo pasa children — el `<html>` y
 * `<body>` reales viven en `src/app/[locale]/layout.tsx`. Para que
 * `/acceso` y `/registro` (rutas canónicas de OAuth) tengan un
 * documento HTML válido, cada una declara su propio layout aquí.
 *
 * Sin esto, React hydration falla con #418/#423 porque el árbol
 * del servidor no tiene los nodos raíz que React espera.
 */
import type { ReactNode } from "react";
import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: { default: "Departify", template: "%s · Departify" },
  robots: { index: false, follow: false },
};

export default function AuthShellLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className="h-full bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
