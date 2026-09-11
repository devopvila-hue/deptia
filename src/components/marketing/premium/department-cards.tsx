import Link from "next/link";
import {
  ArrowUpRight,
  AudioLines,
  Code2,
  FileText,
  Layers3,
  Megaphone,
  Search,
  Waypoints,
} from "lucide-react";
import { content } from "./content";
import { localePrefixPath } from "@/i18n/locale-path";
import type { Locale } from "@/i18n/config";

export function DepartmentCards({ locale }: { locale: Locale }) {
  const c = content[locale];
  const path = (href: string) => localePrefixPath(locale, href);
  const icons = [
    Megaphone,
    Search,
    Waypoints,
    AudioLines,
    FileText,
    Code2,
    Layers3,
  ];
  return (
    <>
      <div className="p-dept-grid">
        {c.departments.map((d, i) => {
          const Icon = icons[i] ?? Layers3;
          return (
            <Link
              key={d.slug}
              href={
                d.slug === "direccion"
                  ? path("/departamentos#direccion")
                  : path(`/departamentos/${d.slug}`)
              }
              className={`p-dept-card p-${d.color}`}
              data-reveal
            >
              <div className="p-card-top">
                <span className="p-tiny">DPT / 0{i + 1}</span>
                <ArrowUpRight className="p-card-arrow" size={21} />
              </div>
              <div className={`p-dept-art p-art-${i}`} aria-hidden="true">
                <div className="p-art-disc" />
                <div className="p-art-disc" />
                <div className="p-art-disc" />
                <div className="p-art-center">
                  <Icon size={31} strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-card-copy">
                <p className="p-tiny">{d.label}</p>
                <h3>{d.name}</h3>
                <p>{d.description}</p>
                <div className="p-tags">
                  {d.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <p className="p-direction">
        <Layers3 size={17} />
        {c.included}
      </p>
    </>
  );
}
