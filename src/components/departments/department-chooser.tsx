"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ClipboardCheck, ShieldCheck } from "lucide-react";
import { departmentBenefits } from "@/data/department-benefits";
import { departmentIcons } from "./department-icons";
import { content } from "@/components/marketing/premium/content";
import { localePrefixPath } from "@/i18n/locale-path";
import type { Locale } from "@/i18n/config";

export function DepartmentChooser({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState(0);
  const es = locale === "es";
  const items = departmentBenefits[locale];
  const item = items[selected]!;
  const department = content[locale].departments.find(
    (d) => d.slug === item.slug,
  )!;
  const MainIcon = departmentIcons(item.slug).main;
  return (
    <section className="p-chooser" aria-labelledby="department-chooser-title">
      <div className="p-chooser-heading">
        <p className="p-eyebrow">
          {es
            ? "EMPIEZA POR LO QUE TE QUITA TIEMPO"
            : "START WITH WHAT TAKES YOUR TIME"}
        </p>
        <h2 id="department-chooser-title">
          {es
            ? "¿Qué necesitas sacar adelante?"
            : "What do you need to get done?"}
        </h2>
        <p>
          {es
            ? "Elige una tarea y descubre qué podrías delegar."
            : "Choose a task and see what you could delegate."}
        </p>
      </div>
      <div className="p-chooser-layout">
        <div
          className="p-chooser-options"
          role="group"
          aria-label={es ? "Tu prioridad" : "Your priority"}
        >
          {items.map((choice, i) => {
            const Icon = departmentIcons(choice.slug).main;
            return (
              <button
                type="button"
                key={choice.slug}
                aria-pressed={i === selected}
                aria-controls="department-recommendation"
                onClick={() => setSelected(i)}
              >
                <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                <span>{choice.need}</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            );
          })}
        </div>
        <div
          className="p-chooser-result"
          id="department-recommendation"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="p-chooser-department">
            <MainIcon size={26} strokeWidth={1.5} aria-hidden="true" />
            <span>{department.name}</span>
          </div>
          <blockquote>“{item.task}”</blockquote>
          <dl>
            <div>
              <ClipboardCheck size={20} aria-hidden="true" />
              <div>
                <dt>{es ? "Esto recibes" : "What you receive"}</dt>
                <dd>{item.result}</dd>
              </div>
            </div>
            <div>
              <ShieldCheck size={20} aria-hidden="true" />
              <div>
                <dt>{es ? "Esto decides tú" : "What you decide"}</dt>
                <dd>{item.control}</dd>
              </div>
            </div>
          </dl>
          <div className="p-chooser-actions">
            <Link
              className="p-button p-button-dark"
              href={localePrefixPath(locale, "/departamentos/" + item.slug)}
            >
              {es ? "Ver este departamento" : "Explore this department"}
              <ArrowUpRight size={17} />
            </Link>
            <Link
              className="p-text-link"
              href={localePrefixPath(locale, "/precios")}
            >
              {es ? "Comparar planes y precios" : "Compare plans and pricing"}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
