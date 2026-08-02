import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { RegistrationFlow } from "@/components/forms/registration-flow";

export const metadata: Metadata = {
  title: "Crear mi equipo",
  description:
    "Da de alta tu instancia privada de DEPARTIFY. El proceso se realiza en menos de 10 minutos, paso a paso.",
};

export default function RegisterPage() {
  return (
    <div className="border-b border-border">
      <Container width="wide" className="py-12 sm:py-16">
        <RegistrationFlow />
      </Container>
    </div>
  );
}
