import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Qué cookies utilizamos y cómo gestionarlas.",
  alternates: { canonical: "/cookies" },
  robots: { index: false, follow: true },
};

const UPDATED = "1 de octubre de 2025";

export default function CookiesPage() {
  return (
    <LegalPage
      index="03"
      title="Política de cookies"
      description="Información sobre las cookies que utilizamos en Departify y cómo puedes gestionarlas."
      updated={UPDATED}
      sections={[
        {
          title: "¿Qué son las cookies?",
          content: (
            <p>
              Las cookies son pequeños archivos que los sitios web almacenan en tu dispositivo
              para recordar información entre visitas. También usamos tecnologías similares
              como el almacenamiento local del navegador.
            </p>
          ),
        },
        {
          title: "Cookies que utilizamos",
          content: (
            <>
              <p>
                En Departify utilizamos tres categorías de cookies, siempre con el objetivo de
                mejorar tu experiencia y proteger la plataforma.
              </p>
              <ul className="list-disc pl-5">
                <li>
                  <strong>Técnicas:</strong> necesarias para el funcionamiento del panel y la
                  autenticación. No se pueden desactivar.
                </li>
                <li>
                  <strong>De preferencia:</strong> recuerdan ajustes como el idioma o la
                  zona horaria.
                </li>
                <li>
                  <strong>De analítica:</strong> nos ayudan a entender cómo se usa la
                  plataforma. Solo se activan si das tu consentimiento.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "Gestión de cookies",
          content: (
            <p>
              Puedes configurar o rechazar las cookies no esenciales desde el banner de
              consentimiento o desde la configuración de tu navegador. Ten en cuenta que
              bloquear ciertas cookies puede afectar a la funcionalidad del panel.
            </p>
          ),
        },
        {
          title: "Terceros",
          content: (
            <p>
              Algunos proveedores externos pueden instalar cookies cuando integras sus
              herramientas (por ejemplo, al iniciar sesión con un proveedor de identidad).
              Puedes revisar su política en los respectivos sitios.
            </p>
          ),
        },
        {
          title: "Actualizaciones",
          content: (
            <p>
              Esta política puede actualizarse para reflejar cambios legales o técnicos. Te
              recomendamos revisarla periódicamente.
            </p>
          ),
        },
      ]}
    />
  );
}
