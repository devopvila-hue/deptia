"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleCheck,
  FileText,
  Fingerprint,
  Globe2,
  LockKeyhole,
  Megaphone,
  Search,
  ShieldCheck,
  Waypoints,
  BriefcaseBusiness,
} from "lucide-react";
import { content } from "./content";
import { DepartmentCards } from "./department-cards";
import { DepartmentVote } from "./department-vote";
import { ConnectorsCarousel } from "./connectors-carousel";
import { MissionDemo } from "./mission-demo";
import type { Locale } from "@/i18n/config";
import { localePrefixPath } from "@/i18n/locale-path";

function TeamSculpture({ locale }: { locale: Locale }) {
  const es = locale === "es";
  const reduceMotion = useReducedMotion();
  const drift = (delay: number) =>
    reduceMotion
      ? undefined
      : {
          animate: { y: [-5, 6, -5] },
          transition: {
            duration: 6.5,
            delay,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        };
  return (
    <div
      className="p-sculpture"
      aria-label={
        es
          ? "Departamentos conectados alrededor de tu empresa"
          : "Departments connected around your business"
      }
    >
      <motion.div
        className="p-orbit p-orbit-one"
        animate={
          reduceMotion
            ? undefined
            : { opacity: [0.35, 0.8, 0.35], scale: [0.98, 1.02, 0.98] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="p-orbit p-orbit-two"
        animate={
          reduceMotion
            ? undefined
            : { opacity: [0.65, 0.3, 0.65], scale: [1.01, 0.985, 1.01] }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="p-orbit p-orbit-three"
        animate={
          reduceMotion
            ? undefined
            : { opacity: [0.25, 0.58, 0.25], scale: [0.99, 1.015, 0.99] }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <div className="p-scene-label p-tiny">
        <span className="p-live-dot" />
        {es ? "TU EQUIPO, EN MOVIMIENTO" : "YOUR TEAM, IN MOTION"}
      </div>
      <div className="p-core-shadow" />
      <motion.div
        className="p-sculpture-stack"
        aria-hidden="true"
        {...drift(0)}
      >
        <div className="p-stack-layer p-layer-back" />
        <div className="p-stack-layer p-layer-mid" />
        <div className="p-stack-layer p-layer-front" />
        <Image
          className="p-official-core"
          src="/brand/departify-d-symbol.png"
          width={110}
          height={110}
          alt=""
          priority
        />
      </motion.div>
      <motion.div className="p-orbit-node p-node-marketing" {...drift(0.8)}>
        <span className="p-node-icon p-lime">
          <Megaphone size={18} />
        </span>
        <div>
          <strong>Marketing</strong>
          <span>
            {es
              ? "Preparando tu próxima campaña"
              : "Preparing your next campaign"}
          </span>
        </div>
        <span className="p-node-status" />
      </motion.div>
      <motion.div className="p-orbit-node p-node-seo" {...drift(2.3)}>
        <span className="p-node-icon p-lavender">
          <Search size={18} />
        </span>
        <div>
          <strong>SEO</strong>
          <span>
            {es ? "Encontrando oportunidades" : "Finding opportunities"}
          </span>
        </div>
        <span className="p-node-status" />
      </motion.div>
      <motion.div className="p-orbit-node p-node-sales" {...drift(3.9)}>
        <span className="p-node-icon p-peach">
          <BriefcaseBusiness size={18} />
        </span>
        <div>
          <strong>{es ? "Ventas" : "Sales"}</strong>
          <span>
            {es
              ? "Cada oportunidad, atendida"
              : "Every opportunity, followed up"}
          </span>
        </div>
        <span className="p-node-status" />
      </motion.div>
      <div className="p-scene-caption">
        <span className="p-caption-cross">+</span>
        <span>
          {es ? "TU EMPRESA, EN EL CENTRO." : "YOUR BUSINESS AT THE CENTER."}
          <br />
          <b>
            {es
              ? "Todo conectado. Todo con contexto."
              : "All connected. All with context."}
          </b>
        </span>
      </div>
      <span className="p-scene-coordinate p-tiny" aria-hidden="true">
        DPT — OS / 01
      </span>
    </div>
  );
}

export function PremiumHome({ locale }: { locale: Locale }) {
  const c = content[locale];
  const root = useRef<HTMLDivElement>(null);
  const path = (href: string) => localePrefixPath(locale, href);
  useEffect(() => {
    const nodes = root.current?.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!nodes || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("p-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    nodes.forEach((node) => {
      node.classList.add("p-reveal-ready");
      observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={root} className="premium-home">
      <section className="p-hero p-wrap">
        <div className="p-hero-copy">
          <p className="p-eyebrow">
            <span className="p-asterisk" aria-hidden="true">
              ✳
            </span>
            {c.eyebrow}
          </p>
          <h1>
            {c.title[0]}
            <br />
            {c.title[1]}
            <br />
            <span>{c.title[2]}</span>
          </h1>
          <p className="p-hero-intro">{c.intro}</p>
          <div className="p-hero-actions">
            <a className="p-button p-button-dark" href={path("/departamentos")}>
              {c.start}
              <ArrowUpRight size={19} />
            </a>
            <a className="p-button p-button-outline" href="#demo">
              <span className="p-play" aria-hidden="true">
                ▶
              </span>
              {c.demo}
            </a>
          </div>
          <p className="p-hero-note">
            <ShieldCheck size={14} />
            {c.note}
          </p>
          <Link className="p-hero-price-link" href={path("/precios")}>
            {locale === "es"
              ? "Comparar planes y precios"
              : "Compare plans and pricing"}
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <TeamSculpture locale={locale} />
        <div className="p-hero-baseline">
          <span className="p-tiny">{c.system}</span>
          <a href="#el-cambio">
            {c.scroll}
            <ArrowDown size={15} />
          </a>
          <span className="p-tiny">
            <span className="p-live-dot" />
            {c.active}
          </span>
        </div>
      </section>
      <ConnectorsCarousel locale={locale} />
      <section
        className="p-manifesto p-wrap p-section"
        id="el-cambio"
        data-reveal
      >
        <div className="p-manifesto-heading">
          <p className="p-eyebrow">{c.problemLabel}</p>
          <h2>
            {c.problemTitle}
            <br />
            <span>{c.problemAccent}</span>
          </h2>
        </div>
        <div className="p-manifesto-copy">
          <p>{c.problemBody}</p>
          <strong>
            <span className="p-small-star" aria-hidden="true">
              ✳
            </span>
            {c.problemEnd}
          </strong>
        </div>
      </section>
      <section className="p-departments p-wrap p-section" id="departamentos">
        <div className="p-section-heading" data-reveal>
          <div>
            <p className="p-eyebrow">{c.deptLabel}</p>
            <h2>
              {c.deptTitle}
              <br />
              <span>{c.deptAccent}</span>
            </h2>
          </div>
          <div className="p-heading-aside">
            <p>{c.deptBody}</p>
            <Link className="p-text-link" href={path("/departamentos")}>
              {c.all}
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
        <DepartmentCards locale={locale} />
        <DepartmentVote locale={locale} />
      </section>
      <section className="p-how-section" id="como-funciona">
        <div className="p-wrap p-how-grid">
          <div className="p-how-copy" data-reveal>
            <p className="p-eyebrow">{c.howLabel}</p>
            <h2>
              {c.howTitle}
              <br />
              <span>{c.howAccent}</span>
            </h2>
            <p className="p-how-intro">{c.howIntro}</p>
            <ol className="p-steps">
              {c.steps.map(([title, description], i) => (
                <li key={title}>
                  <span className="p-step-number">0{i + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <ArrowDownRight className="p-how-arrow" size={66} strokeWidth={1} />
          </div>
          <div data-reveal>
            <MissionDemo c={c} />
          </div>
        </div>
      </section>
      <section className="p-control p-wrap p-section" id="control">
        <div className="p-control-visual" data-reveal>
          <div className="p-control-top">
            <span className="p-tiny">DEPARTIFY / TRUST BY DESIGN</span>
            <ShieldCheck size={18} />
          </div>
          <div className="p-fingerprint">
            <div />
            <div />
            <Fingerprint size={100} strokeWidth={0.85} />
            <span className="p-lock-badge">
              <LockKeyhole size={18} />
            </span>
          </div>
          <div className="p-permissions">
            <h3>
              {c.permission}
              <span className="p-live-dot" />
            </h3>
            {c.permissions.map(([action, status], i) => (
              <div key={action}>
                <span>{action}</span>
                <b className={`p-permission-${i}`}>
                  {i === 0 ? (
                    <Check size={11} />
                  ) : i === 1 ? (
                    <CircleCheck size={11} />
                  ) : (
                    <LockKeyhole size={11} />
                  )}{" "}
                  {status}
                </b>
              </div>
            ))}
          </div>
        </div>
        <div className="p-control-copy" data-reveal>
          <p className="p-eyebrow">{c.controlLabel}</p>
          <h2>
            {c.controlTitle}
            <br />
            <span>{c.controlAccent}</span>
          </h2>
          <p>{c.controlBody}</p>
          <div className="p-control-points">
            {c.controls.map(([title, description], i) => {
              const Icon = [LockKeyhole, ShieldCheck, Globe2][i] ?? ShieldCheck;
              return (
                <div key={title}>
                  <Icon size={20} strokeWidth={1.5} />
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <Link href={path("/seguridad")} className="p-text-link">
            {c.security}
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section className="p-faq p-wrap p-section" data-reveal>
        <div>
          <p className="p-eyebrow">{c.faqLabel}</p>
          <h2>{c.faqTitle}</h2>
          <Link className="p-text-link" href={path("/contacto")}>
            {c.contact}
            <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="p-faq-items">
          {c.faqs.map(([q, a], i) => (
            <details key={q}>
              <summary>
                <span className="p-faq-number">0{i + 1}</span>
                {q}
                <ChevronDown size={18} />
              </summary>
              <p>
                {a}
                {i === 4 && (
                  <>
                    {" "}
                    <Link href={path("/precios")}>
                      {locale === "es" ? "Ver precios" : "View pricing"}{" "}
                      <ArrowRight size={13} />
                    </Link>
                  </>
                )}
              </p>
            </details>
          ))}
        </div>
      </section>
      <section className="p-final">
        <div className="p-final-orbit" aria-hidden="true" />
        <div className="p-wrap p-final-inner" data-reveal>
          <span className="p-final-star" aria-hidden="true">
            ✳
          </span>
          <p className="p-eyebrow">{c.finalLabel}</p>
          <h2>
            {c.finalTitle}
            <br />
            <span>{c.finalAccent}</span>
          </h2>
          <p className="p-final-body">{c.finalBody}</p>
          <div className="p-final-actions">
            <a className="p-button p-button-lime" href={path("/precios")}>
              {locale === "es"
                ? "Ver planes y empezar"
                : "View plans and get started"}
              <ArrowUpRight size={19} />
            </a>
            <Link className="p-final-contact" href={path("/contacto")}>
              {c.contact}
              <ArrowUpRight size={16} />
            </Link>
          </div>
          <p className="p-final-note">{c.finalNote}</p>
        </div>
      </section>
    </div>
  );
}
