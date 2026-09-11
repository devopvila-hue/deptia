import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/components/ui/brand-mark";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { localePrefixPath } from "@/i18n/locale-path";
import type { Locale } from "@/i18n/config";

export function Footer({ locale }: { locale: Locale }) {
  const es = locale === "es";
  const groups = [
    {
      title: es ? "Producto" : "Product",
      links: [
        [es ? "Departamentos" : "Departments", "/departamentos"],
        [es ? "Cómo funciona" : "How it works", "/como-funciona"],
        [es ? "Precios" : "Pricing", "/precios"],
        [es ? "Demostración" : "Demo", "/demo"],
      ],
    },
    {
      title: es ? "Conócenos" : "Explore",
      links: [
        [es ? "Recursos" : "Resources", "/recursos"],
        [es ? "Seguridad" : "Security", "/seguridad"],
        [es ? "Contacto" : "Contact", "/contacto"],
        [es ? "Manual de marca" : "Brand manual", "https://docs.departify.app"],
      ],
    },
    {
      title: es ? "Lo importante" : "The essentials",
      links: [
        [es ? "Privacidad" : "Privacy", "/privacidad"],
        [es ? "Términos" : "Terms", "/terminos"],
        ["Cookies", "/cookies"],
        [
          es ? "Acceder a Departify" : "Open Departify",
          "https://app.departify.app/login",
        ],
      ],
    },
  ];
  return (
    <footer className="site-footer">
      <div className="p-wrap">
        <div className="site-footer-top">
          <div className="site-footer-brand">
            <Link
              href={localePrefixPath(locale, "/")}
              aria-label={es ? "Departify — Inicio" : "Departify — Home"}
            >
              <BrandMark />
            </Link>
            <p>
              {es ? "Tu empresa. Más equipo." : "Your business. More team."}
            </p>
            <span>
              {es
                ? "Siete departamentos. Un mismo rumbo. Tú decides. Departify trabaja."
                : "Seven departments. One direction. You decide. Departify works."}
            </span>
            <a className="p-text-link" href="mailto:hola@departify.app">
              hola@departify.app
              <ArrowUpRight size={15} />
            </a>
          </div>
          {groups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2>{group.title}</h2>
              {group.links.map(([label, href]) => (
                <Link key={href} href={localePrefixPath(locale, href!)}>
                  {label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
        <div className="site-footer-bottom">
          <div className="site-language-setting">
            <span>{es ? "Idioma" : "Language"}</span>
            <LocaleSwitcher currentLocale={locale} />
          </div>
          <span>© {new Date().getFullYear()} Departify</span>
          <span>BUSINESS OPERATING SYSTEM</span>
          <span>
            {es
              ? "Hecho en España. Pensado para avanzar."
              : "Made in Spain. Built to move forward."}
          </span>
        </div>
      </div>
    </footer>
  );
}
