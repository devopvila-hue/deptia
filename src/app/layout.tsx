// Root layout mínimo — Next.js 14 exige <html>+<body> en el root layout,
// pero los trasladamos al [locale]/layout.tsx para poder tener <html lang={locale}> dinámico.
// Este layout solo pasa children al locale layout, que es quien realmente
// controla html/body/lang/providers.
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
