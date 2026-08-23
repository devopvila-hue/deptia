import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";
import { assertLocalizedForRoute } from "@/i18n/guard";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo tratamos los datos personales en Departify.",
  alternates: { canonical: "/privacidad" },
  robots: { index: false, follow: true },
};

const UPDATED = "1 de octubre de 2025";

export default function PrivacyPage({ params }: { params: { locale: string } }) {
  assertLocalizedForRoute(params.locale, "/privacidad");
  return (
    <LegalPage
      index="01"
      title="Política de privacidad"
      description="Cómo recopilamos, tratamos y protegemos los datos personales de las personas que usan Departify."
      updated={UPDATED}
      sections={[
        {
          title: "Responsable del tratamiento",
          content: (
            <>
              <p>
                El responsable del tratamiento de los datos personales recogidos a través de este
                sitio web y de los servicios asociados es <strong>Departify, S.L.</strong>{" "}
                (en adelante, «Departify»), con sede en España y NIF B-00000000.
              </p>
              <p>
                Para cualquier cuestión relacionada con privacidad, puedes escribir a{" "}
                <a href="mailto:privacidad@departify.app" className="text-foreground underline">
                  privacidad@departify.app
                </a>
                .
              </p>
            </>
          ),
        },
        {
          title: "Datos que tratamos",
          content: (
            <>
              <p>
                Departify trata las siguientes categorías de datos personales, dependiendo de cómo
                interactúas con la plataforma:
              </p>
              <ul className="list-disc pl-5">
                <li>Datos de cuenta: nombre, email, organización.</li>
                <li>Datos operativos: configuración, departamentos contratados, historial de misiones.</li>
                <li>Datos de uso: interacción con el panel, métricas agregadas.</li>
                <li>
                  Datos de cliente final: información que la empresa cliente decida conectar a la
                  plataforma, bajo su responsabilidad.
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "Finalidad",
          content: (
            <p>
              Tratamos los datos para prestar el servicio contratado, mantener la seguridad de la
              plataforma, mejorar el producto, cumplir obligaciones legales y, en su caso,
              enviar comunicaciones comerciales que el usuario haya autorizado.
            </p>
          ),
        },
        {
          title: "Base jurídica",
          content: (
            <p>
              La base jurídica del tratamiento es la ejecución del contrato de prestación de
              servicios, el cumplimiento de obligaciones legales, el consentimiento del
              interesado y, en su caso, el interés legítimo en mantener la seguridad del
              servicio.
            </p>
          ),
        },
        {
          title: "Conservación",
          content: (
            <p>
              Los datos se conservan mientras dure la relación contractual y, posteriormente,
              durante el plazo legalmente exigido para atender eventuales responsabilidades.
              Los datos operativos pueden eliminarse a solicitud del cliente en cualquier
              momento.
            </p>
          ),
        },
        {
          title: "Encargados del tratamiento",
          content: (
            <p>
              Departify trabaja con proveedores de infraestructura, analítica y atención al cliente
              que pueden tratar datos por cuenta de la plataforma. Todos los proveedores
              firman acuerdos de tratamiento conforme al RGPD.
            </p>
          ),
        },
        {
          title: "Derechos",
          content: (
            <p>
              Puedes ejercer en cualquier momento los derechos de acceso, rectificación,
              supresión, oposición, limitación del tratamiento y portabilidad escribiendo a{" "}
              <a href="mailto:privacidad@departify.app" className="text-foreground underline">
                privacidad@departify.app
              </a>
              . También puedes presentar una reclamación ante la autoridad de control
              competente.
            </p>
          ),
        },
        {
          title: "Seguridad",
          content: (
            <p>
              Aplicamos medidas técnicas y organizativas apropiadas para proteger los datos
              personales, incluyendo cifrado en tránsito y en reposo, control de accesos,
              registros de actividad y evaluaciones periódicas de riesgos. Puedes consultar más
              detalles en la página de seguridad.
            </p>
          ),
        },
      ]}
    />
  );
}
