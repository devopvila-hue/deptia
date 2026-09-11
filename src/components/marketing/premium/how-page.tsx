"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Layers3,
  LockKeyhole,
  ShieldCheck,
  FileText,
  Compass,
  RefreshCw,
  BookOpen,
} from "lucide-react";
import { howContent } from "./how-content";
import { content } from "./content";
import { MissionDemo } from "./mission-demo";
import { localePrefixPath } from "@/i18n/locale-path";
import type { Locale } from "@/i18n/config";

export function HowPage({ locale }: { locale: Locale }) {
  const c = howContent[locale];
  const [active, setActive] = useState(0);
  const step = c.steps[active]!;
  const icons = [BookOpen, Compass, ShieldCheck, RefreshCw];
  const ActiveIcon = icons[active] ?? BookOpen;
  const path = (href: string) => localePrefixPath(locale, href);
  return (
    <div className="how-page">
      <section className="how-hero p-wrap">
        <p className="p-eyebrow">{c.eyebrow}</p>
        <h1>
          {c.title}
          <br />
          <span>{c.accent}</span>
        </h1>
        <div className="how-hero-bottom">
          <p>{c.intro}</p>
          <div>
            <Link
              className="p-button p-button-dark"
              href={path("/departamentos")}
            >
              {c.cta}
              <ArrowUpRight size={18} />
            </Link>
            <a className="p-text-link" href="#demo">
              {c.demo}
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
        <div className="how-flow">
          <span className="p-tiny">{c.label}</span>
          <ol>
            {c.stages.map((stage, i) => (
              <li key={stage}>
                <span>0{i + 1}</span>
                {stage}
                {i < 3 && <ArrowRight size={17} />}
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="how-explorer p-wrap p-section">
        <div className="p-section-heading">
          <div>
            <p className="p-eyebrow">{c.explorerEyebrow}</p>
            <h2>
              {c.explorerTitle}
              <br />
              <span>{c.explorerAccent}</span>
            </h2>
          </div>
          <p className="how-aside">{c.explorerIntro}</p>
        </div>
        <div
          className="how-step-picker"
          role="group"
          aria-label={c.explorerEyebrow}
        >
          {c.steps.map((s, i) => (
            <button
              key={s.short}
              type="button"
              aria-pressed={active === i}
              aria-controls="how-step-detail"
              onClick={() => setActive(i)}
            >
              <span>0{i + 1}</span>
              {s.short}
              <ArrowUpRight size={16} />
            </button>
          ))}
        </div>
        <div
          id="how-step-detail"
          className="how-detail"
          aria-live="polite"
          aria-atomic="true"
        >
          <div key={`copy-${active}`} className="how-detail-copy">
            <span className="how-step-count">
              0{active + 1} <span>/ 04</span>
            </span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            <dl>
              {[
                [c.you, step.you],
                [c.team, step.team],
                [c.output, step.output],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div key={`visual-${active}`} className="how-example">
            <div className="how-example-top">
              <span className="p-tiny">{c.example}</span>
              <Layers3 size={17} />
            </div>
            <div className="how-example-icon">
              <ActiveIcon size={42} strokeWidth={1.25} />
            </div>
            <p className="p-tiny">{step.badge}</p>
            <h4>{step.cardTitle}</h4>
            <ul>
              {step.cardRows.map((row) => (
                <li key={row}>
                  <span>
                    <Check size={13} />
                  </span>
                  {row}
                </li>
              ))}
            </ul>
            <p className="how-example-note">
              <LockKeyhole size={13} />
              {step.note}
            </p>
          </div>
        </div>
        <div className="how-step-next">
          <span>{String(active + 1).padStart(2, "0")} / 04</span>
          <button
            type="button"
            className="p-text-link"
            onClick={() => setActive((active + 1) % 4)}
          >
            {active === 3 ? c.restart : c.next}
            <ArrowRight size={17} />
          </button>
        </div>
      </section>
      <section className="how-demo-section">
        <div className="p-wrap how-demo-grid">
          <div>
            <p className="p-eyebrow">{c.demoEyebrow}</p>
            <h2>
              {c.demoTitle}
              <br />
              <span>{c.demoAccent}</span>
            </h2>
            <p>{c.demoBody}</p>
            <div className="how-demo-note">
              <FileText size={20} />
              <p>{c.demoNote}</p>
            </div>
          </div>
          <MissionDemo c={content[locale]} />
        </div>
      </section>
      <section className="p-wrap p-section how-guard">
        <p className="p-eyebrow">{c.guardEyebrow}</p>
        <h2>
          {c.guardTitle}
          <br />
          <span>{c.guardAccent}</span>
        </h2>
        <div className="how-guard-grid">
          {c.guards.map(([title, body, note], i) => {
            const Icon = [FileText, ShieldCheck, LockKeyhole][i]!;
            return (
              <article key={title}>
                <span className={`how-guard-icon how-guard-icon-${i}`}>
                  <Icon size={24} strokeWidth={1.5} />
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
                <footer>{note}</footer>
              </article>
            );
          })}
        </div>
        <Link className="p-text-link" href={path("/seguridad")}>
          {c.security}
          <ArrowUpRight size={16} />
        </Link>
      </section>
      <section className="how-final">
        <div className="p-wrap">
          <p className="p-eyebrow">{c.finalEyebrow}</p>
          <h2>
            {c.finalTitle}
            <br />
            <span>{c.finalAccent}</span>
          </h2>
          <p>{c.finalBody}</p>
          <div>
            <Link
              href={path("/departamentos")}
              className="p-button p-button-lime"
            >
              {c.cta}
              <ArrowUpRight size={18} />
            </Link>
            <Link className="p-text-link" href={path("/contacto")}>
              {c.contact}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
