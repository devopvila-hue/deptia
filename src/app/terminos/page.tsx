import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";

export const metadata: Metadata = {
  title: "Términos de servicio",
  description: "Condiciones que rigen el uso de Departify.",
  alternates: { canonical: "/terminos" },
  robots: { index: false, follow: true },
};

const UPDATED = "1 de octubre de 2025";

export default function TermsPage() {
  return (
    <LegalPage
      index="02"
      title="Términos de servicio"
      description="Las condiciones que rigen el acceso y uso de Departify por parte de empresas y profesionales."
      updated={UPDATED}
      sections={[
        {
          title: "Aceptación",
          content: (
            <p>
              Al contratar o usar Departify aceptas estos términos. Si actúas en nombre de una
              empresa, declaras tener facultades para vincularla.
            </p>
          ),
        },
        {
          title: "Objeto",
          content: (
            <p>
              Departify presta servicios de operación de departamentos mediante inteligencia
              artificial, accesibles desde el panel web y desde Telegram, con instancia
              privada por cliente.
            </p>
          ),
        },
        {
          title: "Registro y cuenta",
          content: (
            <p>
              Para usar el servicio necesitas una cuenta. Eres responsable de mantener la
              confidencialidad de tus credenciales y de la actividad que ocurra bajo tu cuenta.
            </p>
          ),
        },
        {
          title: "Uso permitido",
          content: (
            <p>
              Te comprometes a usar el servicio conforme a la ley, a no utilizar las salidas
              para actividades ilícitas y a respetar los derechos de terceros. Está prohibido
              eludir las medidas de seguridad o realizar ingeniería inversa del producto.
            </p>
          ),
        },
        {
          title: "Planes y pagos",
          content: (
            <p>
              Los precios y condiciones de cada plan se indican en la página de precios. Los
              cargos se realizan por adelantado. Puedes cambiar o cancelar el plan en cualquier
              momento desde el panel de administración.
            </p>
          ),
        },
        {
          title: "Propiedad intelectual",
          content: (
            <p>
              Departify conserva todos los derechos sobre el software, la marca, los diseños y
              los materiales del sitio. El cliente conserva la propiedad de los contenidos que
              carga o genera a través del servicio.
            </p>
          ),
        },
        {
          title: "Limitación de responsabilidad",
          content: (
            <p>
              Departify no será responsable de daños indirectos, lucro cesante o pérdida de
              datos derivada del uso del servicio más allá de lo exigido por la ley. La
              plataforma es una herramienta de apoyo a la operativa; las decisiones
              estratégicas y legalmente relevantes siguen siendo responsabilidad del cliente.
            </p>
          ),
        },
        {
          title: "Suspensión y terminación",
          content: (
            <p>
              Podemos suspender el servicio si detectamos uso indebido, riesgo de seguridad o
              impago. Puedes cancelar en cualquier momento, manteniendo acceso a tu instancia
              durante 30 días para exportar tus datos.
            </p>
          ),
        },
        {
          title: "Modificaciones",
          content: (
            <p>
              Podemos modificar estos términos. Te avisaremos con al menos 30 días de
              antelación a la entrada en vigor de cambios sustanciales. El uso continuado del
              servicio implica la aceptación de los nuevos términos.
            </p>
          ),
        },
        {
          title: "Ley aplicable",
          content: (
            <p>
              Estos términos se rigen por la legislación española y europea aplicable. Para
              cualquier controversia, las partes se someten a los juzgados y tribunales de la
              ciudad del cliente, sin perjuicio de los derechos del consumidor.
            </p>
          ),
        },
      ]}
    />
  );
}
